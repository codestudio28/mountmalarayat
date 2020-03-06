import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Upload, message, Layout, Menu, Spin, Icon, InputNumber, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import './content.css';
import { Input } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from "axios";
import BreadCrumb from '../../BreadCrumb';
import Progress from './Progress';
import ProfileImage from './ProfileImage';



const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const ButtonGroup = Button.Group;
const { Option } = Select;

var i = 0;
var profile = "";

@inject('TodoStore')
@observer
class PageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: 0,
            items: [],
            isdisplay: false,
            issaving: false,
            isuploading:false,
            isloaded: false,
            file: '',
            filename: 'Choose File',
            uploadedFile: {},
            message: '',
            uploadPercentage: 0,
        }
    }
    componentDidMount() {
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
        var { isloaded, items, sizes, isdisplay, issaving, isuploading,file, filename, uploadedFile, message, uploadPercentage } = this.state;

        if (isdisplay === false) {
            TodoStore.setEmail2(reactLocalStorage.get('useremail'));
            TodoStore.setFirstname2(reactLocalStorage.get('userfirstname'));
            TodoStore.setMiddlename2(reactLocalStorage.get('usermiddlename'));
            TodoStore.setLastname2(reactLocalStorage.get('userlastname'));
            profile = TodoStore.getAddUserProfilePath + reactLocalStorage.get('userimage');
            this.setState({
                isdisplay: true,
            })
        }
       
        const updateProfile = () => {
            if ((TodoStore.getLastname.length === 0)
                || (TodoStore.getMiddlename.length === 0) || (TodoStore.getFirstname.length === 0)
            ) {
                openNotification("Blank");
            } else {
                this.setState({
                    issaving: true,
                })
                TodoStore.setAdding(true);
                let id = reactLocalStorage.get('userid');
                const account = {
                    lastname: TodoStore.getLastname,
                    firstname: TodoStore.getFirstname,
                    middlename: TodoStore.getMiddlename

                }
               
                var port = TodoStore.getPort+'accountrouter/update/';
                axios.post(port+id, account)
                    .then(res => {
                        if (res.data === '202') {
                            openNotification("Exist");
                        } else if (res.data === '101') {
                            reactLocalStorage.set('userlastname', TodoStore.getLastname);
                            reactLocalStorage.set('usermiddlename', TodoStore.getMiddlename);
                            reactLocalStorage.set('userfirstname', TodoStore.getFirstname);
                            this.setState({
                                issaving: false,
                            })
                            openNotification("Update");

                        } else {

                            openNotification("Server");
                        }
                    });
            }
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
                    description: 'Someone already use this information.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            } else if (value === "Success") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully add property to the system',
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
                    description: 'Successfully update your information.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            } else if (value === "UpdateImage") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully update your profile photo.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });
                window.open("account","_self");

            }else if (value === "Removed") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully removed property.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }
            else if (value === "Retrieved") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully retrieved property.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }
        }


        return (

            <React.Fragment>

                <Container fluid={true} style={{ minHeight: '40em', height: 'auto', marginTop: '1em', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <BreadCrumb location="Account / Account Information" />
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

                                            <Col xs={12} md={6} style={{ paddingTop: '0.5em' }}>
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
                                                    <Col xs={12} md={12} style={{ textAlign: 'right', marginTop: '1em' }} >
                                                        {!issaving &&
                                                            <Button
                                                                onClick={updateProfile}
                                                                style={{ color: '#ffffff', backgroundColor: '#1890ff', fontSize: '1em' }}>
                                                                Update Information
                                                          </Button>
                                                        }
                                                        {issaving &&
                                                            <Button
                                                                onClick={updateProfile}
                                                                style={{ color: '#ffffff', backgroundColor: '#1890ff', fontSize: '1em' }}>
                                                                Please wait. Saving...
                                                          </Button>
                                                        }

                                                    </Col>
                                                </Row>
                                            </Col>
                                            {/* Here */}
                                            <ProfileImage/>

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