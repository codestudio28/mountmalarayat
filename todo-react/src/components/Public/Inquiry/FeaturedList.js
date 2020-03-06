import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Input, Icon, Tooltip, notification, DatePicker, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import "./index.css";
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from "./CarouselPage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Recaptcha from 'react-recaptcha';

const { Option } = Select;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
@inject('TodoStore')
@observer
class FeaturedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: 0,
            isverified: false
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
        var { sizes, isverified } = this.state;

        const submitMessage = () => {
            if (isverified === true) {
                if ((TodoStore.getFirstname==="") || (TodoStore.getMiddlename==="") 
                    || (TodoStore.getLastname==="") || (TodoStore.getAddress==="")
                    || (TodoStore.getCity==="") || (TodoStore.getProvince==="")
                    || (TodoStore.getEmail==="") || (TodoStore.getContactNumber==="")
                    || (TodoStore.getBirthdate==="") || (TodoStore.getSalaryRange==="")
                    || (TodoStore.getMessage==="")) {
                    openNotification('Blank');
                } else {
                    TodoStore.setLoading(true);
                    var tempDate = new Date();
                    var date_created = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
                    const message = {
                        lastname:TodoStore.getLastname,
                        firstname:TodoStore.getFirstname,
                        middlename:TodoStore.getMiddlename,
                        contactnumber:TodoStore.getContactNumber,
                        address:TodoStore.getAddress,
                        city:TodoStore.getCity,
                        province:TodoStore.getProvince,
                        email:TodoStore.getEmail,
                        birthdate:TodoStore.getBirthdate,
                        salaryrange:TodoStore.getSalaryRange,
                        message:TodoStore.getMessage,
                        dates:date_created,
                        status:"UNREAD"

                    }
                    var port = TodoStore.getPort + 'messagerouter/add';
                    axios.post(port, message)
                        .then(res => {
                            if (res.data === '202') {
                                TodoStore.setLoading(false);
                                // openNotification("Exist");
                            } else if (res.data === '101') {
                                openNotification("Success");
                                TodoStore.setLoading(false);
                                window.open("/inquire","_self");
                               
                            } else {
                                TodoStore.setLoading(false);
                                openNotification("Server");
                            }
                        });
                }

            } else {
                openNotification('Failed');
            }
        }
        const recaptchaLoaded = () => {
            console.log("Recaptcha success");
        }
        const verifyCallback = (response) => {
            if (response) {
                this.setState({
                    isverified: true
                })
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
                    description: 'Administrator already in the records',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            } else if (value === "Failed") {
                notification.open({
                    message: 'Warning',
                    description: 'Please verify that you are not a robot',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            }else if (value === "Success") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully submit your inquiry',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#faad14' }} />,
                });
            }
        }
        return (
            <React.Fragment>

                {sizes === 0 &&
                    <Row>
                        <Col md={12} style={{ textAlign: 'left', paddingLeft: '2em', paddingTop: '1em' }}>
                            <h4 style={{ fontSize: '1.25em', color: '#135200' }}>What would you like to inquire?</h4>
                            <h4 style={{ fontSize: '0.75em', color: '#135200', marginTop: '0.5em' }}>Inquire about your preferred property by filling out this form.</h4>

                        </Col>
                        <Col md={12} style={{ minHeight: '10em', height: 'auto', padding: '0.5em' }}>
                            <Row>
                                <Col md={3} style={{ marginTop: '2em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '2em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>First Name</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter first name *(Required)"
                                                onChange={TodoStore.setFirstname}
                                                value={TodoStore.getFirstname}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '2em', height: 'auto', textAlign: 'center' }}></Col>

                                <Col md={3} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Middle Name</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter middle name *(Required)"
                                                onChange={TodoStore.setMiddlename}
                                                value={TodoStore.getMiddlename}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}></Col>

                                <Col md={3} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Last Name</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter last name *(Required)"
                                                onChange={TodoStore.setLastname}
                                                value={TodoStore.getLastname}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}></Col>


                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Address</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter address *(Required)"
                                                onChange={TodoStore.setAddress}
                                                value={TodoStore.getAddress}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>

                                <Col md={3} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>City</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter city *(Required)"
                                                onChange={TodoStore.setCity}
                                                value={TodoStore.getCity}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}></Col>

                                <Col md={3} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Province</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter province *(Required)"
                                                onChange={TodoStore.setProvince}
                                                value={TodoStore.getProvince}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}></Col>

                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Email</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter email *(Required)"
                                                onChange={TodoStore.setEmail}
                                                value={TodoStore.getEmail}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>

                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Mobile Number</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter contact number *(Required)"
                                                onChange={TodoStore.setContactNumber}
                                                value={TodoStore.getContactNumber}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>

                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Birthdate</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <DatePicker onChange={TodoStore.setBirthdate}
                                                style={{ width: '100%' }} />

                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>

                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Salary Range</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Select defaultValue="Select Salary Range" style={{ width: '100%' }} onChange={TodoStore.setSalaryRange}>
                                                <Option value="Php. 15,000 - Php. 25,000">Php. 15,000 - Php. 25,000</Option>
                                                <Option value="Php. 25,001 - Php. 35,000">Php. 25,001 - Php. 35,000</Option>
                                                <Option value="Php. 35,001 - Php. 45,000">Php. 35,001 - Php. 45,000</Option>
                                                <Option value="Php. 45,001 - Php. 55,000">Php. 45,001 - Php. 55,000</Option>
                                                <Option value="Php. 55,001 - Php. 65,000">Php. 55,001 - Php. 65,000</Option>
                                                <Option value="Php. 65,001 - Php. 75,000">Php. 65,001 - Php. 75,000</Option>
                                                <Option value="Php. 75,001 - Php. 85,000">Php. 75,001 - Php. 85,000</Option>
                                                <Option value="Php. 85,001 - Above">Php. 85,001 - Above</Option>
                                            </Select>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>

                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Message</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <TextArea rows={4} placeholder="Enter you message *(Required)"
                                                onChange={TodoStore.setMessage}
                                                value={TodoStore.getMessage}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>
                                {!TodoStore.getLoading &&
                                    <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                        <Row>
                                            <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                                <Button onClick={submitMessage}
                                                    style={{ backgroundColor: '#237804', color: '#ffffff', height: '4em', width: '10em' }}>Submit</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                }
                                {TodoStore.getLoading &&
                                    <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                        <Row>
                                            <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                                <Button style={{ backgroundColor: '#237804', color: '#ffffff', height: '4em', width: '20em' }}>Please wait... Submitting your inquiry.</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                }
                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>

                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em', textAlign: 'center' }}>
                                            <Recaptcha
                                                sitekey="6Lf0w84UAAAAAEJHSfLq53n0_3gvj8uEzZXEnVVX"
                                                render="explicit"
                                                verifyCallback={verifyCallback}
                                                onloadCallback={recaptchaLoaded}
                                            />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md={3} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}></Col>

                            </Row>
                        </Col>
                    </Row>
                }
                {sizes !== 0 &&
                    <Row>
                        <Col md={12} style={{ textAlign: 'left', paddingLeft: '2em', paddingTop: '1em' }}>
                            <h4 style={{ fontSize: '1.25em', color: '#135200' }}>What would you like to inquire?</h4>
                            <h4 style={{ fontSize: '0.75em', color: '#135200', marginTop: '0.5em' }}>Inquire about your preferred property by filling out this form.</h4>

                        </Col>
                        <Col md={12} style={{ minHeight: '10em', height: 'auto', padding: '0.5em' }}>
                            <Row>
                                
                                <Col xs={12} md={6} style={{ marginTop: '2em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>First Name</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter first name *(Required)"
                                                onChange={TodoStore.setFirstname}
                                                value={TodoStore.getFirstname}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                
                                <Col xs={12} md={6} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Middle Name</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter middle name *(Required)"
                                                onChange={TodoStore.setMiddlename}
                                                value={TodoStore.getMiddlename}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                              
                                <Col xs={12} md={6} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Last Name</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter last name *(Required)"
                                                onChange={TodoStore.setLastname}
                                                value={TodoStore.getLastname}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                              
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Address</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter address *(Required)"
                                                onChange={TodoStore.setAddress}
                                                value={TodoStore.getAddress}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col xs={12} md={6} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>City</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter city *(Required)"
                                                onChange={TodoStore.setCity}
                                                value={TodoStore.getCity}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col xs={12} md={6} style={{ marginTop: '0.5em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Province</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter province *(Required)"
                                                onChange={TodoStore.setProvince}
                                                value={TodoStore.getProvince}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Email</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter email *(Required)"
                                                onChange={TodoStore.setEmail}
                                                value={TodoStore.getEmail}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Mobile Number</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Input placeholder="Enter contact number *(Required)"
                                                onChange={TodoStore.setContactNumber}
                                                value={TodoStore.getContactNumber}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Birthdate</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <DatePicker onChange={TodoStore.setBirthdate}
                                                style={{ width: '100%' }} />

                                        </Col>
                                    </Row>

                                </Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Salary Range</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <Select defaultValue="Select Salary Range" style={{ width: '100%' }} onChange={TodoStore.setSalaryRange}>
                                                <Option value="Php. 15,000 - Php. 25,000">Php. 15,000 - Php. 25,000</Option>
                                                <Option value="Php. 25,001 - Php. 35,000">Php. 25,001 - Php. 35,000</Option>
                                                <Option value="Php. 35,001 - Php. 45,000">Php. 35,001 - Php. 45,000</Option>
                                                <Option value="Php. 45,001 - Php. 55,000">Php. 45,001 - Php. 55,000</Option>
                                                <Option value="Php. 55,001 - Php. 65,000">Php. 55,001 - Php. 65,000</Option>
                                                <Option value="Php. 65,001 - Php. 75,000">Php. 65,001 - Php. 75,000</Option>
                                                <Option value="Php. 75,001 - Php. 85,000">Php. 75,001 - Php. 85,000</Option>
                                                <Option value="Php. 85,001 - Above">Php. 85,001 - Above</Option>
                                            </Select>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ textAlign: 'left', paddingLeft: '1em', marginTop: '0.25em' }}>
                                            <h4 style={{ fontSize: '0.75em', color: '#8c8c8c' }}>Message</h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                            <TextArea rows={4} placeholder="Enter you message *(Required)"
                                                onChange={TodoStore.setMessage}
                                                value={TodoStore.getMessage}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    </Row>

                                </Col>
                                 {!TodoStore.getLoading &&
                                    <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                        <Row>
                                            <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                                <Button onClick={submitMessage}
                                                    style={{ backgroundColor: '#237804', color: '#ffffff', height: '4em', width: '10em' }}>Submit</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                }
                                {TodoStore.getLoading &&
                                    <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                        <Row>
                                            <Col xs={12} md={12} style={{ marginTop: '0.25em' }}>
                                                <Button style={{ backgroundColor: '#237804', color: '#ffffff', height: '4em', width: '20em' }}>Please wait... Submitting your inquiry.</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                }
                               <Col xs={12} md={6} style={{ marginTop: '1em', height: 'auto', textAlign: 'center' }}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ marginTop: '0.25em', textAlign: 'center' }}>
                                            <Recaptcha
                                                sitekey="6Lf0w84UAAAAAEJHSfLq53n0_3gvj8uEzZXEnVVX"
                                                render="explicit"
                                                verifyCallback={verifyCallback}
                                                onloadCallback={recaptchaLoaded}
                                            />
                                        </Col>
                                    </Row>

                                </Col>
                                
                            </Row>
                        </Col>
                    </Row>
                }


            </React.Fragment>
        );
    }
}

FeaturedList.propTypes = {

};

export default FeaturedList;