# CloudFront 배포 도메인 이름
output "cloudfront_domain_name" {
  description = "CloudFront 배포 도메인 이름"
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}

# CloudFront 배포 ID
output "cloudfront_distribution_id" {
  description = "CloudFront 배포 ID"
  value       = aws_cloudfront_distribution.s3_distribution.id
}

# S3 버킷 이름
output "s3_bucket_name" {
  description = "S3 버킷 이름"
  value       = aws_s3_bucket.website_bucket.id
}

# S3 버킷 ARN
output "s3_bucket_arn" {
  description = "S3 버킷 ARN"
  value       = aws_s3_bucket.website_bucket.arn
}

# 웹사이트 URL
output "website_url" {
  description = "웹사이트 URL"
  value       = var.domain_name != "" ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.s3_distribution.domain_name}"
}
