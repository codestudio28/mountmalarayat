import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout, Button, Input, Icon, Tooltip, Steps,notification } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class LoginRequirement extends Component {
    constructor(props){
        super(props);

    }
    render() {
        const TodoStore = this.props.TodoStore;
        const nextPersonalInfo = () => {
            
           if((TodoStore.getRegEmail==='')||(TodoStore.getRegPassword1==='')){
                openNotification("Blank")
                
           }else{
            TodoStore.setRegisterStep(1);
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
            } else if (value === "Success") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully add work',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            } else if (value === "Remove") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully removed work experience information.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
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
                <Row>
                    <Col span={4}></Col>
                    <Col span={16} style={{
                        minHeight: '30em',
                        height: 'auto',
                        borderRadius: '0.75em',
                        backgroundColor: '#ffffff'
                    }}>
                        <Row>
                            <Col span={24} style={{
                                height: '3em',
                                borderRadius: '0.75em 0.75em 0em 0em',
                                backgroundColor: '#800000',
                                padding: '0.75em 1em 0.75em 1em'
                            }}>
                                <h4 style={{ fontSize: '1.25em', color: '#ffffff' }}>
                                    Login Requirement
                                            </h4>
                            </Col>
                            <Col span={24} style={{
                                minHeight: '22em',
                                height: 'auto',
                                padding: '2em'
                            }}>
                                <Row>
                                    <Col span={6}>
                                    </Col>
                                    <Col span={12}>
                                        <Row>
                                            <Col span={24} style={{ textAlign:'right' }}>
                                             <h4 style={{ fontSize: '1em', color: '#f5222d' }}>* Required</h4>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                             <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Email</h4>
                                            </Col>
                                            <Col span={24} >
                                                <Input
                                                    style={{ width: '100%' }}
                                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Enter email here"
                                                    onChange={TodoStore.onChangeRegEmail}
                                                    value={TodoStore.getRegEmail}
                                                    suffix={
                                                        <Tooltip placement="topLeft" title="We will notify you through this email.">
                                                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />
                                                        </Tooltip>
                                                    }
                                                />
                                                
                                                
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                             <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Password</h4>
                                            </Col>
                                            <Col span={24} >
                                                <Input.Password
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegPassword1}
                                                    value={TodoStore.getRegPassword1}
                                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Enter password here"

                                                />
                                            </Col>
                                            {/* <Col span={24} style={{ marginTop: '2em' }}>
                                                <Input.Password
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegPassword2}
                                                    value={TodoStore.getRegPassword2}
                                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Re-type password here"

                                                />
                                            </Col> */}
                                        </Row>
                                    </Col>
                                    <Col span={6}>
                                    </Col>
                                </Row>


                            </Col>
                            <Col span={24} style={{
                                height: '5em',
                                borderRadius: '0em 0em 0.75em 0.75em'
                            }}>
                                <Row>
                                    <Col span={12}>

                                    </Col>
                                    <Col span={12} style={{ textAlign: 'right', padding: '1.5em' }}>
                                        <Button onClick={nextPersonalInfo}
                                            style={{ color: '#ffffff', backgroundColor: '#800000' }}>
                                            Next: Personal Information
                                        </Button>
                                    </Col>

                                </Row>

                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </React.Fragment>
        );
    }
}

LoginRequirement.propTypes = {

};

export default LoginRequirement;