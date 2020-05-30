import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Layout,DatePicker, Menu, Badge, Icon, Spin, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import './content.css';
import { Input } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from "axios";
import BreadCrumb from '../../BreadCrumb';



const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const ButtonGroup = Button.Group;
const { Option } = Select;

var i = 0;
var count=0;
var alltotal=0;
var misctotal=0;
var equitytotal=0;
@inject('TodoStore')
@observer
class PageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: 0,
            client: [],
            property:[],
            amort:[],
            financing:[],
            payment:[],
            isloaded: false,
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        var port = TodoStore.getPort;
       fetch(port + 'clientrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    client: json,
                })
            });
        fetch(port + 'paymentrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    payment: json,
                })
        });
        fetch(port + 'propertyrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    property: json,
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
        var { isloaded, client, sizes, property, amort,financing, type,payment } = this.state;

        const dataSource = [];
        const dataDate = [];
        const dataPaymentMisc = [];
        const dataPaymentEquity = [];
        const dataClient = [];


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
                    description: 'Successfully add client to the system',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            } else if (value === "Server") {
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
                    description: 'Successfully removed client.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }
        }

        payment.map((item)=>{
            var firstname;
            var lastname;
            var block;
            var lot;
            client.map((item2) => {
                if(item.clientid===item2._id){
                    firstname = item2.firstname;
                    lastname = item2.lastname;
                }
            })
            property.map((item3)=>{
                if(item.propertyid===item3._id){
                    block = item3.block;
                    lot = item3.lot;
                   
                }
            })

            if((item.amorttype=="E")&&(item.status=="PAID")){
                dataPaymentEquity.push({
                    clientid:item.clientid,
                    propertyid:item.propertyid,
                    paymentdate:item.paymentdate,
                    fullname:firstname+' '+lastname,
                    block:block,
                    lot:lot,
                    payment:item.payment2
                })
                var count=0;
                dataDate.map((data)=>{
                    
                    if((data.paymentdate===item.paymentdate)&&(data.clientid===item.clientid)&&(data.propertyid===item.propertyid)){
                        count++;
                    }
                })
                if(count<=0){
                    dataDate.push({
                        paymentdate:item.paymentdate,
                        clientid:item.clientid,
                        propertyid:item.propertyid,
                        fullname:item.fullname,
                        block:item.block,
                        lot:item.lot,
                    })
                }


            }else if((item.amorttype=="M")&&(item.status=="PAID")){
                dataPaymentMisc.push({
                    clientid:item.clientid,
                    propertyid:item.propertyid,
                    paymentdate:item.paymentdate,
                    fullname:firstname+' '+lastname,
                    block:block,
                    lot:lot,
                    payment:item.payment2
    
                })
                var count=0;
                dataDate.map((data)=>{
                    
                    if((data.paymentdate===item.paymentdate)&&(data.clientid===item.clientid)&&(data.propertyid===item.propertyid)){
                        count++;
                    }
                })
                if(count<=0){
                    dataDate.push({
                        paymentdate:item.paymentdate,
                        clientid:item.clientid,
                        propertyid:item.propertyid,
                        fullname:item.fullname,
                        block:item.block,
                        lot:item.lot,
                    })
                }
            }
           
        })
        console.log(dataPaymentEquity);
        console.log(dataPaymentMisc);
        console.log(dataDate);

        dataDate.map((item)=>{
            var misc;
            var equity;
            var fullname;
            var block;
            var lot;
            dataPaymentMisc.map((item2)=>{
                if((item.paymentdate===item2.paymentdate)&&(item.clientid===item2.clientid)&&(item.propertyid===item2.propertyid)){
                    misc=item2.payment;
                    fullname=item2.fullname;
                    block=item2.block;
                    lot=item2.lot;
                }
            })
            dataPaymentEquity.map((item2)=>{
                if((item.paymentdate===item2.paymentdate)&&(item.clientid===item2.clientid)&&(item.propertyid===item2.propertyid)){
                    equity=item2.payment;
                    fullname=item2.fullname;
                    block=item2.block;
                    lot=item2.lot;
                }
            })
            dataSource.push({
                fullname:fullname,
                block:block,
                lot:lot,
                paymentdate:item.paymentdate,
                misc:misc,
                equity:equity
            })


        })

      
        console.log(dataSource);
        const setView =(value)=>{
            window.open("/payment/"+value,"_self");
        }

        i = 0;
        count=0;
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
        alltotal=0;
        misctotal=0;
        equitytotal=0;

        dataSource.sort((a, b) => b.paymentdate.localeCompare(a.paymentdate));
       
        console.log(TodoStore.getDateTo);
        console.log(TodoStore.getDateFrom);
       
        const datalist = dataSource.filter(data => {
           
            if (TodoStore.filter === 'All') {
                return data.fullname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Client Name') {
                return data.fullname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Block') {
                return data.block.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Lot') {
                return data.lot.indexOf(TodoStore.search) >= 0
            }  else if (TodoStore.filter === 'Payment Date') {
                return data.paymentdate.indexOf(TodoStore.search) >= 0
            } 
            return 0;
        })
            .map((data, index) => {
                
                i++;
               
                if ((index >= starts) && (index < ends)) {
                    if (sizes === 0) {
                        if((data.paymentdate>=TodoStore.getDateFrom)&&(data.paymentdate<=TodoStore.getDateTo)){
                           
                            count++;
                        alltotal=alltotal+(parseFloat(data.misc)+parseFloat(data.equity));
                        equitytotal=equitytotal+parseFloat(data.equity);
                        misctotal=misctotal+parseFloat(data.misc);
                        return (

                            <tr key={count}>
                                <td>{count}.</td>
                                <td>{data.paymentdate} </td>
                                <td>{data.fullname} </td>
                                <td>{data.block}</td>
                                <td>{data.lot}</td>
                                <td>{formatter.format(data.equity)}</td>
                                <td>{formatter.format(data.misc)}</td>
                                <td>{formatter.format(parseFloat(data.misc)+parseFloat(data.equity))}</td>
                                
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
            const sortDate=()=>{
                alert("TEST");
            }

            const generatePDF = () => {
                const doc = new jsPDF("landscape");
                var todays = new Date().toLocaleString();
                // doc.fromHTML('Mount Malarayat Property Development Corporation', 10, 10)
                var pageHeight= doc.internal.pageSize.height;
                console.log(pageHeight);
                doc.fromHTML('<h4>MOUNT MALARAYAT PROPERTY DEVELOPMENT CORPORATION</h4>',90,10);
                doc.fromHTML('<h5>List of Client (PAYMENT)</h5>',130,20);
                doc.fromHTML('<h6>Date Generated: '+todays+'</h6>',220,27);
                    // autoTable(doc, { html: '#property-table' })
                doc.autoTable({ 
                    html: '#table-client',
                    margin:{top:40} })
                doc.save(todays+'.pdf')
            }
        return (

            <React.Fragment>

                <Container fluid={true} style={{ minHeight: '40em', height: 'auto', marginTop: '1em', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <BreadCrumb location="Transaction / List of Transactions" />
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
                                        <Col xs={12} md={12} style={{ textAlign: 'right' }}>
                                                <Button type="primary"
                                                    onClick={(event) => generatePDF()}
                                                >
                                                    Generate PDF
                                                </Button>
                                                </Col>
                                            <Col xs={12} md={3} style={{ paddingTop: '0.5em' }}>
                                                <Row>
                                                
                                                    <Col xs={12} md={12}>
                                                        <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Filter by:</h5>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Select defaultValue={TodoStore.getFilter} style={{ width: '90%' }}
                                                            onChange={TodoStore.setFilter}>
                                                            <Option value="All">All</Option>
                                                            <Option value="Client Name">Client Name</Option>
                                                            <Option value="Block">Block</Option>
                                                            <Option value="Lot">Lot</Option>
                                                            <Option value="Payment Date">Payment Date</Option>
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
          title="Title"
          
          onCancel={TodoStore.setHandleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
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

                                               
                                                    <table id="table-client" className="table table-hover" style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>DATE</th>
                                                                <th>CLIENT's NAME</th>
                                                                <th>BLOCK</th>
                                                                <th>LOT</th>
                                                                <th>EQ PAYMENT</th>
                                                                <th>MF PAYMENT</th>
                                                                <th>TOTAL</th>
                                                               
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {datalist}
                                                            <tr style={{backgroundColor:'#69c0ff'}}>
                                                                <td></td>
                                                                <td> </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>{formatter.format(equitytotal)}</td>
                                                                <td>{formatter.format(misctotal)}</td>
                                                                <td>{formatter.format(alltotal)}</td>
                                                                
                                                            </tr>
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