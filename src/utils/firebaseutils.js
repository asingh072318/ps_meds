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
	firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(response => {
		read_userdata();
	})
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
