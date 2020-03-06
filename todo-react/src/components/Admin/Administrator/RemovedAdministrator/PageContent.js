import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu,Spin, Icon,InputNumber, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
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
            items: [],
            isloaded: false,
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        var port = TodoStore.getPort;
        fetch(port+'accountrouter/remove')
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

        items.map(item => (
                dataSource.push({
                    key: item._id,
                    image: item.image,
                    email: item.email,
                    lastname: item.lastname,
                    middlename: item.middlename,
                    firstname: item.firstname,

                })
            ));

        const getAdministrator = () => {
            var port = TodoStore.getPort;
            fetch(port+'accountrouter/remove')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isloaded: true,
                    items: json,
                })
            });
        }
      
       
        const removeAdministrator = () => {
            var id = TodoStore.getRemoveId;
            const client = {
                status: 'ACTIVE'
            }
            TodoStore.setLoading(true);
            var port = TodoStore.getPort;
            axios.post(port+'accountrouter/retrieve/' + id, client)
                .then(res => {
                    console.log(res.data);
                    if (res.data === '101') {
                        TodoStore.setLoading(false);
                        getAdministrator();
                        openNotification("Retrieved");
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

            } else if (value === "Retrieved") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully retrieved administrator.',
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
                                            <Tooltip placement="topLeft" title="Click to retrieve this administrator">
                                                <Popconfirm
                                                    placement="topRight"
                                                    title="Do you want to retrieve this administrator?"
                                                    onConfirm={removeAdministrator}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button style={{ backgroundColor: '#722ed1' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="interaction" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
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
                                            <Tooltip placement="topLeft" title="Click to retrieve this administrator">
                                                <Popconfirm
                                                    placement="topRight"
                                                    title="Do you want to retrieve this administrator?"
                                                    onConfirm={removeAdministrator}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button style={{ backgroundColor: '#722ed1' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="interaction" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
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
                                               <Tooltip placement="topLeft" title="Click to retrieve this administrator">
                                                   <Popconfirm
                                                       placement="topRight"
                                                       title="Do you want to retrieve this administrator?"
                                                       onConfirm={removeAdministrator}
                                                       okText="Yes"
                                                       cancelText="No"
                                                   >
                                                       <Button style={{ backgroundColor: '#722ed1' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="interaction" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
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
                                               <Tooltip placement="topLeft" title="Click to retrieve this administrator">
                                                   <Popconfirm
                                                       placement="topRight"
                                                       title="Do you want to retrieve this administrator?"
                                                       onConfirm={removeAdministrator}
                                                       okText="Yes"
                                                       cancelText="No"
                                                   >
                                                       <Button style={{ backgroundColor: '#722ed1' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="interaction" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
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
                   
                </Container>



            </React.Fragment>
        );
    }
}

PageContent.propTypes = {

};

export default PageContent;