import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Spin,Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import './content.css';
import { Input } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from "axios";
import BreadCrumb from '../../BreadCrumb';
import { reactLocalStorage } from 'reactjs-localstorage';


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
            items: [],
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
                    items: json,
                })
            });
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav === true) {
            this.setState({ sizes: 1 });
        }
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { isloaded, items, sizes } = this.state;

        const dataSource = [];

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

        items.filter(item => {
            return item.status.indexOf("REMOVED") >= 0
        })
            .map(item => (
                dataSource.push({
                    key: item._id,
                    lastname: item.lastname,
                    firstname: item.firstname,
                    middlename: item.middlename,
                    contactnumber: item.contactnumber,
                    address: item.address,
                    city: item.city,
                    province: item.province,
                    status: item.status,

                })
            ));

        const getClient = () => {
            var port = TodoStore.getPort;
            fetch(port + 'clientrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isloaded: true,
                        items: json,
                    })
                });
        }

        const retrieveClient = () => {
            TodoStore.setLoading(true);
            var id = TodoStore.getRemoveId;
            const client = {
                status: 'ACTIVE'
            }

            var port = TodoStore.getPort;
            axios.post(port + 'clientrouter/status/' + id, client)
                .then(res => {
                    console.log(res.data);
                    if (res.data === '101') {
                        TodoStore.setLoading(false);
                        getClient();
                        openNotification("Retrieved");
                        var process = "Retrieve Data";
                        var logs="Retrieve client to the system";
                        addSystemLog(process,logs);
                    } else {
                        TodoStore.setLoading(false);
                        openNotification("Server");
                    }
                });
        }
        const openNotification = (value) => {
            if (value === "Retrieved") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully retrieved client',
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

            }
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
                return data.lastname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Lastname') {
                return data.lastname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Firstname') {
                return data.firstname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Middlename') {
                return data.middlename.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'City') {
                return data.city.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Province') {
                return data.province.indexOf(TodoStore.search) >= 0
            }

        })
            .map((data, index) => {
                i++;
                if ((index >= starts) && (index < ends)) {
                    if (sizes === 0) {
                        return (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{data.firstname} {data.middlename} {data.lastname} </td>
                                <td>{data.contactnumber}</td>
                                <td>{data.address} {data.city} {data.province}</td>
                                <td>
                                    {!TodoStore.getLoading &&
                                        <ButtonGroup>
                                            <Tooltip placement="topLeft" title="Click to retrieve this client">
                                                <Popconfirm
                                                    placement="topRight"
                                                    title="Do you want to retrieve this client?"
                                                    onConfirm={retrieveClient}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button style={{ backgroundColor: '#722ed1' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="interaction" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Popconfirm>
                                            </Tooltip>
                                        </ButtonGroup>
                                    }
                                    {TodoStore.getLoading &&
                                        <div style={{
                                            fontSize: '1em',
                                            backgroundColor: '#a0d911',
                                            height: '2em',
                                            borderRadius: '0.5em',
                                            width: '12em',
                                            textAlign: 'center',
                                            padding: '0.25em',
                                            color: '#ffffff'
                                        }}>
                                            Loading... Please wait.
                                        </div>

                                    }

                                </td>
                            </tr>
                        )
                    } else {
                        return (

                            <Col key={data.key} xs={12} md={12} style={{
                                backgroundColor: '#bae7ff',
                                height: 'auto',
                                marginTop: '0.5em',
                                minHeight: '5em',
                                padding: '1em 0.5em 1em 0.5em',
                                borderRadius: '0.5em'
                            }}>
                                <Row >
                                    <Col xs={12} md={12}>
                                        <h4 style={{ fontSize: '1em' }}>Client name: {data.firstname} {data.middlename} {data.lastname}</h4>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <h4 style={{ fontSize: '1em' }}>Address: {data.address} {data.city} {data.province}</h4>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <h4 style={{ fontSize: '1em' }}>Contact number: {data.contactnumber}</h4>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <div style={{ borderTop: '1px solid', width: '100%' }}>

                                        </div>
                                    </Col>
                                    <Col xs={12} md={12} style={{ textAlign: 'right', paddingTop: '0.5em' }}>
                                        {!TodoStore.getLoading &&
                                            <ButtonGroup>
                                                <Tooltip placement="topLeft" title="Click to retrieve this client">
                                                    <Popconfirm
                                                        placement="topRight"
                                                        title="Do you want to retrieve this client?"
                                                        onConfirm={retrieveClient}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button style={{ backgroundColor: '#722ed1' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="interaction" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                    </Popconfirm>
                                                </Tooltip>
                                            </ButtonGroup>
                                        }
                                        {TodoStore.getLoading &&
                                            <Spin />
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        )
                    }

                }
            })
        return (

            <React.Fragment>

                <Container fluid={true} style={{ minHeight: '40em', height: 'auto', marginTop: '1em', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <BreadCrumb location="Client / List of Removed Client" />
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
                                                            <Option value="Lastname">Lastname</Option>
                                                            <Option value="Firstname">Firstname</Option>
                                                            <Option value="City">City</Option>
                                                            <Option value="Province">Province</Option>
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

                                                {sizes === 0 &&
                                                    <table className="table table-hover" style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Client Name</th>
                                                                <th>Contact Number</th>
                                                                <th>Address</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {datalist}
                                                        </tbody>
                                                    </table>

                                                }
                                                {sizes !== 0 &&
                                                    <Col xs={12} md={12} style={{ paddingTop: '0.5em' }}>
                                                        <Row>
                                                            {datalist}
                                                        </Row>
                                                    </Col>
                                                }

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