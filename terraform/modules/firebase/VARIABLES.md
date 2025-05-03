# Firebase Terraform 모듈 변수 설명

이 문서는 Firebase Terraform 모듈에서 사용되는 변수들에 대한 설명입니다.

## 변수 목록

### project_id

```hcl
variable "project_id" {
  description = "Google Cloud 프로젝트 ID"
  type        = string
}
```

- **설명**: Google Cloud 프로젝트 ID
- **타입**: 문자열
- **필수 여부**: 필수
- **사용 예**: `"todofireapp-efbe5"`

### app_name

```hcl
variable "app_name" {
  description = "Firebase 앱 이름"
  type        = string
  default     = "React Native Todo App"
}
```

- **설명**: Firebase 앱 이름
- **타입**: 문자열
- **기본값**: `"React Native Todo App"`
- **필수 여부**: 선택 (기본값 제공)

### firestore_location

```hcl
variable "firestore_location" {
  description = "Firestore 데이터베이스 위치"
  type        = string
  default     = "us-central"
}
```

- **설명**: Firestore 데이터베이스 위치
- **타입**: 문자열
- **기본값**: `"us-central"`
- **필수 여부**: 선택 (기본값 제공)
- **가능한 값**:
  - `"us-central"`: 미국 중부
  - `"europe-west"`: 유럽 서부
  - `"asia-northeast1"`: 아시아 북동부
  - 기타 [Google Cloud 리전](https://cloud.google.com/firestore/docs/locations)

### region

```hcl
variable "region" {
  description = "Google Cloud 리전"
  type        = string
  default     = "us-central1"
}
```

- **설명**: Google Cloud 리전
- **타입**: 문자열
- **기본값**: `"us-central1"`
- **필수 여부**: 선택 (기본값 제공)
- **가능한 값**:
  - `"us-central1"`: 아이오와
  - `"us-east1"`: 사우스캐롤라이나
  - `"us-west1"`: 오레곤
  - 기타 [Google Cloud 리전](https://cloud.google.com/compute/docs/regions-zones)

## 사용 예시

모듈 호출 시 다음과 같이 변수를 지정할 수 있습니다:

```hcl
module "firebase" {
  source = "../../modules/firebase"
  
  project_id         = "my-firebase-project"
  app_name           = "My Firebase App"
  firestore_location = "asia-northeast1"
  region             = "asia-northeast1"
}
```

## 참고 사항

- `project_id`는 반드시 지정해야 하는 필수 변수입니다.
- 다른 변수들은 기본값이 제공되므로 필요한 경우에만 재정의하면 됩니다.
- 리전 선택 시 데이터 레지던시 요구사항과 지연 시간을 고려하세요.
