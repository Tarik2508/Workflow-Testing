module "ecs_cluster" {
  source = "terraform-aws-modules/ecs/aws//modules/cluster"

  cluster_name = var.app.name

  fargate_capacity_providers = {
    FARGATE_SPOT = {
      default_capacity_provider_strategy = {
        weight = 100
      }
    }
  }

  tags = var.tags
}

module "ecs_service" {
  source = "terraform-aws-modules/ecs/aws//modules/service"

  name        = var.app.name
  cluster_arn = module.ecs_cluster.arn

  cpu    = 1024
  memory = 2048

  container_definitions = {
    ecs-sample = {
      name      = var.app.name
      cpu       = 1024
      memory    = 2048
      essential = true
      image     = var.app.image
      port_mappings = [
        {
          containerPort = 80
        }
      ]
      enable_cloudwatch_logging = true
      readonly_root_filesystem  = false
    }
  }

  load_balancer = {
    service = {
      target_group_arn = module.alb.target_groups.ecs.arn
      container_name   = var.app.name
      container_port   = 80
    }
  }

  subnet_ids = data.aws_subnets.main.ids
  security_group_rules = {
    ingress_all = {
      type                     = "ingress"
      from_port                = 80
      to_port                  = 80
      protocol                 = "tcp"
      source_security_group_id = module.alb.security_group_id
    }
    egress_all = {
      type        = "egress"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  runtime_platform = {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  tags = var.tags
}
