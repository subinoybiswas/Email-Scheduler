# Email Scheduler API Documentation

This API allows you to schedule and manage emails.

## Base URL
`https://email-scheduler-pzxr.onrender.com/`

## Endpoints

### 1. Schedule Email

- **Endpoint**: `POST /schedule-email`
- **Description**: Schedule an email to be sent at a specified time.
- **Request Payload**:
  ```json
  {
    "recipient": "heysubinoy@gmail.com",
    "subject": "Test Email",
    "body": "This is a test email message.",
    "schedule": "2024-07-09T22:51:00Z"
  }
