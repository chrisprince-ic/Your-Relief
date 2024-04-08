// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyCLpqetsAIrShH7DAXpd55QUBAxSCo26rY",
  authDomain: "yourrelief-c4389.firebaseapp.com",
  projectId: "yourrelief-c4389",
  storageBucket: "yourrelief-c4389.appspot.com",
  messagingSenderId: "343001872340",
  appId: "1:343001872340:web:fd569d540829be155f8841",
  measurementId: "G-SNTKC104RY",
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get elements
const signInButton = document.getElementById('googleSigninBtn');
const userInfoDiv = document.getElementById('user-info');
const getInfo = document.getElementById('getinfo');

// Google Sign-In
const provider = new firebase.auth.GoogleAuthProvider();

signInButton.addEventListener('click', async () => {
    try {
        // Sign in with Google
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        // Redirect to next page or display user info
        window.location.href = 'profile.html';
    } catch (error) {
        console.error(error.message);
    }
});

