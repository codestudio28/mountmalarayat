import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout, Button, Input, Icon, Tooltip, Steps, DatePicker, Select,notification } from 'antd';
import { inject, observer } from 'mobx-react';
const { Option } = Select;


function onChange(date, dateString) {
    console.log(date, dateString);
}
function handleChange(value) {
    console.log(`selected ${value}`);
}
@inject('TodoStore')
@observer
class PersonalInfo extends Component {
    render() {
        const TodoStore = this.props.TodoStore;
        const next = () => {
            if((TodoStore.getRegFirstname==='')||(TodoStore.getRegLastname==='')||
               (TodoStore.getRegMiddlename==='')||(TodoStore.getRegBirthday==='')||
               (TodoStore.getRegBirthPlace==='')||(TodoStore.getRegSex==='')||
               (TodoStore.getRegCivilStatus==='')||(TodoStore.getRegOccupation==='')||
               (TodoStore.getRegAddress==='')||(TodoStore.getRegBarangay==='')||
               (TodoStore.getRegContactNumber==='')
             ){
                openNotification("Blank");
            }else{
                TodoStore.setRegisterStep(2);
            }
            
        }
        const back = () => {
            TodoStore.setRegisterStep(0);
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
                                    Personal Information
                                            </h4>
                            </Col>
                            <Col span={24} style={{
                                minHeight: '22em',
                                height: 'auto',
                                padding: '2em'
                            }}>
                                <Row>
                                    <Col span={6}></Col>
                                    <Col span={12}>
                                        <Row>
                                            <Col span={24} style={{ textAlign:'right' }}>
                                             <h4 style={{ fontSize: '1em', color: '#f5222d' }}>* Required</h4>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* First Name</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegFirstname}
                                                    value={TodoStore.getRegFirstname}
                                                    placeholder="Enter first name here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Middle Name</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegMiddlename}
                                                    value={TodoStore.getRegMiddlename}
                                                    placeholder="Enter middle name here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Last Name</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegLastname}
                                                    value={TodoStore.getRegLastname}
                                                    placeholder="Enter last name here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Birthday</h4>
                                            </Col>
                                            <Col span={24}>
                                                <DatePicker onChange={TodoStore.onChangeRegBirthday} />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Birthplace</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegBirthplace}
                                                    value={TodoStore.getRegBirthPlace}
                                                    placeholder="Enter birth place here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Sex</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Select defaultValue={TodoStore.getRegSex} style={{ width: '100%' }} onChange={TodoStore.onChangeRegSex}>
                                                    <Option value="Male">Male</Option>
                                                    <Option value="Female">Female</Option>
                                                </Select>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Civil Status</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Select defaultValue={TodoStore.getRegCivilStatus} style={{ width: '100%' }} onChange={TodoStore.onChangeRegCivilStatus}>
                                                    <Option value="Single">Single</Option>
                                                    <Option value="Married">Married</Option>
                                                    <Option value="Widow">Widow</Option>
                                                </Select>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Occupation</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegOccupation}
                                                    value={TodoStore.getRegOccupation}
                                                    placeholder="Enter occupation here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Address</h4>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* House/Building Number/Street</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegAddress}
                                                    value={TodoStore.getRegAddress}
                                                    placeholder="Enter house/building/street number here"
                                                />
                                            </Col>
                                           
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Barangay</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Select defaultValue={TodoStore.getRegBarangay} style={{ width: '100%' }} onChange={TodoStore.onChangeRegBarangay}>
                                                    <Option value="Antipolo">Antipolo</Option>
                                                    <Option value="Poblacion I">Poblacion I</Option>
                                                    <Option value="Poblacion II">Poblacion II</Option>
                                                </Select>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>* Contact Number</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegContactNumber}
                                                    value={TodoStore.getRegContactNumber}
                                                    placeholder="Enter contact number here"
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={6}></Col>
                                </Row>


                            </Col>
                            <Col span={24} style={{
                                height: '5em',
                                borderRadius: '0em 0em 0.75em 0.75em'
                            }}>
                                <Row>
                                    <Col span={12} style={{ textAlign: 'left', padding: '1.5em' }}>
                                        <Button onClick={back}
                                            style={{ color: '#ffffff', backgroundColor: '#800000' }}>
                                            Back: Login Requirement
                                        </Button>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'right', padding: '1.5em' }}>
                                        <Button onClick={next}
                                            style={{ color: '#ffffff', backgroundColor: '#800000' }}>
                                            Next: Family Background
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

PersonalInfo.propTypes = {

};

export default PersonalInfo;