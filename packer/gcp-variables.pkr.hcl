variable "project_id" {
  type    = string
  default = "csye6225-413706"
}

variable "zone" {
  type    = string
  default = "us-east1-b"
}

variable account_file_json_key {
  type    = string
  default = ""

}

variable "ssh_username" {
  type    = string
  default = "patilbasavaraj293"

}

variable "disable_default_service_account" {
  type        = bool
  description = "Disable the default service account"
  default     = true
}

variable "source_image_name" {
  type        = string
  description = "The source image name"
  default     = "webap-image"

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
  default     = "root"
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

variable "machine_type" {
  type        = string
  description = "The machine type"
  default     = "custom-4-4096"
}
