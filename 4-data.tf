# account identity
data "aws_caller_identity" "current" {}

# ecr auth token 
data "aws_ecr_authorization_token" "token" {}

# Calculate hash of the Docker image source contents
# data "external" "hash" {
#   program = [coalesce(var.hash_script, "${path.module}/hash.sh"), var.source_path]
# }