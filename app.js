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
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userId', user.uid);

        // Redirect to next page or display user info
        window.location.href = 'profile.html';
    } catch (error) {
        console.error(error.message);
    }
    try {
        // Push data to Firebase database under 'crud' node
        await database.ref("users").push({
          name: userName, // Assuming userName is defined elsewhere
          email: userEmail, // Assuming userEmail is defined elsewhere
          profileImage: userImage, // Assuming userImage is defined elsewhere
        });
    
        console.log("Data added successfully!");
    
        // Display success alert
        window.alert("Post was successfully uploaded!");
      } catch (error) {
        console.error("Error adding data: ", error);
        // Optionally display an error message to the user
        window.alert("Error adding post. Please try again.");
      }
});

document.addEventListener('DOMContentLoaded', () => {
    // Check local storage for user credentials
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    if (userLoggedIn === 'true') {
        // User is already logged in, redirect to profile.html
        window.location.href = 'profile.html';
    }
});


