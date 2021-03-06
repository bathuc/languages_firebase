import firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}


// firebase utils
const fs = firebase.firestore();
const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
export {
    fs,
    db,
    auth,
    storage
}
