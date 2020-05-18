import firebase from "firebase";
import { Actions } from "jumpstate";

var database = firebase.database();

function clear_users(){
	database.ref('users').remove()
}

function read_userdata(uid){
	database.ref('users/'+uid).once('value').then(snapshot => {
		console.log(snapshot);
	})
}

function create_shop(uuid,payload){
	var usersRef = database.ref('users/' + uuid);
	usersRef.set(payload).then(response => {
		console.log(response);
	})
}

function signIn(payload){
	firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(response => {
		console.log(response);
	})
}

function signOut(){
	if(firebase.auth().currentUser)
		firebase.auth().signOut();
}


export {
	create_shop,
	read_userdata,
	signOut,
	signIn,
	clear_users,
};
