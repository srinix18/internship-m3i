AIRealty Customer Onboarding Module
Overview
This repository contains a full-stack Customer Onboarding Module for AIRealty, allowing users to register their interest in real estate services seamlessly and securely. The solution is built with:

Frontend: React (with Material UI)

Backend: Node.js + Express

Database: MongoDB

Optional Features: Email confirmation for customers

Features
Responsive, branded onboarding form

Dual-thumb budget range slider

Comprehensive validation (including Indian mobile number & email regex)

Backend stores submissions in MongoDB

Confirmation email sent to every user (via Nodemailer)

Clean, aesthetically pleasing UI matching AIRealty's design standards

Dedicated Thank You page after form submission

Project Structure
text
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
│   │   └── (video background or assets if needed)
│   └── .env (for React if desired)
Getting Started
1. Clone the Repository
text
git clone https://github.com/yourusername/airealty-onboarding.git
cd airealty-onboarding
2. Backend Setup
Enter the backend folder:

text
cd backend
npm install
Copy .env.sample to .env and update values:

text
MONGODB_URI=your-mongodb-connection-string
PORT=5000

SLIDER_MIN_BUDGET=100000
SLIDER_MAX_BUDGET=10000000

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
Start backend server:

text
npm start
3. Frontend Setup
Open a new terminal, go to the frontend folder:

text
cd frontend
npm install
(Optional) Update frontend/.env for API URLs if needed.

Start the React dev server:

text
npm start
API Endpoints
Method	Endpoint	Description
POST	/api/customers	Submit new customer lead
GET	/api/config	Get current slider min/max for budget input
Validation Rules
All fields are compulsory

Mobile: Valid 10-digit Indian number (^[6-9]\d{9}$)

Email: Standard email format

Budget: Range must be within configured min & max values, and min ≤ max

Features & Enhancements
Feature	Description
Dual-range slider	Intuitive budget selection
Confirmation email	Automatic email upon successful registration
Thank You page	User redirected after successful form submission
Backend validation	Strict, secure, robust
Matching branding	UI matches airealty.space’s style
Sample .env (Backend)
text
MONGODB_URI=your-mongodb-uri
PORT=5000
SLIDER_MIN_BUDGET=100000
SLIDER_MAX_BUDGET=10000000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
Screenshots
See /frontend/src/assets/ or design preview for UI reference.

Deployment
Deploy backend to any Node.js-compatible provider (e.g., Heroku, Render, Railway).

Deploy frontend (build with npm run build) to Netlify, Vercel, or your preferred platform.

License
MIT License

Contact
For questions or support, reach out to your project supervisor or contact the AIRealty IT team.

Project Developed by [Your Name], [Year] for AIRealty Internship Assignment.
