import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
// Binding the state and actions. These will be available as props to component
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  render() {
    return <div> {this.props.coach.readme} </div>;
  }
}
const mapStateToProps = (state) => {
  return {
    coach: state.coach
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
