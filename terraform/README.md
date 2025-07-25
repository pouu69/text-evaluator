# 텍스트 평가 시스템 배포 가이드

이 가이드는 텍스트 평가 시스템을 AWS S3, CloudFront를 이용하여 정적 웹사이트로 배포하는 방법을 설명합니다.

## 사전 요구사항

- AWS CLI가 설치되어 있어야 합니다.
- Terraform이 설치되어 있어야 합니다.
- AWS 계정이 설정되어 있어야 합니다.

## AWS CLI 설정

AWS CLI가 올바르게 설정되어 있는지 확인합니다:

```bash
aws configure
```

필요한 정보를 입력합니다:
- AWS Access Key ID
- AWS Secret Access Key
- Default region name (예: ap-northeast-2)
- Default output format (예: json)

## 배포 과정

### 1. Terraform 초기화

```bash
cd terraform
terraform init
```

### 2. Terraform 계획 확인

```bash
terraform plan
```

### 3. Terraform 적용

```bash
terraform apply
```

확인 메시지가 표시되면 `yes`를 입력합니다.

### 4. 배포 스크립트 실행

```bash
./deploy.sh
```

이 스크립트는 다음 작업을 수행합니다:
1. 프로젝트 빌드
2. Terraform 출력 가져오기
3. 빌드된 파일을 S3에 업로드
4. CloudFront 캐시 무효화

## 도메인 설정 (선택 사항)

도메인을 등록한 후 다음 단계를 따릅니다:

1. AWS Certificate Manager(ACM)에서 인증서 발급 (us-east-1 리전에서 발급해야 함)
2. Route53에 호스팅 영역 생성
3. `terraform.tfvars` 파일 수정:
   ```
   domain_name = "example.com"
   hosted_zone_id = "Z1234567890ABC"
   acm_certificate_arn = "arn:aws:acm:us-east-1:123456789012:certificate/abcdef-1234-5678-abcd-12345678"
   ```
4. Terraform 다시 적용:
   ```bash
   terraform apply
   ```

## 리소스 삭제

더 이상 필요하지 않은 경우 다음 명령으로 모든 리소스를 삭제할 수 있습니다:

```bash
terraform destroy
```

확인 메시지가 표시되면 `yes`를 입력합니다.

## 주의사항

- S3 버킷 이름은 전역적으로 고유해야 합니다. 다른 사용자가 이미 사용 중인 이름이라면 `terraform.tfvars` 파일에서 `bucket_name` 값을 변경해야 합니다.
- CloudFront 배포는 생성 및 업데이트에 시간이 걸릴 수 있습니다 (최대 30분).
- ACM 인증서는 반드시 us-east-1 리전(버지니아 북부)에서 발급해야 합니다.
