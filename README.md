# 🏠 AIRealty Customer Onboarding Module

## 📋 Overview

This repository contains a full-stack **Customer Onboarding Module** for **AIRealty**, enabling users to seamlessly register interest in real estate services. The system is secure, responsive, and aesthetically aligned with AIRealty’s branding.

**Tech Stack:**
- **Frontend:** React + Material UI
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Optional:** Nodemailer for email confirmation

---

## ✨ Features

- Responsive, branded onboarding form
- Dual-thumb budget range slider
- Form validation (Indian mobile number, email format, budget range)
- Backend validation and MongoDB storage
- Confirmation email sent to each registrant
- Dedicated "Thank You" page after submission
- Clean UI following AIRealty design standards

---

## 🗂 Project Structure

```
airealty-onboarding/
├── backend/
│   ├── models/
│   │   └── Customer.js
│   ├── routes/
│   │   └── customer.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── OnboardingForm.js
│   │   │   └── ThankYou.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── .env
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/airealty-onboarding.git
cd airealty-onboarding
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.sample`:

```env
MONGODB_URI=your-mongodb-uri
PORT=5000
SLIDER_MIN_BUDGET=100000
SLIDER_MAX_BUDGET=10000000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

Then start the server:

```bash
npm start
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

> Optionally, add `.env` for frontend-specific environment variables like API URL.

---

## 🛠 API Endpoints

| Method | Endpoint            | Description                        |
|--------|---------------------|------------------------------------|
| POST   | `/api/customers`    | Submit new customer lead           |
| GET    | `/api/config`       | Get slider min/max budget values   |

---

## ✅ Validation Rules

- **All fields are required**
- **Mobile**: Must match `^[6-9]\d{9}$` (valid Indian number)
- **Email**: Standard email format
- **Budget**: Must be within configured range (`SLIDER_MIN_BUDGET` to `SLIDER_MAX_BUDGET`) and `min ≤ max`

---

## 💡 Features & Enhancements

| Feature              | Description                                          |
|----------------------|------------------------------------------------------|
| Dual-range slider    | Intuitive budget input control                       |
| Confirmation email   | Sent to customer on successful registration          |
| Thank You page       | After submission, user is redirected                 |
| Backend validation   | Secure and robust server-side validation             |
| Branding             | Styled to match [airealty.space](https://airealty.space) |

---

## 📷 Screenshots

See `/frontend/src/assets/` or design preview links for UI references.

---

## 🚀 Deployment

- **Backend:** Deploy to Render, Railway, Heroku, or other Node.js-compatible hosts.
- **Frontend:** Use Netlify, Vercel, or GitHub Pages (`npm run build` → upload).

---

## 🔒 Sample `.env` (Backend)

```env
MONGODB_URI=your-mongodb-uri
PORT=5000
SLIDER_MIN_BUDGET=100000
SLIDER_MAX_BUDGET=10000000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## 📄 License

MIT License

---

## 🙋 Contact

For support, reach out to your project supervisor or the AIRealty IT team.

> Project developed by **[Your Name]**, [Year] for the AIRealty Internship Assignment.
