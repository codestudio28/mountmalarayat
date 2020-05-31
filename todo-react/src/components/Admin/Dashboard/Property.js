import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import axios from "axios";
var numberofavailable=0;
var numberofclient=0;
var dailypayment=0;
@inject('TodoStore')
@observer
class Property extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: 0,
            items: [],
            types: [],
            client:[],
            misc:[],
            equity:[],
            payment:[],
            isloaded: false,
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        var port = TodoStore.getPort;
        fetch(port+'propertyrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isloaded: true,
                    items: json,
                })
            });
            var port = TodoStore.getPort;
            fetch(port+'proptyperouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        types: json,
                    })
                });
        var port = TodoStore.getPort;
        fetch(port+'clientrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                client: json,
                })
        });
        var port = TodoStore.getPort;
        fetch(port + 'paymentrouter/')
        .then(res => res.json())
        .then(json => {
            this.setState({
                payment: json,
            })
    });
      
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { isloaded, items, sizes,types,client,payment } = this.state;
        numberofavailable=0;
        numberofclient=0;
        dailypayment=0;
        items.map((item) => {
            if(item.status==="NEW"){
                numberofavailable++;
            }    
        });
        client.map((item) => {
            if(item.status==="ACTIVE"){
                numberofclient++;
            }    
        });
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy +'-'+ mm + '-' + dd ;
        payment.map((item) => {
            if(item.status==="PAID"){
                if(today===item.datepaid){
                    dailypayment=dailypayment+parseFloat(item.payment2);
                }
                
                
            }    
        });

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP',
        });
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
                                               {numberofavailable}
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
                                               {numberofclient}
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
                                               {formatter.format(dailypayment)}
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