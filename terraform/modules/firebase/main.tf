/*
 Copyright (C) 2025 Michael Lim - React Native Todo App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/

# Firebase 프로젝트 리소스
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.project_id
}

# Firebase 웹 앱 리소스
resource "google_firebase_web_app" "default" {
  provider     = google-beta
  project      = var.project_id
  display_name = var.app_name
  depends_on   = [google_firebase_project.default]
}

# Firestore 데이터베이스 리소스
resource "google_firestore_database" "default" {
  provider                    = google-beta
  project                     = var.project_id
  name                        = "(default)"
  location_id                 = var.firestore_location
  type                        = "FIRESTORE_NATIVE"
  concurrency_mode            = "OPTIMISTIC"
  app_engine_integration_mode = "DISABLED"
  depends_on                  = [google_firebase_project.default]
}
