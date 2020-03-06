import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout, Button, Input, Icon, Tooltip, Steps, DatePicker, Select, Modal, message, notification, Popconfirm } from 'antd';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
const { Option } = Select;
const ButtonGroup = Button.Group;

function onChange(date, dateString) {
    console.log(date, dateString);
}
function handleChange(value) {
    console.log(`selected ${value}`);
}
@inject('TodoStore')
@observer
class FamilyBackground extends Component {
    render() {
        const key = 'updatable';
        const TodoStore = this.props.TodoStore;
        const next = () => {
            TodoStore.setRegisterStep(3);
        }
        const back = () => {
            TodoStore.setRegisterStep(1);
        }
        const confirm = (value) =>{
            TodoStore.deleteChildren(value);
            openNotification("Remove");
        }
        const updateChildren = () =>{
            TodoStore.updateChildrenInfo();
            openNotification("Update");
        }
        const addChildren = () => {
            if ((TodoStore.getChildrenLname === '') || (TodoStore.getChildrenFname === '') || (TodoStore.getChildrenMname === '')
                || (TodoStore.getChildrenSchOcc === '') || (TodoStore.getChildrenBday === '')) {
                openNotification("Blank");
            } else {
                TodoStore.addChildren();
                TodoStore.handleCancel();
                openNotification("Success");
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
                    description: 'Successfully add children',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }else if (value === "Remove") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully removed child.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }else if (value === "Update") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully update child information.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }
        }
        const openMessage = () => {
            message.loading({ content: 'Adding children...', key });
            setTimeout(() => {
                message.success({ content: 'Added!', key, duration: 2 });
            }, 1000);
        };
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
                                    Family Background
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
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Spouse's First Name</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegSpouseFirstname}
                                                    value={TodoStore.getRegSpouseFirstname}
                                                    placeholder="Enter first name here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Spouse's Middle Name</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegSpouseMiddlename}
                                                    value={TodoStore.getRegSpouseMiddlename}
                                                    placeholder="Enter middle name here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Spouse's Last Name</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegSpouseLastname}
                                                    value={TodoStore.getRegSpouseLastname}
                                                    placeholder="Enter last name here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Spouse's Occupation</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegSpouseOccupation}
                                                    value={TodoStore.getRegSpouseOccupation}
                                                    placeholder="Enter occupation here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                {TodoStore.getChildren.length > 0 &&
                                                    TodoStore.getChildren.map((child, index) => {
                                                        return (

                                                            <Row>
                                                                <Col span={24} style={{ marginTop: '1em' }}>
                                                                    <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Children {index + 1}</h4>
                                                                </Col>
                                                                <Col span={14}>
                                                                    <Input key={child.key}
                                                                        style={{ width: '100%' }}
                                                                        value={child.firstname + ' ' + child.middlename + ' ' + child.lastname}
                                                                        disabled
                                                                    />
                                                                </Col>

                                                                <Col span={10} style={{ textAlign: 'right' }}>
                                                                    <ButtonGroup>
                                                                        <Button onClick={(event) => TodoStore.setViewChildrenModal(child.key)}
                                                                                style={{ color: '#ffffff', backgroundColor: '#ffa940' }}>
                                                                            <Icon type="eye" style={{ color: '#ffffff', fontSize: '1em' }}></Icon>
                                                                        </Button>
                                                                        <Button onClick={(event) => TodoStore.setUpdateChildrenModal(child.key)}
                                                                                style={{ color: '#ffffff', backgroundColor: '#52c41a' }}>
                                                                            <Icon type="edit" style={{ color: '#ffffff', fontSize: '1em' }}></Icon>
                                                                        </Button>
                                                                        <Popconfirm
                                                                            placement="topRight"
                                                                            title="Do you want to remove this child?"
                                                                            onConfirm={(event) => confirm(index)}
                                                                            okText="Yes"
                                                                            cancelText="No"
                                                                        >
                                                                            <Button style={{ color: '#ffffff', backgroundColor: '#f5222d' }}>
                                                                                <Icon type="delete" style={{ color: '#ffffff', fontSize: '1em' }}></Icon>
                                                                            </Button>
                                                                        </Popconfirm>
                                                                    </ButtonGroup>
                                                                </Col>
                                                                
                                                            </Row>
                                                                )
                                                            })
                                                        }
                                            </Col>
                                                            <Col span={24} style={{ marginTop: '1em', textAlign: 'right' }}>
                                                                <Button onClick={(event) => TodoStore.setAddChildrenModal()}
                                                                    style={{ color: '#ffffff', backgroundColor: '#1890ff' }}>Add Children</Button>
                                                            </Col>

                                        </Row>
                                    </Col>
                                        <Col span={6}></Col>
                                </Row>
                                    {/* Add Children Modal */}
                                    <Modal
                                        title="Add Children"
                                        visible={TodoStore.getAddChildrenModal}
                                        onOk={TodoStore.handleOk}
                                        onCancel={TodoStore.handleCancel}
                                        footer={[
                                            <Button key="back" onClick={TodoStore.handleCancel}>
                                                Cancel
                        </Button>,
                                            <Button key="submit" type="primary" onClick={addChildren} >
                                                Submit
                        </Button>,
                                        ]}
                                    >
                                        <Row>
                                            <Col span={24}>
                                                <Row>

                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>First Name</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter first name here"
                                                            value={TodoStore.getChildrenFname}
                                                            onChange={TodoStore.onChangeChildrenFname} />
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Middle Name</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter middle name here"
                                                            value={TodoStore.getChildrenMname}
                                                            onChange={TodoStore.onChangeChildrenMname} />
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Last Name</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter last name here"
                                                            value={TodoStore.getChildrenLname}
                                                            onChange={TodoStore.onChangeChildrenLname} />
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>School/Occupation</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter school/occupation here"
                                                            value={TodoStore.getChildrenSchOcc}
                                                            onChange={TodoStore.onChangeChildrenSchoolOcc} />
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Birthday</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <DatePicker onChange={TodoStore.onChangeChildrenBday}></DatePicker>
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Civil Status</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Select defaultValue="Single" style={{ width: '100%' }} onChange={TodoStore.onChangeChildrenStatus}>
                                                            <Option value="Single">Single</Option>
                                                            <Option value="Married">Married</Option>
                                                            <Option value="Widow">Widow</Option>
                                                        </Select>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>
                                    </Modal>

                                     {/* View Children Modal */}
                                     <Modal
                                        title="View Child Information"
                                        visible={TodoStore.getViewChildrenModal}
                                        onOk={TodoStore.handleOk}
                                        onCancel={TodoStore.handleCancel}
                                        footer={[
                                            <Button key="back" onClick={TodoStore.handleCancel}>
                                                Cancel
                        </Button>,
                                            <Button key="submit" type="primary" onClick={addChildren} >
                                                Submit
                        </Button>,
                                        ]}
                                    >
                                        <Row>
                                            <Col span={24}>
                                                <Row>

                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>First Name</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter first name here"
                                                            value={TodoStore.getChildrenFname}
                                                            disabled/>
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Middle Name</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter middle name here"
                                                            value={TodoStore.getChildrenMname}
                                                            disabled/>
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Last Name</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter last name here"
                                                            value={TodoStore.getChildrenLname}
                                                            disabled/>
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>School/Occupation</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter school/occupation here"
                                                            value={TodoStore.getChildrenSchOcc} 
                                                            disabled/>
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Birthday</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter school/occupation here"
                                                            value={TodoStore.getChildrenBday} 
                                                            disabled/>
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Civil Status</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter school/occupation here"
                                                            value={TodoStore.getChildrenStatus} 
                                                            disabled/>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>
                                    </Modal>

                                    {/* Update Children Modal */}
                                    <Modal
                                        title="Update Child Information"
                                        visible={TodoStore.getUpdateChildrenModal}
                                        onOk={TodoStore.handleOk}
                                        onCancel={TodoStore.handleCancel}
                                        footer={[
                                            <Button key="back" onClick={TodoStore.handleCancel}>
                                                Cancel
                        </Button>,
                                            <Button key="submit" type="primary" onClick={updateChildren} >
                                                Update
                        </Button>,
                                        ]}
                                    >
                                        <Row>
                                            <Col span={24}>
                                                <Row>

                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>First Name</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter first name here"
                                                            value={TodoStore.getChildrenFname}
                                                            onChange={TodoStore.onChangeChildrenFname} />
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Middle Name</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter middle name here"
                                                            value={TodoStore.getChildrenMname}
                                                            onChange={TodoStore.onChangeChildrenMname} />
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Last Name</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter last name here"
                                                            value={TodoStore.getChildrenLname}
                                                            onChange={TodoStore.onChangeChildrenLname} />
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>School/Occupation</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input placeholder="Enter school/occupation here"
                                                            value={TodoStore.getChildrenSchOcc}
                                                            onChange={TodoStore.onChangeChildrenSchoolOcc} />
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Birthday</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <DatePicker onChange={TodoStore.onChangeChildrenBday}></DatePicker>
                                                    </Col>
                                                    <Col span={24} style={{ marginTop: '0.5em' }}>
                                                        <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Civil Status</h4>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Select defaultValue={TodoStore.getChildrenStatus} style={{ width: '100%' }} onChange={TodoStore.onChangeChildrenStatus}>
                                                            <Option value="Single">Single</Option>
                                                            <Option value="Married">Married</Option>
                                                            <Option value="Widow">Widow</Option>
                                                        </Select>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>
                                    </Modal>

                            </Col>
                                <Col span={24} style={{
                                    height: '5em',
                                    borderRadius: '0em 0em 0.75em 0.75em'
                                }}>
                                    <Row>
                                        <Col span={12} style={{ textAlign: 'left', padding: '1.5em' }}>
                                            <Button onClick={back}
                                                style={{ color: '#ffffff', backgroundColor: '#800000' }}>
                                                Back: Personal Information
                                        </Button>
                                        </Col>
                                        <Col span={12} style={{ textAlign: 'right', padding: '1.5em' }}>
                                            <Button onClick={next}
                                                style={{ color: '#ffffff', backgroundColor: '#800000' }}>
                                                Next: Educational Attainment
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
        
FamilyBackground.propTypes = {

                };
                
export default FamilyBackground;