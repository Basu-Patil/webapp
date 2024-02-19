// pull in gcp plugin
packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.1.4"
    }
  }
}

// get the latest centos 8 base image
source "googlecompute" "centos-8" {
  image_name = "webapp-custom-image"
  project_id = var.project_id
  source_image_family = var.source_image_family
  zone = var.zone
  ssh_username = "patilbasavaraj293"
}

// create a new instance from the base image
build {
  sources = ["source.googlecompute.centos-8"]
  provisioner "shell" {
    script = "./scripts/initial-setup.sh"
    environment_vars = [
        "MYSQL_PASSWORD=${var.MYSQL_PASSWORD}"
    ]
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
        "PORT=${var.PORT}",
        "MYSQL_HOST=${var.MYSQL_HOST}",
        "MYSQL_USER=${var.MYSQL_USER}",
        "MYSQL_PASSWORD=${var.MYSQL_PASSWORD}",
        "MYSQL_DATABASE=${var.MYSQL_DATABASE}",
        "DIALECT=${var.DIALECT}",
        "MYSQL_PORT=${var.MYSQL_PORT}"
    ]
      
  }

}