import firebase from "firebase";
import { Actions } from "jumpstate";
import $ from "jquery";

var database = firebase.database();

function clear_users(){
	database.ref('users').remove()
}

function read_allusers(){
	database.ref('users').once('value').then(snapshot =>{
		let payload = snapshot.val();
		Actions.TodoStateV1.setAllUsers(payload);
	})
}
function search_meds(payload){
	var search_string = "*"+payload+"*";
	var settings = {
  url: "http://localhost:9200/medicine-db/medicine/_search?size=25&pretty=true",
  method: "POST",
  headers: {
		"Access-Control-Allow-Origin": "*",
		"content-type": "application/json",
  },
  data: JSON.stringify({"query":{"match":{"display_name":search_string}}}),
	success: function(response) {
		var data = response.hits.hits;
		Actions.TodoStateV1.setSearchData(data);
	},
	error: function(response) {
    console.log("error response is ", response);
  }
	};
	console.log('doing network call')
	$.ajax(settings)
}
function create_shop(uuid,payload){
	var usersRef = database.ref('users/' + uuid);
	usersRef.set(payload).then(response => {
		read_allusers();
	})
}
function read_userdata(){
	var uid = firebase.auth().currentUser.uid;
	database.ref('users/'+uid).once('value').then(snapshot => {
		let payload = {...snapshot.val()};
		payload["uuid"] = uid;
		Actions.TodoStateV1.setUserData(payload);
	})
}
function signIn(payload){
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
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
	search_meds,
	create_shop,
	read_allusers,
	signOut,
	signIn,
	read_userdata,
	clear_users,
};
