import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Chart } from "react-google-charts";
import { inject, observer } from 'mobx-react';
import axios from "axios";

var month_0="";
var month_1="";
var month_2="";
var month_3="";
var month_4="";
var month_5="";
var month_6="";
var month_7="";
var month_8="";
var month_9="";
var month_10="";
var month_11="";
var todayyear="";
@inject('TodoStore')
@observer
class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sizes: 0,
        payment: [],
        isloaded: false,
    }
  }
  componentDidMount() {
    const TodoStore = this.props.TodoStore;
    var port = TodoStore.getPort;
    var port = TodoStore.getPort;
    fetch(port + 'paymentrouter/')
    .then(res => res.json())
    .then(json => {
        this.setState({
            payment: json,
        })
});
      

  }
    render() {
      const TodoStore = this.props.TodoStore;
      var { isloaded,sizes,payment } = this.state;
      const dataSource = [];
      const dataMonth = [];

      var today = new Date();
      todayyear = today.getFullYear();
     
      var x=0;
      for(x=0;x<12;x++){
        var collections=0;
        var mon;
        payment.map((item)=>{
          if(item.datepaid!==""){
            var today = new Date();
            var year = today.getFullYear();
              var d = new Date(item.datepaid);
              var n = d.getMonth();
              var years = d.getFullYear();
            if((x===n)&&(years===year)){
                  collections=parseFloat(collections)+parseFloat(item.payment2);
                  console.log(x+":"+collections);
                  
            }
            mon=x;
          }
        })
        if(mon===0){
          month_0=collections.toFixed(2);
        }else if(mon===1){
          month_1=collections.toFixed(2);
        }else if(mon===2){
          month_2=collections.toFixed(2);
        }else if(mon===3){
          month_3=collections.toFixed(2);
        }else if(mon===4){
          month_4=collections.toFixed(2);
        }else if(mon===5){
          month_5=collections.toFixed(2);
        }else if(mon===6){
          month_6=collections.toFixed(2);
        }else if(mon===7){
          month_7=collections.toFixed(2);
        }else if(mon===8){
          month_8=collections.toFixed(2);
        }else if(mon===9){
          month_9=collections.toFixed(2);
        }else if(mon===10){
          month_10=collections.toFixed(2);
        }else if(mon===1){
          month_11=collections.toFixed(2);
        }
      }
     
         
      

        const monthlycollection = {
            'January':month_0,
            'February':month_1,
            'March':month_2,
            'April':month_3,
            'May':month_4,
            'June':month_5,
            'July':month_6,
            'August':month_7,
            'September':month_8,
            'October':month_9,
            'November':month_10,
            'December':month_11,
        }
        console.log(monthlycollection);
        const yearcollection = {
            'A':28175000,
            'B':33792000,
           
        }

        return (
            <React.Fragment>
                 
                 <Col xs={12} md={6} style={{ padding: '1em' }}>
                     <Row>
                       
                        <Col xs={12} md={12}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="BarChart"
                            loader={<div>Loading monthly collections...</div>}
                            data={[
                                ['Month', `${todayyear}`],
                                ['January',parseInt(`${monthlycollection.January}`)],
                                ['February', parseInt(`${monthlycollection.February}`)],
                                ['March', parseInt(`${monthlycollection.March}`)],
                                ['April', parseInt(`${monthlycollection.April}`)],
                                ['May',parseInt(`${monthlycollection.May}`)],
                                ['June', parseInt(`${monthlycollection.June}`)],
                                ['July', parseInt(`${monthlycollection.July}`)],
                                ['August', parseInt(`${monthlycollection.August}`)],
                                ['September',parseInt(`${monthlycollection.September}`)],
                                ['October', parseInt(`${monthlycollection.October}`)],
                                ['November', parseInt(`${monthlycollection.November}`)],
                                ['December', parseInt(`${monthlycollection.December}`)],
                              ]}
                              options={{
                                title: 'Monthly Collections',
                                chartArea: { width: '50%' },
                                hAxis: {
                                  title: 'Collections',
                                  minValue: 0,
                                },
                                vAxis: {
                                  title: 'Months',
                                },
                              }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                        </Col>
                     </Row>
                 </Col>
                 <Col xs={12} md={6} style={{ padding: '1em' }}>
                     <Row>
                        
                        <Col xs={12} md={12}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="BarChart"
                            loader={<div>Loading yearly collections...</div>}
                            data={[
                                ['Year', ''],
                                ['2019',parseInt(`${yearcollection.A}`)],
                                ['2020', parseInt(`${yearcollection.B}`)],
                              ]}
                              options={{
                                title: 'Yearly Collections',
                                chartArea: { width: '50%' },
                                hAxis: {
                                  title: 'Collections',
                                  minValue: 0,
                                },
                                vAxis: {
                                  title: 'Year',
                                },
                              }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                        </Col>
                     </Row>
                 </Col>
            </React.Fragment>
        )
    }
}

Collections.propTypes = {

};

export default Collections;