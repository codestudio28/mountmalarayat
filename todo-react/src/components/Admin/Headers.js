import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './headers.css';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Layout, Menu, Icon, Button, Avatar } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { Badge } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const ButtonGroup = Button.Group;

var count=0;
@inject('TodoStore')
@observer
class Headers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isdefault: false,
            sizes:0,
            logs:[],

        }
    }
    resize() {
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav === true) {
            this.setState({ sizes: 1 });
        }
    }
    componentDidMount() {
        if (reactLocalStorage.get('userimage') === "avatar.png") {
            this.setState({
                isdefault: true
            });
        }
        const TodoStore = this.props.TodoStore;
        var port = TodoStore.getPort;
        fetch(port + 'voucherrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    logs: json,
                })
            });
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    render() {
        const TodoStore = this.props.TodoStore;
        var {isdefault,sizes,logs} = this.state;
        const dataSource=[];
        console.log(logs);
        count=0;
        logs.map((data)=>{
            if(data.status==="FOR APPROVAL"){
                dataSource.push({
                    key:data._id,
                    dates:data.dates,
                })
                count++;
            }
        })
       const gotoVoucher=()=>{
           window.open("/payable","_self")
       }
        const notif = dataSource.map((record,index)=>{

            return(
                <Menu.Item key={record.key} onClick={gotoVoucher}>
                     New voucher for approval dated {record.dates}.
                </Menu.Item>
            )
        })

        const gotoLogout = () =>{
            reactLocalStorage.clear();
            window.open("/","_self");
        }
        const gotoMyAccount=()=>{
            window.open("/account","_self");
        }
        if(reactLocalStorage.get("usertype")===undefined){
            window.open("/","_self");
        }
        return (
            <React.Fragment>
                <Header style={{ background: '#fff', padding: 0 }} >
                    <Row>
                        <Col xs={6} md={6} style={{paddingLeft:'2em'}}>
                            {sizes===0 &&
                                <h4 style={{fontSize:'1em',color:'#092b00'}}>Mount Malarayat Property Development Corporation</h4>
                            }
                            {sizes!==0 &&
                                <h4 style={{fontSize:'2em',color:'#092b00'}}>MMPDC</h4>
                            }
                        </Col>
                        <Col xs={6} md={6}>
                            <Menu mode="horizontal" 
                                 style={{
                                    backgroundColor: '#ffffff',
                                    paddingRight: '2em',
                                    paddingTop:'0.5em',
                                    color: '#ffffff',
                                    textAlign: 'right',
                                    borderStyle:'none'
                            }}>
                             { reactLocalStorage.get('usertype')=="superadministrator" &&     
                                <SubMenu className="head-menu"
                                    title={
                                        <React.Fragment>
                                            <Badge count={count}>
                                                <span >
                                                    <Icon type="global"
                                                    style={{fontSize:'1.5em'}}
                                                    ></Icon>
                                                </span>
                                            </Badge>
                                            <Icon type="caret-down" style={{fontSize:'1.5em'}}></Icon>
                                        </React.Fragment>

                                    }
                                    style={{borderStyle:'none'}}
                                   
                                    >
                                    {notif}
                                </SubMenu>
                            }
                                <SubMenu 
                                    title={
                                        <React.Fragment>
                                           <Badge count={0} dot>
                                               {isdefault &&
                                                <Avatar src={TodoStore.getAddUserProfilePath+reactLocalStorage.get('userimage') } 
                                                    style={{"width":"3.5em","height":"3em"}} />
                                               }
                                               {!isdefault &&
                                                     <Avatar src={reactLocalStorage.get('userimage') } 
                                                     style={{"width":"3.5em","height":"3em"}} />
                                               }
                                           
                                                 
                                            </Badge>
                                        </React.Fragment>

                                    }>
                                    <Menu.Item key="1" onClick={gotoMyAccount}>My Account</Menu.Item>
                                    <Menu.Item onClick={gotoLogout}>Logout</Menu.Item>
                                </SubMenu>


                            </Menu>
                        </Col>
                    </Row>
                </Header>
            </React.Fragment>
        );
    }
}

Headers.propTypes = {

};

export default Headers;