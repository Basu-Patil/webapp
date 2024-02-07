# Web App API

This repository contains a Web App API with two endpoints: `healthz` and `user`.

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

