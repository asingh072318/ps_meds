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
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dropdown from '../components/Dropdown';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
// Binding the state and actions. These will be available as props to component


const styles = theme => ({
  rootpage:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
    height:'86vh',
    backgroundColor:'white',
    color:'black',
  },
  infoSection:{
    display:'flex',
    flexDirection:'column',
    flex:'2',
    padding:10,
  },
  infoHeader:{
    display:'flex',
    flex:'1',
    justifyContent:'center',
    fontSize:30,
  },
  infoBody:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    flexWrap:'wrap',
    padding:5,
    flex:'3',
  },
  infoFooter:{
    flex:'3',
  },
  billingSection:{
    flex:'8',
    backgroundColor:'green',
  },
  header: {
    flex:'1',
    color:'white',
    fontSize:'24px',
  },
  body:{
    flex:'15',
  },
  footerNotice: {
    flex:'1',
    color:'white',
    textAlign:'center',
    fontSize:'24px',
  },
  fab: {
    margin: theme.spacing(2),
  },
  AutoComplete:{
    width:'300px',
  },
  billSection:{
    marginTop:theme.spacing(2),
    display:'flex',
    flexDirection:'column',
    width:'100%',
    justifyContent:'space-between',
  },
  topPurchase:{
    maxWidth:'80vw',
    height:'80vh',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    flexWrap:'wrap',
  },
  purchaseTopDiv:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    flexWrap:'wrap',
  },
  table: {
    maxWidth:'80vw',
    maxHeight:'80vh',
    overflow:'auto',
  },
  eachTextfield:{
    width:'90px',
  },
  options:{
    display:'flex',
    flexDirection:'row',
  },
  footer:{
    width:'100%',
    height:'50px',
    backgroundColor:'red',
    textAlign:'center',
  },
});
function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {'Copyright © '}
      <Link color="inherit" >
        Prem Shree Medicines
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;
const TAX_RATE = 0.07;

class Liststores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers:[],
      searchData:[],
      selectedUser:{
        uuid:"",
        gstNumber:"",
        dlNumber:"",
      },
    };
  }
  componentWillReceiveProps(nextProps){
    var allUsers = nextProps.coach.allUsers;
    var allUsersarray = [];
    Object.keys(allUsers).map((key)=>{
      var newObj=allUsers[key];
      newObj['uuid']=key;
      allUsersarray.push(allUsers[key]);
    });
    //console.log('allUsersarray',allUsersarray);
    //console.log('searchresultarray',nextProps.coach.searchData);
    this.setState({allUsers:allUsersarray});
  }
  componentWillMount(){
    firebaseutils.read_allusers();
    firebaseutils.search_meds("a");
  }

  selectedStore = (newValue) => {
    var selectedUser = {
      uuid:newValue.uuid,
      gstNumber:newValue.gstNumber,
      dlNumber:newValue.dlNumber,
    }
    console.log(selectedUser);
    this.setState({
      selectedUser:selectedUser
    })
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootpage}>
        <div className={classes.infoSection}>
            <div className={classes.infoHeader}>
                Purchase Section
            </div>
            <div className={classes.infoBody}>
                <Autocomplete
                  id="search-store"
                  disableClearable
                  onChange={(event, newValue) => this.selectedStore(newValue)}
                  options={this.state.allUsers}
                  getOptionLabel={(option) => option.shopName}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Select Store" variant="outlined" />}
                />
                <div>GSTIN: {this.state.selectedUser.gstNumber}</div>
                <div>DL: {this.state.selectedUser.dlNumber}</div>
            </div>
            <Divider />
            <div className={classes.infoFooter}>
                footer section
            </div>
            <Divider />
        </div>
        <div className={classes.billingSection}>
        2
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Liststores));
