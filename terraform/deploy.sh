#!/bin/bash

# 오류 발생 시 스크립트 중단
set -e

# 색상 설정
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 현재 디렉토리 저장
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${YELLOW}텍스트 평가 시스템 배포 스크립트${NC}"
echo "----------------------------------------"

# 1. 프로젝트 빌드
echo -e "${GREEN}1. 프로젝트 빌드 중...${NC}"
cd "$PROJECT_ROOT"
npm run build
echo "빌드 완료!"

# 2. Terraform 출력 가져오기
echo -e "${GREEN}2. Terraform 출력 가져오기...${NC}"
cd "$SCRIPT_DIR"
S3_BUCKET_NAME=$(terraform output -raw s3_bucket_name)
CLOUDFRONT_DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
WEBSITE_URL=$(terraform output -raw website_url)

if [ -z "$S3_BUCKET_NAME" ] || [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo -e "${RED}오류: Terraform 출력을 가져올 수 없습니다.${NC}"
  echo "Terraform이 초기화되고 적용되었는지 확인하세요."
  exit 1
fi

echo "S3 버킷: $S3_BUCKET_NAME"
echo "CloudFront 배포 ID: $CLOUDFRONT_DISTRIBUTION_ID"

# 3. S3에 파일 업로드
echo -e "${GREEN}3. 빌드된 파일을 S3에 업로드 중...${NC}"
cd "$PROJECT_ROOT"
aws s3 sync dist/ "s3://$S3_BUCKET_NAME" --delete

# 4. CloudFront 캐시 무효화
echo -e "${GREEN}4. CloudFront 캐시 무효화 중...${NC}"
aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --paths "/*"

echo "----------------------------------------"
echo -e "${GREEN}배포 완료!${NC}"
echo "웹사이트 URL: $WEBSITE_URL"
echo "----------------------------------------"
