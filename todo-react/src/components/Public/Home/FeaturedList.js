import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Input, Icon, Tooltip, notification} from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import "./index.css";
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from "./CarouselPage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
@inject('TodoStore')
@observer
class FeaturedList extends Component {


  render() {
    const TodoStore = this.props.TodoStore;
   
    return (
      <React.Fragment>
       
        
        <Row>
            <Col md={12} style={{textAlign:'center'}}>
                <h4 style={{fontSize:'1.25em',color:'#135200'}}>Featured Model</h4>
            </Col>
            <Col md={12} style={{minHeight:'10em',height:'auto',padding:'0.5em'}}>
                <Row>
                    <Col xs={12} md={4} style={{marginTop:'2em',height:'auto'}}>
                        <Row>
                            <Col xs={12} md={12} style={{textAlign:'center',height:'auto'}}>
                                <div style={{minHeight:'5em',
                                            height:'auto',
                                            width:'98%',
                                            backgroundColor:'#135200'}}>
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <img src="/uploads/1.jpg" style={{width:'100%',height:'17em'}}/>
                                        </Col>
                                        <Col xs={12} md={12} style={{minHeight:'5em',
                                                                    paddingTop:'0.5em',
                                                                    paddingLeft:'1em',
                                                                    paddingBottom:'0.5em',
                                                                    textAlign:'left',
                                                                    height:'auto'}}>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>House Model: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 1 Storey Single Attach Model</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Lot Area: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 48 sqm.</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Floor Area: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 36 sqm.</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Bedroom: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 2</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Bathroom: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 1</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>TCP: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> Php. 450,000</span>
                                            </h4>
                                            
                                        </Col>
                                    </Row>

                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={4} style={{marginTop:'2em',height:'auto'}}>
                        <Row>
                            <Col xs={12} md={12} style={{textAlign:'center',height:'auto'}}>
                                <div style={{minHeight:'5em',
                                            height:'auto',
                                            width:'98%',
                                            backgroundColor:'#135200'}}>
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <img src="/uploads/4.jpg" style={{width:'100%',height:'17em'}}/>
                                        </Col>
                                        <Col xs={12} md={12} style={{minHeight:'5em',
                                                                    paddingTop:'0.5em',
                                                                    paddingLeft:'1em',
                                                                    paddingBottom:'0.5em',
                                                                    textAlign:'left',
                                                                    height:'auto'}}>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>House Model: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> Single Detached Attach Model</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Lot Area: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 48 sqm.</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Floor Area: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 36 sqm.</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Bedroom: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 2</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Bathroom: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 1</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>TCP: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> Php. 450,000</span>
                                            </h4>
                                        </Col>
                                    </Row>

                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={12} md={4} style={{marginTop:'2em',height:'auto'}}>
                        <Row>
                            <Col xs={12} md={12} style={{textAlign:'center',height:'auto'}}>
                                <div style={{minHeight:'5em',
                                            height:'auto',
                                            width:'98%',
                                            backgroundColor:'#135200'}}>
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <img src="/uploads/3.jpg" style={{width:'100%',height:'17em'}}/>
                                        </Col>
                                        <Col xs={12} md={12} style={{minHeight:'5em',
                                                                    paddingTop:'0.5em',
                                                                    paddingLeft:'1em',
                                                                    paddingBottom:'0.5em',
                                                                    textAlign:'left',
                                                                    height:'auto'}}>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>House Model: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> Row House</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Lot Area: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 48 sqm.</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Floor Area: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 36 sqm.</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Bedroom: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 2</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>Bathroom: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> 1</span>
                                            </h4>
                                            <h4 style={{marginLeft:'0.5em'}}>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}>TCP: </span>
                                                <span style={{fontSize:'0.9em',color:'#ffffff'}}> Php. 450,000</span>
                                            </h4>
                                        </Col>
                                    </Row>

                                </div>
                            </Col>
                        </Row>
                    </Col>
                   
                   
                </Row>
            </Col>
        </Row>                                
      
      </React.Fragment>
        );
    }
}

FeaturedList.propTypes = {

        };
        
export default FeaturedList;