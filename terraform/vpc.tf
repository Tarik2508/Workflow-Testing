locals {
  interface_endpoints = [
    {
      name         = "ecr_dkr"
      service_name = "com.amazonaws.${data.aws_region.current.name}.ecr.dkr"
    },
    {
      name         = "ecr_api"
      service_name = "com.amazonaws.${data.aws_region.current.name}.ecr.api"
    },
    {
      name         = "logs"
      service_name = "com.amazonaws.${data.aws_region.current.name}.logs"
    }
  ]
}

data "aws_region" "current" {}

data "aws_subnets" "main" {
  filter {
    name   = "vpc-id"
    values = [var.vpc.id]
  }
}

data "aws_vpc" "main" {
  id = var.vpc.id
}

resource "aws_vpc_endpoint" "interface" {
  for_each     = { for ep in local.interface_endpoints : ep.name => ep }
  service_name = each.value.service_name

  vpc_id              = var.vpc.id
  vpc_endpoint_type   = "Interface"
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  subnet_ids          = data.aws_subnets.main.ids
  private_dns_enabled = true
}

resource "aws_security_group" "vpc_endpoints" {
  name        = "${var.app.name}-vpc-endpoints"
  description = "Security group for VPC endpoints"
  vpc_id      = var.vpc.id

  ingress {
    description = "Allow all traffic from VPC endpoints"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [data.aws_vpc.main.cidr_block]
  }

  egress {
    description = "Allow all traffic to VPC endpoints"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_route_tables" "main" {
  vpc_id = var.vpc.id

  filter {
    name   = "association.main"
    values = ["true"]
  }
}

resource "aws_vpc_endpoint" "s3" {
  vpc_id       = var.vpc.id
  service_name = "com.amazonaws.${data.aws_region.current.name}.s3"
}

resource "aws_vpc_endpoint_route_table_association" "s3" {
  route_table_id  = data.aws_route_tables.main.ids[0]
  vpc_endpoint_id = aws_vpc_endpoint.s3.id
}
