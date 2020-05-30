import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Layout, Menu, Badge, Icon, Spin, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
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
        const dataProperty = [];
        const dataPayment = [];
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

        amort.map((item) => {
            var firstname;
            var lastname;
            var block;
            var lot;
            var tcp;
            var financingname;
            var financingyear;
            var equity_runningbalance;
            var misc_runningbalance;
            var equity_penalty;
            var misc_penalty;
            var del=0;
            var stats="GOOD CLIENTS";
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
                    tcp=item3.price;
                }
            })

            financing.map((item4)=>{
                if(item.financing===item4._id){
                    financingname = item4.paymentname;
                    financingyear = item4.numyear;
                }
            })
            payment.map((item5)=>{
                if((item.clientid===item5.clientid)&&(item.propertyid===item5.propertyid)){
                    if((item5.status==="VOID")||(item5.status==="UNPAID")){
                        del++;
                    }
                    if(item5.amorttype==="E"){
                        equity_runningbalance=item5.runningbalance;
                        equity_penalty=item5.amortpenalty;
                    }else{
                        misc_runningbalance=item5.runningbalance;
                        misc_penalty=item5.amortpenalty;
                    }
                }
            })

            if(del>0){
                stats="DELIQUENT CLIENTS";
            }else{
                stats="GOOD CLIENTS";
            }
            dataSource.push({
                key: item._id,
                fullname: firstname+" "+lastname,
                block: block,
                lot:lot,
                tcp:tcp,
                equity:item.totalequity,
                misc:item.totalmisc,
                equity_balance:equity_runningbalance,
                misc_balance:misc_runningbalance,
                equity_penalty:equity_penalty,
                misc_penalty:misc_penalty,
                financing:financingname,
                reservation:item.reservation,
                status:stats
            })
        });
        console.log(dataSource);
        const setView =(value)=>{
            window.open("/payment/"+value,"_self");
        }

        i = 0;
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

        const datalist = dataSource.filter(data => {
           
            if (TodoStore.filter === 'All') {
                return data.fullname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Client Name') {
                return data.fullname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Block') {
                return data.block.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Lot') {
                return data.lot.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Financing') {
                return data.financing.indexOf(TodoStore.search) >= 0
            } 

        })
            .map((data, index) => {
                i++;

                if ((index >= starts) && (index < ends)) {
                    if (sizes === 0) {
                        return (

                            <tr key={i}>
                                <td>{i}.</td>
                                <td>{data.fullname} </td>
                                <td>{data.block}</td>
                                <td>{data.lot}</td>
                                <td>{formatter.format(data.tcp)}</td>
                                <td>{formatter.format(data.equity_balance)}</td>
                                <td>{formatter.format(data.misc_balance)}</td>
                                <td>{formatter.format(data.reservation)}</td>
                                <td>{data.financing}</td>
                            </tr>
                        )
                    }else{

                    }

                }
            })
            const generatePDF = () => {
                const doc = new jsPDF("landscape");
                var todays = new Date().toLocaleString();
                // doc.fromHTML('Mount Malarayat Property Development Corporation', 10, 10)
                var pageHeight= doc.internal.pageSize.height;
                console.log(pageHeight);
                doc.fromHTML('<h4>MOUNT MALARAYAT PROPERTY DEVELOPMENT CORPORATION</h4>',90,10);
                doc.fromHTML('<h5>List of Client (FINANCING TYPE)</h5>',130,20);
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
                                            <Col xs={12} md={4} style={{ paddingTop: '0.5em' }}>
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
                                                            <Option value="Financing">Financing Type</Option>
                                                        </Select>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} md={4} style={{ paddingTop: '0.5em' }}>
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
                                            <Col xs={12} md={4} style={{ paddingTop: '0.5em' }}>
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
                                            <Col xs={12} md={12} style={{ paddingTop: '0.5em' }}>

                                               
                                                    <table id="table-client" className="table table-hover" style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>CLIENT's NAME</th>
                                                                <th>BLOCK</th>
                                                                <th>LOT</th>
                                                                <th>TCP</th>
                                                                <th>EQ BALANCE</th>
                                                                <th>MF BALANCE</th>
                                                                <th>RESERVATION FEE</th>
                                                                <th>FINANCING TYPE</th>
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