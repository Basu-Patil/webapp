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
  image_name                      = "${var.source_image_name}-{{uuid}}"
  project_id                      = var.project_id
  source_image_family             = var.source_image_family
  zone                            = var.zone
  disable_default_service_account = var.disable_default_service_account
  ssh_username                    = var.ssh_username
}

// create a new instance from the base image
build {
  sources = ["source.googlecompute.centos-8"]
  provisioner "shell" {
    script = "packer/scripts/initial-setup.sh"
    environment_vars = [
      "MYSQL_PASSWORD=${var.mysql_password}"
    ]
  }

  #transfer the web app code to the instance
  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/"

  }

  provisioner "shell" {
    script = "packer/scripts/web-app-setup.sh"
  }

  provisioner "file" {
    source      = "packer/system-service-files/webapp.service"
    destination = "/tmp/"

  }

  // provisioner "shell" {
  //   script = "packer/scripts/post-deploy-setup.sh"
  //   environment_vars = [
  //     "PORT=${var.port}",
  //     "MYSQL_HOST=${var.mysql_host}",
  //     "MYSQL_USER=${var.mysql_user}",
  //     "MYSQL_PASSWORD=${var.mysql_password}",
  //     "MYSQL_DATABASE=${var.mysql_database}",
  //     "DIALECT=${var.dialect}",
  //     "MYSQL_PORT=${var.mysql_port}"
  //   ]

  // }

  # create user and group
  provisioner "shell" {
    script = "packer/scripts/user-group-setup.sh"
  }

  provisioner "shell" {
    script = "packer/scripts/systemd-setup.sh"
  }

}

