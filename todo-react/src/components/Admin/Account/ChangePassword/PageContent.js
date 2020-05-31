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
            isuploading: false,
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
        var { isloaded, items, sizes, isdisplay, issaving, isuploading, file, filename, uploadedFile, message, uploadPercentage } = this.state;

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
        const onChange = e => {
            this.setState({
                file: e.target.files[0],
                filename: e.target.files[0].name,
            })
            TodoStore.setProfileImage(e.target.files[0].name);
            // setFile(e.target.files[0]);
            // setFilename(e.target.files[0].name);
        };
        const setName = (filename) => {

            TodoStore.setAccountImage(filename);
        }

        const updatePassword = () => {
            if ((TodoStore.getOldPassword.length === 0) || (TodoStore.getPassword.length === 0)
            ) {
                openNotification("Blank");
            } else {
                this.setState({
                    issaving: true,
                })
                TodoStore.setAdding(true);
                if (reactLocalStorage.get('oldpassword') === TodoStore.getOldPassword) {
                    let id = reactLocalStorage.get('userid');
                    const account = {
                        password: TodoStore.getPassword

                    }
                    var port = TodoStore.getPort+'accountrouter/password/';
                    axios.post(port + id, account)
                        .then(res => {
                            if (res.data === '202') {
                                openNotification("Exist");
                                this.setState({
                                    issaving: false,
                                })
                            } else if (res.data === '101') {
                                reactLocalStorage.set('oldpassword', TodoStore.getPassword);
                                this.setState({
                                    issaving: false,
                                })
                                openNotification("Update");

                            } else {

                                openNotification("Server");
                                this.setState({
                                    issaving: false,
                                })
                            }
                        });
                }else {
                    openNotification("NOTMATCH");
                    this.setState({
                        issaving: false,
                    })
                }
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
            } else if (value === "NOTMATCH") {
                notification.open({
                    message: 'Warning',
                    description: 'Old password not match with your current password.',
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
                    description: 'Successfully update your password.',
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
                window.open("account", "_self");

            } else if (value === "Removed") {
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
                            <BreadCrumb location="Account / Change Password" />
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
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Old Password</h4>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Input.Password placeholder="Enter your old password *(Required)"
                                                            onChange={TodoStore.setOldPassword}
                                                            value={TodoStore.getOldPassword}
                                                        />
                                                    </Col>
                                                    <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>New Password</h4>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Input.Password placeholder="Enter your new password *(Required)"
                                                            onChange={TodoStore.setPassword}
                                                            value={TodoStore.getPassword}
                                                        />
                                                    </Col>
                                                    <Col xs={12} md={12} style={{ textAlign: 'right', marginTop: '1em' }} >
                                                        {!issaving &&
                                                            <Button
                                                                onClick={updatePassword}
                                                                style={{ color: '#ffffff', backgroundColor: '#1890ff', fontSize: '1em' }}>
                                                                Change Password
                                                          </Button>
                                                        }
                                                        {issaving &&
                                                            <Button
                                                                style={{ color: '#ffffff', backgroundColor: '#1890ff', fontSize: '1em' }}>
                                                                Please wait. Saving...
                                                          </Button>
                                                        }

                                                    </Col>
                                                </Row>
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