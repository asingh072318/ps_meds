import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import "../../styles/core.scss";

export default class CoreLayout extends Component {
  render() {
    let { children } = this.props;
    return (
      <MuiThemeProvider>
        <div className="container-fluid core-layout">
          {children}
        </div>
      </MuiThemeProvider>
    );
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

CoreLayout.contextTypes = {
  router: React.PropTypes.object
};
