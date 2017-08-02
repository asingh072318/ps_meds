import React from "react";
import { Route, IndexRoute } from "react-router";
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Index from "../index.js";
import * as utils from "../utils/AppUtils";

// bind the view components to appropriate URL path
export default store =>
  <div>
    <Route path="/" component={CoreLayout}>
      <IndexRoute component={Index} />
    </Route>
  </div>;
