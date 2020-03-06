import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
class Property extends Component {
    render() {
        return (
           <React.Fragment>
                <Col xs={12} md={4} style={{ padding: '1em' }}>
                    <Row>
                        <Col xs={12} md={12} style={{ padding: '1em',
                                                    backgroundColor:'#36cfc9',
                                                    minHeight:'10em',
                                                    height:'auto',
                                                    width:'95%',
                                                    borderRadius:'0.5em' }}>
                            <Row>
                                <Col xs={4} md={4} style={{textAlign:'center'}}>
                                    <Icon type="bank" style={{fontSize:'8em',color:'#ffffff'}}></Icon>
                                </Col>
                                <Col xs={8} md={8}>
                                    <Row>
                                        <Col xs={12} md={12} style={{paddingTop:'2em',textAlign:'center',minHeight:'6em',
                                                    height:'auto',}}>
                                            <h4 style={{fontSize:'4em',color:'#ffffff'}}>
                                               25
                                            </h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{textAlign:'center'}}>
                                            <h4 style={{fontSize:'1em',color:'#ffffff'}}>
                                                Number of Available Properties
                                            </h4>
                                        </Col>
                                    </Row>
                                   
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={4} style={{ padding: '1em' }}>
                    <Row>
                        <Col xs={12} md={12} style={{ padding: '1em',
                                                    backgroundColor:'#597ef7',
                                                    minHeight:'10em',
                                                    height:'auto',
                                                    width:'95%',
                                                    borderRadius:'0.5em' }}>
                            <Row>
                                <Col xs={4} md={4} style={{textAlign:'center'}}>
                                    <Icon type="team" style={{fontSize:'8em',color:'#ffffff'}}></Icon>
                                </Col>
                                <Col xs={8} md={8}>
                                    <Row>
                                    <Col xs={12} md={12} style={{paddingTop:'2em',textAlign:'center',minHeight:'6em',
                                                    height:'auto',}}>
                                            <h4 style={{fontSize:'4em',color:'#ffffff'}}>
                                               8
                                            </h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{textAlign:'center'}}>
                                            <h4 style={{fontSize:'1em',color:'#ffffff'}}>
                                                Number of Clients
                                            </h4>
                                        </Col>
                                    </Row>
                                   
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={4} style={{ padding: '1em' }}>
                    <Row>
                        <Col xs={12} md={12} style={{ padding: '1em',
                                                    backgroundColor:'#9254de',
                                                    minHeight:'10em',
                                                    height:'auto',
                                                    width:'95%',
                                                    borderRadius:'0.5em' }}>
                            <Row>
                                <Col xs={4} md={4} style={{textAlign:'center'}}>
                                    <Icon type="gold" style={{fontSize:'8em',color:'#ffffff'}}></Icon>
                                </Col>
                                <Col xs={8} md={8}>
                                    <Row>
                                        <Col xs={12} md={12} style={{paddingTop:'2em',textAlign:'center',minHeight:'6em',
                                                    height:'auto',}}>
                                            <h4 style={{fontSize:'2em',color:'#ffffff'}}>
                                               Php. 350,000.00
                                            </h4>
                                        </Col>
                                        <Col xs={12} md={12} style={{textAlign:'center'}}>
                                            <h4 style={{fontSize:'1em',color:'#ffffff'}}>
                                                Today's Collections
                                            </h4>
                                        </Col>
                                    </Row>
                                   
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
               
           </React.Fragment>
        );
    }
}

Property.propTypes = {

};

export default Property;