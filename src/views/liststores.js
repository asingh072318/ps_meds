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
    maxWidth:'80vw',
    maxHeight:'80vh',
    overflow:'auto',
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
  tableItem:{
    verticalAlign:"center",
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
  eachTextfield:{
    width:'90px',
  },
  options:{
    backgroundColor:'green',
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
      key:0,
      allUsers:[],
      searchData:[],
      selectedUser:{
        uuid:"",
        gstNumber:"",
        dlNumber:"",
      },
      billForm:[
        {
          "id":0,
          "Product":"",
          "Pack":"",
          "MFG":"",
          "Batch":"",
          "Expiry":"",
          "Quantity":0,
          "Free":0,
          "MRP":0,
          "Rate":0,
          "Disc(%)":0,
          "Taxable":0,
          "CGST(%)":0,
          "SGST(%)":0,
          "IGST(%)":0,
          "Option":0,
        }
      ],
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
    //console.log(selectedUser);
    this.setState({
      selectedUser:selectedUser
    })
  }

  deleteRow = (index) => {
    var billForm = this.state.billForm;
    //console.log(index);
    billForm.splice(index,1);
    this.setState({billForm:billForm});
    console.log(this.state.billForm);
  }

  addRow = () => {
    var payload = {
      "id":this.state.billForm[this.state.billForm.length - 1]["id"]+1,
      "Product":"",
      "Pack":"",
      "MFG":"",
      "Batch":"",
      "Expiry":"",
      "Quantity":0,
      "Free":0,
      "MRP":0,
      "Rate":0,
      "Disc(%)":0,
      "Taxable":0,
      "CGST(%)":0,
      "SGST(%)":0,
      "IGST(%)":0,
    };
    var billForm = this.state.billForm;
    billForm.push(payload);
    console.log('add row',billForm);
    this.setState({billForm:billForm});
  }
  renderOptions = (index) =>{
    const { classes } = this.props;
    if(index===this.state.billForm.length-1){
      return(
        <Fab size="small" color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon onClick={this.addRow} />
        </Fab>
      )
    }
    return(
      <Fab size="small" color="primary" aria-label="Delete" className={classes.fab}>
        <DeleteIcon onClick={() => this.deleteRow(index)} />
      </Fab>
    )
  }

  setValue = (index,payload) => {
    var billForm = this.state.billForm;
    console.log(payload);
    var newpayload = {
      "id":this.state.billForm[index]["id"],
      "Product":payload["display_name"],
      "Pack":payload["pack_size"],
      "MFG":payload["manufacturer_name"],
      "Batch":"",
      "Expiry":"",
      "Quantity":0,
      "Free":0,
      "MRP":payload["selling_price"],
      "Rate":0,
      "Disc(%)":0,
      "Taxable":0,
      "CGST(%)":0,
      "SGST(%)":0,
      "IGST(%)":0,
    };
    billForm[index]=newpayload;
    console.log(newpayload);
    this.setState({billForm:billForm});
  }

  states = (event,index) => {
    var key = event.target.name;
    var val = event.target.value;
    console.log('inside states function',this.state.billForm,key,val);
    this.setState(prevState => {
      var newbillForm = {...prevState.billForm};
      newbillForm[index][key] = val;
      console.log(newbillForm);
      return {newbillForm};
    })
  }

  render() {
    console.log(this.state.billForm);
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
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product</th>
                <th scope="col">Pack</th>
                <th scope="col">MFG</th>
                <th scope="col">Batch</th>
                <th scope="col">Expiry</th>
                <th scope="col">Quantity</th>
                <th scope="col">Free</th>
                <th scope="col">MRP</th>
                <th scope="col">Rate</th>
                <th scope="col">Disc(%)</th>
                <th scope="col">Taxable</th>
                <th scope="col">CGST(%)</th>
                <th scope="col">SGST(%)</th>
                <th scope="col">IGST(%)</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody >
              {this.state.billForm.map((row,index)=>(
                <tr key={row["id"]}>
                  <th scope="row" className={classes.tableItem}>{index+1}</th>
                  <td className={classes.tableItem}>
                    <div className={classes.AutoComplete} >
                      <Dropdown id={index} key={index} onClick={this.setValue} onChange={firebaseutils.search_meds} options={this.props.coach.searchData} optionsLabel="display_name" label="Search Medicine" value={row['Product']} />
                    </div>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="Pack" name="Pack" value={this.state.billForm[index]['Pack']}/>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField fullWidth className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="Manufacturer" name="MFG" value={this.state.billForm[index]['MFG']} />
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="Batch" name="Batch" onChange={(event)=>this.states(event,index)} value={this.state.billForm[index]['Batch']} />
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="Expiry" name="Expiry" value={this.state.billForm[index]['Expiry']}/>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="QTY" name="Quantity" value={this.state.billForm[index]['Quantity']}/>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="Free" name="Free" value={this.state.billForm[index]['Free']}/>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="MRP" name="MRP" value={this.state.billForm[index]['MRP']}/>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="Rate" name="Rate" value={this.state.billForm[index]['Rate']}/>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="Disc" name="Disc(%)" value={this.state.billForm[index]['Disc(%)']}/>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="Taxable" name="Taxable" value={this.state.billForm[index]['Taxable']}/>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="CGST" name="CGST(%)" value={this.state.billForm[index]['CGST(%)']}/>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="SGST" name="SGST(%)" value={this.state.billForm[index]['SGST(%)']}/>
                  </td>
                  <td className={classes.tableItem}>
                    <TextField className={classes.eachTextfield} onChange={(event)=>this.states(event,index)} label="IGST" name="IGST(%)" value={this.state.billForm[index]['IGST(%)']}/>
                  </td>
                  <td className={classes.tableItem}>
                    {this.renderOptions(index)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
