variable "force_image_rebuild" {
  type    = bool
  default = false
}


variable "TF_VAR_AWS_SESSION_TOKEN" {
description = "aws sts get-session-token"
  type = string
  default = "x"
#   sensitive = true
}

variable "TF_VAR_AWS_SECRET_ACCESS_KEY" {
description = "aws secret access key"
  type = string
  default = "x"
#   sensitive = true
}

variable "TF_VAR_AWS_ACCESS_KEY_ID" {
description = "aws sts aws access key id"
  type = string
  default = "x"
#   sensitive = true
}


variable "tag" {
  description = "Tag to use for deployed Docker image"
  type        = string
  default     = "latest"
}

variable "hash_script" {
  description = "Path to script to generate hash of source contents"
  type        = string
  default     = ""
}

variable "push_script" {
  description = "Path to script to build and push Docker image"
  type        = string
  default     = ""
}

# variable "source_path" {
#   description = "Path to Docker image source"
#   type        = string
# }