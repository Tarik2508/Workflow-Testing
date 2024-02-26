resource "aws_ecr_repository" "main" {
  name = var.app.name

  tags = var.tags
}
