import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Spin, Icon, InputNumber, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';
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

@inject('TodoStore')
@observer
class PageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            sizes: 0,
            items: [],
            isloaded: false,
            isimage: false,
            loading: false,
            isdefault:false,
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        var port = TodoStore.getPort;
        fetch(port + 'propertyrouter/')
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
        var { isloaded, items, sizes, isimage, loading,image,isdefault} = this.state;

        const dataSource = [];

        items.map(item => (
            dataSource.push({
                key: item._id,
                block: item.block,
                lot: item.lot,
                type: item.type,
                area: item.area,
                price: item.price,
                status: item.status,

            })
        ));

        const getProperty = () => {
            var port = TodoStore.getPort + "propertyrouter/"
            fetch(port)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isloaded: true,
                        items: json,
                    })
                });
        }
        const addListings = () => {
            if ((TodoStore.getHouseModel.length === 0) || (TodoStore.getLotArea.length === 0)
                || (TodoStore.getFloorArea.length === 0) || (TodoStore.getBedroom.length === 0)
                || (TodoStore.getBathroom.length === 0) || (TodoStore.getTCP.length === 0)) {
                openNotification("Blank");
            } else {
                TodoStore.setAdding(true);
                const property = {
                    block: TodoStore.getBlock,
                    lot: TodoStore.getLot,
                    type: TodoStore.getType,
                    area: TodoStore.getArea,
                    price: TodoStore.getPrice,
                    status: "NEW"

                }
                var port = TodoStore.getPort + "propertyrouter/add"
                axios.post(port, property)
                    .then(res => {
                        console.log(res.data);
                        if (res.data === '202') {
                            TodoStore.setAdding(false);
                            openNotification("Exist");
                        } else if (res.data === '101') {
                            openNotification("Success");
                            getProperty();
                            TodoStore.setAdding(false);
                            TodoStore.setHandleCancel();
                        } else {
                            openNotification("Server");
                            TodoStore.setAdding(false);
                        }
                    });
            }
        }
        const setUpdate = (id) => {
            TodoStore.setUpdateId(id);
            TodoStore.setUpdateModal(true);
            const singlelist = dataSource.filter(data => {
                return data.key.indexOf(id) >= 0
            }).map((data, index) => {
                TodoStore.setBlock2(data.block);
                TodoStore.setLot2(data.lot);
                TodoStore.setType2(data.type);
                TodoStore.setArea2(data.area);
                TodoStore.setPrice2(data.price);
            })
        }
        const updateProperty = () => {
            if ((TodoStore.getBlock.length === 0) || (TodoStore.getLot.length === 0)
                || (TodoStore.getType.length === 0) || (TodoStore.getArea.length === 0)
                || (TodoStore.getPrice.length === 0)) {
                openNotification("Blank");
            } else {
                TodoStore.setAdding(true);
                let id = TodoStore.getUpdateId;
                const property = {
                    block: TodoStore.getBlock,
                    lot: TodoStore.getLot,
                    type: TodoStore.getType,
                    area: TodoStore.getArea,
                    price: TodoStore.getPrice

                }
                var port = TodoStore.getPort + "propertyrouter/update/"
                axios.post(port + id, property)
                    .then(res => {
                        if (res.data === '202') {
                            TodoStore.setAdding(false);
                            openNotification("Exist");
                        } else if (res.data === '101') {
                            openNotification("Update");
                            getProperty();
                            TodoStore.setAdding(false);
                            TodoStore.setHandleCancel();
                        } else {
                            TodoStore.setAdding(false);
                            openNotification("Server");
                        }
                    });
            }
        }
        const removeProperty = () => {
            var id = TodoStore.getRemoveId;
            const client = {
                status: 'REMOVED'
            }
            TodoStore.setLoading(true);
            var port = TodoStore.getPort + "propertyrouter/status/"
            axios.post(port + id, client)
                .then(res => {
                    console.log(res.data);
                    if (res.data === '101') {
                        TodoStore.setLoading(false);
                        getProperty();
                        openNotification("Removed");
                    } else {
                        TodoStore.setLoading(false);
                        openNotification("Server");
                    }
                });
        }
        const uploadImage = async e => {
            const files = e.target.files;
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', "malarayat");
            this.setState({
                loading: true,
                isimage: true,
            });
            const res = await fetch(
                'https://api.cloudinary.com/v1_1/codestudio28/image/upload',
                {
                    method: 'POST',
                    body: data
                }
            )
            const file = await res.json();
            // reactLocalStorage.set('userimage',file.secure_url_url);
            this.setState({
                image: file.secure_url,
                loading: false
            });

        }
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
        var starts = 0;
        var ends = 0;
        var numberdisplay = TodoStore.getNumberDisplay;
        var page = TodoStore.getPage;
        ends = parseInt(page) * parseInt(numberdisplay);
        starts = ends - parseInt(numberdisplay);


        const datalist = dataSource.filter(data => {

            if (TodoStore.filter === 'All') {
                return data.block.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Block') {
                return data.block.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Lot') {
                return data.lot.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Area') {
                return data.area.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Type') {
                return data.type.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Status') {
                return data.status.indexOf(TodoStore.search) >= 0
            }

        })
            .map((data, index) => {
                i++;
                if ((index >= starts) && (index < ends)) {
                    if (data.status === "REMOVED") {

                    } else {
                        if (sizes === 0) {
                            return (

                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{data.block}</td>
                                    <td>{data.lot}</td>
                                    <td>{data.type}</td>
                                    <td>{data.area} sqm.</td>
                                    <td>Php. {data.price}</td>
                                    <td>{data.status}</td>
                                    <td>
                                        {!TodoStore.getLoading &&
                                            <ButtonGroup>
                                                <Tooltip placement="topLeft" title="Click to update property information">
                                                    <Button style={{ backgroundColor: '#00a2ae' }}
                                                        onClick={(event) => setUpdate(data.key)}
                                                    ><Icon type="edit" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                </Tooltip>
                                                <Tooltip placement="topLeft" title="Click to remove this property">
                                                    <Popconfirm
                                                        placement="topRight"
                                                        title="Do you want to remove this property?"
                                                        onConfirm={removeProperty}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button style={{ backgroundColor: '#ff4d4f' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="delete" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                    </Popconfirm>
                                                </Tooltip>
                                            </ButtonGroup>
                                        }
                                        {TodoStore.getLoading &&
                                            <div style={{
                                                fontSize: '1em',
                                                backgroundColor: '#a0d911',
                                                height: '2em',
                                                borderRadius: '0.5em',
                                                width: '12em',
                                                textAlign: 'center',
                                                padding: '0.25em',
                                                color: '#ffffff'
                                            }}>
                                                Loading... Please wait.
                                    </div>
                                        }
                                    </td>
                                </tr>
                            )
                        } else {
                            return (

                                <Col key={data.key} xs={12} md={12} style={{
                                    backgroundColor: '#bae7ff',
                                    height: 'auto',
                                    marginTop: '0.5em',
                                    minHeight: '5em',
                                    padding: '1em 0.5em 1em 0.5em',
                                    borderRadius: '0.5em'
                                }}>
                                    <Row >
                                        <Col xs={12} md={12}>
                                            <h4 style={{ fontSize: '1em' }}><span style={{ color: '#8c8c8c' }}>Block:</span> {data.block}&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8c8c8c' }}>Lot: </span>{data.lot}</h4>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <h4 style={{ fontSize: '1em' }}><span style={{ color: '#8c8c8c' }}>Type:</span> {data.type}&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8c8c8c' }}>Area:</span> {data.area}</h4>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <h4 style={{ fontSize: '1em' }}><span style={{ color: '#8c8c8c' }}>Price:</span> {data.price}&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8c8c8c' }}>Status: </span>{data.status}</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <div style={{ borderTop: '1px solid', width: '100%' }}>

                                            </div>
                                        </Col>
                                        <Col xs={12} md={12} style={{ textAlign: 'right', paddingTop: '0.5em' }}>
                                            {!TodoStore.getLoading &&
                                                <ButtonGroup>
                                                    <Tooltip placement="topLeft" title="Click to update property information">
                                                        <Button style={{ backgroundColor: '#00a2ae' }}
                                                            onClick={(event) => setUpdate(data.key)}
                                                        ><Icon type="edit" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                    </Tooltip>
                                                    <Tooltip placement="topLeft" title="Click to remove this property">
                                                        <Popconfirm
                                                            placement="topRight"
                                                            title="Do you want to remove this property?"
                                                            onConfirm={removeProperty}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button style={{ backgroundColor: '#ff4d4f' }} onClick={(event) => TodoStore.setRemoveId(data.key)}><Icon type="delete" style={{ color: '#fff', fontSize: '1.25em' }}></Icon></Button>
                                                        </Popconfirm>
                                                    </Tooltip>
                                                </ButtonGroup>
                                            }
                                            {TodoStore.getLoading &&
                                                <Spin />
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        }

                    }

                }
            })
        return (

            <React.Fragment>

                <Container fluid={true} style={{ minHeight: '40em', height: 'auto', marginTop: '1em', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <BreadCrumb location="Listings / List of Listings" />
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
                                                    onClick={(event) => TodoStore.setAddModal(true)}
                                                >
                                                    Add Listings
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
                                                    <table className="table table-hover" style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Block</th>
                                                                <th>Lot</th>
                                                                <th>Type</th>
                                                                <th>Area</th>
                                                                <th>Price</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
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

                                                <Pagination style={{ marginTop: '0.5em' }}
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
                    {/* Add Property */}
                    <Modal
                        title="Add New Listings"
                        visible={TodoStore.getAddModal}
                        onOk={addListings}
                        onCancel={TodoStore.setHandleCancel}
                    >
                        {!TodoStore.getAdding &&
                            <Row>
                                <Col xs={12} md={12} style={{ paddingTop: '1em', textAlign: 'center' }}>
                                    <input className="form-control" type="file"
                                        style={{ marginTop: '0.5em' }}
                                        name="file"
                                        placeholder="Upload profile photo"
                                        onChange={uploadImage}
                                    />
                                </Col>
                                <Col xs={12} md={12}  style={{marginTop:'1em',height:'15em'}}>
                                    
                                    <center><img 
                                    style={{width:'15em',height:'15em'}}
                                    src="https://res.cloudinary.com/codestudio28/image/upload/v1579016796/malarayat/pcq0i1sbvomr761gtbat.png"/>
                                    </center>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>House Model</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter house model name *(Required)"
                                                onChange={TodoStore.setHouseModel}
                                                value={TodoStore.getHouseModel}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Lot Area (sqm)</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter lot area / Ex. 48 sqm. *(Required)"
                                                onChange={TodoStore.setLotArea}
                                                value={TodoStore.getLotArea}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Floor Area (sqm)</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter floor area / Ex. 48 sqm. *(Required)"
                                                onChange={TodoStore.setFloorArea}
                                                value={TodoStore.getFloorArea}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Bedroom</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter number of bedroom *(Required)"
                                                onChange={TodoStore.setBedroom}
                                                value={TodoStore.getBedroom}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Bathroom</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter number of bathroom *(Required)"
                                                onChange={TodoStore.setBathroom}
                                                value={TodoStore.getBathroom}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>TCP</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter tcp *(Required)"
                                                onChange={TodoStore.setTCP}
                                                value={TodoStore.getTCP}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        }
                        {TodoStore.getAdding &&
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ marginTop: '3em', textAlign: 'center' }} >
                                            <Spin />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '1em', textAlign: 'center' }} >
                                            <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Please wait... Saving listing information</h5>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        }

                    </Modal>
                    {/* Update Property */}
                    <Modal
                        title="Update Property Information"
                        visible={TodoStore.getUpdateModal}
                        onOk={updateProperty}
                        onCancel={TodoStore.setHandleCancel}
                    >
                        {!TodoStore.getAdding &&
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Block</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter block *(Required)"
                                                onChange={TodoStore.setBlock}
                                                value={TodoStore.getBlock}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Lot</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter lot *(Required)"
                                                onChange={TodoStore.setLot}
                                                value={TodoStore.getLot}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Type</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Select defaultValue={TodoStore.getType} style={{ width: '90%' }}
                                                onChange={TodoStore.setType}>
                                                <Option value="RH">RH</Option>
                                                <Option value="1SD">1SD</Option>
                                                <Option value="2SD">2SD</Option>
                                                <Option value="LO">LO</Option>
                                            </Select>
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Area</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter property area (Do not add sqm) *(Required)"
                                                onChange={TodoStore.setArea}
                                                value={TodoStore.getArea}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '0.5em' }}>
                                            <h4 style={{ color: '#c4c4c4', fontSize: '1em' }}>Price</h4>
                                        </Col>
                                        <Col xs={12} md={12} >
                                            <Input placeholder="Enter price *(Required)"
                                                onChange={TodoStore.setPrice}
                                                value={TodoStore.getPrice}
                                            />
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        }
                        {TodoStore.getAdding &&
                            <Row>
                                <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12} md={12} style={{ marginTop: '3em', textAlign: 'center' }} >
                                            <Spin />
                                        </Col>
                                        <Col xs={12} md={12} style={{ marginTop: '1em', textAlign: 'center' }} >
                                            <h5 style={{ color: '#c4c4c4', fontSize: '1em' }}>Please wait... Saving property information</h5>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        }
                    </Modal>
                </Container>



            </React.Fragment>
        );
    }
}

PageContent.propTypes = {

};

export default PageContent;