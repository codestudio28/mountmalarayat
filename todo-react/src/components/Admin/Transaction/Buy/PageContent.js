import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
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

var fullname;
var contactnumber;
var address;
var propaddress;
var propstypes;
var area;
var price;
let MF = 0;
let EF = 0;
let AF = 0;
@inject('TodoStore')
@observer
class PageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: 0,
            client: [],
            type: [],
            property: [],
            payment: [],
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
                    isloaded: true,
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

        fetch(port + 'paymentschemerouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    payment: json,
                })
            });

        fetch(port + 'proptyperouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    type: json,
                })
            });
        // window.addEventListener("resize", this.resize.bind(this));
        // this.resize();
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { isloaded, client, sizes, property, payment, type } = this.state;

        const dataSource = [];
        const dataProperty = [];
        const dataPayment = [];
        const dataType = [];
        client.map(item => (
            dataSource.push({
                key: item._id,
                name: item.firstname + ' ' + item.middlename + ' ' + item.lastname,
                contactnumber: item.contactnumber,
                address: item.address + ' ' + item.city + ' ' + item.province,
            })
        ));
        property.map(item => {
            if(item.status==="NEW"){
                dataProperty.push({
                    key: item._id,
                    block: item.block,
                    lot: item.lot,
                    type: item.type,
                    area: item.area,
                    price: item.price,
                    status:item.status,
                })
            }
           
        });
        type.map(item => (
            dataType.push({
                key: item._id,
                typename: item.typename,
                description: item.description,
                equity: item.equity,
                misc: item.misc,
            })
        ));

        payment.map(item => (
            dataPayment.push({
                key: item._id,
                name: item.paymentname,
                percentage: item.percentage,
                numyear: item.numyear,
                status: item.status,
            })
        ));
        const searchClient = () => {
            var i = 0;
            var fname = TodoStore.getSearchClient;
            dataSource.map((data, index) => {
                if (data.name === fname) {
                    fullname = data.name;
                    contactnumber = data.contactnumber;
                    address = data.address;
                    i=1;
                }
            })
            if(i===0){
                openNotification("NOCLIENT");
            }else{
                TodoStore.setDisplayName(fullname);
                TodoStore.setDisplayContactNumber(contactnumber);
                TodoStore.setDisplayAddress(address);
            }
          
        }
        const searchProperty = () => {
            var block = TodoStore.getBlock;
            var lot = TodoStore.getLot;
            var misc;
            var equity;
            var j=0;
            var status = "NEW";
            dataProperty.map((data, index) => {
                if ((data.block === block) && (data.lot === lot)) {
                    propaddress = "Block " + data.block + ", Lot " + data.lot;
                    propstypes = data.type;
                    area = data.area;
                    price = data.price;
                    dataType.map((datas, index) => {
                        if ((propstypes === datas.typename)) {
                            misc = datas.misc;
                            equity = datas.equity;
                            j=1;
                        }
                    })

                }
            })
            if(j===0){
                openNotification("NOPROPS");
            }else{
                TodoStore.setMisc2(misc);
                TodoStore.setEquity2(equity);
                TodoStore.setDisplayPropAddress(propaddress);
                TodoStore.setDisplayTypes(propstypes);
                TodoStore.setDisplayArea(area);
                TodoStore.setDisplayPrice(price);
            }
           

        }

        const paymentscheme = dataPayment.filter(data => {
            return data;
        })
            .map((data, index) => {
                if (data.status !== "REMOVED") {
                    return (
                        <Option value={data.key}>{"Payment: " + data.name + " Years: " + data.numyear}</Option>
                    )
                }

            })
        const computePayment = () => {
            var fullname = TodoStore.getDisplayName;
            var TCP = TodoStore.getDisplayPrice;
            var key = TodoStore.getDisplayPaymentScheme;
            var loanable = TodoStore.getLoanable;
            var reservationfee = TodoStore.getReservationFee;

            if ((fullname.length === 0) || (TCP.length === 0) || (key.length === 0) || (loanable.length === 0) || (reservationfee.length === 0)) {
                openNotification("Blank");
            } else {
                var newTCP = TCP.replace(',', '');
                var equitymonth = parseFloat(TodoStore.getEquityMonth);
                var numyear = 0;
                var schemename;
                var percentage;
                var misc = TodoStore.getMisc / 100;
                var newmisc = parseFloat(newTCP) * parseFloat(misc);
                var equity = parseFloat(newTCP) - parseFloat(loanable) - parseFloat(newmisc);
                var monthlymisc = (parseFloat(newmisc) / parseFloat(equitymonth)).toFixed(2);
                var newtotalequity = (parseFloat(equity) - parseFloat(reservationfee)).toFixed(2);
                var monthlyequity = (parseFloat(newtotalequity) / parseFloat(equitymonth)).toFixed(2);
                var formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'PHP',
                });
                TodoStore.setComputes(true);
                TodoStore.setMonthlyMisc(formatter.format(monthlymisc));
                TodoStore.setTotalMisc(formatter.format(newmisc));
                TodoStore.setMonthlyEquity(formatter.format(monthlyequity));
                TodoStore.setTotalEquity(formatter.format(equity));
                TodoStore.setNewTotalEquity(formatter.format(newtotalequity));
                TodoStore.setNewReservationFee(formatter.format(reservationfee));
                payment.map(item => {
                    if (item._id === key)
                        percentage = item.percentage;
                    schemename = item.paymentname;
                    numyear = item.numyear;
                });
                var totalamortization = parseFloat(newTCP) - parseFloat(equity);
                var monthlyamortization = parseFloat(totalamortization) * parseFloat(percentage).toFixed(2);
                var newtotalamortization = parseFloat(monthlyamortization) * parseFloat(numyear) * 12.0;
                TodoStore.setTotalAmortization(formatter.format(newtotalamortization));
                TodoStore.setMonthlyAmortization(formatter.format(monthlyamortization));
                TodoStore.setNumberYears(numyear);
                TodoStore.setFinancing(schemename.toUpperCase());
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
            }else if (value === "NOCLIENT") {
                notification.open({
                    message: 'Warning',
                    description: 'Client is not yet in the records. Please add it first.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            } else if (value === "NOPROPS") {
                notification.open({
                    message: 'Warning',
                    description: 'Property is either not available or nor yet existing in the system',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            } 
        }
        return (

            <React.Fragment>

                <Container fluid={true} style={{ minHeight: '40em', height: 'auto', marginTop: '1em', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <BreadCrumb location="Transaction / Buy Property" />
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
                                                <Row>
                                                    <Col xs={6} md={6}>
                                                        <Row>
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#d9d9d9'
                                                                }}>Search Client:</h4>
                                                            </Col>
                                                            <Col style={{
                                                                paddingTop: '1em'
                                                            }} xs={8} md={8}>
                                                                <Input
                                                                    onChange={TodoStore.setSearchClient}
                                                                    value={TodoStore.getSearchClient}
                                                                    placeholder="Search client. Firstname Middlename Lastname" />
                                                            </Col>
                                                            <Col style={{
                                                                paddingTop: '1em'
                                                            }} xs={4} md={4}>
                                                                <Button style={{
                                                                    backgroundColor: '#1890ff',
                                                                    color: '#ffffff'
                                                                }}
                                                                    onClick={(event) => searchClient()}
                                                                >
                                                                    Search
                                                            </Button>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#d9d9d9',
                                                                    padding: '1em'
                                                                }}>Client Information:</h4>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#8c8c8c',
                                                                    padding: '1em'
                                                                }}>Name: <span style={{ color: '#000000' }}>{TodoStore.getDisplayName}</span></h4>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#8c8c8c',
                                                                    padding: '1em'
                                                                }}>Address: <span style={{ color: '#000000' }}>{TodoStore.getDisplayAddress}</span></h4>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#8c8c8c',
                                                                    padding: '1em'
                                                                }}>Contact Number: <span style={{ color: '#000000' }}>{TodoStore.getDisplayContactNumber}</span></h4>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={6} md={6}>
                                                        <Row>
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#d9d9d9'
                                                                }}>Search Property:</h4>
                                                            </Col>
                                                            <Col style={{
                                                                paddingTop: '1em'
                                                            }} xs={4} md={4}>
                                                                <Input placeholder="Block"
                                                                    onChange={TodoStore.setBlock}
                                                                    value={TodoStore.getBlock} />
                                                            </Col>
                                                            <Col style={{
                                                                paddingTop: '1em'
                                                            }} xs={4} md={4}>
                                                                <Input placeholder="Lot"
                                                                    onChange={TodoStore.setLot}
                                                                    value={TodoStore.getLot} />
                                                            </Col>
                                                            <Col style={{
                                                                paddingTop: '1em'
                                                            }} xs={4} md={4}>
                                                                <Button style={{
                                                                    backgroundColor: '#1890ff',
                                                                    color: '#ffffff'
                                                                }}
                                                                    onClick={(event) => searchProperty()}
                                                                >
                                                                    Search
                                                        </Button>
                                                            </Col>
                                                            {/* Property */}
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#d9d9d9',
                                                                    padding: '1em'
                                                                }}>Property Information:</h4>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#8c8c8c',
                                                                    padding: '1em'
                                                                }}>Property Address: <span style={{ color: '#000000' }}>{TodoStore.getDisplayPropAddress}</span></h4>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#8c8c8c',
                                                                    padding: '1em'
                                                                }}>Property Type: <span style={{ color: '#000000' }}>{TodoStore.getDisplayTypes
                                                                }</span></h4>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#8c8c8c',
                                                                    padding: '1em'
                                                                }}>Area: <span style={{ color: '#000000' }}>{TodoStore.getDisplayArea}</span></h4>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <h4 style={{
                                                                    fontSize: '1em',
                                                                    color: '#8c8c8c',
                                                                    padding: '1em'
                                                                }}>Price: <span style={{ color: '#000000' }}>PHP. {TodoStore.getDisplayPrice}</span></h4>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col xs={12} md={12}>
                                                <Row>
                                                    <Col xs={3} md={3}>
                                                        <h4 style={{
                                                            fontSize: '1em',
                                                            color: '#d9d9d9',
                                                            padding: '1em'
                                                        }}>Payment Scheme:</h4>
                                                    </Col>
                                                    <Col xs={3} md={3}>
                                                        <h4 style={{
                                                            fontSize: '1em',
                                                            color: '#d9d9d9',
                                                            padding: '1em'
                                                        }}>Loanable Amount:</h4>
                                                    </Col>
                                                    <Col xs={3} md={3}>
                                                        <h4 style={{
                                                            fontSize: '1em',
                                                            color: '#d9d9d9',
                                                            padding: '1em'
                                                        }}>Reservation Fee:</h4>
                                                    </Col>
                                                    <Col xs={3} md={3}>
                                                        <h4 style={{
                                                            fontSize: '1em',
                                                            color: '#d9d9d9',
                                                            padding: '1em'
                                                        }}>Choose Month:</h4>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Row>
                                                    <Col xs={3} md={3}>
                                                        <Select defaultValue={''} style={{ width: '100%' }} onChange={TodoStore.setDisplayPaymentScheme}>
                                                            {paymentscheme}
                                                        </Select>
                                                    </Col>

                                                    <Col xs={3} md={3}>
                                                        <Input

                                                            placeholder="Enter loanable amount in Php"
                                                            onChange={TodoStore.setLoanable}
                                                            value={TodoStore.getLoanable} />
                                                    </Col>
                                                    <Col xs={3} md={3}>
                                                        <Input placeholder="Enter reservation fee"
                                                            onChange={TodoStore.setReservationFee}
                                                            value={TodoStore.getReservationFee} />
                                                    </Col>
                                                    <Col xs={3} md={3}>
                                                        <Select defaultValue={TodoStore.getEquityMonth} style={{ width: '100%' }} onChange={TodoStore.setEquityMonth}>
                                                            <Option value="12">12</Option>
                                                            <Option value="24">24</Option>
                                                            <Option value="36">36</Option>
                                                        </Select>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} md={12} style={{
                                                textAlign: 'right',
                                                paddingRight: '1em',
                                                paddingTop: '2em'
                                            }}>
                                                <Button style={{
                                                    backgroundColor: '#1890ff',
                                                    color: '#ffffff'
                                                }}
                                                    onClick={(event) => computePayment()}
                                                >
                                                    Click to compute
                                                </Button>
                                            </Col>
                                            {TodoStore.getComputes &&
                                                <React.Fragment>
                                                    <Col xs={12} md={12}>
                                                        <table >
                                                            <tr>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}>{TodoStore.getFinancing} FINANCING</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}> <span style={{ color: '#000000' }}>
                                                                            {TodoStore.getNumberYears} Years</span></h4>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}>Total Miscellaneous:</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}> <span style={{ color: '#000000' }}>
                                                                            {TodoStore.getTotalMisc}</span></h4>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}>Monthly Miscellaneous:</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}> <span style={{ color: '#000000' }}>
                                                                            {TodoStore.getMonthlyMisc} @ {TodoStore.getEquityMonth} mos.</span></h4>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}>Total Equity (Minus R.F.):</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}> <span style={{ color: '#000000' }}>
                                                                            {TodoStore.getTotalEquity} - {TodoStore.getNewReservationFee}(RF) = {TodoStore.getNewTotalEquity}</span></h4>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}>Monthly Equity:</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}> <span style={{ color: '#000000' }}>
                                                                            {TodoStore.getMonthlyEquity} @ {TodoStore.getEquityMonth} mos. </span></h4>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}>Total Amortization:</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}> <span style={{ color: '#000000' }}>
                                                                            {TodoStore.getTotalAmortization} @ {TodoStore.getNumberYears} years </span></h4>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}>Monthly Amortization:</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 style={{
                                                                        fontSize: '1em',
                                                                        color: '#8c8c8c',
                                                                        padding: '1em'
                                                                    }}> <span style={{ color: '#000000' }}>
                                                                            {TodoStore.getMonthlyAmortization}</span></h4>
                                                                </th>
                                                            </tr>
                                                        </table>

                                                    </Col>

                                                </React.Fragment>
                                            }

                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>



            </React.Fragment >
        );
    }
}

PageContent.propTypes = {

};

export default PageContent;