import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Button, Avatar, Breadcrumb } from 'antd';
import { Row, Col } from 'antd';
class BreadCrumb extends Component {
    render() {
        return (
            <React.Fragment>
                
                    <div style={{ padding: '1em', backgroundColor: '#fff', minHeight: '1em' }}>
                        <Breadcrumb>
                            <Breadcrumb.Item>You are here:</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.props.location}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
               
            </React.Fragment>
        );
    }
}

BreadCrumb.propTypes = {

};

export default BreadCrumb;