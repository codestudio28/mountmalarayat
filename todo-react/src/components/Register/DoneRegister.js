import React, { Fragment, useState, Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Row, Col, notification, Icon, Button, Avatar, Popconfirm, Result } from 'antd';
import Message from './Message';
import { inject, observer } from 'mobx-react';
import Progress from './Progress';

import axios from 'axios';

const DoneRegister = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;





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
                                Done
                        </h4>
                        </Col>
                        <Col span={24} style={{
                            minHeight: '22em',
                            height: 'auto',
                            padding: '2em'
                        }}>
                            <Result
                                status="success"
                                title="Successfully Submit Your Registration!"
                                subTitle="Please wait for the approval of the administrator"
                                extra={[
                                    <Button key="buy" style={{color:'#ffffff', backgroundColor:'#800000'}}>Go to Home Page</Button>,
                                ]}
                            />

                        </Col>
                    </Row>
                </Col>




            </Row>
        </React.Fragment>
    )
}));
export default DoneRegister