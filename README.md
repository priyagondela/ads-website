# ADVYNTRA DIGITAL SERVICES — Official Website

**INNOVATE • CREATE • GROW**

A premium, modern, and professional company website for Advyntra Digital Services — a creative digital and technology solutions company.

---

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion, Lucide React Icons
- **Backend:** Firebase Authentication, Cloud Firestore
- **Media:** Cloudinary (image upload & delivery)
- **Deployment:** Vercel or Firebase Hosting

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project (configured)
- Cloudinary account (configured)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd advyntra-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Fill in your Firebase and Cloudinary credentials in .env

# Start development server
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase Measurement ID |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary Upload Preset |

## Firebase Setup

### Firestore Security Rules

Deploy these rules in your Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Enquiries: anyone can create, only authenticated admins can read/update/delete
    match /enquiries/{enquiryId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    // Portfolio: anyone can read, only authenticated admins can write
    match /portfolio/{projectId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### Firebase Authentication

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable **Email/Password** sign-in provider
3. Go to Authentication → Users → Add User
4. Create your admin account (email + password)

## Admin Dashboard

Access the admin panel at `/admin/login`.

Features:
- View and manage customer enquiries
- Update enquiry status (New → Contacted → Resolved)
- Add, edit, and delete portfolio projects
- Upload images via Cloudinary

## Project Structure

```
src/
├── admin/              # Admin dashboard pages
│   ├── components/     # Admin-specific components
│   ├── AdminLogin.jsx
│   ├── AdminLayout.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminEnquiries.jsx
│   └── AdminPortfolio.jsx
├── cloudinary/         # Cloudinary upload utilities
├── components/         # Reusable UI components
├── firebase/           # Firebase configuration & utilities
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── sections/           # Homepage sections
├── utils/              # Constants, validation
├── App.jsx
├── main.jsx
└── index.css
```

## Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel

```bash
npx vercel
```

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

© 2026 Advyntra Digital Services. All Rights Reserved.
