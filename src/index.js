import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import { browserHistory } from "react-router";
import * as firebaseutils from "utils/firebaseutils";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import "./index.scss";
// Binding the state and actions. These will be available as props to component
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    //firebaseutils.clear_users()
  }
  render() {
    return (
      <div className="modal-dialog text-center">
        <div className="col-sm-8 main-section">
          <div className="modal-content">

            <div className="col-12 user-img">
              <img src={require("static/img/logo.png")} />
            </div>

            <form className="col-12">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="E-Mail addresss" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" />
              </div>
              <Button variant="contained" color="secondary">
                Delete
                <DeleteIcon />
              </Button>
            </form>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index)
