variable "tags" {
  type = map(string)
}

variable "vpc" {
  type = object({
    id = string
  })
}

variable "app" {
  type = object({
    name  = string
    image = string
  })
}

variable "domain" {
  type = object({
    hosted_zone_name = string
    name             = string
  })
}
