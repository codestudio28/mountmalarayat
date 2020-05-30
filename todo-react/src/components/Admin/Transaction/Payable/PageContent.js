import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, DatePicker,Menu, Badge, Icon, Spin, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import './content.css';
import { Input,InputNumber } from 'antd';
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
                    description: 'Successfully create voucher.',
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
            const submitVoucher=()=>{
                var voucherdate=TodoStore.getVoucherDate;
                var payee = TodoStore.getPayee;
                var amount = TodoStore.getAmount;
                var cv =  TodoStore.getCV;
                var bank = TodoStore.getBankName;
                var check = TodoStore.getCheck;
                var terms = TodoStore.getTerms;
                var preparedby = TodoStore.getPreparedBy;
                var notedby =TodoStore.getNotedBy;
                var approvedby = TodoStore.getApprovedBy;
                if ((voucherdate.length === 0) || (payee.length === 0) || (amount.length === 0) || (cv.length === 0) || (bank.length === 0)||
                (check.length === 0) || (terms.length === 0) || (preparedby.length === 0) || (notedby.length === 0) || (approvedby.length === 0)) {
                    openNotification("Blank");
                }else{
                    const voucher = {
                        dates:voucherdate,
                        payee:payee,
                        amount:amount,
                        cv:cv,
                        bank:bank,
                        cheque:check,
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
                                
                            } else {
                                openNotification("Server");
                                TodoStore.setAdding(false);
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
                                            <DatePicker onChange={TodoStore.setVoucherDate} />
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
                                                Check #
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