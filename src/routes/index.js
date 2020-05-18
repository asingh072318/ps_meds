import React from "react";
import { Route, IndexRoute } from "react-router";
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Index from "../views/index.js";
import Home from "../views/home.js";
import Admin from "../views/admin.js";
import firebase from "firebase";
import * as utils from "../utils/AppUtils";

function requireAuth(location, replace) {
  if (!firebase.auth().currentUser) {
    replace("/");
  }
}

// bind the view components to appropriate URL path
export default store =>
  <div>
    <Route path="/" component={CoreLayout}>
      <IndexRoute component={Index} />
      <Route path="/home" onEnter={requireAuth} component={Home} />
      <Route path="/admin" onEnter={requireAuth} component={Admin} />
    </Route>
  </div>;
