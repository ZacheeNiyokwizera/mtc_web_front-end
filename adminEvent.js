const firebaseConfig = {

    apiKey: "AIzaSyC1VsC_aGyDcU0_1UAx8zzEo7f6OCe6RUg",
    authDomain: "kuja-kujans-survey-ecdb7.firebaseapp.com",
    databaseURL: "https://kuja-kujans-survey-ecdb7.firebaseio.com",
    projectId: "kuja-kujans-survey-ecdb7",
    storageBucket: "kuja-kujans-survey-ecdb7.appspot.com",
    messagingSenderId: "840254170866",
    appId: "1:840254170866:web:32e0b5efa564e69866526b",
    measurementId: "G-HT9FM30T7S"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


function upload() {
   
    var image = document.getElementById('image').files[0];
   
    var post = document.getElementById('post').value;
    var  actionTag = document.getElementById('tag').value;
   
     var actionDate = document.getElementById('date').value;
   
    var actionLink = document.getElementById('link').value;
 
     var actionLocation = document.getElementById('location').value;
   
    var imageName = image.name;
    //firebase storage reference
    //it is the path where the image will be stored
    var storageRef = firebase.storage().ref('images/' + imageName);
    //upload image to selected storage reference
    //passing the image 
    var uploadTask = storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed', function(snapshot) {
        //get task progress by following code
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " done");
    }, function(error) {
        //handle error here
        console.log(error.message);
    }, function() {
        //handle successful upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            //get the image download url here and upload it to database
            //our path where data is stored ...push is used so that every post have unique id
            firebase.database().ref('uSurvey/').push().set({
                time: actionDate,
                source: actionLink,
                tag : actionTag,
                area: actionLocation,
                text: post,
                imageURL: downloadURL
            }, function(error) {
                if (error) {
                    alert("Error while uploading");
                } else {
                    alert("Successfully uploaded");
                    //now reset your form
                    document.getElementById('post-form').reset();
                    getdata();
                }
            });
        });
    });

}

window.onload = function() {
    this.getdata();
}


function getdata() {
    firebase.database().ref('uSurvey/').once('value').then(function(snapshot) {
        //get your posts div
        var posts_div = document.getElementById('posts');
        //remove all remaining data in that div
        posts.innerHTML = "";
        //get data from firebase
        var data = snapshot.val();
        console.log(data);
        //now pass this data to our posts div
        //we have to pass our data to for loop to get one by one
        //we are passing the key of that post to delete it from database
        for (let [key, value] of Object.entries(data)) {
           
            posts_div.innerHTML = `
            <div class='action-card'> 

            <div class='action-img'> 
            <img src= ${value.imageURL} style='height:250px;'> 
            </div>

            <div class='card-body'>
            <div class="card-content">
            <p class='card-text'> ${value.time}|</p>
            <p class='card-text'> ${value.area}|</p>
            <p class='card-text'> ${value.tag}|</p>
            <a class='card-text' href=${value.source}>View idea</a> 
            </div>

            <div>
             <p class='card-text'> ${value.text}</p>
            </div>
           
            </div>

            </div> ${ posts_div.innerHTML}`
        }
    });
}

function delete_post(key) {
    firebase.database().ref('uSurvey/' + key).remove();
    getdata();

}

// Displaying the Navbar

const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
});
