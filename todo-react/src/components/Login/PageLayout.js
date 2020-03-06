import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Input, Icon, Tooltip, notification } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { Container,Row,Col } from 'react-bootstrap';
@inject('TodoStore')
@observer
class PageLayout extends Component {
    render() {
        const TodoStore = this.props.TodoStore;
        const login = () => {
            TodoStore.setLoading(true);
            if((TodoStore.getUsername==='')||(TodoStore.getPassword==='')){
                openNotification("Blank");
                TodoStore.setLoading(false);
           }else{
            const users = {
                email: TodoStore.getUsername,
                password: TodoStore.getPassword

            }
            console.log(users);
            var port = TodoStore.getPort+'accountrouter/login';
            axios.post(port, users)
                .then(res => {
                    console.log(res.data);
                    if (res.data === '303') {
                        openNotification("Wrong");
                        TodoStore.setLoading(false);
                    } else {
                        TodoStore.setLoading(false);
                        reactLocalStorage.set('userid',res.data[0]._id);
                        reactLocalStorage.set('usertype',res.data[0].usertype);
                        reactLocalStorage.set('useremail',res.data[0].email);
                        reactLocalStorage.set('userlastname',res.data[0].lastname);
                        reactLocalStorage.set('usermiddlename',res.data[0].middlename);
                        reactLocalStorage.set('userfirstname',res.data[0].firstname);
                        reactLocalStorage.set('userimage',res.data[0].image);
                        reactLocalStorage.set('oldpassword',res.data[0].password);
                        window.open("/dashboard","_self");
                    }
                });
           }
        }
        const gotoHomePage = () =>{
            window.open("/","_self");
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
            } else if (value === "Success") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully add work',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            } else if (value === "Wrong") {
                notification.open({
                    message: 'Warning',
                    description: 'Wrong username/password',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });

            } else if (value === "Update") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully update work experience information.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }
        }
        return (
            <React.Fragment>
               <Container fluid={true} style={{backgroundColor:'#d9d9d9',minHeight:'55em',height:'auto'}}>
                   <Row>
                       <Col xs={12} style={{height:'10em'}}>
                          
                       </Col>
                       <Col xs={12}>
                           <Row >
                               <Col xs={12} md={2}>
                                   
                               </Col>
                               <Col xs={12} md={8} style={{
                                            minHeight: '15em',
                                            height:'auto',
                                            backgroundColor:'#ffffff'
                                            }}>
                                    <Row>
                                        <Col xs={12} md={6} style={{minHeight:'20em',
                                                            height:'auto',
                                                            backgroundColor:'#092b00',
                                                            padding:'1em 1em 1em 1em'}}>
                                            <Row>
                                                <Col xs={12} md={12} style={{textAlign:'center',
                                                                            borderBottom:'2px solid #ffffff',
                                                                            paddingTop:'0.5em'}}>
                                                    <h4 style={{ color: '#ffffff', fontSize: '1em' }}>Welcome to MMPDC</h4>
                                                </Col>
                                                <Col xs={12} md={12} style={{marginTop:'1em'}}>
                                                    <p style={{ color: '#ffffff', fontSize: '0.75em',textAlign:'justify' }}>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                                                    remaining essentially unchanged.
                                                    </p>
                                                </Col>
                                                <Col xs={12} md={12} style={{marginTop:'1em'}}>
                                                    <Button onClick={gotoHomePage} style={{color:'#092b00',backgroundColor:'#ffffff'}}>Go to Home page</Button>
                                                </Col>
                                            </Row>

                                        </Col>
                                        <Col xs={12} md={6} style={{minHeight:'15em',
                                                            height:'auto',
                                                            padding:'1em 1em 1em 1em',
                                                            backgroundColor:'#ffffff'}}>
                                            <Row>
                                                <Col xs={12} md={12} style={{textAlign:'center',
                                                                            borderBottom:'2px solid #092b00',
                                                                            paddingTop:'0.5em'
                                                                           }}>
                                                    <h4 style={{ color: '#092b00', fontSize: '1em' }}>Login</h4>
                                                </Col>
                                                <Col xs={12} md={12} style={{marginTop:'3em'}}>
                                                    <Input
                                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Enter email here"
                                                    onChange={TodoStore.setUsername}
                                                    value={TodoStore.getUsername}
                                                    />
                                                </Col>
                                                <Col xs={12} md={12} style={{marginTop:'1em'}}>
                                                    <Input.Password
                                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Enter password here"
                                                    onChange={TodoStore.setPassword}
                                                    value={TodoStore.getPassword}
                                                    />
                                                </Col>
                                                <Col  xs={12} md={12} style={{marginTop:'2em'}}>
                                                    <Tooltip placement="topLeft" title="Click to login">
                                                        {!TodoStore.getLoading &&
                                                             <Button 
                                                             onClick={login}
                                                             style={{color:'#ffffff',backgroundColor:'#092b00',width:'100%'}}>Login</Button>
                                                        }
                                                         {TodoStore.getLoading &&
                                                             <Button 
                                                             style={{color:'#ffffff',backgroundColor:'#092b00',width:'100%'}}>Please wait. Logging in...</Button>
                                                        }
                                                       
                                                    </Tooltip>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                   
                               </Col>
                               <Col xs={12} md={2}>
                                   
                               </Col>
                           </Row>
                       </Col>
                   </Row>
               </Container>
            </React.Fragment>
        );
    }
}

PageLayout.propTypes = {

};

export default PageLayout;