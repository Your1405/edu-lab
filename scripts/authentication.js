//configure Firebase for authentication
const firebaseConfig = {
    apiKey: "AIzaSyD9eyQ2it-lTlW7tMNccwWIFb42DGwNABc",
    authDomain: "edulab-1.firebaseapp.com",
    projectId: "edulab-1",
    storageBucket: "edulab-1.appspot.com",
    messagingSenderId: "1076530174505",
    appId: "1:1076530174505:web:7ed17c3558b944f70d1a38",
    measurementId: "G-EH6LL2NJZZ"
  };

let userID;

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//get buttons for logging in and signing in
let loginButton = document.getElementById('login-button');
let signupButton = document.getElementById('signup-button');

//input fields
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        userID = user.uid;
    }
});

//logging in
function loginUser () {
    if(checkIfInputEmpty(emailInput.value, passwordInput.value)) {
        console.log('Please fill in all fields');
    } else {
        firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then((credentials) => {
            console.log('Successfully authenticated!');
                window.location.href = "../index.html";
        }).catch(err => {
            console.log(err.message);
        })
    }
    //emailInput.value = '';
    //passwordInput.value = '';
}

/* function loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((credentials) => {
            console.log('Successfully authenticated!');
            // direct to home screen
            let user = credentials.user;
            if(user) {
                window.location = "../index.html";
            }
        }).catch(err => {
            console.log(err.message);
        })
} */

//sign up 
function signUpUser() {
    if(checkIfInputEmpty(emailInput.value, passwordInput.value) && nameInput.value.length === 0) {
        console.log('Please fill in all fields');
    } else {
        registerUser(emailInput.value, passwordInput.value, nameInput.value);
    }
    emailInput.value = '';
    passwordInput.value = '';
    nameInput.value = '';
};

function registerUser(email, password, name) {

    db.collection('users').doc(name).set({
        username: name,
    }).then(() => {
        console.log("Written to document");

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(credentials => {
            let user = credentials.user;
            console.log(`User ${email} has been successfully created!`);

            //clear input fields
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        })

        user.userID
        .catch(error => {
        console.log(error.message);
        db.collection('users').doc(name).set({
            userID: userID,
        }).then(() => {
            console.log('Write data to database success');
        }).catch(err => {
            console.log(err);
        })
    });
    }).catch((err) => {
        console.error("Failed to add document", err);
    });
}

function logOutUser() {
    firebase.auth().signOut().then(() => {
        window.location = 'pages/login.html';
    }).catch(error => {
        console.log(error);
    });
}

function checkIfInputEmpty(emailInput, passInput) {
    if (emailInput.length === 0 || passInput.length === 0) {
        return true
    } else {
        return false
    }
}

/* function checkIfInputEmpty(userInput, passInput, nameInput) {
    if ((userInput.length === 0 || passInput.length === 0) || nameInput.length === 0) {
        return true
    } else {
        return false
    }
} */
