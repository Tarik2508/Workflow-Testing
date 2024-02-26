tags = {
  "application-name": "bytefaenger"
}

app = {
  name = "bytefaenger"
  # Replace this with your own image
  image = "862721235140.dkr.ecr.eu-central-1.amazonaws.com/tarikproject:latest"
}

vpc = {
  id = "vpc-068e97ca7832c5559"
}

# Replace this with your own domain
domain = {
  hosted_zone_name = "tarikproject.de"
  name = "tarikproject.de"
}
