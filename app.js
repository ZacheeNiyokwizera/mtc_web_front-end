
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});


// Your web app's Firebase configuration  
var firebaseConfig = {
	apiKey: "AIzaSyBlFjZ11LUC20BllVfMYAUBVRObW4OT7Ro",
    authDomain: "sam-contact-db.firebaseapp.com",
    databaseURL: "https://sam-contact-db.firebaseio.com",
    projectId: "sam-contact-db",
    storageBucket: "sam-contact-db.appspot.com",
    messagingSenderId: "384423552603",
    appId: "1:384423552603:web:fc5247bfb4bc3fe334017e",
    measurementId: "G-6KCYTM43J3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference message collection
var messagesRef = firebase.database().ref("messages");

// Listen for form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);
console.log("clicked");

// Submit form
function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal("myName");
    var email = getInputVal("myEmail");
    var phone = getInputVal("myPhone");
    var message = getInputVal("myMessage");

    // Save message
    saveMessage(name, email, phone, message);

    // Show alert
    document.querySelector(".alertMessage").style.display = "block";

    // Hide alert after 3 seconds
    setTimeout(function() {
        document.querySelector(".alertMessage").style.display = "none";
    }, 3000);

    // Clear form
    // document.getElementById("contactForm").reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, phone, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        phone: phone,
        message: message,
    });
}
