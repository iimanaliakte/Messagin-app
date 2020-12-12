const Input = document.querySelector('#Input');
const Button = document.querySelector('#Submit');
const Name = prompt('What is your name?');


if (Name == undefined || Name == '') {
    Name = 'Annonimous'
}


var firebaseConfig = {
    apiKey: "AIzaSyC7BnJk6yt0TlHdzf8XGMJM7f_rOR5D03E",
    authDomain: "messagin-app-4b0c3.firebaseapp.com",
    databaseURL: "https://messagin-app-4b0c3-default-rtdb.firebaseio.com",
    projectId: "messagin-app-4b0c3",
    storageBucket: "messagin-app-4b0c3.appspot.com",
    messagingSenderId: "224470381920",
    appId: "1:224470381920:web:27639a486d4954b9d89a05"
};
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
let ref = database.ref('messages');

let data;

let ref2 = ref;

ref2.on('value', gotD, getE);

Button.addEventListener('click', (e) => {
    e.preventDefault();

    if (Input.value == '' || Input.value == ' ' || Input.value == '  ' || Input.value == '   ' || Input.value == '    ') {
        alert('please put somethin in');
    } else {
        data = {
            Name: Name,
            Message: Input.value
        };
        ref.push(data);
        Input.value = '';
    }


});

// console.log(database);

function gotD(d) {

    let messageListing = document.querySelectorAll('.messageList');

    for (let i = 0; i < messageListing.length; i++) {
        messageListing[i].remove();

    }

    // console.log(d.val());
    let m = d.val();
    let key = Object.keys(m);
    // coMohammednsole.log(key);
    for (let i = 0; i < key.length; i++) {

        let k = key[i];
        let messages = m[k].Message;
        let name = m[k].Name;
        const Li = document.createElement('li');


        let MessageDiv = document.createElement('div');

        // Li.innerText = `Message: ${messages}  From: ${name}`;

        // document.querySelector('#Messages').appendChild(Li);

        MessageDiv.className = 'messageList';
        let H = document.createElement('h3');
        H.innerText = name;

        let Main = document.createElement('h2');

        Main.innerText = messages;

        MessageDiv.appendChild(H);
        MessageDiv.appendChild(Main);

        if (name === Name) {
            H.className = 'User_message';
            Main.className = 'User_message';

        } else {
            H.className = 'Guest_message';
            Main.className = 'Guest_message';


        }



        document.body.appendChild(MessageDiv);

        console.log(`Message: ${messages}  From: ${name}`);
        window.scrollBy(0, 100);
    }
}
function getE(e) {
    console.log('Error');
    console.log(e);
}
