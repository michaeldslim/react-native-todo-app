# React Native Todo App - Terraform 인프라 관리

이 디렉토리에는 React Native Todo App의 Firebase 인프라를 관리하기 위한 Terraform 구성 파일이 포함되어 있습니다.

## 구조

```
terraform/
├── environments/          # 환경별 구성
│   ├── dev/               # 개발 환경
│   └── prod/              # 운영 환경
├── modules/               # 재사용 가능한 모듈
│   └── firebase/          # Firebase 리소스 관리 모듈
└── README.md              # 이 파일
```

## 사전 요구 사항

- [Terraform](https://www.terraform.io/downloads.html) (v1.0.0 이상)
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- Firebase 프로젝트에 대한 관리자 권한

## 인증 설정

Terraform을 사용하기 전에 Google Cloud에 인증해야 합니다:

```bash
gcloud auth application-default login
```

## 사용 방법

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

## 주의 사항

- 운영 환경에서는 상태 파일이 Google Cloud Storage에 저장됩니다. 이를 위해 적절한 버킷이 필요합니다.
- 실제 프로덕션 배포 전에 항상 `terraform plan`을 실행하여 변경 사항을 검토하세요.
- 민감한 정보는 Secret Manager나 환경 변수를 통해 관리하는 것이 좋습니다.
