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

function checkUserState(){
	if(firebase.auth().currentUser)
		return true;
	return false;
}

function getLoginDetails(){
	console.log(firebase.auth().currentUser)
}

function signOut(){
	if(firebase.auth().currentUser)
		firebase.auth().signOut();
}


export { 
	create_shop,
	signOut,
	checkUserState,
	getLoginDetails,
	clear_users,
};