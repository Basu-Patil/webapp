# Web App API

This repository contains a Web App API with two endpoints: `healthz` and `user`.

## Prerequisites

Before running this Web App API, ensure you have the following prerequisites:

1. **Node.js and npm**: Make sure you have Node.js and npm installed on your system. You can download and install them from the [official Node.js website](https://nodejs.org/).

2. **MySQL Database**: You need to have a MySQL database server set up. You can install MySQL locally or use a remote MySQL database service. Refer to the [official MySQL documentation](https://dev.mysql.com/doc/) for installation instructions.

## Endpoints

### 1. Healthz

- **Endpoint**: `/healthz`
- **Method**: `GET`
- **Description**: Check the health of the application.
- **Notice**: Throws Method Not Allowed error if used any other method except GET

### 2. User

- **Endpoint**: `/v1/user`
- **Method**: 
  - `POST`: Create user.
- **Authentication**: No authentication required.
- **Description**: This endpoint allows performing user creation operation.

- **Endpoint**: `/v1/user/self`
- **Method**: 
  - `GET`: Read user details.
  - `PUT`: Update user details.
- **Authentication**: Basic Authentication required.
- **Description**: This endpoint allows performing Read and update operations on user self details using basic authentication.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Start Application

To start the application, run:

```bash
npm start or
npm run dev_start //if you want to start using nodemon
```

### Testing
Under the test folder, you'll find test files that can be used for testing the Web App API. These tests cover various aspects of the API's functionality and can be run using testing frameworks like chai, supertest and Mocha.

### API Enabled
Enable Network Management API - SQL Connectivity test requires Network Management API.
Service Networking API - To Setup private services access in VPC.