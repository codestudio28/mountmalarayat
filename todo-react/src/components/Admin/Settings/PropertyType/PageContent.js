import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Spin, Icon, InputNumber, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
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
            items: [],
            isloaded: false,
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        var port = TodoStore.getPort;
        fetch(port+'proptyperouter/')
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

        items.map(item => (
            dataSource.push({
                key: item._id,
                typename: item.typename,
                description: item.description,
                equity: item.equity,
                misc: item.misc,
                status: item.status,

            })
        ));

        const getPropertyType = () => {
            
            var port = TodoStore.getPort;
            fetch(port+'proptyperouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isloaded: true,
                        items: json,
                    })
                });
        }
        const addPropertyType = () => {
            if ((TodoStore.getTypename.length === 0) || (TodoStore.getDescription.length === 0)
                || (TodoStore.getEquity.length === 0) || (TodoStore.getMisc.length === 0)) {
                openNotification("Blank");
            } else {
                TodoStore.setAdding(true);
                const propertytype = {
                    typename: TodoStore.getTypename,
                    description: TodoStore.getDescription,
                    equity: TodoStore.getEquity,
                    misc: TodoStore.getMisc,
                    status: "ACTIVE"

                }
                var port = TodoStore.getPort;
                axios.post(port+'proptyperouter/add', propertytype)
                    .then(res => {
                        console.log(res.data);
                        if (res.data === '202') {
                            TodoStore.setAdding(false);
                            openNotification("Exist");
                        } else if (res.data === '101') {
                            openNotification("Success");
                            getPropertyType();
                            TodoStore.setAdding(false);
                            TodoStore.setHandleCancel();
                            var process = "Add Data";
                            var logs="Add property type to the system";
                            addSystemLog(process,logs);
                        } else {
                            openNotification("Server");
                            TodoStore.setAdding(false);
                        }
                    });
            }
        }
        const setUpdate = (id) => {
            TodoStore.setUpdateId(id);
            TodoStore.setUpdateModal(true);
            const singlelist = dataSource.filter(data => {
                return data.key.indexOf(id) >= 0
            }).map((data, index) => {
                TodoStore.setTypename2(data.typename);
                TodoStore.setDescription2(data.description);
                TodoStore.setEquity2(data.equity);
                TodoStore.setMisc2(data.misc);
            })
        }
        const updatePropertyType = () => {
            if ((TodoStore.getTypename.length === 0) || (TodoStore.getDescription.length === 0)
                || (TodoStore.getEquity.length === 0) || (TodoStore.getMisc.length === 0)) {
                openNotification("Blank");
            } else {
                TodoStore.setAdding(true);
                let id = TodoStore.getUpdateId;
                const propertytype = {
                    typename: TodoStore.getTypename,
                    description: TodoStore.getDescription,
                    equity: TodoStore.getEquity,
                    misc: TodoStore.getMisc

                }
               
                var port = TodoStore.getPort;
                axios.post(port+'proptyperouter/update/' + id, propertytype)
                    .then(res => {
                        if (res.data === '202') {
                            TodoStore.setAdding(false);
                            openNotification("Exist");
                        } else if (res.data === '101') {
                            openNotification("Update");
                            getPropertyType();
                            TodoStore.setAdding(false);
                            TodoStore.setHandleCancel();
                            var process = "Update Data";
                            var logs="Update property type in the system";
                            addSystemLog(process,logs);
                        } else {
                            TodoStore.setAdding(false);
                            openNotification("Server");
                        }
                    });
            }
        }
        const removeProperty = () => {
            var id = TodoStore.getRemoveId;
            const proptype = {
                status: 'REMOVED'
            }
            TodoStore.setLoading(true);
            var port = TodoStore.getPort;
            axios.post(port+'proptyperouter/status/' + id, proptype)
                .then(res => {
                    console.log(res.data);
                    if (res.data === '101') {
                        TodoStore.setLoading(false);
                        getPropertyType();
                        openNotification("Removed");
                        var process = "Remove Data";
                            var logs="Remove property type in the system";
                            addSystemLog(process,logs);
                    } else {
                        TodoStore.setLoading(false);
                        openNotification("Server");
                    }
                });
        }
        const retrieveProperty = () =>{
            var id = TodoStore.getRemoveId;
            const proptype = {
                status: 'ACTIVE'
            }
            TodoStore.setLoading(true);
            var port = TodoStore.getPort;
            axios.post(port+'proptyperouter/status/' + id, proptype)
                .then(res => {
                    console.log(res.data);
                    if (res.data === '101') {
                        TodoStore.setLoading(false);
                        getPropertyType();
                        openNotification("Retrieve");
                    } else {
                        TodoStore.setLoading(false);
                        openNotification("Server");
                    }
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
                    description: 'Property Type already in the records',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            } else if (value === "Success") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully add property type to the system',
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
                    description: 'Successfully update property  type information.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            } else if (value === "Removed") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully removed property type.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }else if (value === "Retrieve") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully retrieved property type.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
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
                return data.typename.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Type Name') {
                return data.typename.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Description') {
                return data.description.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Equity') {
                return data.equity.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Miscellaneous') {
                return data.misc.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Status') {
                return data.status.indexOf(TodoStore.search) >= 0
            }

        })
            .map((data, index) => {
                i++;
                if ((index >= starts) && (index < ends)) {
                    if(sizes===0){
                        return (

                            <tr key={i}>
                                <td>{i}</td>
                                <td>{data.typename}</td>
                                <td>{data.description}</td>
                                <td>{data.equity}%</td>
                                <td>{data.misc}%</td>
                                <td>{data.status}</td>
                                <td>
                                {!TodoStore.getLoading &&
                                    <ButtonGroup>
                                        {data.status === "REMOVED" &&
    
                                            <Tooltip placement="topLeft" title="Click to retrieve this property type">
                                                <Popconfirm
                                                    placement="topRight"
                                                    title="Do you want to remove this retrieve type?"
                                                    onConfirm={retrieveProperty}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button style={{ backgroundColor: '#722ed1' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="interaction" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Popconfirm>
                                            </Tooltip>
                                        }
                                        {data.status !== "REMOVED" &&
                                            <React.Fragment>
    
                                                <Tooltip placement="topLeft" title="Click to update property type information">
                                                    <Button style={{ backgroundColor: '#00a2ae' }}
                                                        onClick={(event) => setUpdate(data.key)}
                                                    ><Icon type="edit" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Tooltip>
                                                <Tooltip placement="topLeft" title="Click to remove this property type">
                                                    <Popconfirm
                                                        placement="topRight"
                                                        title="Do you want to remove this property type?"
                                                        onConfirm={removeProperty}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button style={{ backgroundColor: '#ff4d4f' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="delete" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                    </Popconfirm>
                                                </Tooltip>
                                                
                                            </React.Fragment>
                                        }
                                    </ButtonGroup>
                                    }
                                    {TodoStore.getLoading &&
                                            <div style={{fontSize:'1em',
                                            backgroundColor:'#a0d911',
                                            height:'2em',
                                            borderRadius:'0.5em',
                                            width:'12em',
                                            textAlign:'center',
                                            padding:'0.25em',
                                            color:'#ffffff'}}>
                                            Loading... Please wait.
                                        </div>
                                        }
                                </td>
                            </tr>
                        )
                    }else {
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
                                            <h4 style={{ fontSize: '1em' }}><span style={{color:'#8c8c8c'}}>Type Name:</span> {data.typename}&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:'#8c8c8c'}}>Description: </span>{data.description}</h4>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <h4 style={{ fontSize: '1em' }}><span style={{color:'#8c8c8c'}}>Equity:</span> {data.equity} %&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:'#8c8c8c'}}>Miscellaneous Fee:</span> {data.misc} %</h4>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <h4 style={{ fontSize: '1em' }}><span style={{color:'#8c8c8c'}}>Status: </span>{data.status}</h4>
                                        </Col>
                                    <Col xs={12} md={12} >
                                        <div style={{ borderTop: '1px solid', width: '100%' }}>

                                        </div>
                                    </Col>
                                    <Col xs={12} md={12} style={{textAlign:'right',paddingTop:'0.5em'}}>
                                    {!TodoStore.getLoading &&
                                       <ButtonGroup>
                                       {data.status === "REMOVED" &&
   
                                           <Tooltip placement="topLeft" title="Click to retrieve this property type">
                                               <Popconfirm
                                                   placement="topRight"
                                                   title="Do you want to remove this retrieve type?"
                                                   onConfirm={retrieveProperty}
                                                   okText="Yes"
                                                   cancelText="No"
                                               >
                                                   <Button style={{ backgroundColor: '#722ed1' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="interaction" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                               </Popconfirm>
                                           </Tooltip>
                                       }
                                       {data.status !== "REMOVED" &&
                                           <React.Fragment>
   
                                               <Tooltip placement="topLeft" title="Click to update property type information">
                                                   <Button style={{ backgroundColor: '#00a2ae' }}
                                                       onClick={(event) => setUpdate(data.key)}
                                                   ><Icon type="edit" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                               </Tooltip>
                                               <Tooltip placement="topLeft" title="Click to remove this property type">
                                                   <Popconfirm
                                                       placement="topRight"
                                                       title="Do you want to remove this property type?"
                                                       onConfirm={removeProperty}
                                                       okText="Yes"
                                                       cancelText="No"
                                                   >
                                                       <Button style={{ backgroundColor: '#ff4d4f' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="delete" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                   </Popconfirm>
                                               </Tooltip>
                                               
                                           </React.Fragment>
                                       }
                                   </ButtonGroup>
                                     }
                                     {TodoStore.getLoading &&
                                        <Spin/>
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
                            <BreadCrumb location="Settings / List of Property Type" />
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
                                                    onClick={(event) => TodoStore.setAddModal(true)}
                                                >
                                                    Add Property Type
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
                                                            <Option value="Type Name">Type Name</Option>
                                                            <Option value="Description">Description</Option>
                                                            <Option value="Equity">Equity</Option>
                                                            <Option value="Miscellaneous">Miscellaneous</Option>
                                                            <Option value="Status">Status</Option>
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
                                                                <th>Type Name</th>
                                                                <th>Description</th>
                                                                <th>Equity in %</th>
                                                                <th>Miscellaneous Fee in %</th>
                                                                <th>Status</th>
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
                    {/* Add Property Type */}
                    <Modal
                        title="Add New Property Type"
                        visible={TodoStore.getAddModal}
                        onOk={addPropertyType}
                        onCancel={TodoStore.setHandleCancel}
                    >
                        {!TodoStore.getAdding &&
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Type Name</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter type name *(Required)"
                                                onChange={TodoStore.setTypename}
                                                value={TodoStore.getTypename}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Description</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter description *(Required)"
                                                onChange={TodoStore.setDescription}
                                                value={TodoStore.getDescription}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Equity</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <InputNumber 
                                                style={{width:'100%'}}
                                                placeholder="Enter equity *(Required)"
                                                onChange={TodoStore.setEquity2}
                                                value={TodoStore.getEquity}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Miscellaneous Fee</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <InputNumber 
                                                style={{width:'100%'}}
                                                placeholder="Enter miscellaneous fee *(Required)"
                                                onChange={TodoStore.setMisc2}
                                                value={TodoStore.getMisc}
                                            />
                                        </Col>


                                    </Row>
                                </Col>
                            </Row>
                        }
                        {TodoStore.getAdding &&
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ marginTop: '3em', textAlign: 'center' }} >
                                            <Spin />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '1em', textAlign: 'center' }} >
                                            <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Please wait... Saving property type information</h5>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        }

                    </Modal>
                    {/* Update Property */}
                    <Modal
                        title="Update Property Type Information"
                        visible={TodoStore.getUpdateModal}
                        onOk={updatePropertyType}
                        onCancel={TodoStore.setHandleCancel}
                    >
                        {!TodoStore.getAdding &&
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Type Name</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter type name *(Required)"
                                                onChange={TodoStore.setTypename}
                                                value={TodoStore.getTypename}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Description</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter description *(Required)"
                                                onChange={TodoStore.setDescription}
                                                value={TodoStore.getDescription}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Equity</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <InputNumber 
                                                style={{width:'100%'}}
                                                placeholder="Enter equity *(Required)"
                                                onChange={TodoStore.setEquity2}
                                                value={TodoStore.getEquity}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Miscellaneous Fee</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <InputNumber 
                                                style={{width:'100%'}}
                                                placeholder="Enter miscellaneous fee *(Required)"
                                                onChange={TodoStore.setMisc2}
                                                value={TodoStore.getMisc}
                                            />
                                        </Col>


                                    </Row>
                                </Col>
                            </Row>
                        }
                        {TodoStore.getAdding &&
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ marginTop: '3em', textAlign: 'center' }} >
                                            <Spin />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '1em', textAlign: 'center' }} >
                                            <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Please wait... Saving property type information</h5>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        }
                    </Modal>
                </Container>



            </React.Fragment>
        );
    }
}

PageContent.propTypes = {

};

export default PageContent;