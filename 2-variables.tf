variable "force_image_rebuild" {
  type    = bool
  default = false
}

variable "TF_VAR_AWS_PROFILE" {
description = "aws user account MFA profile"
  type = string
  # default = "${secrets.TF_VAR_AWS_PROFILE}"
  #   sensitive = true
}

variable "TF_VAR_AWS_REGION" {
description = "aws account region"
  type = string
  # default = "${secrets.TF_VAR_AWS_REGION}"
#   sensitive = true
}

variable "TF_VAR_AWS_ACCOUNT_ID" {
description = "aws account id"
  type = string
  # default = "${secrets.TF_VAR_AWS_ACCOUNT_ID}"
#   sensitive = true
}

variable "TF_VAR_AWS_SESSION_TOKEN" {
description = "aws sts get-session-token"
  type = string
  # default = "${secrets.TF_VAR_AWS_SESSION_TOKEN}"
#   sensitive = true
}

variable "TF_VAR_AWS_SECRET_ACCESS_KEY" {
description = "aws secret access key"
  type = string
  # default = "${secrets.TF_VAR_AWS_SECRET_ACCESS_KEY}"
#   sensitive = true
}

variable "TF_VAR_AWS_ACCESS_KEY_ID" {
description = "aws sts aws access key id"
  type = string
  # default = "${secrets.TF_VAR_AWS_ACCESS_KEY_ID}"
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