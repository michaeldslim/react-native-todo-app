# Terraform 파일 구조 및 설명

이 문서는 React Native Todo 앱 프로젝트의 Terraform 파일 구조와 각 파일의 역할에 대해 설명합니다.

## 디렉토리 구조

```
terraform/
├── environments/          # 환경별 구성
│   ├── dev/               # 개발 환경
│   └── prod/              # 운영 환경
├── modules/               # 재사용 가능한 모듈
│   └── firebase/          # Firebase 리소스 관리 모듈
└── README.md              # 설명 문서
```

## 주요 파일 설명

### 모듈 파일 (`terraform/modules/firebase/`)

#### main.tf

Firebase 인프라를 정의하는 핵심 파일입니다.

```hcl
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
```

- **역할**: Firebase 프로젝트, 웹 앱, Firestore 데이터베이스 등의 리소스를 생성하고 관리합니다.
- **주요 리소스**:
  - `google_firebase_project`: Firebase 프로젝트 생성
  - `google_firebase_web_app`: Firebase 웹 앱 생성
  - `google_firestore_database`: Firestore 데이터베이스 설정

#### variables.tf

모듈에서 사용되는 변수들을 정의합니다.

```hcl
variable "project_id" {
  description = "Google Cloud 프로젝트 ID"
  type        = string
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
```

- **역할**: 모듈에서 사용되는 입력 변수를 정의합니다.
- **주요 변수**:
  - `project_id`: Google Cloud 프로젝트 ID (필수)
  - `app_name`: Firebase 앱 이름 (기본값 제공)
  - `firestore_location`: Firestore 데이터베이스 위치 (기본값 제공)
  - `region`: Google Cloud 리전 (기본값 제공)

#### outputs.tf

모듈 실행 후 외부로 노출되는 값들을 정의합니다.

```hcl
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
```

- **역할**: 모듈 실행 결과를 외부로 노출합니다.
- **주요 출력**:
  - `firebase_project`: 생성된 Firebase 프로젝트 정보
  - `firebase_web_app`: 생성된 Firebase 웹 앱 정보
  - `firestore_database`: 생성된 Firestore 데이터베이스 정보
  - `firebase_web_app_config`: Firebase 웹 앱 구성 (민감 정보)

### 환경별 파일 (`terraform/environments/dev/` 및 `terraform/environments/prod/`)

#### main.tf (개발 환경)

```hcl
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.0"
    }
  }
  
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

module "firebase" {
  source = "../../modules/firebase"
  
  project_id         = var.project_id
  app_name           = var.app_name
  firestore_location = var.firestore_location
  region             = var.region
}
```

- **역할**: 개발 환경의 Terraform 구성을 정의합니다.
- **주요 구성**:
  - `terraform` 블록: 필요한 공급자와 버전, 로컬 백엔드 설정
  - `provider` 블록: Google Cloud 및 Google Beta API 사용 설정
  - `module` 블록: Firebase 모듈 호출 및 필요한 변수 전달

#### main.tf (운영 환경)

```hcl
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.0"
    }
  }
  
  backend "gcs" {
    bucket = "todofireapp-terraform-state"
    prefix = "prod"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

module "firebase" {
  source = "../../modules/firebase"
  
  project_id         = var.project_id
  app_name           = var.app_name
  firestore_location = var.firestore_location
  region             = var.region
}
```

- **역할**: 운영 환경의 Terraform 구성을 정의합니다.
- **주요 구성**:
  - `terraform` 블록: 필요한 공급자와 버전, Google Cloud Storage 백엔드 설정
  - `provider` 블록: Google Cloud 및 Google Beta API 사용 설정
  - `module` 블록: Firebase 모듈 호출 및 필요한 변수 전달

#### variables.tf (개발 환경)

```hcl
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
```

- **역할**: 개발 환경에서 사용할 변수 값을 정의합니다.
- **주요 변수**:
  - `project_id`: 기존 Firebase 프로젝트 ID
  - 그 외 변수들은 모듈과 동일한 기본값 사용

#### variables.tf (운영 환경)

```hcl
variable "project_id" {
  description = "Google Cloud 프로젝트 ID"
  type        = string
  default     = "todofireapp-prod"  # 운영 환경용 프로젝트 ID
}

variable "app_name" {
  description = "Firebase 앱 이름"
  type        = string
  default     = "React Native Todo App (Production)"
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
```

- **역할**: 운영 환경에서 사용할 변수 값을 정의합니다.
- **주요 변수**:
  - `project_id`: 운영 환경용 Firebase 프로젝트 ID
  - `app_name`: 운영 환경용 앱 이름 (Production 표시)
  - 그 외 변수들은 모듈과 동일한 기본값 사용

## Terraform 파일의 주요 구성 요소

### 1. 리소스 (Resource)

인프라 구성 요소를 정의합니다.

```hcl
resource "TYPE" "NAME" {
  [CONFIG ...]
}
```

- **TYPE**: 리소스 유형 (예: `google_firebase_project`)
- **NAME**: 리소스 이름 (Terraform 내에서 참조할 때 사용)
- **CONFIG**: 리소스 구성 (속성 및 값)

### 2. 변수 (Variable)

재사용 가능한 값을 정의합니다.

```hcl
variable "NAME" {
  [CONFIG ...]
}
```

- **NAME**: 변수 이름
- **CONFIG**: 변수 구성 (타입, 설명, 기본값 등)

### 3. 출력 (Output)

모듈 실행 결과를 외부로 노출합니다.

```hcl
output "NAME" {
  value = EXPRESSION
  [CONFIG ...]
}
```

- **NAME**: 출력 이름
- **EXPRESSION**: 출력할 값
- **CONFIG**: 출력 구성 (설명, 민감 정보 여부 등)

### 4. 모듈 (Module)

재사용 가능한 Terraform 코드 모음입니다.

```hcl
module "NAME" {
  source = "PATH"
  [CONFIG ...]
}
```

- **NAME**: 모듈 이름
- **PATH**: 모듈 소스 경로
- **CONFIG**: 모듈 구성 (입력 변수 등)

### 5. 공급자 (Provider)

인프라 제공업체와의 상호작용 방법을 정의합니다.

```hcl
provider "NAME" {
  [CONFIG ...]
}
```

- **NAME**: 공급자 이름 (예: `google`, `google-beta`)
- **CONFIG**: 공급자 구성 (프로젝트, 리전 등)

### 6. 백엔드 (Backend)

Terraform 상태 파일 저장 위치를 정의합니다.

```hcl
terraform {
  backend "TYPE" {
    [CONFIG ...]
  }
}
```

- **TYPE**: 백엔드 유형 (예: `local`, `gcs`)
- **CONFIG**: 백엔드 구성 (경로, 버킷 등)

## Terraform 사용 방법

### 개발 환경

```bash
# 개발 환경 디렉토리로 이동
cd terraform/environments/dev

# Terraform 초기화
terraform init

# 실행 계획 확인
terraform plan

# 인프라 적용
terraform apply
```

### 운영 환경

```bash
# 운영 환경 디렉토리로 이동
cd terraform/environments/prod

# Terraform 초기화
terraform init

# 실행 계획 확인
terraform plan

# 인프라 적용
terraform apply
```

## Firebase 구성 내보내기

Terraform으로 관리되는 Firebase 구성을 애플리케이션에서 사용하려면:

```bash
cd terraform/environments/dev  # 또는 prod
terraform output -json firebase_web_app_config > ../../firebase_config.json
```
