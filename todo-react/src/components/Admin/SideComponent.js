import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './sidecomponent.css';
import { Menu, Icon } from 'antd';
import { inject, observer} from 'mobx-react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
const { SubMenu } = Menu;
@inject('TodoStore')
@observer
class SideComponent extends Component {
   
    
    render() {
        
        const TodoStore = this.props.TodoStore;
        const gotoDashboard=()=>{
            window.open("/dashboard","_self");
        }
        const gotoClient=()=>{
            window.open("/client","_self");
        }
        const gotoRemovedClient=()=>{
            window.open("/client/removed","_self");
        }
        const gotoProperty=()=>{
            window.open("/property","_self");
        }
        const gotoRemovedProperty=()=>{
            window.open("/property/removed","_self");
        }
        const gotoAdministrator=()=>{
            window.open("/administrator","_self");
        }
        const gotoRemovedAdministrator=()=>{
            window.open("/administrator/removed","_self");
        }
        const gotoPropertyType=()=>{
            window.open("/propertytype","_self");
        }
        const gotoPaymentScheme=()=>{
            window.open("/scheme","_self");
        }
        const gotoAccountInfo=()=>{
            window.open("/account","_self");
        }
       const gotoChangePassword=()=>{
            window.open("/account/password","_self");
       }
       const gotoListings=()=>{
        window.open("/listings","_self");
   }
        return (
           
            <React.Fragment>
                 <Menu mode="inline" 
                       style={{borderStyle:'none'}}
                       onClick={TodoStore.handleClick} defaultSelectedKeys={['0']}>
                            {/* <Menu.Item key="dashboard" className="sub-menu">
                                <Icon type="dashboard" style={{fontWeight:'bold'}}/>
                                    Dashboard
                               
                            </Menu.Item> */}
                            <SubMenu
                                style={{borderStyle:'none'}}
                                className="sub-menu"
                                key="dashboard"
                                title={
                                    <div style={{width:'100%'}} onClick={gotoDashboard}>
                                        <Icon type="dashboard" />
                                        <span>
                                            Dashboard</span>
                                    </div>
                                }
                            >
                            </SubMenu>
                            <SubMenu
                                style={{borderStyle:'none'}}
                                className="sub-menu"
                                key="scholarship"
                                title={
                                    <span>
                                        <Icon type="profile" />
                                        <span>
                                            Transaction</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="scholar-new" className="sub-menu">
                                   Buy Property
                                </Menu.Item>
                                <Menu.Item key="scholar-current" className="sub-menu">
                                    Payment
                                </Menu.Item>
                                <Menu.Item key="scholar-removed" className=" sub-menu">
                                   Transfer Property
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu 
                                className="sub-menu"
                                key="senior-pension"
                                title={
                                    <span>
                                        <Icon type="team" />
                                        <span className="sub-menu">Client</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="senior-pension-new" className="sub-menu" onClick={gotoClient}>
                                    List of Client
                                </Menu.Item>
                                <Menu.Item key="senior-pension-current" className=" sub-menu" onClick={gotoRemovedClient}>
                                   Removed Client
                                </Menu.Item>
                               
                            </SubMenu>
                            <SubMenu
                                className="sub-menu"
                                key="barangay"
                                title={
                                    <span>
                                        <Icon type="bank" />
                                        <span className="sub-menu">Property</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="barangay-list" className="sub-menu" onClick={gotoProperty}>
                                    List of Property
                                    </Menu.Item>
                                <Menu.Item key="barangay-removed" className=" sub-menu" onClick={gotoRemovedProperty}>
                                   Removed Property
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                className="sub-menu"
                                key="admin"
                                title={
                                    <span>
                                        <Icon type="font-colors" />
                                        <span className="sub-menu">Administrator</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="user-list" className=" sub-menu" onClick={gotoAdministrator}>
                                    List of Administrator
                                </Menu.Item>
                                <Menu.Item key="user-removed" className=" sub-menu" onClick={gotoRemovedAdministrator}>
                                    Removed Administrator
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                className="sub-menu"
                                key="user"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span className="sub-menu">Settings</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="user-list" className=" sub-menu" onClick={gotoPropertyType}>
                                    Property Type
                                </Menu.Item>
                                <Menu.Item key="user-lists" className=" sub-menu" onClick={gotoPaymentScheme}>
                                    Payment Scheme
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                className="sub-menu"
                                key="news"
                                title={
                                    <span>
                                        <Icon type="bar-chart" />
                                        <span className="sub-menu">Report</span>
                                    </span>
                                }
                            >
                                
                                <Menu.Item key="news-create" className="sub-menu">
                                    View Report
                                </Menu.Item>
                                <Menu.Item key="news-list" className="sub-menu">Print Report</Menu.Item>
                                
                            </SubMenu>
                          
                            <SubMenu
                                className="sub-menu"
                                key="tourism"
                                title={
                                    <span>
                                        <Icon type="user" />
                                        <span className="sub-menu">Account</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="heritage" className="sub-menu" onClick={gotoAccountInfo}>
                                    Update Information
                                </Menu.Item>
                                <Menu.Item key="food" className="sub-menu" onClick={gotoChangePassword}>
                                    Change Password
                                </Menu.Item>
                               
                            </SubMenu>
                            <SubMenu
                                className="sub-menu"
                                key="cms"
                                title={
                                    <span>
                                        <Icon type="appstore" />
                                        <span className="sub-menu">CMS</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="web-themes" className="sub-menu">Web Themes</Menu.Item>
                                <Menu.Item key="web-layout" className="sub-menu">Web Layout</Menu.Item>
                                <Menu.Item key="web-content" className="sub-menu">Web Content</Menu.Item>
                               
                            </SubMenu>

                            <SubMenu
                                className="sub-menu"
                                key="listings"
                                title={
                                    <span>
                                        <Icon type="build" />
                                        <span className="sub-menu">Listings</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="web-themes" className="sub-menu" onClick={gotoListings}>List of Listings</Menu.Item>
                                <Menu.Item key="web-content" className="sub-menu">Removed Listings</Menu.Item>
                               
                            </SubMenu>
                           
                        </Menu>
            </React.Fragment>
        );
    }
}

SideComponent.propTypes = {

};

export default SideComponent;