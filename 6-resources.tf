

# CREATE REPOSITORIES

resource "aws_ecr_repository" "ecr_repos" {
  
  for_each = local.ecr_repos

  name                 = each.value
  image_tag_mutability = "MUTABLE"

  # this is very usefull because aws offers the capability of scannig docker images
  # it will be scanning if there is a hight vulnerability or a critical error, it will look for the operation system and the application 
  image_scanning_configuration {
    scan_on_push = true
  }

  force_delete = true # Add this line to force delete non-empty repositories

  tags = {
    env  = "dev"
    name = "${each.value}"
  }
}


# local-exec for build and push of docker image
resource "null_resource" "build_push_dkr_img" {
  for_each = aws_ecr_repository.ecr_repos

  triggers = {
    detect_docker_source_changes = var.force_image_rebuild == true ? timestamp() : local.dkr_img_src_sha256
  }

  provisioner "local-exec" {
    command = <<-EOT
      bash "${path.module}/push.sh" \
        "${local.dkr_img_src_path}/${each.key}" \
        "${local.ecr_reg}/${each.value.name}" \
        "${local.image_tag}"
    EOT

    interpreter = ["bash", "-c"] # Use bash to execute the command
  }

  depends_on = [aws_ecr_repository.ecr_repos]
}






## Setup proper credentials to push to ECR

# resource "aws_ecr_replication_configuration" "ecr" {
#   replication_configuration {
#     rule {
#       dynamic "destination" {
#         for_each = toset(var.replication_regions)

#         content {
#           region      = destination.key
#           registry_id = data.aws_caller_identity.current.account_id
#         }
#       }

#       repository_filter {
#         filter_type = "PREFIX_MATCH"
#         filter      = "ps-"
#       }
#     }
#   }
# }
