# output "trigged_by" {
#   value = null_resource.build_push_dkr_img.triggers
# }


output "account_id" {
  value = data.aws_caller_identity.current.account_id
}

output "caller_arn" {
  value = data.aws_caller_identity.current.arn
}

output "caller_user" {
  value = data.aws_caller_identity.current.user_id
}

# Output triggered by null_resource.build_push_dkr_img
output "trigged_by" {
  value = { for key, resource_instance in null_resource.build_push_dkr_img : key => resource_instance.triggers }
}

output "docker_build_context" {
  value = local.dkr_img_src_path
}

output "ecr_repository_urls" {
  description = "ECR URL's"
  value = { for key, repo in aws_ecr_repository.ecr_repos : key => repo.repository_url }
}

output "docker_build_commands" {
  value = local.dkr_build_cmds
}

output "docker_build_script" {
  value = join("\n", [for repo_name, script in local.dkr_build_cmds : <<-SCRIPT
    # ${repo_name}
    ${script}

    echo "Finished building and pushing Docker image for ${repo_name}"
  SCRIPT
  ])
}
# to single repository 

# output "ecr_url" {
#   description = "The ECR URL"
#   value = try({ for key, repo in aws_ecr_repository.ecr_repos : key => repo.repository_url }, "")
# }