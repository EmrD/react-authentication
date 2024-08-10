# React Authentication App

This project is a simple user registration and login system. Users can register with a username and then log in by scanning the provided QR code.

## Features

- Register with a username
- Receive a QR code
- Log in with a username and QR code
- Display success and error messages

## Installation

1. Ensure that `node` and `npm` (or `yarn`) are installed.
2. Navigate to the project directory and run the following command to install the necessary packages:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

## Usage

1. To start the development server, run the following command:

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn start
    ```

2. Open your browser and go to `http://localhost:3000`.

## API Endpoints

- **Register**: 
  - **URL**: `https://react-authentication-backend.vercel.app/api/register`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "username": "your_username"
    }
    ```
  - **Response**:
    ```json
    {
      "qrCodeUrl": "URL of the QR code"
    }
    ```

- **Login**:
  - **URL**: `https://react-authentication-backend.vercel.app/api/login`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "username": "your_username",
      "authKey": "QR code"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Success or error message"
    }
    ```

## Components

- `App` component:
  - Handles user registration and login with a username and QR code.
  - Uses the `fetch` API for registration and login operations.
  - Includes user input fields, a register button, QR code display, and login fields in the user interface.
