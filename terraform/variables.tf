# AWS 리전 설정
variable "aws_region" {
  description = "AWS 리전"
  type        = string
  default     = "ap-northeast-2" # 서울 리전
}

# S3 버킷 이름 설정
variable "bucket_name" {
  description = "S3 버킷 이름 (글로벌하게 유니크해야 함)"
  type        = string
}

# 환경 설정 (dev, staging, prod 등)
variable "environment" {
  description = "배포 환경"
  type        = string
  default     = "prod"
}

# 도메인 이름 설정 (선택적)
variable "domain_name" {
  description = "웹사이트 도메인 이름 (없으면 빈 문자열)"
  type        = string
  default     = ""
}

# Route53 호스팅 영역 ID (선택적)
variable "hosted_zone_id" {
  description = "Route53 호스팅 영역 ID (없으면 빈 문자열)"
  type        = string
  default     = ""
}

# ACM 인증서 ARN (선택적)
variable "acm_certificate_arn" {
  description = "ACM 인증서 ARN (없으면 빈 문자열)"
  type        = string
  default     = ""
}
