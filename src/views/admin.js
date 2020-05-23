import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import { browserHistory } from "react-router";
import * as firebaseutils from "../utils/firebaseutils";
import firebase from "firebase";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';


// Binding the state and actions. These will be available as props to component
const styles = theme => ({
  root: {
    maxWidth: 500,
    backgroundColor: '#F6F7F9',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  form:{
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  body:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
});


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid:"",
      address:"",
      dlNumber:"",
      gstNumber:"",
      isAdmin:false,
      ownerName:"",
      shopName:"",
    };
  }

  states = (e, value) => {
    var obj={[e.target.id]:e.target.value};
    this.setState(obj);
  }

  submit = () => {
    let payload = {...this.state};
    delete payload["uuid"];
    firebaseutils.create_shop(this.state.uuid,payload);
  }
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
      <CardHeader
        title="Create New Store"
      />
      <Divider />
      <CardContent className={classes.body}>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="uuid"
            label="UUID"
            name="uuid"
            autoComplete="UUID"
            autoFocus
            onChange={event => this.states(event, "uuid")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="ADDRESS"
            name="address"
            autoComplete="Address"
            autoFocus
            onChange={event => this.states(event, "address")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dlNumber"
            label="Drug License Number"
            name="dlNumber"
            autoComplete="Drug License Number"
            autoFocus
            onChange={event => this.states(event, "dlNumber")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="gstNumber"
            label="GST Number"
            name="gstNumber"
            autoComplete="GST Number"
            autoFocus
            onChange={event => this.states(event, "gstNumber")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ownerName"
            label="Owner Name"
            name="ownerName"
            autoComplete="Owner Name"
            autoFocus
            onChange={event => this.states(event, "ownerName")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="shopName"
            label="Shop Name"
            name="shopName"
            autoComplete="Shop Name"
            autoFocus
            onChange={event => this.states(event, "shopName")}
          />
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => this.submit()}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
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
