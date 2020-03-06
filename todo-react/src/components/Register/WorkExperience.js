import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout, Button, Input, Icon, Tooltip, Steps, DatePicker, Select, Modal, notification, Popconfirm } from 'antd';
import { inject, observer } from 'mobx-react';

const { Option } = Select;
const ButtonGroup = Button.Group;

function onChange(date, dateString) {
    console.log(date, dateString);
}
function handleChange(value) {
    console.log(`selected ${value}`);
}

const years = [];
for (let i = 1940; i < 2020; i++) {
    years.push({
        key: i,
        year: i,
    });
}

@inject('TodoStore')
@observer
class WorkExperience extends Component {


    render() {
        const TodoStore = this.props.TodoStore;
        const next = () => {
            TodoStore.setRegisterStep(5);
        }
        const back = () => {
            TodoStore.setRegisterStep(3);
        }
        const confirmdelete = (value) =>{
            TodoStore.deleteWork(value);
            openNotification("Remove");
        }
        const addWork = () => {
            if ((TodoStore.getCompanyName === '') || (TodoStore.getCompanyPosition === '') || (TodoStore.getFromYear === '')
                || (TodoStore.getToYear === '')) {
                openNotification("Blank");
            } else {
                TodoStore.addWork();
                TodoStore.handleCancel();
                openNotification("Success");
            }

        }
        const updateWork = () => {
            if ((TodoStore.getCompanyName === '') || (TodoStore.getCompanyPosition === '') || (TodoStore.getFromYear === '')
                || (TodoStore.getToYear === '')) {
                openNotification("Blank");
            } else {
                TodoStore.updateWork();
                TodoStore.handleCancel();
                openNotification("Update");
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
                                    Work Experience
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
                                            <Col span={24} style={{ textAlign: 'right' }}>
                                                <Button onClick={(event) => TodoStore.setAddWorkModal()}
                                                    style={{ backgroundColor: '#1890ff', color: '#ffffff' }}>
                                                    Add Work
                                                </Button>
                                            </Col>
                                            {TodoStore.getWork.length > 0 &&
                                                TodoStore.getWork.map((work, index) => {
                                                    return (
                                                        <React.Fragment>
                                                            <Col span={12} style={{ marginTop: '2em' }}>
                                                                <h4 style={{ fontSize: '1.25em', color: '#bfbfbf' }}>Work {index + 1}</h4>
                                                            </Col>
                                                            <Col span={12} style={{ marginTop: '2em', textAlign: 'right' }}>
                                                                <ButtonGroup>

                                                                    <Button onClick={(event) => TodoStore.setUpdateWorkModal(work.key)}
                                                                        style={{ color: '#ffffff', backgroundColor: '#52c41a' }}>
                                                                        <Icon type="edit" style={{ color: '#ffffff', fontSize: '1em' }}></Icon>
                                                                    </Button>
                                                                    <Popconfirm
                                                                            placement="topRight"
                                                                            title="Do you want to remove this work  experience information?"
                                                                            onConfirm={(event) => confirmdelete(index)}
                                                                            okText="Yes"
                                                                            cancelText="No"
                                                                        >
                                                                            <Button style={{ color: '#ffffff', backgroundColor: '#f5222d' }}>
                                                                                <Icon type="delete" style={{ color: '#ffffff', fontSize: '1em' }}></Icon>
                                                                            </Button>
                                                                        </Popconfirm>
                                                                </ButtonGroup>
                                                            </Col>
                                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Company</h4>
                                                            </Col>
                                                            <Col span={24}>
                                                                <Input
                                                                    style={{ width: '100%' }}
                                                                    value={work.company}
                                                                    disabled
                                                                />
                                                            </Col>
                                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Position</h4>
                                                            </Col>
                                                            <Col span={24}>
                                                                <Input
                                                                    style={{ width: '100%' }}
                                                                    value={work.position}
                                                                    disabled
                                                                />
                                                            </Col>
                                                            <Col span={12} style={{ marginTop: '1em' }}>
                                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>From</h4>
                                                            </Col>
                                                            <Col span={12} style={{ marginTop: '1em' }}>
                                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>To</h4>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Input
                                                                    style={{ width: '100%' }}
                                                                    value={work.fromyear}
                                                                    disabled
                                                                />
                                                            </Col>
                                                            <Col span={12}>
                                                                <Input
                                                                    style={{ width: '100%' }}
                                                                    value={work.toyear}
                                                                    disabled
                                                                />
                                                            </Col>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }

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
                                            Back: Educational Attainment
                                        </Button>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'right', padding: '1.5em' }}>
                                        <Button onClick={next}
                                            style={{ color: '#ffffff', backgroundColor: '#800000' }}>
                                            Next: Upload Profile Photo
                                        </Button>
                                    </Col>

                                </Row>
                                {/* Add Work Modal */}
                                <Modal
                                    title="Add Work Experience"
                                    visible={TodoStore.getAddWorkModal}
                                    onOk={TodoStore.handleOk}
                                    onCancel={TodoStore.handleCancel}
                                    footer={[
                                        <Button key="back" onClick={TodoStore.handleCancel}>
                                            Cancel
                        </Button>,
                                        <Button key="submit" type="primary" onClick={addWork}>
                                            Submit
                        </Button>,
                                    ]}
                                >
                                    <Row>
                                        <Col span={24}>
                                            <Row>

                                                <Col span={24} style={{ marginTop: '0.5em' }}>
                                                    <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Company</h4>
                                                </Col>
                                                <Col span={24}>
                                                    <Input placeholder="Enter company name here"
                                                        value={TodoStore.getCompanyName}
                                                        onChange={TodoStore.onChangeCompany} />
                                                </Col>
                                                <Col span={24} style={{ marginTop: '0.5em' }}>
                                                    <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Position</h4>
                                                </Col>
                                                <Col span={24}>
                                                    <Input placeholder="Enter position here"
                                                        value={TodoStore.getCompanyPosition}
                                                        onChange={TodoStore.onChangePosition} />
                                                </Col>
                                                <Col span={12} style={{ marginTop: '0.5em' }}>
                                                    <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>From</h4>
                                                </Col>
                                                <Col span={12} style={{ marginTop: '0.5em' }}>
                                                    <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>To</h4>
                                                </Col>
                                                <Col span={12} style={{ marginTop: '0.5em' }}>
                                                    <Select defaultValue={TodoStore.getFromYear} style={{ width: '100%' }} onChange={TodoStore.onChangeFromYear}>
                                                        {
                                                            years.map(year => {
                                                                return (
                                                                    <Option value={year.year}>{year.year}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Col>
                                                <Col span={12} style={{ marginTop: '0.5em' }}>
                                                    <Select defaultValue={TodoStore.getToYear} style={{ width: '100%' }} onChange={TodoStore.onChangeToYear}>
                                                        {
                                                            years.map(year => {
                                                                return (
                                                                    <Option value={year.year}>{year.year}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Modal>

                                {/* Update Work Modal */}
                                <Modal
                                    title="Update Work Experience Information"
                                    visible={TodoStore.getUpdateWorkModal}
                                    onOk={TodoStore.handleOk}
                                    onCancel={TodoStore.handleCancel}
                                    footer={[
                                        <Button key="back" onClick={TodoStore.handleCancel}>
                                            Cancel
                        </Button>,
                                        <Button key="submit" type="primary" onClick={updateWork}>
                                            Update
                        </Button>,
                                    ]}
                                >
                                    <Row>
                                        <Col span={24}>
                                            <Row>

                                                <Col span={24} style={{ marginTop: '0.5em' }}>
                                                    <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Company</h4>
                                                </Col>
                                                <Col span={24}>
                                                    <Input placeholder="Enter company name here"
                                                        value={TodoStore.getCompanyName}
                                                        onChange={TodoStore.onChangeCompany} />
                                                </Col>
                                                <Col span={24} style={{ marginTop: '0.5em' }}>
                                                    <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Position</h4>
                                                </Col>
                                                <Col span={24}>
                                                    <Input placeholder="Enter position here"
                                                        value={TodoStore.getCompanyPosition}
                                                        onChange={TodoStore.onChangePosition} />
                                                </Col>
                                                <Col span={12} style={{ marginTop: '0.5em' }}>
                                                    <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>From</h4>
                                                </Col>
                                                <Col span={12} style={{ marginTop: '0.5em' }}>
                                                    <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>To</h4>
                                                </Col>
                                                <Col span={12} style={{ marginTop: '0.5em' }}>
                                                    <Select defaultValue={TodoStore.getFromYear} style={{ width: '100%' }} onChange={TodoStore.onChangeFromYear}>
                                                        {
                                                            years.map(year => {
                                                                return (
                                                                    <Option value={year.year}>{year.year}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Col>
                                                <Col span={12} style={{ marginTop: '0.5em' }}>
                                                    <Select defaultValue={TodoStore.getToYear} style={{ width: '100%' }} onChange={TodoStore.onChangeToYear}>
                                                        {
                                                            years.map(year => {
                                                                return (
                                                                    <Option value={year.year}>{year.year}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Modal>

                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </React.Fragment>
        );
    }
}

WorkExperience.propTypes = {

};

export default WorkExperience;