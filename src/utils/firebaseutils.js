import firebase from "firebase";
import { Actions } from "jumpstate";

var database = firebase.database();

function clear_users(){
	database.ref('users').remove()
}

function create_shop(uuid,payload){
	var usersRef = database.ref('users/' + uuid);
	usersRef.set(payload).then(response => {
		console.log(response);
	})
}
function read_userdata(){
	var uid = firebase.auth().currentUser.uid;
	database.ref('users/'+uid).once('value').then(snapshot => {
		Actions.TodoStateV1.setUserData(snapshot.val());
	})
}
function signIn(payload){
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function(){
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(response =>{
			read_userdata();
		});
  });
}

function signOut(){
	if(firebase.auth().currentUser)
		firebase.auth().signOut();
}


export {
	create_shop,
	signOut,
	signIn,
	read_userdata,
	clear_users,
};
