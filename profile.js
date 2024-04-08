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
  
  const getInfo = document.getElementById('getinfo');  

firebase.initializeApp(firebaseConfig);

// Get elements
const userInfoDiv = document.getElementById('user-info');
const profileImage = document.querySelectorAll('.profilePicture');
const profileName = document.getElementById('profileName');

// Check user authentication state
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        const { displayName, email, photoURL } = user;
     
        // Display user information
        userInfoDiv.innerHTML = `
            <img src="${photoURL}" alt="Profile Picture">
            <p>Name: ${displayName}</p>
            <p>Email: ${email}</p>
        `;
        profileImage.forEach((profileImage) => {
            profileImage.src = photoURL;
        });
        
        profileName.textContent = displayName; 
    } else {
        // User is signed out
        window.location.href = 'index.html'; // Redirect to the main page
    }
});
