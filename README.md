# Math Balance Game

This is a simple math game that tests your math skills. This game teaches addition through visual intuition - imagine a balance scale where students need to find numbers that add up to match a target value. When they're close but not quite right, the scale tilts to show them if their sum is too large or too small!

## Features
- User can create an account and login with both google and email/password
- All data is stored in Firebase
- There is 5 levels that users can play
- Responsive design
- Protected routes
- Session management
- Interactive balance scale visualization

## Technologies
- Vue.JS (Frontend)
- Pinia (State management)
- HTML/CSS 
- Tailwind CSS
- Firebase (Authentication, Firestore)

## Installation
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory and add the following:
```
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE
```

4. Run `npm run dev` to start the development server

## To Do
- Admin panel
- Leaderboard
- Add multiplication and division levels
