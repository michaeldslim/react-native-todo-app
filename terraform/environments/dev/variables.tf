/*
 Copyright (C) 2025 Michael Lim - React Native Todo App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/

variable "project_id" {
  description = "Google Cloud 프로젝트 ID"
  type        = string
  default     = "todofireapp-efbe5"  # firebaseConfig.ts에서 가져온 projectId
}

variable "app_name" {
  description = "Firebase 앱 이름"
  type        = string
  default     = "React Native Todo App"
}

variable "firestore_location" {
  description = "Firestore 데이터베이스 위치"
  type        = string
  default     = "us-central"
}

variable "region" {
  description = "Google Cloud 리전"
  type        = string
  default     = "us-central1"
}
