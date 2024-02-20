// pull in gcp plugin
packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.1.4"
    }
  }
}

variable "project_id" {
  type = string
  default = "casye6225-dev"
}

variable "zone" {
  type    = string
  default = "us-east1-b"
}

variable "source_image_family" {
  type        = string
  description = "The source image family"
  default     = "centos-stream-8"
}

variable "disk_name" {
  type        = string
  description = "The name of the disk"
  default     = "centos-disk"
}

variable "disk_size" {
  type        = number
  description = "The size of the disk"
  default     = 20
}

variable "disk_type" {
  type        = string
  description = "The type of the disk"
  default     = "pd-standard"
}

// environment variables

variable "port" {
  type        = number
  description = "The port of the application"
  default     = 8080
}

variable "mysql_host" {
  type        = string
  description = "The host of the mysql"
  default     = "127.0.0.1"
}

variable "mysql_user" {
  type        = string
  description = "The user of the mysql"
  default     = "root"
}

variable "mysql_password" {
  type        = string
  description = "The password of the mysql"
  default =""
}

variable "mysql_database" {
  type        = string
  description = "The database of the mysql"
  default     = "web_app_db"
}

variable "dialect" {
  type        = string
  description = "The dialect of the mysql"
  default     = "mysql"
}

variable "mysql_port" {
  type        = number
  description = "The port of the mysql"
  default     = 3306
}

// get the latest centos 8 base image
source "googlecompute" "centos-8" {
  image_name          = "webapp-custom-image-1"
  project_id          = var.project_id
  source_image_family = var.source_image_family
  zone                = var.zone
  ssh_username        = "patilbasavaraj293"
}

// create a new instance from the base image
build {
  sources = ["source.googlecompute.centos-8"]
  provisioner "shell" {
    script = "./scripts/initial-setup.sh"
    environment_vars = [
      "MYSQL_PASSWORD=${var.mysql_password}"
    ]
  }


  provisioner "file" {
    source      = "./system-service-files/webapp.service"
    destination = "/tmp/webapp.service"

  }

  #transfer the web app code to the instance
  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/"

  }

  provisioner "shell" {
    script = "./scripts/web-app-setup.sh"
  }

  provisioner "shell" {
    script = "./scripts/post-deploy-setup.sh"
    environment_vars = [
      "PORT=${var.port}",
      "MYSQL_HOST=${var.mysql_host}",
      "MYSQL_USER=${var.mysql_user}",
      "MYSQL_PASSWORD=${var.mysql_password}",
      "MYSQL_DATABASE=${var.mysql_database}",
      "DIALECT=${var.dialect}",
      "MYSQL_PORT=${var.mysql_port}"
    ]

  }

  # create user and group
  provisioner "shell" {
    script = "./scripts/user-group-setup.sh"
  }
  provisioner "file" {
    source      = "./system-service-files/webapp.service"
    destination = "/tmp/"
  }

  provisioner "shell" {
    script = "./scripts/systemd-setup.sh"
  }

}