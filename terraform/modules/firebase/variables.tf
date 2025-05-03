/*
 Copyright (C) 2025 Michael Lim - React Native Todo App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

variable "app_name" {
  description = "Firebase App Name"
  type        = string
  default     = "React Native Todo App"
}

variable "firestore_location" {
  description = "Firestore Database Location"
  type        = string
  default     = "us-central"
}

variable "region" {
  description = "Google Cloud Region"
  type        = string
  default     = "us-central1"
}
