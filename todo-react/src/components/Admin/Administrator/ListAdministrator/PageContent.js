import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu,Spin, Icon,InputNumber, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import './content.css';
import { Input } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from "axios";
import BreadCrumb from '../../BreadCrumb';
import emailjs from 'emailjs-com';



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
            isdefault: false,
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        var port = TodoStore.getPort+"accountrouter/active";
        fetch(port)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isloaded: true,
                    items: json,
                    isdefault: true,
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
        items.map(item => (
                dataSource.push({
                    key: item._id,
                    image: item.image,
                    email: item.email,
                    lastname: item.lastname,
                    middlename: item.middlename,
                    firstname: item.firstname,
                    password:item.password,

                })
            ));
      
        const getAdministrator = () => {
            var port = TodoStore.getPort+"accountrouter/active";
            fetch(port)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isloaded: true,
                    items: json,
                })
            });
        }
        const addAdministrator = () => {
            if ((TodoStore.getEmail.length === 0) || (TodoStore.getLastname.length === 0)
                || (TodoStore.getMiddlename.length === 0) || (TodoStore.getFirstname.length === 0)
                ) {
                openNotification("Blank");
            } else {
                TodoStore.setAdding(true);
                var tempDate = new Date();
                var date_created = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
                var result           = 'AAA';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                var charactersLength = characters.length;

                for ( var i = 0; i < 6; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
               
               
                const account = {
                    usertype: "administrator",
                    email: TodoStore.getEmail,
                    password: result,
                    image: "https://res.cloudinary.com/codestudio28/image/upload/v1578917969/malarayat/male_y5aq5b.png",
                    lastname: TodoStore.getLastname,
                    firstname: TodoStore.getFirstname,
                    middlename: TodoStore.getMiddlename,
                    date_created: date_created,
                    status: "ACTIVE"

                }
                var port = TodoStore.getPort;
                axios.post(port+'accountrouter/add', account)
                    .then(res => {
                        console.log(res.data);
                        if (res.data === '202') {
                            TodoStore.setAdding(false);
                            openNotification("Exist");
                        } else if (res.data === '101') {
                            openNotification("Success");
                            getAdministrator();
                         
                            TodoStore.setAdding(false);
                            TodoStore.setHandleCancel();
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
                TodoStore.setEmail2(data.email);
                TodoStore.setLastname2(data.lastname);
                TodoStore.setFirstname2(data.firstname);
                TodoStore.setMiddlename2(data.middlename);
            })
        }
        const viewPassword = (password) => {
            TodoStore.setPasswordModal(true);
            TodoStore.setPassword2(password);
        }

       

        const updateAdministrator = () => {
            if ((TodoStore.getLastname.length === 0)
                || (TodoStore.getMiddlename.length === 0) || (TodoStore.getFirstname.length === 0)
                ) {
                openNotification("Blank");
            } else {
                TodoStore.setAdding(true);
                let id = TodoStore.getUpdateId;
                const account = {
                    lastname: TodoStore.getLastname,
                    firstname: TodoStore.getFirstname,
                    middlename: TodoStore.getMiddlename

                }
                var port = TodoStore.getPort+'accountrouter/update/';
                axios.post(port + id, account)
                    .then(res => {
                        if (res.data === '202') {
                            TodoStore.setAdding(false);
                            openNotification("Exist");
                        } else if (res.data === '101') {
                            openNotification("Update");
                            getAdministrator();
                            TodoStore.setAdding(false);
                            TodoStore.setHandleCancel();
                        } else {
                            TodoStore.setAdding(false);
                            openNotification("Server");
                        }
                    });
            }
        }
        const removeAdministrator = () => {
            var id = TodoStore.getRemoveId;
            const client = {
                status: 'REMOVED'
            }
            TodoStore.setLoading(true);
            var port = TodoStore.getPort+'accountrouter/remove/';
            axios.post(port + id, client)
                .then(res => {
                    console.log(res.data);
                    if (res.data === '101') {
                        TodoStore.setLoading(false);
                        getAdministrator();
                        openNotification("Removed");
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
                    description: 'Administrator already in the records',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            } else if (value === "Success") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully add administrator to the system',
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
                    description: 'Successfully update administrator information.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            } else if (value === "Removed") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully removed administrator.',
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
                return data.lastname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Email') {
                return data.email.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Firstname') {
                return data.firstname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Middlename') {
                return data.middlename.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Lastname') {
                return data.lastname.indexOf(TodoStore.search) >= 0
            } 

        })
            .map((data, index) => {
                i++;
                var pass = data.password;
               
                if ((index >= starts) && (index < ends)) {
                    if(sizes===0){
                        if(data.image!=="avatar.png"){
                            return (
                                <tr key={i}>
                                    <td>{i}</td>
                                   
                                    <td><Avatar src={data.image}
                                    style={{ "width": "2.5em", "height": "2em" }} /></td>
                                    <td>{data.email}</td>
                                    <td>{data.firstname} {data.middlename} {data.lastname}</td>
                                    <td>
                                    {!TodoStore.getLoading &&
                                        <ButtonGroup>
                                            {pass.substring(0, 3)==="AAA" &&
                                                <Tooltip placement="topLeft" title="Click to view password">
                                                <Button style={{ backgroundColor: '#52c41a' }}
                                                    onClick={(event) => viewPassword(data.password)}
                                                ><Icon type="eye" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Tooltip>
                                            }
                                            
                                            <Tooltip placement="topLeft" title="Click to update administrator information">
                                                <Button style={{ backgroundColor: '#00a2ae' }}
                                                    onClick={(event) => setUpdate(data.key)}
                                                ><Icon type="edit" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                            </Tooltip>
                                            <Tooltip placement="topLeft" title="Click to remove this administrator">
                                                <Popconfirm
                                                    placement="topRight"
                                                    title="Do you want to remove this administrator?"
                                                    onConfirm={removeAdministrator}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button style={{ backgroundColor: '#ff4d4f' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="delete" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Popconfirm>
                                            </Tooltip>
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
                        }else{
                            return (
                        
                                <tr key={i}>
                                    <td>{i}</td>
                                   
                                    <td><Avatar src={TodoStore.getAddUserProfilePath+data.image}
                                    style={{ "width": "2.5em", "height": "2em" }} /></td>
                                    <td>{data.email}</td>
                                    <td>{data.firstname} {data.middlename} {data.lastname}</td>
                                    <td>
                                    {!TodoStore.getLoading &&
                                        <ButtonGroup>
                                             {pass.substring(0, 3)==="AAA" &&
                                                <Tooltip placement="topLeft" title="Click to view password">
                                                <Button style={{ backgroundColor: '#52c41a' }}
                                                    onClick={(event) => viewPassword(data.password)}
                                                ><Icon type="eye" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Tooltip>
                                            }
                                            <Tooltip placement="topLeft" title="Click to update administrator information">
                                                <Button style={{ backgroundColor: '#00a2ae' }}
                                                    onClick={(event) => setUpdate(data.key)}
                                                ><Icon type="edit" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                            </Tooltip>
                                            <Tooltip placement="topLeft" title="Click to remove this administrator">
                                                <Popconfirm
                                                    placement="topRight"
                                                    title="Do you want to remove this administrator?"
                                                    onConfirm={removeAdministrator}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button style={{ backgroundColor: '#ff4d4f' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="delete" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Popconfirm>
                                            </Tooltip>
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
                        }
                        
                    }else {
                        if(data.image!=="avatar.png"){
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
                                         <Col xs={12} md={12} >
                                             <Row>
                                                <Col xs={6} md={6}>
                                                    <Row>
                                                        <Col xs={12} md={12} >
                                                            <h4 style={{ fontSize: '1em' }}><span style={{color:'#8c8c8c'}}>Email:</span> {data.email}</h4>
                                                        </Col>
                                                        <Col xs={12} md={12} >
                                                            <h4 style={{ fontSize: '1em' }}><span style={{color:'#8c8c8c'}}>Name:</span> {data.firstname} {data.middlename} {data.lastname}</h4>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={6} md={6}>
                                                    <img src={data.image} style={{width:'10em'}}/>
                                                </Col>
                                             </Row>
                                            
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <div style={{ borderTop: '1px solid', width: '100%' }}>
    
                                            </div>
                                        </Col>
                                        <Col xs={12} md={12} style={{textAlign:'right',paddingTop:'0.5em'}}>
                                        {!TodoStore.getLoading &&
                                              <ButtonGroup>
                                               {pass.substring(0, 3)==="AAA" &&
                                                <Tooltip placement="topLeft" title="Click to view password">
                                                <Button style={{ backgroundColor: '#52c41a' }}
                                                    onClick={(event) => viewPassword(data.password)}
                                                ><Icon type="eye" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Tooltip>
                                            }
                                              <Tooltip placement="topLeft" title="Click to update administrator information">
                                                  <Button style={{ backgroundColor: '#00a2ae' }}
                                                      onClick={(event) => setUpdate(data.key)}
                                                  ><Icon type="edit" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                              </Tooltip>
                                              <Tooltip placement="topLeft" title="Click to remove this administrator">
                                                  <Popconfirm
                                                      placement="topRight"
                                                      title="Do you want to remove this administrator?"
                                                      onConfirm={removeAdministrator}
                                                      okText="Yes"
                                                      cancelText="No"
                                                  >
                                                      <Button style={{ backgroundColor: '#ff4d4f' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="delete" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                  </Popconfirm>
                                              </Tooltip>
                                          </ButtonGroup>
                                         }
                                         {TodoStore.getLoading &&
                                            <Spin/>
                                         }
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        }else{
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
                                         <Col xs={12} md={12} >
                                             <Row>
                                                <Col xs={6} md={6}>
                                                    <Row>
                                                        <Col xs={12} md={12} >
                                                            <h4 style={{ fontSize: '1em' }}><span style={{color:'#8c8c8c'}}>Email:</span> {data.email}</h4>
                                                        </Col>
                                                        <Col xs={12} md={12} >
                                                            <h4 style={{ fontSize: '1em' }}><span style={{color:'#8c8c8c'}}>Name:</span> {data.firstname} {data.middlename} {data.lastname}</h4>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={6} md={6}>
                                                    <img src={TodoStore.getAddUserProfilePath+data.image} style={{width:'10em'}}/>
                                                </Col>
                                             </Row>
                                            
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <div style={{ borderTop: '1px solid', width: '100%' }}>
    
                                            </div>
                                        </Col>
                                        <Col xs={12} md={12} style={{textAlign:'right',paddingTop:'0.5em'}}>
                                        {!TodoStore.getLoading &&
                                              <ButtonGroup>
                                                  {pass.substring(0, 3)==="AAA" &&
                                                <Tooltip placement="topLeft" title="Click to view password">
                                                <Button style={{ backgroundColor: '#52c41a' }}
                                                    onClick={(event) => viewPassword(data.password)}
                                                ><Icon type="eye" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Tooltip>
                                            }
                                              <Tooltip placement="topLeft" title="Click to update administrator information">
                                                  <Button style={{ backgroundColor: '#00a2ae' }}
                                                      onClick={(event) => setUpdate(data.key)}
                                                  ><Icon type="edit" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                              </Tooltip>
                                              <Tooltip placement="topLeft" title="Click to remove this administrator">
                                                  <Popconfirm
                                                      placement="topRight"
                                                      title="Do you want to remove this administrator?"
                                                      onConfirm={removeAdministrator}
                                                      okText="Yes"
                                                      cancelText="No"
                                                  >
                                                      <Button style={{ backgroundColor: '#ff4d4f' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="delete" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                  </Popconfirm>
                                              </Tooltip>
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
                       
                  
                    
                }
            })
        return (

            <React.Fragment>

                <Container fluid={true} style={{ minHeight: '40em', height: 'auto', marginTop: '1em', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <BreadCrumb location="Administrator / List of Administrator" />
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
                                                    Add Administrator
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
                                                            <Option value="Email">Email</Option>
                                                            <Option value="Firstname">Firstname</Option>
                                                            <Option value="Middlename">Middlename</Option>
                                                            <Option value="Lastname">Lastname</Option>
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
                                                                <th>Profile</th>
                                                                <th>Email</th>
                                                                <th>Name</th>
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
                    {/* Add Administrator */}
                    <Modal
                        title="Add New Administrator"
                        visible={TodoStore.getAddModal}
                        onOk={addAdministrator}
                        onCancel={TodoStore.setHandleCancel}
                    >
                        {!TodoStore.getAdding &&
                             <Row>
                             <Col xs={12} md={12}>
                                 <Row>
                                     <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                         <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Email</h4>
                                     </Col>
                                     <Col xs={12} md={12} >
                                         <Input placeholder="Enter email *(Required)"
                                             onChange={TodoStore.setEmail}
                                             value={TodoStore.getEmail}
                                         />
                                     </Col>
                                     <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                         <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>First name</h4>
                                     </Col>
                                     <Col xs={12} md={12} >
                                         <Input placeholder="Enter first name *(Required)"
                                             onChange={TodoStore.setFirstname}
                                             value={TodoStore.getFirstname}
                                         />
                                     </Col>
                                     <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                         <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Middle name</h4>
                                     </Col>
                                     <Col xs={12} md={12} >
                                         <Input placeholder="Enter middle name *(Required)"
                                             onChange={TodoStore.setMiddlename}
                                             value={TodoStore.getMiddlename}
                                         />
                                     </Col>
                                     <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                         <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Last name</h4>
                                     </Col>
                                     <Col xs={12} md={12} >
                                         <Input placeholder="Enter last name *(Required)"
                                             onChange={TodoStore.setLastname}
                                             value={TodoStore.getLastname}
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
                                     <Col xs={12} md={12} style={{marginTop:'3em',textAlign:'center'}} >
                                            <Spin />
                                     </Col>
                                     <Col xs={12} md={12} style={{marginTop:'1em',textAlign:'center'}} >
                                        <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Please wait... Saving administrator information</h5> 
                                     </Col>
                                     
                                 </Row>
                             </Col>
                         </Row>
                        }
                       
                    </Modal>
                     {/* Update Property */}
                     <Modal
                        title="Add Update Administrator"
                        visible={TodoStore.getUpdateModal}
                        onOk={updateAdministrator}
                        onCancel={TodoStore.setHandleCancel}
                    >
                        {!TodoStore.getAdding &&
                             <Row>
                             <Col xs={12} md={12}>
                                 <Row>
                                     <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                         <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Email</h4>
                                     </Col>
                                     <Col xs={12} md={12} >
                                         <Input placeholder="Enter email *(Required)"
                                             onChange={TodoStore.setEmail}
                                             value={TodoStore.getEmail}
                                             disabled
                                         />
                                     </Col>
                                     <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                         <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>First name</h4>
                                     </Col>
                                     <Col xs={12} md={12} >
                                         <Input placeholder="Enter first name *(Required)"
                                             onChange={TodoStore.setFirstname}
                                             value={TodoStore.getFirstname}
                                         />
                                     </Col>
                                     <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                         <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Middle name</h4>
                                     </Col>
                                     <Col xs={12} md={12} >
                                         <Input placeholder="Enter middle name *(Required)"
                                             onChange={TodoStore.setMiddlename}
                                             value={TodoStore.getMiddlename}
                                         />
                                     </Col>
                                     <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                         <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Last name</h4>
                                     </Col>
                                     <Col xs={12} md={12} >
                                         <Input placeholder="Enter last name *(Required)"
                                             onChange={TodoStore.setLastname}
                                             value={TodoStore.getLastname}
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
                                     <Col xs={12} md={12} style={{marginTop:'3em',textAlign:'center'}} >
                                            <Spin />
                                     </Col>
                                     <Col xs={12} md={12} style={{marginTop:'1em',textAlign:'center'}} >
                                        <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Please wait... Saving administrator information</h5> 
                                     </Col>
                                     
                                 </Row>
                             </Col>
                         </Row>
                        }
                    </Modal>

                     {/* View Password */}
                     <Modal
                        title="View Password"
                        visible={TodoStore.getPasswordModal}
                        onOk={TodoStore.setHandleCancel}
                        onCancel={TodoStore.setHandleCancel}
                        
                    >
                       <Row>
                        <Col xs={12} md={12} style={{textAlign:'center'}}>
                            {
                                <h4 style={{fontSize:'4em'}}>{TodoStore.getPassword}</h4>
                            }
                        </Col>
                        </Row> 
                    </Modal>
                </Container>



            </React.Fragment>
        );
    }
}

PageContent.propTypes = {

};

export default PageContent;