import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import { browserHistory } from "react-router";
import * as firebaseutils from "../utils/firebaseutils";
import { withStyles } from '@material-ui/core/styles';

// Binding the state and actions. These will be available as props to component
const styles = theme => ({

});


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:"",
    };
    //firebaseutils.clear_users()
  }
  render() {
    const { classes } = this.props;
    return (
      <div>Admin Dashboard</div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    coach: state.coach
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Admin));
