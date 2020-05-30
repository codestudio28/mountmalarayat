import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import '../../layout.css';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import BrandName from '../../Brandname'
import SideComponent from '../../SideComponent';
import Headers from '../../Headers';
import SinglePayment from './SinglePayment';
import Footers from '../../Footers';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class PageLayout extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    state = {
        current: 'mail',
        visible: false
      }
      showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    onClose = () => {
        this.setState({
          visible: false,
        });
      };
    render() {
        return (
            <React.Fragment>
                <Layout >
                    <Sider style={{ "backgroundColor": "#ffffff" }}
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <Row>
                          <BrandName/>
                        </Row>
                        <SideComponent />
                        
                    </Sider>
                    
                    <Layout style={{backgroundColor:'#eeeeee'}}>
                        <Headers/>
                        <SinglePayment transact={this.props.id}/>
                        <Footers/>
                        {/* <Headers/>
                        <PageContent/>
                        <Footers/> */}
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
}

PageLayout.propTypes = {

};

export default PageLayout;