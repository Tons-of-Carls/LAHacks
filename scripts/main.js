/*var provider = new firebase.auth.FacebookAuthProvider();*/
var logged_in = false;
var user = null
function authenticate(provider)
{
    firebase.auth().signInWithPopup(provider).then(function(results){
        logged_in = true;
    }).catch(function(error){
        document.getElementById('test').innerHTML = error.message
        error_details = [error.code, error.message, error.email, error.credential]
    });
}

function firebase_database_ref(path = null)
{
    if(path == null)
    {
        return firebase.database().ref();
    }
    else
    {
        return firebase.database().ref(path);
    }
}

/*
firebase_database_ref('hello').child('numberOne').set('value 2343');
firebase_database_ref('hello').set('value 2343');
firebase_database_ref('hello').push().set('value 2343');
*/

function auth_Facebook()
{
    authenticate(new firebase.auth.FacebookAuthProvider());
}

function auth_Google()
{
    authenticate(new firebase.auth.GoogleAuthProvider());
}

function auth_Email_create()
{
    if(document.getElementById('pass').value == document.getElementById('confpass').value)
    {
    
        firebase.auth().createUserWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pass').value).then(function(user_new){
            user = user_new;
        }).catch(function(error){
            window.alert(error.message);
        });

        user.updateProfile({
            displayName: document.getElementById('FN').value + " " + document.getElementById('LN').value
        });
        
        window.alert(user.displayName);
    }
    else
    {
        window.alert("Passwords did not match")
    }
}

function auth_Email_login()
{
    
    firebase.auth().signInWithEmailAndPassword();
}