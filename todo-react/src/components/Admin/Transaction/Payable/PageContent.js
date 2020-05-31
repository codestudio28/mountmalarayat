import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Layout, DatePicker,Menu, Badge, Icon, Spin, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import './content.css';
import { Input,InputNumber } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from "axios";
import BreadCrumb from '../../BreadCrumb';
import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';


const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const ButtonGroup = Button.Group;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
var i = 0;
var counter=0;
var wordmoney="";

@inject('TodoStore')
@observer
class PageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: 0,
            voucherlist: [],
          
            isloaded: false,
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        var port = TodoStore.getPort;
       fetch(port + 'voucherrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    voucherlist: json,
                })
            });
       
       
     
        // window.addEventListener("resize", this.resize.bind(this));
        // this.resize();
    }

    resize() {
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav === true) {
            this.setState({ sizes: 1 });
        }
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { isloaded, voucherlist,sizes } = this.state;

        const dataSource = [];
        const loadRecord=()=>{
            
            var port = TodoStore.getPort;
           fetch(port + 'voucherrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        voucherlist: json,
                    })
                });
           
        }


        const openNotification = (value) => {
            if (value === "Blank") {
                notification.open({
                    message: 'Warning',
                    description: 'Dont leave required field blank',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            } else if (value === "Exist") {
                notification.open({
                    message: 'Warning',
                    description: 'Client already in the records',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            } else if (value === "Success") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully create voucher.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            } else if (value === "SuccessUpdate") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully update voucher.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }else if (value === "Approved") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully approved voucher.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }else if (value === "Server") {
                notification.open({
                    message: 'Warning',
                    description: 'Server Error',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });

            } else if (value === "Update") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully update client information.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            } else if (value === "Removed") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully removed voucher.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }
        }
       const convertNumberToWords=(amount)=> {
           var value="";
            var words = new Array();
            words[0] = '';
            words[1] = 'One';
            words[2] = 'Two';
            words[3] = 'Three';
            words[4] = 'Four';
            words[5] = 'Five';
            words[6] = 'Six';
            words[7] = 'Seven';
            words[8] = 'Eight';
            words[9] = 'Nine';
            words[10] = 'Ten';
            words[11] = 'Eleven';
            words[12] = 'Twelve';
            words[13] = 'Thirteen';
            words[14] = 'Fourteen';
            words[15] = 'Fifteen';
            words[16] = 'Sixteen';
            words[17] = 'Seventeen';
            words[18] = 'Eighteen';
            words[19] = 'Nineteen';
            words[20] = 'Twenty';
            words[30] = 'Thirty';
            words[40] = 'Forty';
            words[50] = 'Fifty';
            words[60] = 'Sixty';
            words[70] = 'Seventy';
            words[80] = 'Eighty';
            words[90] = 'Ninety';
            amount = amount.toString();
            var atemp = amount.split(".");
            var number = atemp[0].split(",").join("");
            var n_length = number.length;
            var words_string = "";
            if (n_length <= 9) {
                var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
                var received_n_array = new Array();
                for (var i = 0; i < n_length; i++) {
                    received_n_array[i] = number.substr(i, 1);
                }
                for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                    n_array[i] = received_n_array[j];
                }
                for (var i = 0, j = 1; i < 9; i++, j++) {
                    if (i == 0 || i == 2 || i == 4 || i == 7) {
                        if (n_array[i] == 1) {
                            n_array[j] = 10 + parseInt(n_array[j]);
                            n_array[i] = 0;
                        }
                    }
                }
                value = "";
                for (var i = 0; i < 9; i++) {
                    if (i == 0 || i == 2 || i == 4 || i == 7) {
                        value = n_array[i] * 10;
                    } else {
                        value = n_array[i];
                    }
                    if (value != 0) {
                        words_string += words[value] + " ";
                    }
                    if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                        words_string += "Crores ";
                    }
                    if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                        words_string += "Hundred ";
                    }
                    if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                        words_string += "Thousand ";
                    }
                    if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                        words_string += "Hundred and ";
                    } else if (i == 6 && value != 0) {
                        words_string += "Hundred ";
                    }
                }
                words_string = words_string.split("  ").join(" ");
            }
            // wordmoney = words_string;
            return words_string;
        }
        voucherlist.map((item) => {
            dataSource.push({
                key: item._id,
                dates: item.dates,
                payee: item.payee,
                amount: item.amount,
                cv: item.cv,
                bank: item.bank,
                explanation: item.explanation,
                cheque: item.cheque,
                terms: item.terms,
                prepared: item.prepared ,
                noted: item.noted,
                approved: item.approved,
                status: item.status
            })
        });
        console.log(dataSource);
        const removeVoucher=(value)=>{
            var port = TodoStore.getPort;
            axios.delete(port+'voucherrouter/'+value)
            .then(res => {
                console.log(res.data);
                 if (res.data === '101') {
                    openNotification("Removed");
                    loadRecord();
                   
                } else {
                    openNotification("Server");
                    TodoStore.setAdding(false);
                  
                  
                }
            });
        }
        const approveVoucher=(value)=>{
            var voucher ={
                status:'APPROVED'
            }
            var port = TodoStore.getPort;
            axios.post(port+'voucherrouter/status/'+value,voucher)
            .then(res => {
                console.log(res.data);
                 if (res.data === '101') {
                    openNotification("Approved");
                    loadRecord();
                   
                } else {
                    openNotification("Server");
                    TodoStore.setAdding(false);
                  
                  
                }
            });
        }
        const setPrint =(value)=>{
            TodoStore.setAddModal(true);
            TodoStore.setUpdateId(value);
            dataSource.map((item)=>{
                if(value===item.key){
                    TodoStore.setApprovedBy2(item.approved);
                    TodoStore.setVoucherDate2(item.dates);
                    TodoStore.setPayee2(item.payee);
                    TodoStore.setAmount(item.amount);
                    TodoStore.setCV2(item.cv);
                    TodoStore.setBankName2(item.bank);
                    TodoStore.setCheck2(item.cheque);
                    TodoStore.setTerms2(item.terms);
                    TodoStore.setExplanation2(item.explanation);
                    TodoStore.setPreparedBy2(item.prepared);
                    TodoStore.setNotedBy2(item.noted);
                }
            })
        }
        const setView =(value)=>{
            TodoStore.setUpdateModal(true);
            TodoStore.setUpdateId(value);
            dataSource.map((item)=>{
                if(value===item.key){
                    TodoStore.setApprovedBy2(item.approved);
                    TodoStore.setVoucherDate2(item.dates);
                    TodoStore.setPayee2(item.payee);
                    TodoStore.setAmount(item.amount);
                    TodoStore.setCV2(item.cv);
                    TodoStore.setBankName2(item.bank);
                    TodoStore.setCheck2(item.cheque);
                    TodoStore.setTerms2(item.terms);
                    TodoStore.setExplanation2(item.explanation);
                    TodoStore.setPreparedBy2(item.prepared);
                    TodoStore.setNotedBy2(item.noted);
                }
            })
        }
        const setEdit=(value)=>{
            TodoStore.setVoidMiscModal(true);
            TodoStore.setUpdateId(value);
            dataSource.map((item)=>{
                if(value===item.key){
                    TodoStore.setApprovedBy2(item.approved);
                    TodoStore.setVoucherDate2(item.dates);
                    TodoStore.setPayee2(item.payee);
                    TodoStore.setAmount(item.amount);
                    TodoStore.setCV2(item.cv);
                    TodoStore.setBankName2(item.bank);
                    TodoStore.setCheck2(item.cheque);
                    TodoStore.setTerms2(item.terms);
                    TodoStore.setExplanation2(item.explanation);
                    TodoStore.setPreparedBy2(item.prepared);
                    TodoStore.setNotedBy2(item.noted);
                }
            })
        }
        i = 0;
        counter=0;
        var starts = 0;
        var ends = 0;
        var numberdisplay = TodoStore.getNumberDisplay;
        var page = TodoStore.getPage;
        ends = parseInt(page) * parseInt(numberdisplay);
        starts = ends - parseInt(numberdisplay);

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP',
        });
        dataSource.sort((a, b) => b.dates.localeCompare(a.dates));
        const datalist = dataSource.filter(data => {
           
            if (TodoStore.filter === 'All') {
                return data.cv.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'CV') {
                return data.cv.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Payee') {
                return data.payee.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Date') {
                return data.dates.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Status') {
                return data.status.indexOf(TodoStore.search) >= 0
            } 
            return 0;
        })
            .map((data, index) => {
                i++;

                if ((index >= starts) && (index < ends)) {
                    if (sizes === 0) {
                        if((data.dates>=TodoStore.getDateFrom)&&(data.dates<=TodoStore.getDateTo)){
                            counter++;
                            return (

                                <tr key={i}>
                                    <td>{counter}</td>
                                   <td>{data.dates} </td>
                                    <td>{data.cv}</td>
                                    <td>{data.payee}</td>
                                    <td>{formatter.format(data.amount)}</td>
                                    <td>{data.status}</td>
                                    <td>
                                    <ButtonGroup>
                                        {data.status==="FOR APPROVAL" &&
                                            <Button style={{ backgroundColor: '#52c41a' }}
                                            onClick={(event) => setEdit(data.key)}>
                                               <Icon type="edit" style={{ color: '#fff', fontSize: '1.25em' }}></Icon>
                                           </Button>   
                                        }
                                        {data.status==="APPROVED" &&
                                           <Button style={{ backgroundColor: '#13c2c2' }}
                                           onClick={(event) => setPrint(data.key)}>
                                              <Icon type="printer" style={{ color: '#fff', fontSize: '1.25em' }}></Icon>
                                          </Button> 
                                        }
                                        
                                      
                                       {data.status==="FOR APPROVAL" &&
                                       <React.Fragment>
                                            <Button style={{ backgroundColor: '#1890ff' }}
                                                        onClick={(event) => setView(data.key)}>
                                           <Icon type="eye" style={{ color: '#fff', fontSize: '1.25em' }}></Icon>
                                           </Button>
                                           <Popconfirm
                                                       placement="topRight"
                                                       title="Do you want to remove this voucher?"
                                                       onConfirm={(event)=>removeVoucher(data.key)}
                                                       okText="Yes"
                                                       cancelText="No"
                                                   >
                                           <Button style={{ backgroundColor: '#f5222d' }}>
                                               <Icon type="delete" style={{ color: '#fff', fontSize: '1.25em' }}></Icon>
                                           </Button>
                                           </Popconfirm>
                                         
                                        { reactLocalStorage.get('usertype')=="superadministrator" &&
                                            <Popconfirm
                                            placement="topRight"
                                            title="Do you want to approve this voucher?"
                                            onConfirm={(event)=>approveVoucher(data.key)}
                                            okText="Yes"
                                            cancelText="No"
                                                 >
                                            <Button style={{ backgroundColor: '#1d39c4' }}>
                                                <Icon type="check" style={{ color: '#fff', fontSize: '1.25em' }}></Icon>
                                            </Button>
                                            </Popconfirm>
                                        }
                                          
                                       </React.Fragment>
                                       
                                       }
                               </ButtonGroup>
                                     
                               </td>
                                </tr>
                           )
                        }
                       
                    }else{

                    }

                }
            })
            const openSortModal =()=>{
                TodoStore.setDateModal(true);
            }
            const printPdf=()=>{
                var todays = new Date().toLocaleString();
                var doc = new jsPDF()
            doc.setFontSize(14)
            doc.text(50, 20, 'Mount Malarayat Property Development Corporation')
            doc.setFontSize(12)
            doc.text(85, 30, 'Cash/Cheque Voucher')
            doc.text(10, 45, 'Payee')
            doc.text(40, 45, `${TodoStore.getPayee}`)
            doc.text(120, 45, 'Date')
            doc.text(150, 45, `${TodoStore.getVoucherDate}`)
            doc.text(10, 55, 'Amount')
            doc.text(40, 55, `${formatter.format(TodoStore.getAmount)}`)
            doc.text(120, 55, 'CV#')
            doc.text(150, 55, `${TodoStore.getCV}`)
            doc.text(10, 65, 'Bank')
            doc.text(40, 65, `${TodoStore.getBankName}`)
            doc.text(120, 65, 'Cheque #')
            doc.text(150, 65, `${TodoStore.getCheck}`)
            doc.text(10, 75, 'Terms')
            doc.text(40, 75, `${TodoStore.getTerms}`)
            doc.text(10, 90, 'Amount in Words')
            doc.text(60, 90, '***'+`${convertNumberToWords(TodoStore.getAmount)}`+' Only***')
            doc.text(10, 100, 'Explanation')
            doc.text(60, 100, `${TodoStore.getExplanation}`)
            doc.text(10, 115, 'GL ACCOUNT')
            doc.text(110, 115, 'DEBIT')
            doc.text(150, 115, 'CREDIT')
            doc.text(10, 125, `${TodoStore.getExplanation}`)
            doc.text(110, 125, `${formatter.format(TodoStore.getAmount)}`)
            doc.text(150, 125, '')
            doc.text(10, 135, `${TodoStore.getBankName}`)
            doc.text(110, 135, '')
            doc.text(150, 135, `${formatter.format(TodoStore.getAmount)}`)
            doc.text(10, 155, 'Prepared By')
            doc.text(80, 155, 'Noted By')
            doc.text(150, 155, 'Approved By')
            doc.text(10, 165, `${TodoStore.getPreparedBy}`)
            doc.text(80, 165, `${TodoStore.getNotedBy}`)
            doc.text(150, 165, `${TodoStore.getApprovedBy}`)

            
                doc.save(todays+'.pdf')
            }
            const submitVoucher=()=>{
                var voucherdate=TodoStore.getVoucherDate;
                var payee = TodoStore.getPayee;
                var amount = TodoStore.getAmount;
                var cv =  TodoStore.getCV;
                var bank = TodoStore.getBankName;
                var check = TodoStore.getCheck;
                var terms = TodoStore.getTerms;
                var explanation =TodoStore.getExplanation;
                var preparedby = TodoStore.getPreparedBy;
                var notedby =TodoStore.getNotedBy;
                var approvedby = TodoStore.getApprovedBy;
                if ((voucherdate.length === 0) || (payee.length === 0) || (amount.length === 0) || (cv.length === 0) || (bank.length === 0)||
                (check.length === 0) || (terms.length === 0) || (preparedby.length === 0) || (notedby.length === 0) || (approvedby.length === 0)|| (explanation.length === 0)) {
                    openNotification("Blank");
                }else{
                    TodoStore.setLoading(true);
                    const voucher = {
                        dates:voucherdate,
                        payee:payee,
                        amount:amount,
                        cv:cv,
                        bank:bank,
                        cheque:check,
                        explanation:explanation,
                        terms:terms,
                        prepared:preparedby,
                        noted:notedby,
                        approved:approvedby,
                        status:"FOR APPROVAL" 
                    }
                    var port = TodoStore.getPort;
                    axios.post(port+'voucherrouter/add', voucher)
                        .then(res => {
                            console.log(res.data);
                             if (res.data === '101') {
                                openNotification("Success");
                                TodoStore.setLoading(false);
                                loadRecord();
                                TodoStore.setHandleCancel();
                            } else {
                                openNotification("Server");
                                TodoStore.setAdding(false);
                                TodoStore.setLoading(false);
                                TodoStore.setHandleCancel();
                            }
                        });
                }
               
            }
            const updateVoucher=()=>{
                var id=TodoStore.getUpdateId;
                var voucherdate=TodoStore.getVoucherDate;
                var payee = TodoStore.getPayee;
                var amount = TodoStore.getAmount;
                var cv =  TodoStore.getCV;
                var bank = TodoStore.getBankName;
                var check = TodoStore.getCheck;
                var terms = TodoStore.getTerms;
                var preparedby = TodoStore.getPreparedBy;
                var notedby =TodoStore.getNotedBy;
                var explanation =TodoStore.getExplanation;
                var approvedby = TodoStore.getApprovedBy;
                if ((voucherdate.length === 0) || (payee.length === 0) || (amount.length === 0) || (cv.length === 0) || (bank.length === 0)||
                (check.length === 0) || (terms.length === 0) || (preparedby.length === 0) || (notedby.length === 0) || (approvedby.length === 0)|| (explanation.length === 0)) {
                    openNotification("Blank");
                }else{
                    TodoStore.setLoading(true);
                    const voucher = {
                        dates:voucherdate,
                        payee:payee,
                        amount:amount,
                        cv:cv,
                        bank:bank,
                        cheque:check,
                        explanation:explanation,
                        terms:terms,
                        prepared:preparedby,
                        noted:notedby,
                        approved:approvedby
                    }
                    var port = TodoStore.getPort;
                    axios.post(port+'voucherrouter/update/'+id, voucher)
                        .then(res => {
                            console.log(res.data);
                             if (res.data === '101') {
                                openNotification("SuccessUpdate");
                                TodoStore.setLoading(false);
                                loadRecord();
                                TodoStore.setHandleCancel();
                            } else {
                                openNotification("Server");
                                TodoStore.setAdding(false);
                                TodoStore.setLoading(false);
                                TodoStore.setHandleCancel();
                            }
                        });
                }
               
            }
            const setHandleCancel=()=>{
                TodoStore.setHandleCancel();
            }
        return (

            <React.Fragment>

                <Container fluid={true} style={{ minHeight: '40em', height: 'auto', marginTop: '1em', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <BreadCrumb location="Transaction / Account's Payable" />
                        </Col>
                        <Col xs={12} md={12} style={{ padding: '1em' }}>
                            <div style={{ padding: '1em', backgroundColor: '#fff', minHeight: '1em' }}>
                                <Row>
                                    <Col xs={12} md={12}
                                        style={{
                                            minHeight: '40em',
                                            height: 'auto'
                                        }}
                                    >
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <Button  onClick={(event) => TodoStore.setVoidEqtModal(true)} style={{backgroundColor:'#1890ff',color:'#ffffff'}}>
                                                    Create Voucher
                                                </Button>       
                                            </Col>

                                            <Modal
                            visible={TodoStore.getVoidEqtModal}
                            title="Create Voucher"
                            // onOk={submitVoidEquity}
                            onCancel={setHandleCancel}
                            footer={[
                                <Button key="back" onClick={setHandleCancel}>
                                Return
                                </Button>,
                                 <React.Fragment>
                                     {TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading}>
                                            Submit
                                         </Button>
                                     }
                                     {!TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading} onClick={submitVoucher}>
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
                                                Date
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                            <DatePicker  onChange={TodoStore.setVoucherDate} />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Payee
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getPayee}
                                               onChange={TodoStore.setPayee}
                                               placeholder="Enter payee" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Amount
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <InputNumber 
                                                style={{width:'100%'}}
                                               value={TodoStore.getAmount}
                                               onChange={TodoStore.setAmount}
                                               placeholder="Enter amount" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                CV
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getCV}
                                               onChange={TodoStore.setCV}
                                               placeholder="Enter CV" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Bank
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getBankName}
                                               onChange={TodoStore.setBankName}
                                               placeholder="Enter bank name" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Cheque #
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getCheck}
                                               onChange={TodoStore.setCheck}
                                               placeholder="Enter check number" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Terms
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getTerms}
                                               onChange={TodoStore.setTerms}
                                               placeholder="Enter terms" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Explanation
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getExplanation}
                                               onChange={TodoStore.setExplanation}
                                               placeholder="Enter explanation" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Prepared by
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getPreparedBy}
                                               onChange={TodoStore.setPreparedBy}
                                               placeholder="Enter name" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Noted by
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getNotedBy}
                                               onChange={TodoStore.setNotedBy}
                                               placeholder="Enter name" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Approved by
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getApprovedBy}
                                               onChange={TodoStore.setApprovedBy}
                                               placeholder="Enter name" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            </Modal>

                            {/* Update Voucher */}
                            <Modal
                            visible={TodoStore.getVoidMiscModal}
                            title="Update Voucher"
                            // onOk={submitVoidEquity}
                            onCancel={setHandleCancel}
                            footer={[
                                <Button key="back" onClick={setHandleCancel}>
                                Return
                                </Button>,
                                 <React.Fragment>
                                     {TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading}>
                                            Submit
                                         </Button>
                                     }
                                     {!TodoStore.getLoading &&
                                         <Button key="submit" type="primary" loading={TodoStore.getLoading} onClick={updateVoucher}>
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
                                                Date
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                            <DatePicker defaultValue={moment(`${TodoStore.getVoucherDate}`, dateFormat)} onChange={TodoStore.setVoucherDate} />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Payee
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getPayee}
                                               onChange={TodoStore.setPayee}
                                               placeholder="Enter payee" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Amount
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <InputNumber 
                                                style={{width:'100%'}}
                                               value={TodoStore.getAmount}
                                               onChange={TodoStore.setAmount}
                                               placeholder="Enter amount" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                CV
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getCV}
                                               onChange={TodoStore.setCV}
                                               placeholder="Enter CV" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Bank
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getBankName}
                                               onChange={TodoStore.setBankName}
                                               placeholder="Enter bank name" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Cheque #
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getCheck}
                                               onChange={TodoStore.setCheck}
                                               placeholder="Enter check number" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Terms
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getTerms}
                                               onChange={TodoStore.setTerms}
                                               placeholder="Enter terms" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Explanation
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getExplanation}
                                               onChange={TodoStore.setExplanation}
                                               placeholder="Enter explanation" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Prepared by
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getPreparedBy}
                                               onChange={TodoStore.setPreparedBy}
                                               placeholder="Enter name" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Noted by
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getNotedBy}
                                               onChange={TodoStore.setNotedBy}
                                               placeholder="Enter name" />
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Approved by
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getApprovedBy}
                                               onChange={TodoStore.setApprovedBy}
                                               placeholder="Enter name" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            </Modal>
                            {/* View Modal */}
                              {/* View Voucher */}
                              <Modal
                            visible={TodoStore.getUpdateModal}
                            title="View Voucher"
                            // onOk={submitVoidEquity}
                            onCancel={setHandleCancel}
                            footer={[
                                <Button key="back" onClick={setHandleCancel}>
                                Return
                                </Button>,
                                
                                
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
                                                Date
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8}>
                                        <Input 
                                               value={TodoStore.getVoucherDate}
                                               onChange={TodoStore.setPayee}
                                               placeholder="Enter payee" 
                                               disabled/>
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Payee
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getPayee}
                                               onChange={TodoStore.setPayee}
                                               placeholder="Enter payee"
                                               disabled/>
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Amount
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <InputNumber 
                                                style={{width:'100%'}}
                                               value={TodoStore.getAmount}
                                               onChange={TodoStore.setAmount}
                                               placeholder="Enter amount"
                                               disabled/>
                                        </Col>
                                    </Row>
                                </Col>
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
                                                CV
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getCV}
                                               onChange={TodoStore.setCV}
                                               placeholder="Enter CV"
                                               disabled/>
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Bank
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getBankName}
                                               onChange={TodoStore.setBankName}
                                               placeholder="Enter bank name"
                                               disabled/>
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Cheque #
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getCheck}
                                               onChange={TodoStore.setCheck}
                                               placeholder="Enter check number"
                                               disabled/>
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Terms
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getTerms}
                                               onChange={TodoStore.setTerms}
                                               placeholder="Enter terms"
                                               disabled/>
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Explanation
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getExplanation}
                                               onChange={TodoStore.setExplanation}
                                               placeholder="Enter explanation"
                                               disabled/>
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Prepared by
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getPreparedBy}
                                               onChange={TodoStore.setPreparedBy}
                                               placeholder="Enter name"
                                               disabled/>
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Noted by
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getNotedBy}
                                               onChange={TodoStore.setNotedBy}
                                               placeholder="Enter name" disabled/>
                                        </Col>
                                    </Row>
                                </Col>
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
                                                Approved by
                                            </h4>
                                        </Col>
                                        <Col xs={8} md={8} style={{
                                            paddingTop:'0.5em'
                                        }}>
                                             <Input 
                                               value={TodoStore.getApprovedBy}
                                               onChange={TodoStore.setApprovedBy}
                                               placeholder="Enter name"  disabled/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            </Modal>

                           
                            {/* Print Modal */}
                              {/* View Print Voucher */}
                              <Modal
                            visible={TodoStore.getAddModal}
                            title="Print Preview Voucher"
                            onOk={printPdf}
                            onCancel={setHandleCancel}
                            footer={[
                                <Button key="back" onClick={setHandleCancel}>
                                Return
                                </Button>,
                                <Button key="print" style={{backgroundColor:'#1890ff',color:'#ffffff'}} onClick={printPdf}>
                                    Download PDF
                                </Button>,
                                
                                
                            ]}
                            >
                            <Row>
                            <Col xs={12} md={12} id="vouch">
                                <Row>
                                    <Col xs={12} md={12} style={{textAlign:'center'}}>
                                            <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1.1em',
                                                    color:'#8c8c8c',
                                                    fontWeight:'700'
                                                }}>
                                                    Mount Malarayat Property Development Corporation
                                            </h4>
                                    </Col>
                                    <Col xs={12} md={12} style={{textAlign:'center',marginTop:'1em'}}>
                                            <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c',
                                                    fontWeight:'500'
                                                }}>
                                                   Cash/Check Voucher
                                            </h4>
                                    </Col>
                                    <Col xs={12} md={12} style={{marginTop:'1em'}}>
                                        <Row>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Payee
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    {TodoStore.getPayee}
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Date
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    {TodoStore.getVoucherDate}
                                                </h4>
                                            </Col>
                                        </Row>

                                    </Col>
                                    {/* 2nd row */}
                                    <Col xs={12} md={12} style={{marginTop:'0.5em'}}>
                                        <Row>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Amount
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    {formatter.format(TodoStore.getAmount)}
                                                </h4>
                                            </Col>
                                            
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    CV#
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    {TodoStore.getCV}
                                                </h4>
                                            </Col>
                                        </Row>

                                    </Col>
                                      {/* 3rd row */}
                                      <Col xs={12} md={12} style={{marginTop:'0.5em'}}>
                                        <Row>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Back
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    {TodoStore.getBankName}
                                                </h4>
                                            </Col>
                                           
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Cheque #
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    {TodoStore.getCheck}
                                                </h4>
                                            </Col>
                                        </Row>

                                    </Col>
                                    {/* 4th row */}
                                    <Col xs={12} md={12} style={{marginTop:'0.5em'}}>
                                        <Row>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Terms
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    {TodoStore.getTerms}
                                                </h4>
                                            </Col>
                                           
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                  
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                  
                                                </h4>
                                            </Col>
                                        </Row>

                                    </Col>
                                     {/* 5th row */}
                                     <Col xs={12} md={12} style={{marginTop:'1.5em'}}>
                                        <Row>
                                            <Col xs={4} md={4} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Amount in Words
                                                </h4>
                                            </Col>
                                            <Col xs={8} md={8} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    ***{convertNumberToWords(TodoStore.getAmount)} Only*** 
                                                </h4>
                                            </Col>
                                           
                                            
                                           
                                        </Row>

                                    </Col>
                                        {/* 6th row */}
                                     <Col xs={12} md={12} style={{marginTop:'1.5em'}}>
                                        <Row>
                                            <Col xs={4} md={4} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                   Explanation
                                                </h4>
                                            </Col>
                                            <Col xs={8} md={8} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    {TodoStore.getExplanation} 
                                                </h4>
                                            </Col>
                                           
                                        </Row>
                                    </Col>
                                        {/* 7th row */}
                                        <Col xs={12} md={12} style={{marginTop:'1.5em'}}>
                                        <Row>
                                            <Col xs={6} md={6} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                   GL ACCOUNTS
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                   DEBIT
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    CREDIT
                                                </h4>
                                            </Col>
                                        </Row>
                                    </Col>           
                                      {/* 8th row */}
                                      <Col xs={12} md={12} style={{marginTop:'0.5em'}}>
                                        <Row>
                                            <Col xs={6} md={6} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                   {TodoStore.getExplanation}
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                  {formatter.format(TodoStore.getAmount)}
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                   
                                                </h4>
                                            </Col>
                                        </Row>
                                    </Col>  
                                                   {/* 9th row */}
                                      <Col xs={12} md={12} style={{marginTop:'0.5em'}}>
                                        <Row>
                                            <Col xs={6} md={6} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                   {TodoStore.getBankName}
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                 
                                                </h4>
                                            </Col>
                                            <Col xs={3} md={3} >
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    {formatter.format(TodoStore.getAmount)}
                                                </h4>
                                            </Col>
                                        </Row>
                                    </Col>    
                                        {/* 10th row */}
                                        <Col xs={12} md={12} style={{marginTop:'1.5em'}}>
                                        <Row>
                                            <Col xs={4} md={4} style={{textAlign:'center'}}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                   Prepared By
                                                </h4>
                                            </Col>
                                            <Col xs={4} md={4} style={{textAlign:'center'}}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                  Noted By
                                                </h4>
                                            </Col>
                                            <Col xs={4} md={4} style={{textAlign:'center'}}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                    Approved By
                                                </h4>
                                            </Col>
                                        </Row>
                                    </Col>             
                                       {/* 11th row */}
                                       <Col xs={12} md={12} style={{marginTop:'0.5em'}}>
                                        <Row>
                                            <Col xs={4} md={4} style={{textAlign:'center'}}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                   {(TodoStore.getPreparedBy).toUpperCase()}
                                                </h4>
                                            </Col>
                                            <Col xs={4} md={4} style={{textAlign:'center'}}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                   {(TodoStore.getNotedBy).toUpperCase()}
                                                </h4>
                                            </Col>
                                            <Col xs={4} md={4} style={{textAlign:'center'}}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'0.9em',
                                                    color:'#8c8c8c'
                                                }}>
                                                     {(TodoStore.getApprovedBy).toUpperCase()}
                                                </h4>
                                            </Col>
                                        </Row>
                                    </Col>             

                                </Row>    
                            </Col>
                                
                                    
                            </Row>
                            </Modal>


                                            <Col xs={12} md={3} style={{ paddingTop: '0.5em' }}>
                                                <Row>
                                                    <Col xs={12} md={12}>
                                                        <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Filter by:</h5>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Select defaultValue={TodoStore.getFilter} style={{ width: '90%' }}
                                                            onChange={TodoStore.setFilter}>
                                                            <Option value="All">All</Option>
                                                            <Option value="Date">Date</Option>
                                                            <Option value="CV">CV#</Option>
                                                            <Option value="Payee">Payee</Option>
                                                            <Option value="Status">Status</Option>
                                                        </Select>
                                                    </Col>
                                                </Row>
                                            </Col>


                                            
                                            <Col xs={12} md={3} style={{ paddingTop: '0.5em' }}>
                                                <Row>
                                                    <Col xs={12} md={12}>
                                                        <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}># of Records to Display:</h5>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Select defaultValue={TodoStore.getNumberDisplay} style={{ width: '90%' }}
                                                            onChange={TodoStore.setNumberDisplay}>
                                                            <Option value="1">1</Option>
                                                            <Option value="2">2</Option>
                                                            <Option value="3">3</Option>
                                                            <Option value="10">10</Option>
                                                            <Option value="25">25</Option>
                                                            <Option value="50">50</Option>
                                                            <Option value="100">100</Option>
                                                            <Option value="150">150</Option>
                                                        </Select>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} md={3} style={{ paddingTop: '0.5em' }}>
                                                <Row>
                                                    <Col xs={12} md={12}>
                                                        <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Search:</h5>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Search
                                                            placeholder="Search here . . ."
                                                            style={{ width: '90%' }}
                                                            onChange={TodoStore.setSearch}
                                                            value={TodoStore.getSearch}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} md={3} style={{ paddingTop: '0.5em' }}>
                                                <Row>
                                                
                                                    <Col xs={12} md={12}>
                                                        <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Sort By Date:</h5>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                     <Button type="success"
                                                            style={{backgroundColor:'#36cfc9',color:'#ffffff'}}
                                                            onClick={(event) => openSortModal()}
                                                        >
                                                            Choose Date
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>   


                                            <Modal
          visible={TodoStore.getDateModal}
          title="Choose Date"
          
          onCancel={TodoStore.setHandleCancel}
          footer={[
            <Button key="back" onClick={TodoStore.setHandleCancel}>
              Return
            </Button>,
            
          ]}
        >
            <Row>
                <Col xs={6} md={6} style={{ paddingTop: '0.5em' }}>
                    <h5>From:</h5>
                </Col>
                <Col xs={6} md={6} style={{ paddingTop: '0.5em' }}>
                <   h5>To:</h5>
                </Col>
                <Col xs={6} md={6} style={{ paddingTop: '0.5em' }}>
                    <DatePicker onChange={TodoStore.setDateFrom} />
                </Col>
                <Col xs={6} md={6} style={{ paddingTop: '0.5em' }}>
                    <DatePicker onChange={TodoStore.setDateTo} />
                </Col>
            </Row>
        
        </Modal>
                                            <Col xs={12} md={12} style={{ paddingTop: '0.5em' }}>

                                               
                                                    <table className="table table-hover" style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Dates</th>
                                                                <th>CV</th>
                                                                <th>Payee</th>
                                                                <th>Amount</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {datalist}
                                                        </tbody>
                                                    </table>

                                                
                                                {/* {sizes !== 0 &&
                                                    <Col xs={12} md={12} style={{ paddingTop: '0.5em' }}>
                                                        <Row>
                                                            {datalist}
                                                        </Row>
                                                    </Col>
                                                } */}

                                                <Pagination style={{marginTop:'0.5em'}}
                                                    current={TodoStore.getPage}
                                                    total={(i / TodoStore.getNumberDisplay) * 10}
                                                    onChange={TodoStore.setPage} />
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

PageContent.propTypes = {

};

export default PageContent;