import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  rootBill:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
  },
  invoice:{
    display:'flex',
    flexDirection:'column',
    width:'70vw',
    backgroundColor:'red',
    margin: theme.spacing(1),
  },
  total:{
    display:'flex',
    flexDirection:'column',
    width:'30vw',
    backgroundColor:'green',
    margin: theme.spacing(1),
  }
});
class Bill extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var bill = this.props.data;
    const { classes } = this.props;
    return (
        <div className={classes.rootBill}>
          <div className={classes.invoice}>
            Invoice Section
          </div>
          <div className={classes.total}>2</div>
        </div>
    )
  }
}

export default withStyles(styles)(Bill);
