# React Native Todo App - Terraform Infrastructure Management

This directory contains Terraform configuration files for managing the Firebase infrastructure of the React Native Todo App.

## Structure

```
terraform/
├── environments/          # Environment-specific configurations
│   ├── dev/               # Development environment
│   └── prod/              # Production environment
├── modules/               # Reusable modules
│   └── firebase/          # Firebase resource management module
└── README.md              # This file
```

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) (v1.0.0 or higher)
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- Administrator access to Firebase project

## Authentication Setup

Before using Terraform, you need to authenticate with Google Cloud:

```bash
gcloud auth application-default login
```

## Usage

### Development Environment

```bash
# Navigate to the development environment directory
cd terraform/environments/dev

# Initialize Terraform
terraform init

# Check execution plan
terraform plan

# Apply infrastructure changes
terraform apply
```

### Production Environment

```bash
# Navigate to the production environment directory
cd terraform/environments/prod

# Initialize Terraform
terraform init

# Check execution plan
terraform plan

# Apply infrastructure changes
terraform apply
```

## Exporting Firebase Configuration

To use Firebase configuration managed by Terraform in your application:

```bash
cd terraform/environments/dev  # or prod
terraform output -json firebase_web_app_config > ../../firebase_config.json
```

## Notes

- In the production environment, state files are stored in Google Cloud Storage. An appropriate bucket is required for this.
- Always run `terraform plan` to review changes before actual production deployment.
- It's recommended to manage sensitive information through Secret Manager or environment variables.
