

# Backend Server

## Overview

This backend server is built using Express and TypeScript. It provides a RESTful API for managing form submissions, including creating new submissions, retrieving submissions by index, and a health check endpoint.

## Prerequisites

- Node.js (v14.x or higher recommended)
- npm (v6.x or higher recommended)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Compile TypeScript to JavaScript
```bash
npm run build
```

### 4. Run the Server
```bash
npm start
```

### 5. Verify the Server is Running
Open your browser and navigate to `http://localhost:3000/ping`. You should see a response indicating the server is running.

## Project Structure

```
.
├── src
│   ├── index.ts          # Entry point for the server
│   ├── routes.ts         # API routes
│   ├── types.ts          # TypeScript type definitions
│   └── db.json           # JSON file to store form submissions
├── dist                  # Compiled JavaScript files
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This README file
```

## Endpoints

### 1. Health Check
- **Endpoint**: `/ping`
- **Method**: GET
- **Description**: Returns a simple response to indicate that the server is running.
- **Response**: `{ "status": "True" }`

### 2. Create a New Submission
- **Endpoint**: `/submit`
- **Method**: POST
- **Parameters**:
  - `name` (string): Name of the submitter
  - `email` (string): Email address of the submitter
  - `phone` (string): Phone number of the submitter
  - `githubLink` (string): GitHub profile link of the submitter
  - `stopwatchTime` (string): Recorded stopwatch time
- **Description**: Accepts form submission data and stores it in `db.json`.
- **Response**: `{ "message": "Submission received and saved." }`

### 3. Retrieve a Submission by Index
- **Endpoint**: `/read`
- **Method**: GET
- **Query Parameter**:
  - `index` (number): The index of the submission to retrieve (0-based).
- **Description**: Retrieves the submission at the specified index from `db.json`.
- **Response**: The submission data at the specified index or an error message if the index is invalid.

## TypeScript Types

### SubmissionData
```typescript
interface SubmissionData {
    name: string;
    email: string;
    phone: string;
    githubLink: string;
    stopwatchTime: string;
    index: number;  // added index for better retrieval
}
```

## Example Requests

### Create a New Submission
```bash
curl -X POST http://localhost:3000/submit -H "Content-Type: application/json" -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "githubLink": "https://github.com/johndoe",
    "stopwatchTime": "00:01:30"
}'
```

### Retrieve a Submission by Index
```bash
curl -X GET http://localhost:3000/read?index=0
```

## Error Handling

- **500 Internal Server Error**: Returned if there is an issue reading or writing to `db.json`.
- **404 Not Found**: Returned if the requested submission index is out of range.
