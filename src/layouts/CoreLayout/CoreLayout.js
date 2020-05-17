import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles/';
import PropTypes from "prop-types";

import "../../styles/core.scss";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
export default class CoreLayout extends Component {
  render() {
    let { children } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="core-layout">
          {children}
        </div>
      </MuiThemeProvider>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
};

CoreLayout.contextTypes = {
  router: PropTypes.object
};
