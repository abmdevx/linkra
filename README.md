# URL Shortener API

A RESTful URL Shortener service built with Node.js, Express.js, MongoDB, and Mongoose. The application generates unique short URLs for long links and redirects users to the original destination using the generated short code.

## Features

* Shorten long URLs into unique, shareable links
* Redirect users using generated short URLs
* Store URL mappings in MongoDB
* RESTful API architecture
* Scalable folder structure
* Environment variable support
* Error handling and validation

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Utilities

* Nano ID (for unique short code generation)
* Dotenv

## Project Structure

```txt
src/
├── config/
│   └── db.js
│
├── controllers/
│   └── url.controller.js
│
├── models/
│   └── url.model.js
│
├── routes/
│   └── url.route.js
│
├── middleware/
│
├── utils/
│
└── app.js

server.js
.env
package.json
README.md
```

## API Endpoints

### Create Short URL

```http
POST /api/url/shorten
```

Request Body

```json
{
  "url": "https://www.google.com"
}
```

Response

```json
{
  "success": true,
  "shortUrl": "http://localhost:5000/abc123"
}
```

---

### Redirect to Original URL

```http
GET /:shortCode
```

Example

```http
GET /abc123
```

Response

```http
302 Redirect
```

The user is redirected to the original URL.

## Installation

### Clone Repository

```bash
git clone https://github.com/abdullahbutt09/url-shortener.git
```

### Navigate to Project

```bash
cd url-shortener
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

## Learning Objectives

This project demonstrates practical experience with:

* Express.js application architecture
* REST API development
* MongoDB database integration
* Mongoose schemas and models
* Route handling
* Controllers and business logic separation
* Environment variables
* URL redirection
* Error handling and validation

## Future Improvements

* User authentication
* Click analytics
* URL expiration
* Custom short URLs
* QR code generation
* Rate limiting
* Dashboard for managing URLs

## Internship Project

This project was developed as part of the Backend Development Internship program and focuses on building scalable backend systems using modern JavaScript technologies.

## Author

Abdullah Bin Mughira

Backend Development Intern