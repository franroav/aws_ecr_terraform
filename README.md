
# AWS ECR 🌟

## RUN LOCAL ENVIROMENT

### Docker Daemon ⚙️

- **DOCKER**: open docker.
- **START DOCKER COMPOSE**: run inside the directory folder, the following command: - docker compose up -d 
- **DOWN DOCKER COMPOSE**: run inside the directory folder, the following command: - docker compose down -d


## VERSION CONTROL

### Git Hub Commands ⚙️

- **bash terminal**: open bash.
- **git clone**: https://github.com/franroav/aws_ecr_terraform - clone resources.
- **cd  aws_ecr_terraform**: enter directory.
- **git pull origin master**: pull code from master branch.

### Github workflow Secrets

- **TF_VAR_AWS_ACCESS_KEY_ID=**"xxxxxxxxxxxxxxxxxxx"
- **TF_VAR_AWS_SECRET_ACCESS_KEY=**"xxxxxxxxxxxxxxxxxxxxx"
- **TF_VAR_AWS_SESSION_TOKEN=**"xxxxxxxxxxxxxxxxxxxxxxxxx="
- **TF_VAR_AWS_ACCOUNT_ID**=0000000000000
- **TF_VAR_AWS_REGION=**"xxxxxxxxxxx"
- **TF_VAR_AWS_PROFILE=**"xxxxxxxxxxxxxxxx"

### Github Workflow Deployment to AWS 🚀

- **workflow**"./github/workflows/main.yml"
- **branch**"master"


# Terraform Infrastructure Deployment to AWS 🚀

## Overview ℹ️

This Terraform project provisions a robust network infrastructure on AWS, comprising various resources for secure and scalable application deployment.

## Getting Started 🛠️

Follow these steps to initialize and deploy the infrastructure:

### Prerequisites ✅

1. Install [Terraform](https://www.terraform.io/downloads.html).
2. Configure AWS credentials using AWS CLI (`aws configure sso`) or environment variables.
3. Set up settings using AWS CLI with region (`default`), format (`json`), profile (`system-admin`)
3. Get AWS Credentials using AWS CLI (`aws sts get-session-token`) and set up on terraform.tfvars && github actions secrets 

### Directory Structure 📁

- .
- ├── 0-versions.tf
- ├── 1-locals.tf
- ├── 2-variables.tf
- ├── 3-outputs.tf
- ├── 4-data.tf
- ├── 6-resources.tf
- ├── containers/
- ├── docker-compose.yml
- ├── repo-policy.json
- ├── scripts/
- ├── terraform.tfstate
- ├── terraform.tfstate.backup
- └── terraform.tfvars

### Terraform Commands ⚙️

- **terraform init**: Initialization resources.
- **terraform validate**: Validate resources.
- **terraform fmt**: Format code resources.
- **terraform plan**: Preview changes before applying.
- **terraform apply -auto-approve**: Deploy the infrastructure.
- **terraform destroy**: Destroy the deployed infrastructure.

## Variables 🔢

- Update `terraform.tfvars` with your specific values.

## Variables AWS Configure SSO terraform.tfvars

- **TF_VAR_AWS_ACCESS_KEY_ID=**"xxxxxxxxxxxxxxxxxxx"
- **TF_VAR_AWS_SECRET_ACCESS_KEY=**"xxxxxxxxxxxxxxxxxxxxx"
- **TF_VAR_AWS_SESSION_TOKEN=**"xxxxxxxxxxxxxxxxxxxxxxxxx="
- **TF_VAR_AWS_ACCOUNT_ID**=0000000000000
- **TF_VAR_AWS_REGION=**"xxxxxxxxxx"
- **TF_VAR_AWS_PROFILE=**"xxxxxxxxxxxxxxxx"



## Resources

### 1. AWS ECR Repositories 🛳️

- **Description**: Creates Elastic Container Registry repositories for storing Docker images.

### 2. Docker Image Build and Push 🐳

- **Description**: Builds and pushes Docker images to AWS ECR repositories.

### 3. GitHub Actions OIDC Configuration 🔒

- **Description**: Configures GitHub Actions OpenID Connect provider for IAM role assumption.

### 4. IAM Role for GitHub Actions 🤖

- **Description**: IAM role assumed by GitHub Actions for ECR image push.

### 5. IAM Role Policy Attachment 📎

- **Description**: Attaches ECR PowerUser policy to the IAM role.



## Project Description 

### 1. AWS ECR Repositories 🐳

- **Repositories**: "api-repo", "frontend-repo"
- **Description**: Amazon ECR repositories for storing Docker images.

### 2. AWS IAM OpenID Connect Provider 🚪

- **Provider ARN**: (known after apply)
- **Description**: OpenID Connect Provider for authenticating GitHub Actions.

### 3. GitHub Actions OIDC Provider ARN 🔑

- **Provider ARN**: (known after apply)
- **Description**: ARN of the OIDC provider for GitHub Actions authentication.

### 4. Docker Image Build and Push 🛠️

- **Description**: GitHub Actions workflow for building and pushing Docker images to Amazon ECR.

### 5. AWS IAM Policy Document for Federated Assume Policy 📜

- **Description**: IAM policy document for federated assume policy.

### 6. AWS ECR Authorization Token 🔑

- **Description**: Authorization token for accessing Amazon ECR.

### 7. Docker Build Context 📦

- **Directory**: "./containers"
- **Description**: Docker build context directory containing Dockerfiles for building images.

### 8. Docker Compose Configuration 🐳

- **File**: "docker-compose.yml"
- **Description**: Docker Compose configuration for orchestrating containers.

### 9. Repository Policy JSON 📄

- **File**: "repo-policy.json"
- **Description**: JSON file containing repository policies.

### 10. Scripts Directory 📜

- **Directory**: "./scripts"
- **Description**: Directory containing scripts for automation.

### 11. Terraform State Files 📄

- **Files**: "terraform.tfstate", "terraform.tfstate.backup"
- **Description**: Terraform state files for tracking infrastructure state.

### 12. Terraform Variables File 📝

- **File**: "terraform.tfvars"
- **Description**: Terraform variables file for configuring resources.

### 13. AWS IAM Policy Document for Federated Assume Policy 📜

- **Description**: IAM policy document for federated assume policy.

### 14. AWS ECR Authorization Token 🔑

- **Description**: Authorization token for accessing Amazon ECR.

### 15. Docker Build Context 📦

- **Directory**: "./containers"
- **Description**: Docker build context directory containing Dockerfiles for building images.

### 16. Docker Compose Configuration 🐳

- **File**: "docker-compose.yml"
- **Description**: Docker Compose configuration for orchestrating containers.

### 17. Repository Policy JSON 📄

- **File**: "repo-policy.json"
- **Description**: JSON file containing repository policies.

### 18. Scripts Directory 📜

- **Directory**: "./scripts"
- **Description**: Directory containing scripts for automation.

### 19. Terraform State Files 📄

- **Files**: "terraform.tfstate", "terraform.tfstate.backup"
- **Description**: Terraform state files for tracking infrastructure state.

### 20. Terraform Variables File 📝

- **File**: "terraform.tfvars"
- **Description**: Terraform variables file for configuring resources.

