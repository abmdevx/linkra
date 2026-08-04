# 🔗 URL Shortener

A modern full-stack URL Shortener application that allows users to generate short, shareable links from long URLs. Built with a React frontend and an Express.js backend, the application provides a fast, responsive, and clean user experience while securely storing shortened URLs in MongoDB.

## 🚀 Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS v4
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Nano ID
* CORS
* Dotenv

## ✨ Features

* Convert long URLs into short, unique links
* Fast and responsive user interface
* RESTful API architecture
* Unique short IDs generated using Nano ID
* MongoDB integration for persistent URL storage
* Environment variable support using Dotenv
* Cross-Origin Resource Sharing (CORS) enabled
* Modern React frontend powered by Vite
* Toast notifications for user feedback

## 📁 Project Structure

```text
url-shortener/
├── client/      # React + Vite frontend
└── server/      # Express + MongoDB backend
```

## 🛠️ Installation

### Clone the repository

```bash
git clone https://github.com/abmdevx/url-shortner.git
cd url-shortener
```

### Install dependencies

Backend

```bash
cd server
npm install
```

Frontend

```bash
cd ../client
npm install
```

### Configure environment variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

### Start the application

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

Or, if you have configured `concurrently` in the root project:

```bash
npm run dev
```

## 📌 Future Improvements

* User authentication
* URL analytics (click count, location, devices)
* Custom short URLs
* QR code generation
* Link expiration
* Dashboard for managing links