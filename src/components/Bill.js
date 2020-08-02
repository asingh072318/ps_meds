import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { PDFViewer, Page, Text, View, Document } from '@react-pdf/renderer';

const styles = theme => ({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});


class Bill extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    console.log('Bill Data: ',this.props.data);
    return (
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A4" style={classes.page}>
            <View style={classes.section}>
              <Text>Section #1</Text>
            </View>
            <View style={classes.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    )
  }
}

export default withStyles(styles)(Bill);
