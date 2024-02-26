data "aws_route53_zone" "main" {
  name = var.domain.hosted_zone_name
}

module "acm" {
  source      = "terraform-aws-modules/acm/aws"
  domain_name = var.domain.name
  zone_id     = data.aws_route53_zone.main.zone_id

  validation_method = "DNS"

  wait_for_validation = true

  tags = var.tags
}
