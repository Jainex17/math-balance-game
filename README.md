# Math Balance Game

This is a simple math game that tests your math skills. The game is simple, you have to balance the equation by selecting the correct answer. The game is designed to help you improve your math skills.

## Features
- User can create an account and login with both google and email/password
- All data is stored in Firebase
- There is 5 levels that users can play

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
- Responsive design
- Admin panel
- Leaderboard
- Add multiplication and division levels