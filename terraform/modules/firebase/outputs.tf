/*
 Copyright (C) 2025 Michael Lim - React Native Todo App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/

output "firebase_project" {
  description = "Firebase 프로젝트 리소스"
  value       = google_firebase_project.default
}

output "firebase_web_app" {
  description = "Firebase 웹 앱 리소스"
  value       = google_firebase_web_app.default
}

output "firestore_database" {
  description = "Firestore 데이터베이스 리소스"
  value       = google_firestore_database.default
}

output "firebase_web_app_config" {
  description = "Firebase 웹 앱 구성"
  value       = google_firebase_web_app.default.config
  sensitive   = true
}
