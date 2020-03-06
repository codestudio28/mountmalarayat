import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
class Footers extends Component {
    render() {
        return (
            <React.Fragment>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by Code Studio</Footer>
            </React.Fragment>
        );
    }
}

Footers.propTypes = {

};

export default Footers;