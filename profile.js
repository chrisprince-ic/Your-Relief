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

let userName;
let userImage;
let userEmail;
let userPost;
const getInfo = document.getElementById("getinfo");

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// Get elements
const userInfoDiv = document.getElementById("user-info");
const profileImage = document.querySelectorAll(".profilePicture");
const profileName = document.getElementById("profileName");

// Check user authentication state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    const { displayName, email, photoURL } = user;

    // Display user information

    userName = displayName;
    userImage = photoURL;
    userEmail = email;

    profileImage.forEach((profileImage) => {
      profileImage.src = photoURL;
    });

    profileName.textContent = displayName;
  } else {
    // User is signed out
    window.location.href = "index.html"; // Redirect to the main page
  }
});

async function LoadData() {
  const mainSide = document.querySelector(".main-side");

  try {
    // Retrieve data from Firebase database under 'crud' node
    const snapshot = await database.ref("crud").once("value");
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();

      // Create new HTML elements for each data set
      const feed = document.createElement("div");
      feed.classList.add("feed-item");

      feed.innerHTML = `
            <div class="profile-user">
                <img src="${data.profileImage}" class="feed-profileImage">
                <div class="profile-description">
                    <p class="feed-username">${data.name}</p>
                    <p>${data.email}</p>
                </div>
            </div>
            <div class="feed-description">
                <p class="feed-post">${data.post}</p>
                <p class="hashtags">#university #creativity</p>
            </div>
            <div class="like-section">
            <div class="profile-liked">
                <img src="./images/photo1.png" alt="">
                <img src="./images/photo2.png" alt="">
                <img src="./images/photo3.png" alt="">
            </div>
            <div class="likes">
            <i class="fa-regular fa-heart"></i>
            <p>12 likes</p>
         </div>
            
          </div>


        `;
      feed.classList.add("feed");
      // Append the new feed element to the main side bar
      mainSide.appendChild(feed);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//Log out function

const logOut = document.getElementById("log-out");
logOut.addEventListener("click", () => {
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("userId");
  window.location.href = "index.html";
});
// when the screen Loads
document.addEventListener("DOMContentLoaded", async function () {
  LoadData();

  // Check local storage for user credentials
  const userLoggedIn = localStorage.getItem("userLoggedIn");

  if (userLoggedIn !== "true") {
    // User is not logged in, redirect to index.html
    window.location.href = "index.html";
  } else {
    // User is logged in, display profile information
    const userId = localStorage.getItem("userId");
  }
});
const makePostButton = document.getElementById("makePost");
const postInput = document.getElementById("postInput");

makePostButton.addEventListener("click", async function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  try {
    // Push data to Firebase database under 'crud' node
    await database.ref("crud").push({
      name: userName, // Assuming userName is defined elsewhere
      email: userEmail, // Assuming userEmail is defined elsewhere
      post: postInput.value.trim(), // Get trimmed value from input field
      profileImage: userImage, // Assuming userImage is defined elsewhere
    });

    console.log("Data added successfully!");

    // Clear input field after successful submission
    postInput.value = "";

    // Display success alert
    window.alert("Post was successfully uploaded!");
  } catch (error) {
    console.error("Error adding data: ", error);
    // Optionally display an error message to the user
    window.alert("Error adding post. Please try again.");
  }
});





//like button test

