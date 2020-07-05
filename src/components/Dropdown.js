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
    backgroundColor:'#f8f8ff',
    maxHeight:'150px',
    overflow:'scroll',
    padding:theme.spacing(1),
  },
  eachList:{
    width:'100%',
    paddingTop:theme.spacing(1),
    '&:hover':{
      backgroundColor:'#F5F5F5',
      cursor:'pointer',
    }
  },
  popper:{
    width:'280px',
    zIndex:'50',
    border:'solid #f8f8ff',
    borderRadius:'10px',
  },
  keyList:{
    backgroundColor:'#F5F5F5',
    cursor:'pointer',
    paddingTop:theme.spacing(1),
  }
});


class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false,
      anchorEl:null,
      value:"",
      cursor:0,
      set:false,
    };
    //console.log("constructor called for ",this.props.id,":",this.state);
  }
  componentWillReceiveProps(nextProps){
    //console.log('receive props called',nextProps.id);
    //console.log('nextProps.value ', nextProps.value);
    //console.log('this state value',this.state.value);
    if(this.state.set===true && nextProps.value !== "" && this.state.value===""){
      //console.log('recprops setting val to ',nextProps.value,this.state.set);
      this.setState({value:nextProps.value,set:false});
    }
  }
  renderSuggestions () {
    const { classes, options, optionsLabel } = this.props;
    const { cursor } = this.state;
    if(options.length === 0){
      return null;
    }
    return(
      <div className={classes.parentList} tabIndex="0">
        {options.map((item,index)=>{
          return(
            <div key={index} tabIndex={0} id={index} onClick={() => this.handleClick(item)} className={cursor === index?classes.keyList:classes.eachList}>
               {item[optionsLabel]}
            </div>
          );
        })}
      </div>
    );
  }

  handleKeyDown = (e) => {
    const { cursor } = this.state;
    const { options } = this.props;
    // arrow up/down button should select next/previous list element
    document.getElementById(cursor).scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (e.keyCode === 13){
      this.handleClick(options[cursor]);
      e.target.blur();
    }else if (e.keyCode === 38 && cursor > 0) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (e.keyCode === 40 && cursor < options.length - 1) {
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
    }
  }

  handleChange(e){
      //console.log('handle change called, setting value to ',e.target.value);
      this.setState({value:e.target.value,set:false});
      //console.log(this.state.value);
      this.props.onChange(e.target.value);
  }

  handleClick = (item) => {
    const { optionsLabel } = this.props;
    //console.log('handleclick called. setting value to ',item[optionsLabel]);
    this.setState({open:false,set:true,value:item[optionsLabel]});
    this.props.onClick(this.props.id,item);
  }

  handleClickAway = () => {
    this.setState({open:false});
  }

  render() {
    const { classes, label, id, value} = this.props;
    //console.log('should be showing',this.state.value);
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div className = {classes.rootpage}>
          <TextField
            onChange={(e) => this.handleChange(e)}
            fullWidth
            onFocus={(e)=>this.setState({open:true,anchorEl:e.currentTarget,value:"",cursor:0})}
            onKeyDown={ this.handleKeyDown }
            value={this.state.value}
            id={id}
            label={label}
          />
          <Popper
            className={classes.popper}
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            placement="bottom"
            children={()=>this.renderSuggestions()}
          >
          </Popper>
        </div>
      </ClickAwayListener>
    )
  }
}

export default withStyles(styles)(Dropdown);
