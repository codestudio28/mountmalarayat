import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Layout, Menu,Spin, Icon,InputNumber, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import './content.css';
import { Input } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from "axios";
import BreadCrumb from '../../BreadCrumb';



const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const ButtonGroup = Button.Group;
const { Option } = Select;

var i = 0;
var count=0;
@inject('TodoStore')
@observer
class PageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: 0,
            items: [],
            types: [],
            isloaded: false,
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        var port = TodoStore.getPort;
        fetch(port+'systemlogrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isloaded: true,
                    items: json,
                })
            });
           
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav === true) {
            this.setState({ sizes: 1 });
        }
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { isloaded, items, sizes,types } = this.state;

        const dataSource = [];
        const dataType = [];

        items.map((item) => {
                dataSource.push({
                    key: item._id,
                    user: item.clientid,
                    datetimes: item.datetimes,
                    dates: item.dates,
                    process: item.process,
                    logs: item.logs
                })
        });
        
            

        
       
     
        const openNotification = (value) => {
            if (value === "Blank") {
                notification.open({
                    message: 'Warning',
                    description: 'Dont leave required field blank',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            } else if (value === "Exist") {
                notification.open({
                    message: 'Warning',
                    description: 'Property already in the records',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });
            } else if (value === "Success") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully add property to the system',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            } else if (value === "Server") {
                notification.open({
                    message: 'Warning',
                    description: 'Server Error',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });

            } else if (value === "Update") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully update property information.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            } else if (value === "Removed") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully removed property.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }
        }

        i = 0;
        count=0;
        var starts = 0;
        var ends = 0;
        var numberdisplay = TodoStore.getNumberDisplay;
        var page = TodoStore.getPage;
        ends = parseInt(page) * parseInt(numberdisplay);
        starts = ends - parseInt(numberdisplay);

        const propertype = dataType.filter(data => {
            return data;
        })
        .map((data, index) => {
            return(
            <Option value={data.typename}>{data.typename}</Option>
            )
        })
        dataSource.sort((a, b) => b.dates.localeCompare(a.dates));
        const datalist = dataSource.filter(data => {

            if (TodoStore.filter === 'All') {
                return data.user.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Email') {
                return data.user.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Process') {
                return data.process.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Date') {
                return data.dates.indexOf(TodoStore.search) >= 0
            } 

        })
            .map((data, index) => {
                i++;
                if ((index >= starts) && (index < ends)) {
                   
                     
                            count++;
                            return (
                        
                                <tr key={i}>
                                    <td>{count}</td>
                                    <td>{data.dates}</td>
                                    <td>{data.user}</td>
                                    <td>{data.process}</td>
                                    <td>{data.logs}</td>
                                   
                                </tr>
                            )
                        
                       
                    }
                    
                
            })
            const generatePDF = () => {
                const doc = new jsPDF();
                var todays = new Date().toLocaleString();
                // doc.fromHTML('Mount Malarayat Property Development Corporation', 10, 10)
                var pageHeight= doc.internal.pageSize.height;
                console.log(pageHeight);
                doc.fromHTML('<h4>MOUNT MALARAYAT PROPERTY DEVELOPMENT CORPORATION</h4>',40,10);
                doc.fromHTML('<h5>List of User Logs</h5>',90,20);
                doc.fromHTML('<h6>Date Generated: '+todays+'</h6>',145,27);
                    // autoTable(doc, { html: '#property-table' })
                doc.autoTable({ 
                    html: '#property-table',
                    margin:{top:40} })
                    doc.save(todays+'.pdf')
            }

        return (

            <React.Fragment>

                <Container fluid={true} style={{ minHeight: '40em', height: 'auto', marginTop: '1em', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <BreadCrumb location="Report / List of Logs" />
                        </Col>
                        <Col xs={12} md={12} style={{ padding: '1em' }}>
                            <div style={{ padding: '1em', backgroundColor: '#fff', minHeight: '1em' }}>
                                <Row>
                                    <Col xs={12} md={12}
                                        style={{
                                            minHeight: '40em',
                                            height: 'auto'
                                        }}
                                    >
                                        <Row>
                                            <Col xs={12} md={12} style={{ textAlign: 'right' }}>
                                                <Button type="primary"
                                                    onClick={(event) => generatePDF()}
                                                >
                                                    Generate PDF
                                                </Button>
                                            </Col>
                                            <Col xs={12} md={4} style={{ paddingTop: '0.5em' }}>
                                                <Row>
                                                    <Col xs={12} md={12}>
                                                        <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Filter by:</h5>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Select defaultValue={TodoStore.getFilter} style={{ width: '90%' }}
                                                            onChange={TodoStore.setFilter}>
                                                            <Option value="All">All</Option>
                                                            <Option value="Block">Block</Option>
                                                            <Option value="Lot">Lot</Option>
                                                            <Option value="Type">Type</Option>
                                                            <Option value="Area">Area</Option>
                                                            <Option value="Status">Status</Option>
                                                        </Select>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} md={4} style={{ paddingTop: '0.5em' }}>
                                                <Row>
                                                    <Col xs={12} md={12}>
                                                        <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}># of Records to Display:</h5>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Select defaultValue={TodoStore.getNumberDisplay} style={{ width: '90%' }}
                                                            onChange={TodoStore.setNumberDisplay}>
                                                            <Option value="1">1</Option>
                                                            <Option value="2">2</Option>
                                                            <Option value="3">3</Option>
                                                            <Option value="10">10</Option>
                                                            <Option value="25">25</Option>
                                                            <Option value="50">50</Option>
                                                            <Option value="100">100</Option>
                                                            <Option value="150">150</Option>
                                                        </Select>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} md={4} style={{ paddingTop: '0.5em' }}>
                                                <Row>
                                                    <Col xs={12} md={12}>
                                                        <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Search:</h5>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Search
                                                            placeholder="Search here . . ."
                                                            style={{ width: '90%' }}
                                                            onChange={TodoStore.setSearch}
                                                            value={TodoStore.getSearch}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} md={12} style={{ paddingTop: '0.5em' }}>

                                                {sizes === 0 &&
                                                    <table id="property-table" className="table table-hover" style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Date</th>
                                                                <th>Email</th>
                                                                <th>Process</th>
                                                                <th>Logs</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {datalist}
                                                        </tbody>
                                                    </table>

                                                }

                                                {sizes !== 0 &&
                                                    <Col xs={12} md={12} style={{ paddingTop: '0.5em' }}>
                                                        <Row>
                                                            {datalist}
                                                        </Row>
                                                    </Col>
                                                }

                                                <Pagination style={{marginTop:'0.5em'}}
                                                    current={TodoStore.getPage}
                                                    total={(i / TodoStore.getNumberDisplay) * 10}
                                                    onChange={TodoStore.setPage} />
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                  
                </Container>



            </React.Fragment>
        );
    }
}

PageContent.propTypes = {

};

export default PageContent;