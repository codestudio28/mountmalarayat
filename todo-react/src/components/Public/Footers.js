import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
class Footers extends Component {
    render() {
        return (
            <React.Fragment>
                 <Row>
                    <Col xs={12} md={12} style={{textAlign:'center',
                                                height:'3em',
                                                marginTop:'2em',
                                                backgroundColor:'#d9f7be',
                                                paddingTop:'1.25em'}}>
                        <h4 style={{fontSize:'0.75em',color:'#135200'}}>
                                &copy; Copyright 2020, Design by: Code Studio
                        </h4>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

Footers.propTypes = {

};

export default Footers;