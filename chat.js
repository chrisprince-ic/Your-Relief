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
  
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
  let userName;
  let userImage;
  let userEmail;
  let userPost;

  
async function LoadData() {
   const getInfo = document.getElementById("users-list");
   const usersContainer = document.getElementById("users-container");
    try {
      // Retrieve data from Firebase database under 'crud' node
      const snapshot = await database.ref("crud").once("value");
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
      
        const feed = document.createElement("div");
  
        feed.innerHTML = `
              <div class="profile-user">
                  <img src="${data.profileImage}" class="feed-profileImage">
                  <div class="profile-description">
                      <p class="feed-username">${data.name}</p>
                      <p>${data.email}</p>
                  </div>
              </div>
        
          `;
        feed.classList.add("feed");
        // Append the new feed element to the main side bar
        usersContainer.appendChild(feed);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
  
document.addEventListener("DOMContentLoaded", async function () {
    LoadData();
});