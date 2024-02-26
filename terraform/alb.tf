module "alb" {
  source = "terraform-aws-modules/alb/aws"

  name    = var.app.name
  vpc_id  = var.vpc.id
  subnets = data.aws_subnets.main.ids

  security_group_ingress_rules = {
    all_http = {
      from_port   = 80
      to_port     = 80
      ip_protocol = "tcp"
      description = "HTTP web traffic"
      cidr_ipv4   = "0.0.0.0/0"
    }
    all_https = {
      from_port   = 443
      to_port     = 443
      ip_protocol = "tcp"
      description = "HTTPS web traffic"
      cidr_ipv4   = "0.0.0.0/0"
    }
  }

  security_group_egress_rules = {
    ecs = {
      ip_protocol                  = "-1"
      description                  = "Allow all traffic to ECS"
      referenced_security_group_id = module.ecs_service.security_group_id
    }
  }

  listeners = {
    http-https-redirect = {
      port     = 80
      protocol = "HTTP"
      redirect = {
        port        = "443"
        protocol    = "HTTPS"
        status_code = "HTTP_301"
      }
    }
    https = {
      port            = 443
      protocol        = "HTTPS"
      certificate_arn = module.acm.acm_certificate_arn
      forward = {
        target_group_key = "ecs"
      }
    }
  }

  target_groups = {
    ecs = {
      name              = "ecs-${var.app.name}"
      protocol          = "HTTP"
      port              = 80
      target_type       = "ip"
      vpc_id            = var.vpc.id
      create_attachment = false
    }
  }

  enable_deletion_protection = false

  tags = var.tags
}
