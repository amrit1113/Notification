# 🚀 Notification Service

A scalable and modular **Node.js-based Notification Service** that allows sending notifications via **Email**, **SMS**, and **In-App** methods. Ideal for integrating into modern web applications.

---

## 🌟 Features

- ✅ Email Notifications using **Nodemailer**
- ✅ SMS Notifications with **Twilio**
- ✅ In-App Notifications API endpoint
- ✅ Built with **Express.js** and **MySQL**
- ✅ Clean architecture (routes, services, config, controllers)
- ✅ Ready for queue integration (BullMQ or RabbitMQ)

---

## 🛠️ Tech Stack

| Layer      | Technology       |
|------------|------------------|
| Backend    | Node.js, Express |
| Database   | MangoDB          |
| Email API  | Nodemailer       |
| SMS API    | Twilio           |
| Optional   | BullMQ / Redis or RabbitMQ |

---

## 📂 Project Structure

notification_service/
├── config/ # Environment configs
├── controllers/ # Request handlers
├── db/ # Database connection
├── routes/ # API endpoints
├── services/ # Business logic
├── utils/ # Helper functions
├── .env # Environment variables
├── server.js # Entry point
└── README.md

.env file
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=notification_db

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
