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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// Binding the state and actions. These will be available as props to component


const styles = theme => ({
  rootpage:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
    justifyContent:'space-between',
  },
  pageIndicator: {
    color:'white',
    fontSize:'24px',
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
    height:'90px',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    flexWrap:'wrap',
  },
  table: {
    maxWidth:'80vw',
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

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
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
    this.setState({allUsers:allUsersarray});
  }
  componentWillMount(){
    firebaseutils.read_allusers();
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
        <div className={classes.pageIndicator}>Purchase</div>
        <div>
          <Card>
            <CardContent className={classes.topPurchase}>
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
            </CardContent>
          </Card>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.desc}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
