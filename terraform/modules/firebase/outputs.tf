/*
 Copyright (C) 2025 Michael Lim - React Native Todo App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/

output "firebase_project" {
  description = "Firebase project resource"
  value       = google_firebase_project.default
}

output "firebase_web_app" {
  description = "Firebase web app resource"
  value       = google_firebase_web_app.default
}

output "firestore_database" {
  description = "Firestore database resource"
  value       = google_firestore_database.default
}

output "firebase_web_app_config" {
  description = "Firebase web app configuration"
  value       = google_firebase_web_app.default.config
  sensitive   = true
}
