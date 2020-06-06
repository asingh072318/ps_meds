import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = theme => ({
  rootpage:{
    width:'100%',
    margin:'5px',
    padding:theme.spacing(1),
  },
  parentList:{
    maxWidth:'100%',
    backgroundColor:'white',
    maxHeight:'400px',
    overflow:'scroll',
    padding:theme.spacing(1),
  },
  eachList:{
    width:'100%',
    zIndex: '100',
    paddingTop:theme.spacing(1),
    '&:hover':{
      backgroundColor:'#F5F5F5',
      cursor:'pointer',
    }
  },
});


class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false,
      anchorEl:null,
      value:"",
    };
  }

  renderSuggestions () {
    const { classes, options, optionsLabel } = this.props;
    if(options.length === 0){
      return null;
    }
    return(
      <div className={classes.parentList}>
        {options.map((item,index)=>{
          return(
            <div key={index} onClick={() => this.handleClick(item)} className={classes.eachList}>
               {item[optionsLabel]}
            </div>
          );
        })}
      </div>
    );
  }

  handleChange(e){
      this.setState({value:e.target.value});
      this.props.onChange(e.target.value);
  }

  handleClick(item) {
    console.log('handleClick');
    const { optionsLabel } = this.props;
    this.setState({open:false,value:item[optionsLabel]});
  }

  handleClickAway = () => {
    console.log('handleClickAway');
    this.setState({open:false});
  }
  render() {
    const { classes, label, id } = this.props;
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div className = {classes.rootpage}>
          <TextField
            onChange={(e) => this.handleChange(e)}
            fullWidth
            onFocus={(e)=>this.setState({open:true,anchorEl:e.currentTarget,value:""})}
            value={this.state.value}
            id={id}
            label={label}
          />
          <Popper
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            placement="bottom-start"
            children={()=>this.renderSuggestions()
          }>
          </Popper>
        </div>
      </ClickAwayListener>
    )
  }
}

export default withStyles(styles)(Autocomplete);
