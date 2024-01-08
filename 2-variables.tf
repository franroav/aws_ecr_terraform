variable "force_image_rebuild" {
  type    = bool
  default = false
}


variable "TF_VAR_AWS_SESSION_TOKEN" {
description = "aws sts get-session-token"
  type = string
  default = "ASIA5NAGIDAVNTFXTU3G"
#   sensitive = true
}

variable "TF_VAR_AWS_SECRET_ACCESS_KEY" {
description = "aws secret access key"
  type = string
  default = "38pxE9GKo0i5+wq4mEriQdSG16wML409pJdCGpkj"
#   sensitive = true
}

variable "TF_VAR_AWS_ACCESS_KEY_ID" {
description = "aws sts aws access key id"
  type = string
  default = "IQoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJHMEUCIQD0w71OrtFDXn0bKnJhOHbWvmX6kohcsm7ZUAsjWvcLAgIgZ3xeV1uZtGigjOX5Y+tWqUKcvH1mPWjre+wBcEnUyNcq9AEIqP//////////ARAAGgw5MjEyODM1OTgzNzgiDBbn3ErEQF0dd4PE7yrIAUC2Vj/6Is13XNckN0NvqLs5p53VdKoBvelcs3b1oEbyGuzLMYDJidU+uIrQvsuiGxf9W7XM2uCtDKoZc024t+6NzG+VQkzBz0uUngxllc+oSzqBxKFRF6hPLNZfKEgkBt1eB7rAMSlB7JUIpPLAKiWTjg8zk+w1Dv58Kf7U70m5vGBcwhnfH2CGLesBpBNe3fuu6BOpNh5yt65vjprMktl1LCq5PH4I9GLvCeVeNMdLh7W7imZnXbsThuo531Lr+vqfAeJduaHXMMPa5awGOpgBbPO3j5wpk1j8VOinzRK68T56CAJlYoC5/lAAud50aw4EqQx7BSlayN09UFUQZ8uURb6yott5If7XuqwWQpha29nBjP7BqGx99t8mxLZX6ekSVTBPWCE9wXd4Y8rSSLpSdBn3XvOEdWMPgTi42eiBa9cxn1DuoZQurcJB9A6twNtT/slzHF0sXSXSWBywDLjZpGFASp3OzbI="
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