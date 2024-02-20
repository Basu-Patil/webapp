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