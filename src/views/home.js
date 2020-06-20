import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import { browserHistory } from "react-router";
import * as firebaseutils from "../utils/firebaseutils";
import firebase from "firebase";
import { withStyles } from '@material-ui/core/styles';
import Dropdown from '../components/Dropdown';
// Binding the state and actions. These will be available as props to component
const styles = theme => ({
  rootpage:{
    width:'300px',
    backgroundColor:'white',
  },
});


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:"",
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className = {classes.rootpage}>
        <Dropdown id="1" onChange={firebaseutils.search_meds} options={this.props.coach.searchData} optionsLabel="display_name" label="search_meds"  />
        <Dropdown id="2" onChange={firebaseutils.search_meds} options={this.props.coach.searchData} optionsLabel="display_name" label="search_meds"/>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
