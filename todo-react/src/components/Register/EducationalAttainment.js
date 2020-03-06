import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout, Button, Input, Icon, Tooltip, Steps, DatePicker, Select } from 'antd';
import { inject, observer } from 'mobx-react';
const { Option } = Select;


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
class EducationalAttainment extends Component {
    
    
    render() {
        const TodoStore = this.props.TodoStore;
        const next = () => {
            TodoStore.setRegisterStep(4);
        }
        const back = () => {
            TodoStore.setRegisterStep(2);
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
                                    Educational Attainment
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
                                                <h4 style={{ fontSize: '1.25em', color: '#bfbfbf' }}>Elementary</h4>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>School</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegSchoolElem}
                                                    value={TodoStore.getRegSchoolElem}
                                                    placeholder="Enter name of school here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Year Graduated</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Select defaultValue={TodoStore.getRegYearElem} style={{ width: '100%' }} onChange={TodoStore.onChangeRegYearElem}>
                                                    {
                                                        years.map(year =>{
                                                            return(
                                                            <Option value={year.year}>{year.year}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1.25em', color: '#bfbfbf' }}>Junior High School</h4>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>School</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegSchoolJunior}
                                                    value={TodoStore.getRegSchoolJunior}
                                                    placeholder="Enter name of school here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Year Graduated</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Select defaultValue={TodoStore.getRegYearJunior} style={{ width: '100%' }} onChange={TodoStore.onChangeRegYearJunior}>
                                                    {
                                                        years.map(year =>{
                                                            return(
                                                            <Option value={year.year}>{year.year}</Option>
                                                            )
                                                        })
                                                    }
                                                    
                                                    
                                                </Select>
                                            </Col>       
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1.25em', color: '#bfbfbf' }}>Senior High</h4>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>School</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegSchoolSenior}
                                                    value={TodoStore.getRegSchoolSenior}
                                                    placeholder="Enter name of school here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Year Graduated</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Select defaultValue={TodoStore.getRegYearSenior} style={{ width: '100%' }} onChange={TodoStore.onChangeRegYearSenior}>
                                                    {
                                                        years.map(year =>{
                                                            return(
                                                            <Option value={year.year}>{year.year}</Option>
                                                            )
                                                        })
                                                    }
                                                    
                                                    
                                                </Select>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1.25em', color: '#bfbfbf' }}>College</h4>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>School</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegSchoolCollege}
                                                    value={TodoStore.getRegSchoolCollege}
                                                    placeholder="Enter name of school here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Year Graduated</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Select defaultValue={TodoStore.getRegYearCollege} style={{ width: '100%' }} onChange={TodoStore.onChangeRegYearCollege}>
                                                    {
                                                        years.map(year =>{
                                                            return(
                                                            <Option value={year.year}>{year.year}</Option>
                                                            )
                                                        })
                                                    }
                                                    
                                                    
                                                </Select>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1.25em', color: '#bfbfbf' }}>Post Graduate</h4>
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>School</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    style={{ width: '100%' }}
                                                    onChange={TodoStore.onChangeRegSchoolPost}
                                                    value={TodoStore.getRegSchoolPost}
                                                    placeholder="Enter name of school here"
                                                />
                                            </Col>
                                            <Col span={24} style={{ marginTop: '1em' }}>
                                                <h4 style={{ fontSize: '1em', color: '#bfbfbf' }}>Year Graduated</h4>
                                            </Col>
                                            <Col span={24}>
                                                <Select defaultValue={TodoStore.getRegYearPost} style={{ width: '100%' }} onChange={TodoStore.onChangeRegYearPost}>
                                                    {
                                                        years.map(year =>{
                                                            return(
                                                            <Option value={year.year}>{year.year}</Option>
                                                            )
                                                        })
                                                    }
                                                    
                                                    
                                                </Select>
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
                                            Back: Family Background
                                        </Button>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'right', padding: '1.5em' }}>
                                        <Button onClick={next}
                                            style={{ color: '#ffffff', backgroundColor: '#800000' }}>
                                            Next: Work Experience
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

EducationalAttainment.propTypes = {

};

export default EducationalAttainment;