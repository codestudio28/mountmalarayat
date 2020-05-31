import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        var { isloaded, client, sizes, property, amort,financing, type } = this.state;

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
            var financingname;
            var financingyear;
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

            financing.map((item4)=>{
                if(item.financing===item4._id){
                    financingname = item4.paymentname;
                    financingyear = item4.numyear;
                }
            })
            
            dataSource.push({
                key: item._id,
                fullname: firstname+" "+lastname,
                address: "Block "+block+" Lot "+lot,
                financingname:financingname,
                financingyear:financingyear
            })
        });

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


        const datalist = dataSource.filter(data => {
           
            if (TodoStore.filter === 'All') {
                return data.fullname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Client Name') {
                return data.fullname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Address') {
                return data.address.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Financing') {
                return data.Financing.indexOf(TodoStore.search) >= 0
            } 

        })
            .map((data, index) => {
                i++;
               
                if ((index >= starts) && (index < ends)) {
                    if (sizes === 0) {
                        return (

                            <tr key={i}>
                                <td>{i}</td>
                                <td>{data.fullname} </td>
                                <td>{data.address}</td>
                                <td>{data.financingname}, {data.financingyear} years</td>
                                <td>
                                    <Button style={{ backgroundColor: '#00a2ae' }}
                                                    onClick={(event) => setView(data.key)}>
                                        <Icon type="eye" style={{ color: '#fff', fontSize: '1.25em' }}></Icon>
                                    </Button>
                                        {/* <ButtonGroup>
                                            <Tooltip placement="topLeft" title="Click to update client information">
                                                <Button style={{ backgroundColor: '#00a2ae' }}
                                                    onClick={(event) => setUpdate(data.key)}
                                                ><Icon type="edit" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                            </Tooltip>
                                            <Tooltip placement="topLeft" title="Click to remove this client">
                                                <Popconfirm
                                                    placement="topRight"
                                                    title="Do you want to remove this client?"
                                                    onConfirm={removeClient}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button style={{ backgroundColor: '#ff4d4f' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="delete" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Popconfirm>
                                            </Tooltip>
                                        </ButtonGroup> */}
                                    
                                    
                                </td>
                            </tr>
                        )
                    }else{

                    }

                }
            })
       
        return (

            <React.Fragment>

                <Container fluid={true} style={{ minHeight: '40em', height: 'auto', marginTop: '1em', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <BreadCrumb location="Transaction / Collections" />
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
                                                            <Option value="Address">Address</Option>
                                                            <Option value="Financing">Financing</Option>
                                                            
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

                                               
                                                    <table className="table table-hover" style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Client Name</th>
                                                                <th>Property Address</th>
                                                                <th>Financing</th>
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