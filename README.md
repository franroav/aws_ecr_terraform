# AWS EKS CLUSTER 🌟

## LOCAL ENVIROMENT
1. [Project local resources yaml](#project_local_yaml) 🛳️

### Important Information

0. [Clone repository and checkout branch Git Hub Commands](#clone_repository) 📦
1. [Project Structure](#project_structure) 📄
2. [Install necesary tools](#install_tools) 🛠️
3. [aws configure sso](#prerequisites) 🔑
4. [Versión Control](#version_control) 🔒
5. [Gitflow Secret variables](#gitflow_secret) 🔢
6. [Terraform Enviroment variables](#terraform_env) 🔢
7. [Gitflow Workflow](#gitflow_workflow) 📄
8. [Create an AWS EKS cluster](#create_cluster) 🚀
9. [Terraform create repositories and build and push docker images to ECR](#ecr) 🐳
10. [k8s Project Resources yaml](#project_yaml) 🛳️
11. [Terraform Project Resources](#project_resources) 📜
12. [Terraform Project Description](#project_description) 📜
13. [Homework](#homework) 📄


## REPOSITORY
<a name="clone_repository"/>

```

- https://github.com/Arktyle/DevExHiringTest2
- branch prod: master
- branch develop: franroav/develop

```

### Clone repository and checkout branch Git Hub Commands ⚙️

- **bash terminal**: open bash.
- **git clone**: https://github.com/Arktyle/DevExHiringTest2 - clone resources.
- **cd  DevExHiringTest2**: enter directory.
- **git pull origin master**: pull code from franroav/develop branch. 
- **git checkout franroav/develop**: pull code from franroav/develop branch. 
- **git pull origin franroav/develop**: pull code from franroav/develop branch. (check if there is changes)


## Project Structure
<a name="project_structure"/>

The structure of this project defined by folders with specific purpose

```
Root Folder

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
0-versions.tf  2-variables.tf  4-data.tf       containers       docker-compose.yml  nginx-template  repo-policy.json  service.yaml       terraform.tfstate.backup
1-locals.tf    3-outputs.tf    6-resources.tf  deployment.yaml  monitoring          README.md       scripts           terraform.tfstate  terraform.tfvars

./containers
api  fluentd  frontend  webserver

./monitoring
elasticsearch  fluentd  prometheus

./nginx-template
config  deployments  ingress  manifest  namespace.yaml  services

./scripts/env/production
push.sh  version.sh


```

### Install tools requirements ✅
<a name="install_tools"/>

```
Install on your local machine or light weight linux alpine container where you can install this tools... for windows you might use (scoop or chocolatey as package manager to install this tools)

1. Install docker 
2. Install Kubectl
3. Install eksctl 
4. Install [Terraform](https://www.terraform.io/downloads.html).
5. Install Helm

```

### aws configure sso  ✅
<a name="prerequisites"/>

1- [Create user on IAM indentity Center](https://aws.amazon.com/iam/identity-center/)

1. Open a terminal as administrator 
2. Configure AWS credentials using AWS CLI (`aws configure sso`) and use your credential to obtain STS temporary credentials.
3. Set up settings using AWS CLI with region (`default`), format (`json`), profile (`system-admin`) or the name of the role on IAM Identity Center within the aws organization has been asign to you
3. Get AWS STS temporary Credentials using AWS CLI (`aws sts get-session-token`) and set up on terraform.tfvars file and on github, set on the secrets and variables the secrets like down below


### Github workflow Secrets 🔢
<a name="gitflow_secret"/>

set up on https://github.com/Arktyle/DevExHiringTest2/settings/secrets/actions

- **TF_VAR_AWS_ACCESS_KEY_ID=**"xxxxxxxxxxxxxxxxxxx"
- **TF_VAR_AWS_SECRET_ACCESS_KEY=**"xxxxxxxxxxxxxxxxxxxxx"
- **TF_VAR_AWS_SESSION_TOKEN=**"xxxxxxxxxxxxxxxxxxxxxxxxx="
- **TF_VAR_AWS_ACCOUNT_ID**=0000000000000
- **TF_VAR_AWS_REGION=**"xxxxxxxxxxx"
- **TF_VAR_AWS_PROFILE=**"xxxxxxxxxxxxxxxx"

## Terraform enviroment TF Variables 🔢
<a name="terraform_env"/>

- Update `terraform.tfvars` with your specific values.

## Variables AWS Configure SSO terraform.tfvars

- **TF_VAR_AWS_ACCESS_KEY_ID=**"xxxxxxxxxxxxxxxxxxx"
- **TF_VAR_AWS_SECRET_ACCESS_KEY=**"xxxxxxxxxxxxxxxxxxxxx"
- **TF_VAR_AWS_SESSION_TOKEN=**"xxxxxxxxxxxxxxxxxxxxxxxxx="
- **TF_VAR_AWS_ACCOUNT_ID**=0000000000000
- **TF_VAR_AWS_REGION=**"xxxxxxxxxx"
- **TF_VAR_AWS_PROFILE=**"xxxxxxxxxxxxxxxx"



# Create an AWS EKS cluster 🚀
<a name="create_cluster"/>

```
Create an AWS EKS cluster with CLI eksctl
in this oportunity commit i will use just one command to create my eks cluster instead of using terraform 

1. eksctl create cluster --name webkonce --region us-east-1 --nodegroup-name linux-nodes --node-type t2.micro --nodes 2 --version 1.28

```
## k8s Project Resources yaml EKS CLUSTER 🚀
<a name="project_yaml"/>

```
YAML resources `Prod enviroment`

1. deployment.yaml 

`deployment` This YAML file defines a Kubernetes Deployment named "webkonce" with one replica of a pod that runs a container from the image "274127640471.dkr.ecr.us-east-1.amazonaws.com/webkonce:1.1", always pulls the latest image, and exposes port 8080.

2. service.yaml 

`service` This YAML file defines a Kubernetes Service named "webkonce" of type LoadBalancer, which routes TCP traffic from port 80 to port 8080 on pods labeled with "app: webkonce".

```
## k8s Project Resources yaml EKS CLUSTER 🚀

`Optionally for monitoring purpose`

```

1. cd ./containers/fluentd
2. docker build --no-cache --progress=plain -t webkonce/fluentd .
3. kind load docker-image webkonce/fluentd --name dev
4. cd ..
5. cd ..
6. kubectl apply -f ./monitoring/fluentd/kubernetes/namespace.yaml
7. kubectl create -f ./monitoring/prometheus/kubernetes/1.28/manifest/setup/
8. kubectl create -f ./monitoring/prometheus/kubernetes/1.28/manifest/

```

Let's deploy our example app that writes logs to `stdout`

```
9. kubectl apply -f ./monitoring/fluentd/kubernetes/counter.yaml
```

## Fluentd Configmap

We have 5 files in our `fluentd-configmap.yaml` :
* fluent.conf: Our main config which includes all other configurations
* pods-kind-fluent.conf: `tail` config that sources all pod logs on the `kind` cluster.
  Note: `kind` cluster writes its log in a different format
* pods-fluent.conf: `tail` config that sources all pod logs on the `kubernetes` host in the cloud. <br/>
  Note: When running K8s in the cloud, logs may go into JSON format.
* file-fluent.conf: `match` config to capture all logs and write it to file for testing log collection </br>
  Note: This is great to test if collection of logs works
* elastic-fluent.conf: `match` config that captures all logs and sends it to `elasticseach`

Let's deploy our `configmap`:

```
10. kubectl apply -f ./monitoring/fluentd/kubernetes/fluentd-configmap.yaml
11. kubectl apply -f  ./monitoring/fluentd/kubernetes/fluentd-rbac.yaml

```

## Fluentd Daemonset

Let's deploy our `daemonset`:

```
12. kubectl apply -f ./monitoring/fluentd/kubernetes/fluentd-daemonset-eks.yaml

```
## Demo ElasticSearch and Kibana

```
13. kubectl apply -f ./monitoring/elasticsearch/kubernetes/namespace.yaml
14. kubectl apply -f ./monitoring/elasticsearch/kubernetes/elastic-demo.yaml
15. kubectl apply -f ./monitoring/elasticsearch/kubernetes/kibana-demo.yaml
```

## Demo Prometheus 

```
16. kubectl apply -f ./monitoring/prometheus/kubernetes/prometheus.yaml
17. kubectl apply -f ./monitoring/prometheus/kubernetes/prometheus-service.yaml
18. kubectl apply -f ./monitoring/prometheus/kubernetes/service-monitor.yaml
```

## k8s Project Resources yaml KIND CLUSTER LOCAL ENVIROMENT 🚀
<a name="project_local_yaml"/>

YAML resources `Local enviroment`

## NGNIX

```
1. kind create cluster --name dev
2. helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx 
3. helm repo update
4. cd ./containers/api
5. docker build --no-cache --progress=plain -t node-app .
6. kind load docker-image node-app --name dev 
7. cd ..
8. cd ..
```

## NODE BACKEND APP

```
9. kubectl apply -f .\nginx-template\deployments\backend\backend-deployment.yaml
10. kubectl apply -f .\nginx-template\deployments\backend\backend-service.yaml
11. kubectl apply -f .\nginx-template\deployments\backend\nginx-config-node.yaml
12. kubectl apply -f .\nginx-template\deployments\backend\nginx-deployment.yaml
13. kubectl apply -f .\nginx-template\deployments\backend\nginx-ingress-node.yaml
14. kubectl apply -f .\nginx-template\deployments\backend\nginx-service.yaml


kubectl -n default port-forward svc/backend-app-service 80:80    

```

## FLUENTD

```
15. cd ./containers/fluentd
16. docker build --no-cache --progress=plain -t webkonce/fluentd .
17. kind load docker-image webkonce/fluentd --name dev
18. cd..  
19. cd..  
20. kubectl apply -f ./monitoring/fluentd/kubernetes/namespace.yaml
21. kubectl create -f ./monitoring/prometheus/kubernetes/1.28/manifest/setup/
22. kubectl create -f ./monitoring/prometheus/kubernetes/1.28/manifest/
23. kubectl apply -f ./monitoring/fluentd/kubernetes/counter.yaml
24. kubectl apply -f ./monitoring/fluentd/kubernetes/fluentd-configmap.yaml
25. kubectl apply -f  ./monitoring/fluentd/kubernetes/fluentd-rbac.yaml
26. kubectl apply -f ./monitoring/fluentd/kubernetes/fluentd-daemonset.yaml
```

## ELASTICSEARCH AND KIBANA

```
27. kubectl apply -f ./monitoring/elasticsearch/kubernetes/namespace.yaml
28. kubectl apply -f ./monitoring/elasticsearch/kubernetes/elastic-demo.yaml
29. kubectl apply -f ./monitoring/elasticsearch/kubernetes/kibana-demo.yaml
```

## Kibana

```
kubectl -n elastic-kibana port-forward svc/kibana 5601

```

## Grafana

```
30. kubectl apply -f ./monitoring/prometheus/kubernetes/grafana-service.yaml
kubectl port-forward -n monitoring svc/grafana 3000:80

```

## PROMETHEUS

```
31. kubectl apply -f ./monitoring/prometheus/kubernetes/prometheus.yaml
32. kubectl apply -f ./monitoring/prometheus/kubernetes/prometheus-service.yaml
33. kubectl apply -f ./monitoring/prometheus/kubernetes/service-monitor.yaml

kubectl -n monitoring port-forward svc/prometheus-operated 9090

```


### Terraform create repositories and build and push docker images to ECR  🚀
<a name="ecr"/>

1. Create ECR repositories and images with terraform 

- **cd into root folder  DevExHiringTest2**: enter directory.

```
Install on your local machine or light weight linux alpine container where you can install this tools... for windows you might use (scoop or chocolatey as package manager to install this tools)

- **terraform init -upgrade**: Initialization resources.
- **terraform validate**: Validate resources.
- **terraform fmt**: Format code resources.
- **terraform plan**: Preview changes before applying.
- **terraform apply -auto-approve**: Deploy the infrastructure.
- **terraform destroy -auto-approve**: Destroy the deployed infrastructure. (Optional)

```

### Github commit changes to project repository 🛠️
<a name="gitflow_commit"/>

- **workflow**"./github/workflows/main.yml"
- **branch**"franroav/develop"

1. **git add .**
2. **git commit -m "<your commit>"**
3. **git push origin franroav/develop"**

- **cd into root folder  DevExHiringTest2**: enter directory.

```
make your changes.

```

### GitHub Actions Workflow Steps 🚀
<a name="gitflow_actions"/>

- **workflow**"./github/workflows/main.yml"
- **branch**"franroav/develop"

1. **git add .**
2. **git commit -m "<your commit>"**
3. **git push origin franroav/develop"**




1. **Trigger:** Runs on push to master.

2. **Environment:** Sets AWS account number from secrets.

**Job 1:** Build and Push Docker Images to ECR
Checkout Code: Uses actions/checkout@v3.

1. **Debug AWS Credentials:** Prints AWS credentials.

2. **Configure AWS:** Sets up AWS credentials.

3. **Assume Role:** Assumes an AWS IAM role.

4. **Login to ECR:** Logs into Amazon ECR.

5. **Tag Releases:** Tags the release with a script.

6. **Build & Push Docker Images:** Builds and pushes frontend and API Docker images to ECR.

**Job 2:** Deploy to AWS (EKS)
1. **Checkout Code:** Uses actions/checkout@v3.

2. **Configure AWS:** Sets up AWS credentials.

3. **Assume Role:** Assumes an AWS IAM role.

4. **Login to ECR:** Logs into Amazon ECR.

5. **Tag Releases:** Tags the release with a script.

6. **Install kubectl:** Installs kubectl.

7. **Configure kubectl for EKS:** Sets kubectl for EKS.

8. **Deploy to EKS:** Applies deployment.yaml and service.yaml to EKS.



## Terraform Project Resources
<a name="project_resources"/>

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
<a name="project_description"/>

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

## Project Description 
<a name="homework"/>

# Desafío de Contratación DevEx

Gracias por tu interés en nuestra posición de Experiencia del Desarrollador (DevEx). Como parte del proceso de entrevista, te pedimos que completes el siguiente desafío técnico.

## Objetivo del Desafío

Diseña y desarrolla la aplicación utilizando un lenguaje de programación y un framework con los que estés familiarizado (de preferencia node o java). La aplicación deberá exponer al menos un endpoint que responda a una solicitud HTTP GET con un mensaje de "¡Hola Mundo!". Posteriormente, despliega esta aplicación en un cluster de Kubernetes o ECS y establece un pipeline de CI/CD. 

Este servicio debe poder accederse desde internet.

## Requerimientos

1. Desarrollo de la Aplicación: Diseña y desarrolla la aplicación utilizando un framework que prefieras. La aplicación debe responder a una solicitud HTTP GET en un endpoint de tu elección con un mensaje de "¡Hola Mundo!".

2. Despliegue de la Aplicación: Despliega la aplicación en un cluster de Kubernetes o ECS. La aplicación deberá ser accesible desde internet.

3. Creación del Pipeline de CI/CD: Configura un pipeline de CI/CD que automatice el proceso de prueba y despliegue de la aplicación. El pipeline deberá incluir las siguientes etapas:
- Pruebas: Ejecuta un conjunto de pruebas básicas para la aplicación.
- Construcción: Construye la aplicación a una imagen docker, la cual debe subirse a un ECR privado.
- Despliegue: Despliega la aplicación en el cluster de Kubernetes o ECS.

4. Monitoreo y Logging: Configura un sistema básico de monitoreo y logging para la aplicación.

5. Documentación: Crea una documentación que explique cómo desplegar y operar la aplicación, cómo funciona el pipeline de CI/CD y cómo monitorear la aplicación.

## Entrega

1. Haz un fork del repositorio GitHub actual.
2. Clona el repositorio a tu máquina local.
3. Crea una nueva rama con tu nombre en tu versión local del repositorio, donde podrás almacenar todos los archivos relacionados con el proyecto.
4. Realiza los cambios necesarios y haz commit de tus cambios en tu rama local.
5. Haz push de la rama a tu repositorio GitHub forked.
6. Comparte tu repositorio por correo.
7. Reunión de revisión.
- ~~Desde tu repositorio GitHub, crea un Pull Request dirigido al repositorio original. Asegúrate de seleccionar la rama correcta en la que trabajaste y proporciona una descripción detallada de los cambios y del proyecto~~

### Plazo

Te pedimos que completes el desafío dentro de una semana después de haberlo recibido. Sin embargo, entendemos que puedes tener otras responsabilidades y compromisos. Si necesitas más tiempo, por favor, háznoslo saber.

### Evaluación

Evaluaremos tu desafío basándonos en los siguientes criterios:

- Funcionalidad de la aplicación y del flujo de trabajo de CI/CD
- Cobertura y calidad de las pruebas
- Claridad y utilidad de la documentación
- Elección y uso de herramientas y tecnologías
- Calidad del código

Gracias nuevamente por tu interés en nuestra posición de DevEx. ¡Esperamos ver tu solución al desafío!


<!-- 
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
- **Description**: Terraform variables file for configuring resources. -->

