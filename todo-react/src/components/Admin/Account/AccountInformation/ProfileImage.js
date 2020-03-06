import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Spin,Icon,notification,Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from "axios";
@inject('TodoStore')
@observer
class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            loading: false,
            isdefault: false,
            isimage:false,
            issaving:false,

        }
    }
    componentDidMount() {
        if (reactLocalStorage.get('userimage') === "avatar.png") {
            this.setState({
                isdefault: true
            });
        }
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { image, loading, isdefault,isimage,issaving } = this.state;



        const uploadImage = async e => {
            const files = e.target.files;
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', "malarayat");
            this.setState({
                loading: true,
                isimage:true,
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
        const updateProfileImage = () => {
           
                //  image =reactLocalStorage.get('userimage');
                if(isimage===true){
                    this.setState({
                        issaving: true
                    });
                   let id = reactLocalStorage.get('userid');
                const account = {
                    image: image
                }
                
                var port = TodoStore.getPort+'accountrouter/update/profile/';
                axios.post(port + id, account)
                    .then(res => {
                        if (res.data === '202') {
                            openNotification("Exist");
                            this.setState({
                                issaving: false
                            });
                        } else if (res.data === '101') {
                            reactLocalStorage.set('userimage',image);
                            openNotification("UpdateImage");
                            this.setState({
                                issaving: false
                            });
                            window.open("/account","_self");

                        } else {
                            this.setState({
                                issaving: false
                            });
                            openNotification("Server");
                        }
                    });
                }else{
                    openNotification("Blank");
                }
                console.log(image);
                
         }
        const openNotification = (value) => {
            if (value === "UpdateImage") {
                notification.open({
                    message: 'Success',
                    description: 'Successfully update your profile image',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='check' style={{ color: '#52c41a' }} />,
                });

            }else if (value === "Server") {
                notification.open({
                    message: 'Warning',
                    description: 'Server Error',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });

            } else if (value === "Blank") {
                notification.open({
                    message: 'Warning',
                    description: 'Upload file first before saving',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                    icon: <Icon type='warning' style={{ color: '#faad14' }} />,
                });

            }
         } 
        return (
            <React.Fragment>
                <Col xs={12} md={6} style={{ paddingTop: '1em',textAlign: 'center' }}>

                    <Row>
                        <Col xs={12} md={12} style={{ paddingTop: '1em',textAlign: 'center' }}>
                            <input className="form-control" type="file"
                                style={{ marginTop: '1em' }}
                                name="file"
                                placeholder="Upload profile photo"
                                onChange={uploadImage}
                            />
                        </Col>
                        {loading ? (
                            <Col xs={12} md={12} style={{ paddingTop: '1em', textAlign: 'center' }}>
                                <Spin />
                            </Col>

                        ) : (
                                <Col xs={12} md={12} style={{ paddingTop: '1em', textAlign: 'center',paddingLeft:'30%' }}>
                                   {isimage &&
                                        <img
                                        style={{width:'15em',height:'15em',borderRadius:'50%'}}  
                                        src={image} />
                                               
                                    }
                                    {!isimage &&

                                        <React.Fragment>
                                             {isdefault ? (
                                                    <img
                                                    style={{width:'15em',height:'15em',borderRadius:'50%'}} 
                                                    src={TodoStore.getAddUserProfilePath + reactLocalStorage.get('userimage')} />
                                                ) : ( 
                                                    <img
                                                    style={{width:'15em',height:'15em',borderRadius:'50%'}}  
                                                    src={reactLocalStorage.get('userimage')} />
                                                )}
                                        </React.Fragment>
                                                
                                     }
                                   
                                   
                                   
                                   
                                
                                </Col>

                            )

                        }
                        <Col xs={12} md={12} style={{ paddingTop: '1em', textAlign: 'center' }}>
                            {!issaving &&
                                <Button 
                                onClick={updateProfileImage}
                                style={{width:'10em',height:'3em',backgroundColor:'#1890ff',color:'#ffffff'}}>Save</Button>
                            }
                            {issaving &&
                                <Button 
                                style={{width:'15em',height:'3em',backgroundColor:'#1890ff',color:'#ffffff'}}>Saving... Please wait.</Button>
                            }
                                
                        </Col>
                    </Row>


                </Col>
            </React.Fragment>
        );
    }
}

ProfileImage.propTypes = {

};

export default ProfileImage;