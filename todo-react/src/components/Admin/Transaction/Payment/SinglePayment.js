import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Badge, Icon, Spin, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm,Skeleton } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import './content.css';
import { Input,InputNumber } from 'antd';
import { reactLocalStorage } from 'reactjs-localstorage';
import { inject, observer } from 'mobx-react';
import axios from "axios";
import BreadCrumb from '../../BreadCrumb';
const { Option } = Select;

var i = 0;
var password="";
var currentbalance="";
var currentbalanceid="";
var currentpenalty="";

var currentbalanceeqt="";
var currentbalanceeqtid="";
var currentpenaltyeqt="";
var finance="";
var miscnumber=0;
@inject('TodoStore')
@observer
class SinglePayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: 0,
            clients: [],
            propertys:[],
            amort:[],
            financing:[],
            payments:[],
            payment:[],
            superadmin:[],

            isloaded: false,
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        TodoStore.setAdding(true);
        var port = TodoStore.getPort;
        fetch(port + 'paymentschemerouter/')
        .then(res => res.json())
        .then(json => {
            this.setState({
                payment: json,
            })
        });
        fetch(port + 'accountrouter/super/')
        .then(res => res.json())
        .then(json => {
            this.setState({
                superadmin: json,
            })
        });
       fetch(port + 'clientrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    clients: json,
                })
            });
        fetch(port + 'propertyrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    propertys: json,
                })
        });
        fetch(port + 'amortrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    amort: json,
                })
        });
        fetch(port + 'paymentschemerouter/')
        .then(res => res.json())
        .then(json => {
            this.setState({
                financing: json,
            })
         });

         fetch(port + 'paymentrouter/')
         .then(res => res.json())
         .then(json => {
             this.setState({
                 payments: json,
             })
        });

        // window.addEventListener("resize", this.resize.bind(this));
        // this.resize();
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { isloaded, clients, sizes, propertys, amort,financing, type,payments,payment,superadmin } = this.state;

        const dataSource = [];
        const dataMisc = [];
        const dataEquity = [];
        const dataPayment = [];
        const admin = [];

        superadmin.map(record =>{
            password=record.password;
        });

        payment.map(item => (
            dataPayment.push({
                key: item._id,
                name: item.paymentname,
                percentage: item.percentage,
                numyear: item.numyear,
                status: item.status,
            })
        ));

        console.log(password);
        miscnumber=0;
        amort.map(record =>{
            var client;
            var property;
            payment.map((item) => {
               if(item._id===record.financing){
                    finance=item.paymentname;
               }
            });
            if(record._id===this.props.transact){
                client = record.clientid;
                property = record.propertyid;
                TodoStore.setClientId(client);
                TodoStore.setPropertyId(property);
                
                payments.map(records =>{
                    if((client===records.clientid)&&(property===records.propertyid)){
                        if(records.amorttype==="E"){
                           
                            dataEquity.push({
                                key:records._id,
                                clientid:records.clientid,
                                propertyid:records.propertyid,
                                paymentdate:records.paymentdate,
                                amortamount:records.amortamount,
                                amortpenalty:records.amortpenalty,
                                runningbalance:records.runningbalance,
                                payment2:records.payment2,
                                paymenttype:records.paymenttype,
                                chequenumber:records.chequenumber,
                                bankname:records.bankname,
                                branch:records.branch,
                                status:records.status
                            });
                            currentbalanceeqt=records.runningbalance;
                            currentbalanceeqtid=records._id;
                            currentpenaltyeqt=records.amortpenalty;
                        }else{
                            miscnumber++;
                            dataMisc.push({
                                key:records._id,
                                clientid:records.clientid,
                                propertyid:records.propertyid,
                                paymentdate:records.paymentdate,
                                amortamount:records.amortamount,
                                amortpenalty:records.amortpenalty,
                                runningbalance:records.runningbalance,
                                payment2:records.payment2,
                                paymenttype:records.paymenttype,
                                chequenumber:records.chequenumber,
                                bankname:records.bankname,
                                branch:records.branch,
                                status:records.status
                            });
                            currentbalance=records.runningbalance;
                            currentbalanceid=records._id;
                            currentpenalty=records.amortpenalty;
                            TodoStore.setAdding(false);
                        }

                    }
                })
                console.log("MISC NUMBER: "+miscnumber);
                var clientname;
                var propertyaddress;
                var TCP;
                clients.map(clientss =>{
                    if(clientss._id===client){
                        clientname=clientss.firstname +" "+clientss.lastname;
                    }
                })

                propertys.map(propers=>{
                    if(propers._id===property){
                        propertyaddress="Block : "+propers.block+" Lot: "+propers.lot;
                        TCP = propers.price;
                    }
                })

                dataSource.push({
                    key:record._id,
                    client:record.clientid,
                    fullname:clientname,
                    address:propertyaddress,
                    tcp:TCP,
                    property:record.propertyid,
                    amortmonth: record.amortmonths,
                    startdate: record.startdate,
                    reservation: record.reservation,
                    totalmisc: record.totalmisc,
                    totalequity: record.totalequity,
                    monthlymisc: record.monthlymisc,
                    monthlyequity: record.monthlyequity,
                    penaltymisc: record.penaltymiscpercent,
                    penaltyequity: record.penaltyequitypercent
                })
              
              
            }
        })
       
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP',
        });
        const datainfo = dataSource.map((records,index)=>{
            TodoStore.setPenalty(records.penaltymisc);
            return(
                <React.Fragment>
                     <Col xs={6} md={6}>
                                                <Row>
                                                    <Col xs={4} md={4}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#8c8c8c'
                                                        }}>
                                                            Client Name: 
                                                        </h4>
                                                    </Col>
                                                    <Col xs={8} md={8}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#000000'
                                                        }}>
                                                            {records.fullname}
                                                        </h4>
                                                    </Col>
                                                    <Col xs={4} md={4}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#8c8c8c'
                                                        }}>
                                                            Property: 
                                                        </h4>
                                                    </Col>
                                                    <Col xs={8} md={8}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#000000'
                                                        }}>
                                                            {records.address}
                                                        </h4>
                                                    </Col>
                                                    <Col xs={4} md={4}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#8c8c8c'
                                                        }}>
                                                            TCP: 
                                                        </h4>
                                                    </Col>
                                                    <Col xs={8} md={8}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#000000'
                                                        }}>
                                                            {formatter.format(records.tcp)}
                                                           
                                                        </h4>
                                                    </Col>
                                                    <Col xs={4} md={4}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#8c8c8c'
                                                        }}>
                                                            Total Miscellaneous Fee: 
                                                        </h4>
                                                    </Col>
                                                    <Col xs={8} md={8}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#000000'
                                                        }}>
                                                            {formatter.format(records.totalmisc)}
                                                          
                                                        </h4>
                                                    </Col>
                                                    <Col xs={4} md={4}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#8c8c8c'
                                                        }}>
                                                             {finance==="In-House" &&
                                                                <span>Total Downpayment:</span>
                                                            }
                                                           {finance==="Pag-ibig" &&
                                                                <span> Total Equity Fee:</span> 
                                                            }
                                                            
                                                        </h4>
                                                    </Col>
                                                    <Col xs={8} md={8}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#000000'
                                                        }}>
                                                            {formatter.format(records.totalequity)}
                                                          
                                                        </h4>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={6} md={6}>
                                                <Row>
                                                    <Col xs={4} md={4}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#8c8c8c'
                                                        }}>
                                                            # Months: 
                                                        </h4>
                                                    </Col>
                                                    <Col xs={8} md={8}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#000000'
                                                        }}>
                                                            {records.amortmonth} months
                                                        </h4>
                                                    </Col>
                                                    <Col xs={4} md={4}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#8c8c8c'
                                                        }}>
                                                            Monthly Misc Fee: 
                                                        </h4>
                                                    </Col>
                                                    <Col xs={8} md={8}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#000000'
                                                        }}>
                                                            {formatter.format(records.monthlymisc)}
                                                           
                                                        </h4>
                                                    </Col>
                                                    <Col xs={4} md={4}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#8c8c8c'
                                                        }}>
                                                            {finance==="In-House" &&
                                                                <span>Monthly Downpayment:</span>
                                                            }
                                                            {finance==="Pag-ibig" &&
                                                                <span>Monthly Equity Fee:</span> 
                                                            }
                                                            
                                                        </h4>
                                                    </Col>
                                                    <Col xs={8} md={8}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#000000'
                                                        }}>
                                                            {formatter.format(records.monthlyequity)}
                                                          
                                                        </h4>
                                                    </Col>
                                                   
                                                    <Col xs={4} md={4}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#8c8c8c'
                                                        }}>
                                                           Reservation Fee: 
                                                        </h4>
                                                    </Col>
                                                    <Col xs={8} md={8}>
                                                        <h4 style={{
                                                            fontFamily:'Open Sans,sans-serif',
                                                            fontSize:'1em',
                                                            lineHeight:'2em',
                                                            color:'#000000'
                                                        }}>
                                                            {formatter.format(records.reservation)}
                                                          
                                                        </h4>
                                                    </Col>
                                                </Row>
                                               
                                            </Col>
                </React.Fragment>
            )

        })
      
        const loadRecords=()=>{
            var port = TodoStore.getPort;
            fetch(port + 'accountrouter/super/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    superadmin: json,
                })
            });
            fetch(port + 'clientrouter/')
                 .then(res => res.json())
                 .then(json => {
                     this.setState({
                         clients: json,
                     })
                 });
             fetch(port + 'propertyrouter/')
                 .then(res => res.json())
                 .then(json => {
                     this.setState({
                         propertys: json,
                     })
             });
             fetch(port + 'amortrouter/')
                 .then(res => res.json())
                 .then(json => {
                     this.setState({
                         amort: json,
                     })
             });
             fetch(port + 'paymentschemerouter/')
             .then(res => res.json())
             .then(json => {
                 this.setState({
                     financing: json,
                 })
              });
     
              fetch(port + 'paymentrouter/')
              .then(res => res.json())
              .then(json => {
                  this.setState({
                      payments: json,
                  })
             });
        }
        const getMisctAmortId=(value)=>{
            TodoStore.setUpdateId(value);
            TodoStore.setUpdateModal(true);
          
        }
        const getMiscVoidId=(value)=>{
            TodoStore.setUpdateId(value);
            TodoStore.setVoidMiscModal(true);
        }
        const getEquityVoidId=(value)=>{
            TodoStore.setUpdateId(value);
            TodoStore.setVoidEqtModal(true);
        }
        const getEquityAmortId=(value)=>{
            TodoStore.setUpdateId(value);
            TodoStore.setAddModal(true);
           
        }
        const submitPaidEquity=()=>{
            var paymenttype = TodoStore.getPaymentType;
            var ar = TodoStore.getAReceipt;
            var paid = TodoStore.getPayment;
            if(paymenttype==="Bank"){
                var bankname = TodoStore.getBankName;
                var bankbranch = TodoStore.getBankBranch;
                var bankcheque = TodoStore.getBankCheque;
                if((ar.length===0)||(paid.length===0)||(bankname.length===0)||(bankbranch.length===0)||(bankcheque.length===0)){
                    openNotification("Blank");
                }else{
                    payEquity();
                } 
              
            }else{
                if((ar.length===0)||(paid.length===0)){
                    openNotification("Blank");
                }else{
                    payEquity();
                } 
            }   
        }
        const submitPaidMisc=()=>{
            var paymenttype = TodoStore.getPaymentType;
            var ar = TodoStore.getAReceipt;
            var paid = TodoStore.getPayment;
            if(paymenttype==="Bank"){
                var bankname = TodoStore.getBankName;
                var bankbranch = TodoStore.getBankBranch;
                var bankcheque = TodoStore.getBankCheque;
                if((ar.length===0)||(paid.length===0)||(bankname.length===0)||(bankbranch.length===0)||(bankcheque.length===0)){
                    openNotification("Blank");
                }else{
                    payMisc();
                }
                
            }else{
                if((ar.length===0)||(paid.length===0)){
                    openNotification("Blank");
                }else{
                    payMisc();
                } 
            }           
        }
        const submitVoidEquity=()=>{
            var port = TodoStore.getPort;
            var id=TodoStore.getUpdateId;
            var getpassword=TodoStore.getPassword;
            var currentpay="";
            var newcurrent=0;
            var penalty = TodoStore.getPenalty;
            var newpenalty=0;
            // var currentbalance="";
            // var currentbalanceid="";
            // var currentpenalty="";

            // console.log(currentpenaltyeqt);
            // console.log(currentbalanceeqt);

            dataEquity.map(record=>{
                if(record.key===id){
                    currentpay=record.payment2;
                }
            });
           
            if(getpassword.length===0){
                openNotification("Password");
            }else{
                if(getpassword===password){
                    TodoStore.setLoading(true);

                    newcurrent=parseFloat(currentbalanceeqt)+parseFloat(currentpay);
                    newpenalty=(parseFloat(currentpay)*parseFloat(penalty))+parseFloat(currentpenaltyeqt);
                    // console.log("New Current:"+ newcurrent);
                    // console.log("New penalty:"+ newpenalty);
                    const cash={
                        runningbalance:newcurrent,
                        amortpenalty:newpenalty 
                    }
                   
                    axios.post(port+'paymentrouter/updateneweqt/'+currentbalanceeqtid, cash)
                    .then(res => {
                        console.log(res.data);
                    })
                    const voids={
                        status:"VOID",
                        amortpenalty:currentpenalty 
                    }

                    axios.post(port+'paymentrouter/updateoldeqt/'+id, voids)
                    .then(res => {
                        console.log(res.data);
                        TodoStore.setHandleCancel();
                        TodoStore.setLoading(false);
                        TodoStore.setAddModal(false);
                        TodoStore.setAdding(true);
                        loadRecords();
                        var process = "Void Equity";
                        var logs="Void payment of client for equity";
                        addSystemLog(process,logs);
                    })
                   
                    // console.log("New Balance: "+newcurrent);
                    console.log("Old ID: "+id);
                    console.log("Current ID: "+currentbalanceid);
                }else{
                    openNotification("WrongPassword");
                }
            }
            
            // var paymenttype = TodoStore.getPaymentType;
            // var ar = TodoStore.getAReceipt;
            // var paid = TodoStore.getPayment;
            // if(paymenttype==="Cash"){
            
            //     if((ar.length===0)||(paid.length===0)){
            //         openNotification("Blank");
            //     }else{
            //         payMisc();
            //     } 
            // }else{
            //     var bankname = TodoStore.getBankName;
            //     var bankbranch = TodoStore.getBankBranch;
            //     var bankcheque = TodoStore.getBankCheque;
            //     if((ar.length===0)||(paid.length===0)||(bankname.length===0)||(bankbranch.length===0)||(bankcheque.length===0)){
            //         openNotification("Blank");
            //     }else{
            //         payMisc();
            //     } 
            // }           
        }
        const submitVoidMisc=()=>{
            var port = TodoStore.getPort;
            var id=TodoStore.getUpdateId;
            var getpassword=TodoStore.getPassword;
            var currentpay="";
            var newcurrent=0;
            var penalty = TodoStore.getPenalty;
            var newpenalty=0;
            // var currentbalance="";
            // var currentbalanceid="";
            // var currentpenalty="";
            dataMisc.map(record=>{
                if(record.key===id){
                    currentpay=record.payment2;
                }
            });
           
            if(getpassword.length===0){
                openNotification("Password");
            }else{
                if(getpassword===password){
                    TodoStore.setLoading(true);
                    newcurrent=parseFloat(currentbalance)+parseFloat(currentpay);
                    newpenalty=(parseFloat(currentpay)*parseFloat(penalty))+parseFloat(currentpenalty);
                    console.log("PENALTY:"+ penalty);
                    const cash={
                        runningbalance:newcurrent,
                        amortpenalty:newpenalty 
                    }
                   
                    axios.post(port+'paymentrouter/updatenewmisc/'+currentbalanceid, cash)
                    .then(res => {
                        console.log(res.data);
                    })
                    const voids={
                        status:"VOID",
                        amortpenalty:currentpenalty 
                    }

                    axios.post(port+'paymentrouter/updateoldmisc/'+id, voids)
                    .then(res => {
                        console.log(res.data);
                        TodoStore.setHandleCancel();
                        TodoStore.setLoading(false);
                        TodoStore.setAddModal(false);
                        TodoStore.setAdding(true);
                        loadRecords();
                        var process = "Void Miscellaneous";
                        var logs="Void payment of client for miscellaneous";
                        addSystemLog(process,logs);
                    })
                   
                    // console.log("New Balance: "+newcurrent);
                    console.log("Old ID: "+id);
                    console.log("Current ID: "+currentbalanceid);
                }else{
                    openNotification("WrongPassword");
                }
            }
            
            // var paymenttype = TodoStore.getPaymentType;
            // var ar = TodoStore.getAReceipt;
            // var paid = TodoStore.getPayment;
            // if(paymenttype==="Cash"){
            
            //     if((ar.length===0)||(paid.length===0)){
            //         openNotification("Blank");
            //     }else{
            //         payMisc();
            //     } 
            // }else{
            //     var bankname = TodoStore.getBankName;
            //     var bankbranch = TodoStore.getBankBranch;
            //     var bankcheque = TodoStore.getBankCheque;
            //     if((ar.length===0)||(paid.length===0)||(bankname.length===0)||(bankbranch.length===0)||(bankcheque.length===0)){
            //         openNotification("Blank");
            //     }else{
            //         payMisc();
            //     } 
            // }           
        }
        const computePenaltyEquity=(value)=>{
            var id = value;
            var paymentdate;
            var amortamount;
            var amortpenalty;
            var miscpenalty=parseFloat(TodoStore.getPenalty);
            var runningbalance;
            var balance;
            var penalty;

            dataEquity.map(recordmisc=>{
                if(recordmisc.key===id){
                     paymentdate=recordmisc.paymentdate;
                     amortamount = parseFloat(recordmisc.amortamount);
                     if(recordmisc.amortpenalty===""){
                         amortpenalty=parseFloat("0.00");
                     }else{
                         amortpenalty = parseFloat(recordmisc.amortpenalty);
                     }
                     runningbalance = parseFloat(recordmisc.runningbalance);
                }
            })
            balance = runningbalance.toFixed(2);
            var penalty = ((amortamount*miscpenalty)+amortpenalty).toFixed(2);
            const cash={
                amortpenalty:penalty,
                status:'UNPAID' 
            }
            console.log(cash);
            var todays = paymentdate;
            var dt = new Date(todays);
            dt.setMonth( dt.getMonth() + 1 );
            
            var days = dt.getDate();
            var monthss = dt.getMonth()+1;
            var years = dt.getFullYear();
            var newdate = years+"/"+monthss+"/"+days;

            const miscpayment ={
                clientid :TodoStore.getClientId,
                propertyid : TodoStore.getPropertyId,
                paymentdate : newdate,
                amorttype : 'E',
                amortamount : amortamount,
                amortpenalty :penalty,
                runningbalance : balance,
                payment2 :'',
                aror:'',
                paymenttype :'',
                chequenumber :'',
                bankname :'',
                branch:'',
                status :'NEW'
            }
            console.log(miscpayment);
            var port = TodoStore.getPort;
            axios.post(port+'paymentrouter/unpaid/'+id, cash)
            .then(res => {
                console.log(res.data);
            })
            axios.post(port+'paymentrouter/add', miscpayment)
                .then(res => {
                    console.log(res.data);
                    TodoStore.setLoading(false);
                    TodoStore.setUpdateModal(false);
                    TodoStore.setAdding(true);
                    loadRecords();
                    var process = "Penalty Equity";
                    var logs="Add penalty for client for equity";
                    addSystemLog(process,logs);
            })
        }
        const computePenalty=(value)=>{
            var id = value;
            var paymentdate;
            var amortamount;
            var amortpenalty;
            var miscpenalty=parseFloat(TodoStore.getPenalty);
            var runningbalance;
            var balance;
            var penalty;

            dataMisc.map(recordmisc=>{
                if(recordmisc.key===id){
                     paymentdate=recordmisc.paymentdate;
                     amortamount = parseFloat(recordmisc.amortamount);
                     if(recordmisc.amortpenalty===""){
                         amortpenalty=parseFloat("0.00");
                     }else{
                         amortpenalty = parseFloat(recordmisc.amortpenalty);
                     }
                     runningbalance = parseFloat(recordmisc.runningbalance);
                }
            })
            balance = runningbalance.toFixed(2);
            var penalty = ((amortamount*miscpenalty)+amortpenalty).toFixed(2);
            const cash={
                amortpenalty:penalty,
                status:'UNPAID' 
            }
            console.log(cash);
            var todays = paymentdate;
            var dt = new Date(todays);
            dt.setMonth( dt.getMonth() + 1 );
            
            var days = dt.getDate();
            var monthss = dt.getMonth()+1;
            var years = dt.getFullYear();
            var newdate = years+"/"+monthss+"/"+days;

            const miscpayment ={
                clientid :TodoStore.getClientId,
                propertyid : TodoStore.getPropertyId,
                paymentdate : newdate,
                amorttype : 'M',
                amortamount : amortamount,
                amortpenalty :penalty,
                runningbalance : balance,
                payment2 :'',
                aror:'',
                paymenttype :'',
                chequenumber :'',
                bankname :'',
                branch:'',
                status :'NEW'
            }
            console.log(miscpayment);
            var port = TodoStore.getPort;
            axios.post(port+'paymentrouter/unpaid/'+id, cash)
            .then(res => {
                console.log(res.data);
            })
            axios.post(port+'paymentrouter/add', miscpayment)
                .then(res => {
                    console.log(res.data);
                    TodoStore.setLoading(false);
                    TodoStore.setUpdateModal(false);
                    TodoStore.setAdding(true);
                    loadRecords();
                    var process = "Penalty Miscellaneous";
                    var logs="Add penalty for client for miscellaneous";
                    addSystemLog(process,logs);
            })
        }
        const payEquity = () => {
            var id = TodoStore.getUpdateId;
            var paid = parseFloat(TodoStore.getPayment);
            var paymenttype = TodoStore.getPaymentType;
            var ar = TodoStore.getAReceipt;
            var paymentdate;
            var amortamount;
            var amortpenalty;
            var miscpenalty=parseFloat(TodoStore.getPenalty);
            var runningbalance;
            var balance;
            var penalty;
            
            dataEquity.map(recordmisc=>{
                if(recordmisc.key===id){
                     paymentdate=recordmisc.paymentdate;
                     amortamount = parseFloat(recordmisc.amortamount);
                     if(recordmisc.amortpenalty===""){
                         amortpenalty=parseFloat("0.00");
                     }else{
                         amortpenalty = parseFloat(recordmisc.amortpenalty);
                     }
                     runningbalance = parseFloat(recordmisc.runningbalance);
                }
            })
            TodoStore.setLoading(true);
            if(paymenttype==="Cash"){
             TodoStore.setAdding(true);
                if(amortamount>paid){
                     penalty=(((amortamount-paid)*parseFloat(miscpenalty))+amortpenalty).toFixed(2);
                }else{
                    if(amortamount<paid){
                        var change = parseFloat(paid)-parseFloat(amortamount);
                        paid=parseFloat(paid)-parseFloat(change)
                        if(change>amortpenalty){
                            var others = change-amortpenalty;
                            paid=parseFloat(paid)+parseFloat(others)
                            penalty=0.00;
                        }else{
                            penalty=((amortpenalty)-change).toFixed(2);
                        }
                    }else{
                         penalty =amortpenalty.toFixed(2);
                    }
                   
                }
                balance = runningbalance - paid;
                console.log(penalty);
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy +'-'+ mm + '-' + dd ;
               var datepaid=today;
                const cash={
                    payment2:paid,
                    amortpenalty:penalty,
                    paymenttype:paymenttype,
                    runningbalance:balance,
                    datepaid:datepaid,
                    aror:ar,
                    status:'PAID' 
                }
 
             var todays = paymentdate;
             var dt = new Date(todays);
             dt.setMonth( dt.getMonth() + 1 );
             
             var days = dt.getDate();
             var monthss = dt.getMonth()+1;
             var years = dt.getFullYear();
             var newdate = years+"/"+monthss+"/"+days;
              
             const miscpayment ={
                 clientid :TodoStore.getClientId,
                 propertyid : TodoStore.getPropertyId,
                 paymentdate : newdate,
                 amorttype : 'E',
                 amortamount : amortamount,
                 amortpenalty :penalty,
                 runningbalance : balance,
                 payment2 :'',
                 aror:'',
                 paymenttype :'',
                 datepaid:'',
                 chequenumber :'',
                 bankname :'',
                 branch:'',
                 status :'NEW'
             }
             console.log(cash);
             console.log(miscpayment);
             var port = TodoStore.getPort;
             axios.post(port+'paymentrouter/update/'+id, cash)
             .then(res => {
                 console.log(res.data);
             })
             axios.post(port+'paymentrouter/add', miscpayment)
                 .then(res => {
                     console.log(res.data);
                     TodoStore.setLoading(false);
                     TodoStore.setAddModal(false);
                     TodoStore.setAdding(true);
                     loadRecords();
                     var process = "Pay Equity";
                    var logs="Enter payment of client for equity";
                    addSystemLog(process,logs);
             })
 
 
            }else if((paymenttype==="GCash")||(paymenttype==="Paymaya")||(paymenttype==="Paypal")){
                TodoStore.setAdding(true);
                if(amortamount>paid){
                     penalty=(((amortamount-paid)*parseFloat(miscpenalty))+amortpenalty).toFixed(2);
                }else{
                    if(amortamount<paid){
                        var change = parseFloat(paid)-parseFloat(amortamount);
                        paid=parseFloat(paid)-parseFloat(change)
                        if(change>amortpenalty){
                            var others = change-amortpenalty;
                            paid=parseFloat(paid)+parseFloat(others)
                            penalty=0.00;
                        }else{
                            penalty=((amortpenalty)-change).toFixed(2);
                        }
                    }else{
                         penalty =amortpenalty.toFixed(2);
                    }
                   
                }
                balance = runningbalance - paid;
                console.log(penalty);
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy +'-'+ mm + '-' + dd ;
               var datepaid=today;
                const cash={
                    payment2:paid,
                    amortpenalty:penalty,
                    paymenttype:paymenttype,
                    runningbalance:balance,
                    datepaid:datepaid,
                    aror:ar,
                    status:'PAID' 
                }
 
             var todays = paymentdate;
             var dt = new Date(todays);
             dt.setMonth( dt.getMonth() + 1 );
             
             var days = dt.getDate();
             var monthss = dt.getMonth()+1;
             var years = dt.getFullYear();
             var newdate = years+"/"+monthss+"/"+days;
              
             const miscpayment ={
                 clientid :TodoStore.getClientId,
                 propertyid : TodoStore.getPropertyId,
                 paymentdate : newdate,
                 amorttype : 'E',
                 amortamount : amortamount,
                 amortpenalty :penalty,
                 runningbalance : balance,
                 payment2 :'',
                 aror:'',
                 paymenttype :'',
                 datepaid:'',
                 chequenumber :'',
                 bankname :'',
                 branch:'',
                 status :'NEW'
             }
             console.log(cash);
             console.log(miscpayment);
             var port = TodoStore.getPort;
             axios.post(port+'paymentrouter/update/'+id, cash)
             .then(res => {
                 console.log(res.data);
             })
             axios.post(port+'paymentrouter/add', miscpayment)
                 .then(res => {
                     console.log(res.data);
                     TodoStore.setLoading(false);
                     TodoStore.setAddModal(false);
                     TodoStore.setAdding(true);
                     loadRecords();
                     var process = "Pay Equity";
                    var logs="Enter payment of client for equity";
                    addSystemLog(process,logs);
             })
            }else{
                 TodoStore.setAdding(true);
                var bankname = TodoStore.getBankName;
                var bankbranch = TodoStore.getBankBranch;
                var bankcheque = TodoStore.getBankCheque;
                if(amortamount>paid){
                 penalty=(((amortamount-paid)*parseFloat(miscpenalty))+amortpenalty).toFixed(2);
                 }else{
                     if(amortamount<paid){
                        var change = parseFloat(paid)-parseFloat(amortamount);
                        paid=parseFloat(paid)-parseFloat(change)
                        if(change>amortpenalty){
                            var others = change-amortpenalty;
                            paid=parseFloat(paid)+parseFloat(others)
                            penalty=0.00;
                        }else{
                            penalty=((amortpenalty)-change).toFixed(2);
                        }
                     }else{
                             penalty =amortpenalty.toFixed(2);
                     }
                     
                 }
                 balance = runningbalance - paid;
                 console.log(penalty);
                 var today = new Date();
                 var dd = String(today.getDate()).padStart(2, '0');
                 var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                 var yyyy = today.getFullYear();
                 today = yyyy +'-'+ mm + '-' + dd ;
                var datepaid=today;
                 const cheque={
                     payment2:paid,
                     amortpenalty:penalty,
                     paymenttype:paymenttype,
                     chequenumber:bankcheque,
                     bankname:bankname,
                     datepaid,datepaid,
                     branch:bankbranch,
                     status:'PAID' 
                 }
                 console.log(cheque);
                 var todays = paymentdate;
                 var dt = new Date(todays);
                 dt.setMonth( dt.getMonth() + 1 );
                 
                 var days = dt.getDate();
                 var monthss = dt.getMonth()+1;
                 var years = dt.getFullYear();
                 var newdate = years+"/"+monthss+"/"+days;
                  
                 const miscpayment ={
                     clientid :TodoStore.getClientId,
                     propertyid : TodoStore.getPropertyId,
                     paymentdate : newdate,
                     amorttype : 'E',
                     amortamount : amortamount,
                     amortpenalty :penalty,
                     runningbalance : balance,
                     payment2 :'',
                     aror:'',
                     paymenttype :'',
                     datepaid:'',
                     chequenumber :'',
                     bankname :'',
                     branch:'',
                     status :'NEW'
                 }
                 console.log(cheque);
                 console.log(miscpayment);
                 var port = TodoStore.getPort;
                 axios.post(port+'paymentrouter/updates/'+id, cheque)
                 .then(res => {
                     console.log(res.data);
                 })
                 axios.post(port+'paymentrouter/add', miscpayment)
                     .then(res => {
                         console.log(res.data);
                         TodoStore.setLoading(false);
                         TodoStore.setAddModal(false);
                         TodoStore.setAdding(true);
                         loadRecords();
                         var process = "Pay Equity";
                    var logs="Enter payment of client for equity";
                    addSystemLog(process,logs);
                 })
            }
         }
        const payMisc = () => {
           var id = TodoStore.getUpdateId;
           var paid = parseFloat(TodoStore.getPayment);
           var paymenttype = TodoStore.getPaymentType;
           var ar = TodoStore.getAReceipt;
           var paymentdate;
           var amortamount;
           var amortpenalty;
           var miscpenalty=parseFloat(TodoStore.getPenalty);
           var runningbalance;
           var balance;
           var penalty;
           
           dataMisc.map(recordmisc=>{
               if(recordmisc.key===id){
                    paymentdate=recordmisc.paymentdate;
                    amortamount = parseFloat(recordmisc.amortamount);
                    if(recordmisc.amortpenalty===""){
                        amortpenalty=parseFloat("0.00");
                    }else{
                        amortpenalty = parseFloat(recordmisc.amortpenalty);
                    }
                    runningbalance = parseFloat(recordmisc.runningbalance);
               }
           })
           TodoStore.setLoading(true);
           if(paymenttype==="Cash"){
            TodoStore.setAdding(true);
               if(amortamount>paid){
                    penalty=(((amortamount-paid)*parseFloat(miscpenalty))+amortpenalty).toFixed(2);
               }else{
                   if(amortamount<paid){
                        var change = parseFloat(paid)-parseFloat(amortamount);
                        paid=parseFloat(paid)-parseFloat(change)
                        if(change>amortpenalty){
                            var others = change-amortpenalty;
                            paid=parseFloat(paid)+parseFloat(others)
                            penalty=0.00;
                        }else{
                            penalty=((amortpenalty)-change).toFixed(2);
                        }
                        
                       
                   }else{
                        penalty =amortpenalty.toFixed(2);
                   }
                  
               }
               balance = runningbalance - paid;
               console.log(penalty);
               var today = new Date();
               var dd = String(today.getDate()).padStart(2, '0');
               var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
               var yyyy = today.getFullYear();
               today = yyyy +'-'+ mm + '-' + dd ;
              var datepaid=today;
               const cash={
                   payment2:paid,
                   amortpenalty:penalty,
                   runningbalance : balance,
                   paymenttype:paymenttype,
                   datepaid:datepaid,
                   aror:ar,
                   status:'PAID' 
               }

            var todays = paymentdate;
            var dt = new Date(todays);
            dt.setMonth( dt.getMonth() + 1 );
            
            var days = dt.getDate();
            var monthss = dt.getMonth()+1;
            var years = dt.getFullYear();
            var newdate = years+"/"+monthss+"/"+days;
             
            const miscpayment ={
                clientid :TodoStore.getClientId,
                propertyid : TodoStore.getPropertyId,
                paymentdate : newdate,
                amorttype : 'M',
                amortamount : amortamount,
                amortpenalty :penalty,
                runningbalance : balance,
                payment2 :'',
                aror:'',
                paymenttype :'',
                datepaid:'',
                chequenumber :'',
                bankname :'',
                branch:'',
                status :'NEW'
            }
            console.log(cash);
            console.log(miscpayment);
            var port = TodoStore.getPort;
            axios.post(port+'paymentrouter/update/'+id, cash)
            .then(res => {
                console.log(res.data);
            })
            axios.post(port+'paymentrouter/add', miscpayment)
                .then(res => {
                    console.log(res.data);
                    TodoStore.setLoading(false);
                    TodoStore.setUpdateModal(false);
                    TodoStore.setAdding(true);
                    loadRecords();
                    var process = "Pay Miscellaneous";
                    var logs="Enter payment of client for miscellaneous";
                    addSystemLog(process,logs);
            })


           }else if((paymenttype==="GCash")||(paymenttype==="Paymaya")||(paymenttype==="Paypal")){
            TodoStore.setAdding(true);
            if(amortamount>paid){
                 penalty=(((amortamount-paid)*parseFloat(miscpenalty))+amortpenalty).toFixed(2);
            }else{
                if(amortamount<paid){
                    var change = parseFloat(paid)-parseFloat(amortamount);
                    paid=parseFloat(paid)-parseFloat(change)
                    if(change>amortpenalty){
                        var others = change-amortpenalty;
                        paid=parseFloat(paid)+parseFloat(others);
                        penalty=0.00;
                    }else{
                        penalty=((amortpenalty)-change).toFixed(2);
                    }
                    
                }else{
                     penalty =amortpenalty.toFixed(2);
                }
               
            }
            balance = runningbalance - paid;
            console.log(penalty);
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy +'-'+ mm + '-' + dd ;
           var datepaid=today;
            const cash={
                payment2:paid,
                amortpenalty:penalty,
                runningbalance : balance,
                paymenttype:paymenttype,
                datepaid:datepaid,
                aror:ar,
                status:'PAID' 
            }

         var todays = paymentdate;
         var dt = new Date(todays);
         dt.setMonth( dt.getMonth() + 1 );
         
         var days = dt.getDate();
         var monthss = dt.getMonth()+1;
         var years = dt.getFullYear();
         var newdate = years+"/"+monthss+"/"+days;
          

        
         const miscpayment ={
             clientid :TodoStore.getClientId,
             propertyid : TodoStore.getPropertyId,
             paymentdate : newdate,
             amorttype : 'M',
             amortamount : amortamount,
             amortpenalty :penalty,
             runningbalance : balance,
             payment2 :'',
             aror:'',
             paymenttype :'',
             datepaid:'',
             chequenumber :'',
             bankname :'',
             branch:'',
             status :'NEW'
         }
         console.log(cash);
         console.log(miscpayment);
         var port = TodoStore.getPort;
         axios.post(port+'paymentrouter/update/'+id, cash)
         .then(res => {
             console.log(res.data);
         })
         axios.post(port+'paymentrouter/add', miscpayment)
             .then(res => {
                 console.log(res.data);
                 TodoStore.setLoading(false);
                 TodoStore.setUpdateModal(false);
                 TodoStore.setAdding(true);
                 loadRecords();
                 var process = "Pay Miscellaneous";
                 var logs="Enter payment of client for miscellaneous";
                 addSystemLog(process,logs);
         })
           }else{
                TodoStore.setAdding(true);
               var bankname = TodoStore.getBankName;
               var bankbranch = TodoStore.getBankBranch;
               var bankcheque = TodoStore.getBankCheque;
               if(amortamount>paid){
                penalty=(((amortamount-paid)*parseFloat(miscpenalty))+amortpenalty).toFixed(2);
                }else{
                    if(amortamount<paid){
                        var change = parseFloat(paid)-parseFloat(amortamount);
                        paid=parseFloat(paid)-parseFloat(change)
                        if(change>amortpenalty){
                            var others = change-amortpenalty;
                            paid=parseFloat(paid)+parseFloat(others);
                            penalty=0.00;
                        }else{
                            penalty=((amortpenalty)-change).toFixed(2);
                        }
                        
                    }else{
                            penalty =amortpenalty.toFixed(2);
                    }
                    
                }
                balance = runningbalance - paid;
                console.log(penalty);
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy +'-'+ mm + '-' + dd ;
               var datepaid=today;
                const cheque={
                    payment2:paid,
                    amortpenalty:penalty,
                    paymenttype:paymenttype,
                    chequenumber:bankcheque,
                    datepaid:datepaid,
                    bankname:bankname,
                    branch:bankbranch,
                    status:'PAID' 
                }
                console.log(cheque);
                var todays = paymentdate;
                var dt = new Date(todays);
                dt.setMonth( dt.getMonth() + 1 );
                
                var days = dt.getDate();
                var monthss = dt.getMonth()+1;
                var years = dt.getFullYear();
                var newdate = years+"/"+monthss+"/"+days;
                 
                const miscpayment ={
                    clientid :TodoStore.getClientId,
                    propertyid : TodoStore.getPropertyId,
                    paymentdate : newdate,
                    amorttype : 'M',
                    amortamount : amortamount,
                    amortpenalty :penalty,
                    runningbalance : balance,
                    payment2 :'',
                    aror:'',
                    paymenttype :'',
                    datepaid:datepaid,
                    chequenumber :'',
                    bankname :'',
                    branch:'',
                    status :'NEW'
                }
                console.log(cheque);
                console.log(miscpayment);
                var port = TodoStore.getPort;
                axios.post(port+'paymentrouter/updates/'+id, cheque)
                .then(res => {
                    console.log(res.data);
                })
                axios.post(port+'paymentrouter/add', miscpayment)
                    .then(res => {
                        console.log(res.data);
                        TodoStore.setLoading(false);
                        TodoStore.setUpdateModal(false);
                        TodoStore.setAdding(true);
                        loadRecords();
                        var process = "Pay Miscellaneous";
                        var logs="Enter payment of client for miscellaneous";
                        addSystemLog(process,logs);
                })
           }
        }
        
        const openNotification = (value) => {
            if (value === "Blank") {
                notification.open({
                    message: 'Warning',
                    description: 'All fields are required',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            }else if (value === "Password") {
                notification.open({
                    message: 'Warning',
                    description: 'Do not leave password blank',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            }else if (value === "WrongPassword") {
                notification.open({
                    message: 'Warning',
                    description: 'Wrong password',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            }
        }
        
        const handleCancel = () => {
            TodoStore.setHandleCancel();
           TodoStore.setUpdateModal(false);
           TodoStore.setAddModal(false);
        }
        const datamisc = dataMisc.map((records,index)=>{
            if(records.status==="NEW"){
                console.log(records.amortpenalty);
                return(
                    
                    <tr>
                        <td style={{
                            width: '5%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#fff1f0',
                            color: '#ffffff'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{index+1}</span>
                                                                </td>
                        <td style={{
                            width: '10%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#fff1f0',
                            color: '#ffffff'
                        }}>
                           <span style={{
                                color:'#000000'
                           }}>{records.paymentdate}</span>
                                                                </td>
    
                        <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#fff1f0',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.runningbalance)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#fff1f0',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.amortamount)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#fff1f0',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.amortpenalty)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#fff1f0',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.payment2)}</span>
                                                                </td>
                        <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#fff1f0',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                             <span style={{
                                color:'#000000'
                             }}>{
                                records.paymenttype
                             }</span>
                                                                </td>
                       
                       
                                                                <td style={{
                            width: '10%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            backgroundColor: '#fff1f0',
                            color: '#ffffff'
                        }}>
                            {records.status==="NEW" &&
                                <Badge status="warning" text="NEXT PAYMENT" />
                            }
                             {records.status==="PAID" &&
                                <Badge status="success" text="PAID" />
                            }
    
                            {records.status==="UNPAID" &&
                                <Badge status="danger" text="UNPAID" />
                            }
                        </td>
                        <td style={{
                            width: '15%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            backgroundColor: '#fff1f0',
                            color: '#ffffff'
                        }}>
                            {records.status==="NEW" &&
                            <React.Fragment>
                                <Button style={{
                                    color:'#ffffff',
                                    backgroundColor:'#096dd9',
                                    paddingTop:'-0.5em'
                                }}
                                onClick={(event)=>getMisctAmortId(records.key)}
                                >
                                   <Icon type="plus"/>
                                </Button>
                                <Popconfirm placement="topLeft" title="Save this and compute penalty?" onConfirm={(event)=>computePenalty(records.key)} okText="Yes" cancelText="No">
                                <Button style={{
                                    color:'#ffffff',
                                    backgroundColor:'#f5222d',
                                    paddingTop:'-0.5em'
                                }}
                               
                                >
                                   <Icon type="close"/>
                                </Button>
                                </Popconfirm>
                                </React.Fragment>
                            }
                            {records.status==="PAID" &&
                                <Badge status="success" text="PAID" />
                            }
    
                            {records.status==="UNPAID" &&
                                <Badge status="danger" text="PENALTY" />
                            }
                           
                                                                </td>
                    </tr>
                )
            }else{
                return(
                    <tr>
                        <td style={{
                            width: '5%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#ffccc7',
                            color: '#ffffff'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{index+1}</span>
                                                                </td>
                        <td style={{
                            width: '10%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#ffccc7',
                            color: '#ffffff'
                        }}>
                           <span style={{
                                color:'#000000'
                           }}>{records.paymentdate}</span>
                                                                </td>
    
                        <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#ffccc7',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>




                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.runningbalance)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#ffccc7',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.amortamount)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#ffccc7',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.amortpenalty)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#ffccc7',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.payment2)}</span>
                                                                </td>
                        <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#ffccc7',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                             <span style={{
                                color:'#000000'
                             }}>{
                                records.paymenttype
                             }</span>
                                                                </td>
    
                       
                                                                <td style={{
                            width: '15%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            backgroundColor: '#ffccc7',
                            color: '#ffffff'
                        }}>
                            {records.status==="NEW" &&
                                <Badge status="warning" text="NEXT PAYMENT" />
                            }
                             {records.status==="PAID" &&
                                <Badge status="success" text="PAID" />
                            }   
                             {records.status==="VOID" &&
                                <Badge status="danger" text="VOID" />
                            }
    
                            {records.status==="UNPAID" &&
                                <Badge status="danger" text="UNPAID" />
                            }
                            </td>
                            <td style={{
                            width: '10%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            backgroundColor: '#ffccc7',
                            color: '#ffffff'
                        }}>
                            {records.status==="NEW" &&
                                <Button style={{
                                    color:'#ffffff',
                                    backgroundColor:'#096dd9'
                                }}
                                onClick={(event)=>getMisctAmortId(records.key)}
                                >
                                   <Icon type="plus"/>
                                </Button>
                            }
                            {records.status==="PAID" &&
                                // <Badge status="success" text="PAID" />
                                <Button style={{
                                    color:'#ffffff',
                                    backgroundColor:'#13c2c2'
                                }}
                                onClick={(event)=>getMiscVoidId(records.key)}
                                >
                                   <Icon type="rollback"/>
                                </Button>
                            }
    
                           
                           
                                                                </td>
                    </tr>
                )
            }
           
        })



        const dataequity = dataEquity.map((records,index)=>{
            if(records.status==="NEW"){
                
                return(
                    <tr>
                        <td style={{
                            width: '5%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#f6ffed',
                            color: '#ffffff'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{index+1}</span>
                                                                </td>
                        <td style={{
                            width: '10%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#f6ffed',
                            color: '#ffffff'
                        }}>
                           <span style={{
                                color:'#000000'
                           }}>{records.paymentdate}</span>
                                                                </td>
    
                        <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#f6ffed',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.runningbalance)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#f6ffed',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.amortamount)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#f6ffed',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.amortpenalty)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#f6ffed',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.payment2)}</span>
                                                                </td>
                        <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#f6ffed',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                             <span style={{
                                color:'#000000'
                             }}>{
                                records.paymenttype
                             }</span>
                                                                </td>
                                                                <td style={{
                            width: '10%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            backgroundColor: '#f6ffed',
                            color: '#ffffff'
                        }}>
                           {records.status==="NEW" &&
                                <Badge status="warning" text="NEXT PAYMENT" />
                            }
                            {records.status==="PAID" &&
                                <Badge status="success" text="PAID" />
                            }
    
                            {records.status==="UNPAID" &&
                                <Badge status="danger" text="UNPAID" />
                            }
                           
                                                                </td>   
                        <td style={{
                            width: '10%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            backgroundColor: '#f6ffed',
                            color: '#ffffff'
                        }}>
                            {records.status==="NEW" &&
                            <React.Fragment>
                                <Button style={{
                                    color:'#ffffff',
                                    backgroundColor:'#096dd9',
                                    paddingTop:'-0.5em'
                                }}
                                onClick={(event)=>getEquityAmortId(records.key)}
                                >
                                   <Icon type="plus"/>
                                </Button>
                                <Popconfirm placement="topLeft" title="Save this and compute penalty?" onConfirm={(event)=>computePenaltyEquity(records.key)} okText="Yes" cancelText="No">
                                <Button style={{
                                    color:'#ffffff',
                                    backgroundColor:'#f5222d',
                                    paddingTop:'-0.5em'
                                }}
                               
                                >
                                   <Icon type="close"/>
                                </Button>
                                </Popconfirm>
                                </React.Fragment>
                            }
                            {records.status==="PAID" &&
                                <Badge status="success" text="PAID" />
                            }
    
                            {records.status==="UNPAID" &&
                                <Badge status="warning" text="PENALTY" />
                            }
                           
                                                                </td>
                    </tr>
                )
            }else{
                return(
                    <tr>
                        <td style={{
                            width: '5%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#b7eb8f',
                            color: '#ffffff'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{index+1}</span>
                                                                </td>
                        <td style={{
                            width: '10%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#b7eb8f',
                            color: '#ffffff'
                        }}>
                           <span style={{
                                color:'#000000'
                           }}>{records.paymentdate}</span>
                                                                </td>
    
                        <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#b7eb8f',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.runningbalance)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#b7eb8f',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.amortamount)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#b7eb8f',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.amortpenalty)}</span>
                                                                </td>
                                                                <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'right',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#b7eb8f',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                            <span style={{
                                color:'#000000'
                            }}>{formatter.format(records.payment2)}</span>
                                                                </td>
                        <td style={{
                            width: '12%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            paddingTop: '0.5em',
                            backgroundColor: '#b7eb8f',
                            color: '#ffffff',
                            paddingRight:'1em'
                        }}>
                             <span style={{
                                color:'#000000'
                             }}>{
                                records.paymenttype
                             }</span>
                                                                </td>
    
                        
                                                                <td style={{
                            width: '10%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            backgroundColor: '#b7eb8f',
                            color: '#ffffff'
                        }}>
                            {records.status==="NEW" &&
                                <Badge status="warning" text="NEXT PAYMENT" />
                            }
                             {records.status==="PAID" &&
                                <Badge status="success" text="PAID" />
                            }   
                             {records.status==="VOID" &&
                                <Badge status="danger" text="VOID" />
                            }
    
                            {records.status==="UNPAID" &&
                                <Badge status="danger" text="UNPAID" />
                            }
                            </td>
                            <td style={{
                            width: '10%',
                            border: '1px solid',
                            textAlign: 'center',
                            height: '2em',
                            backgroundColor: '#b7eb8f',
                            color: '#ffffff'
                        }}>
                            {records.status==="NEW" &&
                                <Button style={{
                                    color:'#ffffff',
                                    backgroundColor:'#096dd9'
                                }}
                                onClick={(event)=>getMisctAmortId(records.key)}
                                >
                                   <Icon type="plus"/>
                                </Button>
                            }
                            {records.status==="PAID" &&
                                // <Badge status="success" text="PAID" />
                                <Button style={{
                                    color:'#ffffff',
                                    backgroundColor:'#13c2c2'
                                }}
                                onClick={(event)=>getEquityVoidId(records.key)}
                                >
                                   <Icon type="rollback"/>
                                </Button>
                            }
    
                           
                           
                                                                </td>
                    </tr>
                )
            }
           
        })
       

    const addSystemLog=(process,logs)=>{
        //logss
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var today = year+"-"+month+"-"+day;
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        var currenttime = hours+":"+minutes+":"+seconds;
        var datetime=today+" "+currenttime;
        var email = reactLocalStorage.get('useremail');
        const userlog ={
            clientid :email,
            process:process,
            datetimes:datetime,
            dates:today,
            times:currenttime,
            logs:logs,
            status:'UNREAD'
        }
        var port = TodoStore.getPort;
        axios.post(port+'systemlogrouter/add', userlog)
        .then(res => {
            console.log(res.data);
        })
        
    }
        return ( 
            <React.Fragment>
                 <Container fluid={true} style={{ minHeight: '40em', height: 'auto', marginTop: '1em', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <BreadCrumb location="Transaction / List of Transactions" />
                        </Col>
                           {/* Void Equity modal */}
                           <Modal
                            visible={TodoStore.getVoidEqtModal}
                            title="Void Payment for Equity"
                            onOk={submitVoidEquity}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                Return
                                </Button>,
                                 <React.Fragment>
                                     {TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading}>
                                            Submit
                                         </Button>
                                     }
                                     {!TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading} onClick={submitVoidEquity}>
                                            Submit
                                         </Button>
                                     }
                                    
                                 </React.Fragment>
                                ,
                            ]}
                            >
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={4} md={4} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                            <h4 style={{
                                                fontFamily:'Open Sans,sans-serif',
                                                fontSize:'1em',
                                                color:'#8c8c8c'
                                            }}>
                                                Enter Owner's Password
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                             <Input.Password 
                                               value={TodoStore.getPassword}
                                               onChange={TodoStore.setPassword}
                                               placeholder="Enter password" />
                                        </Col>
                                    </Row>
                                </Col>
                               
                              
                                
                            </Row>
                            </Modal>
                            {/* End Modal */}
                        {/* Void MISC modal */}
                        <Modal
                            visible={TodoStore.getVoidMiscModal}
                            title="Void Payment for Miscellaneous"
                            onOk={submitVoidMisc}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                Return
                                </Button>,
                                 <React.Fragment>
                                     {TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading}>
                                            Submit
                                         </Button>
                                     }
                                     {!TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading} onClick={submitVoidMisc}>
                                            Submit
                                         </Button>
                                     }
                                    
                                 </React.Fragment>
                                ,
                            ]}
                            >
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={4} md={4} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                            <h4 style={{
                                                fontFamily:'Open Sans,sans-serif',
                                                fontSize:'1em',
                                                color:'#8c8c8c'
                                            }}>
                                                Enter Owner's Password
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                             <Input.Password 
                                               value={TodoStore.getPassword}
                                               onChange={TodoStore.setPassword}
                                               placeholder="Enter password" />
                                        </Col>
                                    </Row>
                                </Col>
                               
                              
                                
                            </Row>
                            </Modal>
                            {/* End Modal */}
                        <Modal
                            visible={TodoStore.getUpdateModal}
                            title="Set Payment for Miscellaneous"
                            onOk={submitPaidMisc}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                Return
                                </Button>,
                                 <React.Fragment>
                                     {TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading}>
                                            Submit
                                         </Button>
                                     }
                                     {!TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading} onClick={submitPaidMisc}>
                                            Submit
                                         </Button>
                                     }
                                    
                                 </React.Fragment>
                                ,
                            ]}
                            >
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={4} md={4} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                            <h4 style={{
                                                fontFamily:'Open Sans,sans-serif',
                                                fontSize:'1em',
                                                color:'#8c8c8c'
                                            }}>
                                                Payment Type
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                            <Select defaultValue={TodoStore.getPaymentType} style={{ width: '100%' }} onChange={TodoStore.setPaymentType}>
                                                <Option value="Cash">Cash</Option>
                                                <Option value="GCash">GCash</Option>
                                                <Option value="Paymaya">Paymaya</Option>
                                                <Option value="Paypa">Paypal</Option>
                                                <Option value="Bank">Bank</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} md={12} style={{
                                        marginTop:'1em'
                                    }}>
                                    <Row>
                                        <Col xs={4} md={4} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                            <h4 style={{
                                                fontFamily:'Open Sans,sans-serif',
                                                fontSize:'1em',
                                                color:'#8c8c8c'
                                            }}>
                                                Payment 
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                        <InputNumber 
                                             style={{width:'100%'}}
                                               value={TodoStore.getPayment}
                                               onChange={TodoStore.setPayment}
                                               placeholder="Enter payment" />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} md={12} style={{
                                        marginTop:'1em'
                                    }}>
                                    <Row>
                                        <Col xs={4} md={4} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                            <h4 style={{
                                                fontFamily:'Open Sans,sans-serif',
                                                fontSize:'1em',
                                                color:'#8c8c8c'
                                            }}>
                                                Acknowledgement Receipt 
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                            <Input 
                                               value={TodoStore.getAReceipt}
                                               onChange={TodoStore.setAReceipt}
                                               placeholder="Enter acknowledgement receipt" />
                                        </Col>
                                    </Row>
                                </Col>
                                {TodoStore.getPaymentType==="Bank" &&
                                    <React.Fragment>
                                    <Col xs={12} md={12} >
                                        <Row>
                                            <Col xs={4} md={4} style={{
                                                paddingTop:'0.5em',
                                                marginTop:'1em'
                                            }}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Cheque Number:
                                                </h4>
                                            </Col>
                                            <Col xs={8} md={8} style={{
                                                marginTop:'1em'
                                            }}>
                                               <Input 
                                               value={TodoStore.getBankCheque}
                                               onChange={TodoStore.setBankCheque}
                                               placeholder="Enter cheque number" />
                                            </Col>
                                            <Col xs={4} md={4} style={{
                                                paddingTop:'0.5em',
                                                marginTop:'1em'
                                            }}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Bank Name:
                                                </h4>
                                            </Col>
                                            <Col xs={8} md={8} style={{
                                                marginTop:'1em'
                                            }}>
                                               <Input 
                                               value={TodoStore.getBankName}
                                               onChange={TodoStore.setBankName}
                                               placeholder="Enter bank name" />
                                            </Col>
                                            <Col xs={4} md={4} style={{
                                                paddingTop:'0.5em',
                                                marginTop:'1em'
                                            }}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Bank Branch:
                                                </h4>
                                            </Col>
                                            <Col xs={8} md={8} style={{
                                                marginTop:'1em'
                                            }}>
                                               <Input 
                                               value={TodoStore.getBankBranch}
                                               onChange={TodoStore.setBankBranch}
                                               placeholder="Enter bank branch" />
                                            </Col>
                                        </Row>
                                    </Col>
                                    </React.Fragment>
                                }
                            </Row>
                            </Modal>
                            {/* End Modal */}
                            {/* Equity Modal */}
                            <Modal
                            visible={TodoStore.getAddModal}
                            title="Set Payment for Equity/Downpayment"
                            onOk={submitPaidEquity}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                Return
                                </Button>,
                                 <React.Fragment>
                                     {TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading}>
                                            Submit
                                         </Button>
                                     }
                                     {!TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading} onClick={submitPaidEquity}>
                                            Submit
                                         </Button>
                                     }
                                    
                                 </React.Fragment>
                                ,
                            ]}
                            >
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={4} md={4} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                            <h4 style={{
                                                fontFamily:'Open Sans,sans-serif',
                                                fontSize:'1em',
                                                color:'#8c8c8c'
                                            }}>
                                                Payment Type
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                            <Select defaultValue={TodoStore.getPaymentType} style={{ width: '100%' }} onChange={TodoStore.setPaymentType}>
                                                <Option value="Cash">Cash</Option>
                                                <Option value="GCash">GCash</Option>
                                                <Option value="Paymaya">Paymaya</Option>
                                                <Option value="Paypa">Paypal</Option>
                                                <Option value="Bank">Bank</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} md={12} style={{
                                        marginTop:'1em'
                                    }}>
                                    <Row>
                                        <Col xs={4} md={4} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                            <h4 style={{
                                                fontFamily:'Open Sans,sans-serif',
                                                fontSize:'1em',
                                                color:'#8c8c8c'
                                            }}>
                                                Payment 
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                            <InputNumber 
                                                style={{width:'100%'}}
                                               value={TodoStore.getPayment}
                                               onChange={TodoStore.setPayment}
                                               placeholder="Enter payment" />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} md={12} style={{
                                        marginTop:'1em'
                                    }}>
                                    <Row>
                                        <Col xs={4} md={4} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                            <h4 style={{
                                                fontFamily:'Open Sans,sans-serif',
                                                fontSize:'1em',
                                                color:'#8c8c8c'
                                            }}>
                                                Acknowledgement Receipt 
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                            <Input 
                                               value={TodoStore.getAReceipt}
                                               onChange={TodoStore.setAReceipt}
                                               placeholder="Enter acknowledgement receipt" />
                                        </Col>
                                    </Row>
                                </Col>
                                {TodoStore.getPaymentType==="Bank" &&
                                    <React.Fragment>
                                    <Col xs={12} md={12} >
                                        <Row>
                                            <Col xs={4} md={4} style={{
                                                paddingTop:'0.5em',
                                                marginTop:'1em'
                                            }}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Cheque Number:
                                                </h4>
                                            </Col>
                                            <Col xs={8} md={8} style={{
                                                marginTop:'1em'
                                            }}>
                                               <Input 
                                               value={TodoStore.getBankCheque}
                                               onChange={TodoStore.setBankCheque}
                                               placeholder="Enter cheque number" />
                                            </Col>
                                            <Col xs={4} md={4} style={{
                                                paddingTop:'0.5em',
                                                marginTop:'1em'
                                            }}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Bank Name:
                                                </h4>
                                            </Col>
                                            <Col xs={8} md={8} style={{
                                                marginTop:'1em'
                                            }}>
                                               <Input 
                                               value={TodoStore.getBankName}
                                               onChange={TodoStore.setBankName}
                                               placeholder="Enter bank name" />
                                            </Col>
                                            <Col xs={4} md={4} style={{
                                                paddingTop:'0.5em',
                                                marginTop:'1em'
                                            }}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Bank Branch:
                                                </h4>
                                            </Col>
                                            <Col xs={8} md={8} style={{
                                                marginTop:'1em'
                                            }}>
                                               <Input 
                                               value={TodoStore.getBankBranch}
                                               onChange={TodoStore.setBankBranch}
                                               placeholder="Enter bank branch" />
                                            </Col>
                                        </Row>
                                    </Col>
                                    </React.Fragment>
                                }
                            </Row>
                            </Modal>
                            {/* End Modal Equity */}
                        <Col xs={12} md={12} style={{ padding: '1em' }}>
                            <div style={{ padding: '1em', backgroundColor: '#fff', minHeight: '1em' }}>
                                <Row>
                                    <Col xs={12} md={12}
                                        style={{
                                            minHeight: '40em',
                                            height: 'auto',
                                            paddingTop:'2em'
                                        }}
                                    >
                                        <Row>
                                            {datainfo}
                                            <Col xs={12} md={12}>
                                            <Skeleton loading={TodoStore.getAdding} active>
                                                <table style={{
                                                    width:'100%',
                                                    marginTop:'2em'
                                                }}>
                                                    <thead>
                                                        
                                                        <tr>
                                                            <th style={{
                                                                width:'5%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#ff4d4f',
                                                                color:'#ffffff'
                                                            }}>
                                                                #
                                                            </th>
                                                            <th style={{
                                                                width:'10%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#ff4d4f',
                                                                color:'#ffffff'
                                                            }}>
                                                                DATE
                                                            </th>
                                                            <th style={{
                                                                width:'12%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#ff4d4f',
                                                                color:'#ffffff'
                                                            }}>
                                                               BALANCE
                                                            </th>
                                                            <th style={{
                                                                width:'12%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#ff4d4f',
                                                                color:'#ffffff'
                                                            }}>
                                                               MISC FEE
                                                            </th>
                                                            
                                                            <th style={{
                                                                width:'12%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#ff4d4f',
                                                                color:'#ffffff'
                                                            }}>
                                                               MISC PENALTY
                                                            </th>

                                                            <th style={{
                                                                width:'12%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#ff4d4f',
                                                                color:'#ffffff'
                                                            }}>
                                                               PAYMENT
                                                            </th>

                                                            <th style={{
                                                                width:'12%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#ff4d4f',
                                                                color:'#ffffff'
                                                            }}>
                                                               PAYMENT TYPE
                                                            </th>
                                                            <th style={{
                                                                width:'10%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#ff4d4f',
                                                                color:'#ffffff'
                                                            }}>
                                                               STATUS
                                                            </th>
                                                            <th style={{
                                                                width:'10%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#ff4d4f',
                                                                color:'#ffffff'
                                                            }}>
                                                               ACTION
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datamisc}
                                                    </tbody>
                                                </table>
                                                </Skeleton>
                                            </Col>
                                            {/* Equity */}
                                            <Col xs={12} md={12}>
                                            <Skeleton loading={TodoStore.getAdding} active>
                                                <table style={{
                                                    width:'100%',
                                                    marginTop:'2em'
                                                }}>
                                                    <thead>
                                                        
                                                        <tr>
                                                            <th style={{
                                                                width:'5%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#52c41a',
                                                                color:'#ffffff'
                                                            }}>
                                                                #
                                                            </th>
                                                            <th style={{
                                                                width:'10%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#52c41a',
                                                                color:'#ffffff'
                                                            }}>
                                                                DATE
                                                            </th>
                                                            <th style={{
                                                                width:'12%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#52c41a',
                                                                color:'#ffffff'
                                                            }}>
                                                               BALANCE
                                                            </th>
                                                            <th style={{
                                                                width:'12%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#52c41a',
                                                                color:'#ffffff'
                                                            }}>
                                                                {finance==="In-House" &&
                                                                    <span>DOWNPAYMENT</span>
                                                                }
                                                               {finance==="Pag-ibig" &&
                                                                    <span>EQUITY FEE</span>
                                                                }
                                                               
                                                            </th>
                                                            
                                                            <th style={{
                                                                width:'12%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#52c41a',
                                                                color:'#ffffff'
                                                            }}>
                                                                {finance==="In-House" &&
                                                                    <span>DOWNPAYMENT PENALTY</span>
                                                                }
                                                               {finance==="Pag-ibig" &&
                                                                    <span>EQUITY PENALTY</span>
                                                                }
                                                               
                                                            </th>

                                                            <th style={{
                                                                width:'12%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#52c41a',
                                                                color:'#ffffff'
                                                            }}>
                                                               PAYMENT
                                                            </th>

                                                            <th style={{
                                                                width:'12%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#52c41a',
                                                                color:'#ffffff'
                                                            }}>
                                                               PAYMENT TYPE
                                                            </th>
                                                            <th style={{
                                                                width:'10%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#52c41a',
                                                                color:'#ffffff'
                                                            }}>
                                                               STATUS
                                                            </th>
                                                            <th style={{
                                                                width:'10%',
                                                                border: '1px solid',
                                                                textAlign:'center',
                                                                height:'2em',
                                                                paddingTop:'0.5em',
                                                                backgroundColor:'#52c41a',
                                                                color:'#ffffff'
                                                            }}>
                                                               ACTION
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dataequity}
                                                    </tbody>
                                                </table>
                                                </Skeleton>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                  
                  
                </Container>
            </React.Fragment>
        );
    }
}



export default SinglePayment;