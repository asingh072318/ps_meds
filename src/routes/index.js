import React from "react";
import { Route, IndexRoute } from "react-router";
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Index from "../views/index.js";
import Home from "../views/home.js";
import Admin from "../views/admin.js";
import Sidebar from "../views/sidebar.js";
import firebase from "firebase";
import * as utils from "../utils/AppUtils";

function requireAuth(location, replace) {
  if (!firebase.auth().currentUser) {
    replace("/");
  }
}
function requireAdmin(location, replace) {
  if (!firebase.auth().currentUser) {
    replace("/");
  }
  else{
    var uid = firebase.auth().currentUser.uid;
		firebase.database().ref('users/'+uid).once('value').then(snapshot => {
			if(!snapshot.val().isAdmin){
        firebaseutils.signOut();
        replace("/");
      }
		})
  }
}

// bind the view components to appropriate URL path
export default store =>
  <div>
    <Route path="/">
      <IndexRoute component={Index} />
    </Route>
    <Route component={CoreLayout}>
      <Route path="/home" onEnter={requireAuth} component={Home} />
      <Route path="/admin" onEnter={requireAdmin} component={Admin} />
      <Route path="/sidebar"  component={Sidebar} />
    </Route>
  </div>;
