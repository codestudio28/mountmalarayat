import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

class BrandName extends Component {
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md={12} xs={12} className="brand">
                    <img src="/logo/logo.png" style={{width:'5em'}}/>
                    </Col>
                    
                </Row>
                
            </React.Fragment>
        );
    }
}

BrandName.propTypes = {

};

export default BrandName;