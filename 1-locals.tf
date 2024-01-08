

locals {
  # ... (existing locals remain unchanged)
  aws_account = 921283598378
  aws_region  = "us-east-1"    # AWS region
  aws_profile = "system-admin" # AWS profile
  alias       = "us-east-1"
  access_key  = var.TF_VAR_AWS_ACCESS_KEY_ID
  secret_key  = var.TF_VAR_AWS_SECRET_ACCESS_KEY
  token       = var.TF_VAR_AWS_SESSION_TOKEN

  ecr_reg   = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_region}.amazonaws.com"
  ecr_repo  = "demo"   # Default ECR repo name
  image_tag = "latest" # Default image tag version

  dkr_img_src_path   = "${path.module}/containers" # Docker image path
  dkr_img_src_sha256 = sha256(join("", [for f in fileset(".", "${local.dkr_img_src_path}/**") : filebase64(f)]))

  # Define a map for ECR repositories
  ecr_repos = {
    frontend = "frontend-repo",
    api      = "api-repo",
    # Add more services as needed
  }

  build_commands = {
    for repo_name, repo_path in local.ecr_repos : repo_name => repo_path
  }

  dkr_build_cmds = [for repo_name, repo_path in local.build_commands : <<-EOT
    cd ${local.dkr_img_src_path}/${repo_name}

    aws ecr get-login-password --region ${local.aws_region} | docker login --username AWS --password-stdin ${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_region}.amazonaws.com
    
    docker build -t ${repo_name}-repo:${local.image_tag} .

    docker tag ${repo_name}-repo:${local.image_tag} ${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_region}.amazonaws.com/${repo_name}-repo:${local.image_tag}

    docker push ${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_region}.amazonaws.com/${repo_name}-repo:${local.image_tag}

  EOT
  ]

#   dkr_build_cmds = {
#   for repo_name, repo_path in local.ecr_repos : repo_name => <<-EOT
#     cd ${local.dkr_img_src_path}/${repo_name}

#     aws ecr get-login-password --region ${local.aws_region} | docker login --username AWS --password-stdin ${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_region}.amazonaws.com

#     docker build -t ${repo_name}:${local.image_tag} .

#     docker tag ${repo_name}:${local.image_tag} ${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_region}.amazonaws.com/${repo_name}:${local.image_tag}

#     docker push ${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_region}.amazonaws.com/${repo_name}:${local.image_tag}

#   EOT
# }

# dkr_build_cmds = {
#   for repo_name, repo_path in local.ecr_repos : repo_name => <<-EOT
#     cd ${local.dkr_img_src_path}/${repo_name}
#     docker build -t ${local.ecr_reg}/${repo_name}:${local.image_tag} \
#       -f Dockerfile .

#     aws --profile ${local.aws_profile} ecr get-login-password --region ${local.aws_region} | \
#       docker login --username AWS --password-stdin ${local.ecr_reg}

#     docker push ${local.ecr_reg}/${repo_name}:${local.image_tag}
#   EOT
# }




# ...terraform commands    
# docker build -t ${ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com/${REPO} .

# aws ecr get-login-password \
#     --region ${REGION} \
# | docker login \
#     --username AWS \
#     --password-stdin ${ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com

# docker push ${ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com/${REPO}


## LOOP OF IMAGES

# dkr_build_cmds = {
#   for repo_name, repo_path in local.ecr_repos : repo_name => <<-EOT
#     cd ${local.dkr_img_src_path}/${repo_name}
#     docker build -t ${local.ecr_reg}/${repo_name}:${local.image_tag} \
#       -f Dockerfile .

#     aws --profile ${local.aws_profile} ecr get-login-password --region ${local.aws_region} | \
#       docker login --username AWS --password-stdin ${local.ecr_reg}

#     docker push ${local.ecr_reg}/${repo_name}:${local.image_tag}
#   EOT
# }

## SEPARATES IMAGES 
# dkr_build_cmds = {
#   frontend = <<-EOT
#     cd ${local.dkr_img_src_path}/frontend
#     docker build -t ${local.ecr_reg}/${local.ecr_repos.frontend}:${local.image_tag} \
#       -f Dockerfile .

#     aws --profile ${local.aws_profile} ecr get-login-password --region ${local.aws_region} | \
#       docker login --username AWS --password-stdin ${local.ecr_reg}

#     docker push ${local.ecr_reg}/${local.ecr_repos.frontend}:${local.image_tag}
#   EOT

#   api = <<-EOT
#     cd ${local.dkr_img_src_path}/api
#     docker build -t ${local.ecr_reg}/${local.ecr_repos.api}:${local.image_tag} \
#       -f Dockerfile .

#     aws --profile ${local.aws_profile} ecr get-login-password --region ${local.aws_region} | \
#       docker login --username AWS --password-stdin ${local.ecr_reg}

#     docker push ${local.ecr_reg}/${local.ecr_repos.api}:${local.image_tag}
#   EOT
# }
}
# SINGLE IMAGES 
# locals {

# //////////////////////////////////////////////////////////////////////////////////////////////
# /////////////  Substitute below values to match your AWS account, region & profile //////////////////////////////////////////////////////////////////////////////////////////////
# #   aws_account = "111111111111"   # AWS account
#   aws_region  = "us-east-1"      # AWS region
#   aws_profile = "system-admin"   #"demo_terraform" # AWS profile
#   alias = "us-east-1"
#   access_key = var.TF_VAR_AWS_ACCESS_KEY_ID
#   secret_key = var.TF_VAR_AWS_SECRET_ACCESS_KEY
#   token      = var.TF_VAR_AWS_SESSION_TOKEN
#  ///////////////////////////////////////////////////////////////////////////////////////////// 
#   ecr_reg   = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_region}.amazonaws.com"#"${local.aws_account}.dkr.ecr.${local.aws_region}.amazonaws.com" # ECR docker registry URI
#   ecr_repo  = "demo"                                                           # ECR repo name
#   image_tag = "latest"                                                         # image tag -> versión of the image 


#   dkr_img_src_path = "${path.module}/containers"                               # docker image path 
#   dkr_img_src_sha256 = sha256(join("", [for f in fileset(".", "${local.dkr_img_src_path}/**") : file(f)]))    

# # Docker Build Command:
#   dkr_build_cmd = <<-EOT
#         docker build -t ${local.ecr_reg}/${local.ecr_repo}:${local.image_tag} \
#             -f ${local.dkr_img_src_path}/Dockerfile .

#         aws --profile ${local.aws_profile} ecr get-login-password --region ${local.aws_region} | \
#             docker login --username AWS --password-stdin ${local.ecr_reg}

#         docker push ${local.ecr_reg}/${local.ecr_repo}:${local.image_tag}
#     EOT
# }
