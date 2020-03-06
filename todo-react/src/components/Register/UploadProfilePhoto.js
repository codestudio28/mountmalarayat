import React, { Fragment, useState, Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Row, Col, notification, Icon, Button, Avatar, Popconfirm } from 'antd';
import Message from './Message';
import { inject, observer } from 'mobx-react';
import Progress from './Progress';

import axios from 'axios';

const UploadProfilePhoto = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
   
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
       TodoStore.setProfileError();
    };
    const openNotification = (value) => {
        if (value === "Success") {
            notification.open({
                message: 'Success',
                description: 'Your profile photo is successfully uploaded',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
                icon: <Icon type='check' style={{ color: '#52c41a' }} />,
            });
        } else if (value === "Blank") {
            notification.open({
                message: 'Warning',
                description: 'Please upload profile before submitting your registration.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
                icon: <Icon type='warning' style={{ color: '#faad14' }} />,
            });
        } else if (value === "Loading") {
            notification.open({
                message: 'Success',
                description: 'Please wait... Submitting your information!',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
                icon: <Icon type='check' style={{ color: '#52c41a' }} />,
            });
        }
    }
    const next = () => {
        console.log(reactLocalStorage.get('profileimage'));
        if (TodoStore.getRegProfilePhotoError === false) {
            openNotification("Blank");
        } else {
            openNotification("Loading");
            var tempDate = new Date();
            var date_created = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
            const users = {
                usertype: "user",
                email: TodoStore.getRegEmail,
                password: TodoStore.getRegPassword1,
                image: reactLocalStorage.get('profileimage'),
                lastname: TodoStore.getRegLastname,
                firstname: TodoStore.getRegFirstname,
                middlename: TodoStore.getRegMiddlename,
                date_created: date_created,
                status: "PENDING"

            }
            console.log(users);
            axios.post('http://localhost:8080/account/add', users)
                .then(res => {
                    if (res.data === 'Email address already exist') {
                        openNotification("Exist");
                    } else {
                        saveAccountInfo(res.data);
                    }
                });
        }



    }
    const saveAccountInfo = (id) => {
        const users = {
            userid: id,
            birthday: TodoStore.getRegBirthday,
            birthplace: TodoStore.getRegBirthPlace,
            sex: TodoStore.getRegSex,
            civilstatus: TodoStore.getRegCivilStatus,
            occupation: TodoStore.getRegOccupation,
            address: TodoStore.getRegAddress,
            barangay: TodoStore.getRegBarangay,
            contactnumber: TodoStore.getRegContactNumber
        }
        console.log(users);
        axios.post('http://localhost:8080/accountinfo/add', users)
            .then(res => {
                if (res.data === 'Succesfully Add Account Info') {
                    saveSpouse(id);
                } else {
                    openNotification("Server");
                }
                console.log(res.data);
            });

    }
    const saveSpouse = (id) => {
        const spouse = {
            userid: id,
            lastname: TodoStore.getRegSpouseLastname,
            firstname: TodoStore.getRegSpouseFirstname,
            middlename: TodoStore.getRegSpouseMiddlename,
            occupation: TodoStore.getRegSpouseOccupation
        }
        console.log(spouse);
        axios.post('http://localhost:8080/spouse/add', spouse)
            .then(res => {
                if (res.data === 'Succesfully Add Spouse') {
                    saveChild(id);
                } else {
                    openNotification("Server");
                }
                console.log(res.data);
            });

    }
    const saveChild = (id) => {
        if (TodoStore.getChildren.length > 0) {
            TodoStore.getChildren.map((child, index) => {
                const childs = {
                    userid: id,
                    lastname: child.lastname,
                    firstname: child.firstname,
                    middlename: child.middlename,
                    occupation: child.schooloccupation,
                    birthday: child.birthday,
                    civilstatus: child.civilstatus,
                }
                console.log(childs);
                axios.post('http://localhost:8080/child/add', childs)
                    .then(res => {
                        if (res.data === 'Succesfully Add Child') {

                        } else {
                            openNotification("Server");
                        }
                        console.log(res.data);
                    });
            });
        } else {

        }
        saveEducational(id);

    }

    const saveEducational = (id) => {
        var schoolelem, yearelem, schooljunior, yearjunior, schoolsenior, yearsenior, schoolcollege, yearcollege, schoolpost, yearpost;
        if (TodoStore.getRegSchoolElem === '') {
            schoolelem = 'null';
            yearelem = 'null';
        } else {
            schoolelem = TodoStore.getRegSchoolElem;
            yearelem = TodoStore.getRegYearElem;
        }
        if (TodoStore.getRegSchoolJunior === '') {
            schooljunior = 'null';
            yearjunior = 'null';
        } else {
            schooljunior = TodoStore.getRegSchoolJunior;
            yearjunior = TodoStore.getRegYearJunior;
        }
        if (TodoStore.getRegSchoolSenior === '') {
            schoolsenior = 'null';
            yearsenior = 'null';
        } else {
            schoolsenior = TodoStore.getRegSchoolSenior;
            yearsenior = TodoStore.getRegYearSenior;
        }
        if (TodoStore.getRegSchoolCollege === '') {
            schoolcollege = 'null';
            yearcollege = 'null';
        } else {
            schoolcollege = TodoStore.getRegSchoolCollege;
            yearcollege = TodoStore.getRegYearCollege;
        }
        if (TodoStore.getRegSchoolPost === '') {
            schoolpost = 'null';
            yearpost = 'null';
        } else {
            schoolpost = TodoStore.getRegSchoolPost;
            yearpost = TodoStore.getRegYearPost;
        }

        const education = {
            userid: id,
            schoolelem: schoolelem,
            yearelem: yearelem,
            schooljunior: schooljunior,
            yearjunior: yearjunior,
            schoolsenior: schoolsenior,
            yearsenior: yearsenior,
            schoolcollege: schoolcollege,
            yearcollege: yearcollege,
            schoolpost: schoolpost,
            yearpost: yearpost,
        }
        axios.post('http://localhost:8080/education/add', education)
            .then(res => {
                if (res.data === 'Succesfully Add Education') {
                    saveWork(id);
                } else {
                    openNotification("Server");
                }
                console.log(res.data);
            });

    }
    const saveWork = (id) => {
        if (TodoStore.getWork.length > 0) {
            TodoStore.getWork.map((work, index) => {
                const works = {
                    userid: id,
                    company: work.company,
                    position: work.position,
                    fromyear: work.fromyear,
                    toyear: work.toyear,
                }
                console.log(works);
                axios.post('http://localhost:8080/work/add', works)
                    .then(res => {
                        if (res.data === 'Succesfully Add Work') {

                        } else {
                            openNotification("Server");
                        }
                        console.log(res.data);
                    });
            });
        } else {

        }
        doneRegister();
    }
    const doneRegister = () => {
        TodoStore.setRegisterStep(6);

    }
    const back = () => {
        TodoStore.setRegisterStep(4);
    }
    const addArticleImageDraft = () => {
        if (uploadedFile.fileName === undefined) {
            openNotification("Blank");
        } else {
            TodoStore.setCreateArticleStep(3);
        }

    }
    
    const setName = (filename) => {
        reactLocalStorage.set('profileimage', filename);
        console.log("new: " + reactLocalStorage.get('profileimage'))
    }
    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:8080/uploadphoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );

                    // Clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

            setMessage('File Uploaded');

        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    };
    return (
        <React.Fragment>

            <Row>
                <Col span={4}></Col>
                <Col span={16} style={{
                    minHeight: '30em',
                    height: 'auto',
                    borderRadius: '0.75em',
                    backgroundColor: '#ffffff'
                }}>
                    <Row>
                        <Col span={24} style={{
                            height: '3em',
                            borderRadius: '0.75em 0.75em 0em 0em',
                            backgroundColor: '#800000',
                            padding: '0.75em 1em 0.75em 1em'
                        }}>
                            <h4 style={{ fontSize: '1.25em', color: '#ffffff' }}>
                                Upload Profile Photo
                        </h4>
                        </Col>
                        <Col span={24} style={{
                            minHeight: '22em',
                            height: 'auto',
                            padding: '2em'
                        }}>
                            <Col span={24}>
                                {message ?
                                    TodoStore.setProfileError()
                                    : null}
                            </Col>

                            <form onSubmit={onSubmit}>

                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <h5 style={{ color: '#c4c4c4', fontSize: '1.5em' }}>Upload profile photo below</h5>
                                </Col>

                                <Col span={6}></Col>
                                <Col span={12}>
                                    <div className="col-md-12">
                                        <div className='custom-file mb-4'>
                                            <input
                                                type='file'
                                                className='custom-file-input'
                                                id='customFile'
                                                onChange={onChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                {filename}
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={6}></Col>
                                <Col span={24}>
                                    <Row>
                                        <Col span={6}></Col>
                                        <Col span={12}>
                                            <Progress percentage={uploadPercentage} />
                                        </Col>
                                        <Col span={6}></Col>
                                    </Row>

                                </Col>
                                <Col span={6}></Col>
                                <Col span={12}>
                                    {TodoStore.getRegProfilePhotoError &&
                                         <input
                                         type='submit'
                                         value='Upload'
                                         className='btn btn-primary btn-block mt-4'
                                     />
                                    }
                                    {!TodoStore.getRegProfilePhotoError &&
                                         <input
                                         type='submit'
                                         value='Upload'
                                         className='btn btn-primary btn-block mt-4'
                                         disabled
                                     />
                                    }
                                   
                                </Col>
                                <Col span={16}></Col>

                            </form>

                            {uploadedFile ? (
                                <React.Fragment>

                                    <Col span={6}></Col>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={6}></Col>
                                            <Col span={12}>
                                                <div className='row mt-12'>
                                                    <div className='col-md-12 m-auto'>
                                                        {/* <h3 className='text-center'>{uploadedFile.fileName}</h3> */}
                                                        {
                                                            setName(uploadedFile.fileName)
                                                        }
                                                        {
                                                            console.log(uploadedFile.fileName)
                                                        }
                                                        {

                                                        }
                                                        {/* <img style={{ width: '100%' }} src={TodoStore.getRegisterProfilePhoto+uploadedFile.fileName} alt='' /> */}
                                                        {/* <Avatar src={TodoStore.getAddUserProfilePath+uploadedFile.fileName}
                                                                style={{ "width": "2.5em", "height": "2em" }} /> */}
                                                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={6}></Col>
                                        </Row>
                                    </Col>
                                    <Col span={6}></Col>
                                    <Col span={24} style={{ marginTop: '2em' }}>
                                        <Row>
                                            <Col span={6}>

                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Col span={12}>
                                                        <Button onClick={back}
                                                            style={{ color: '#ffffff', backgroundColor: '#800000' }}>
                                                            Back: Work Experience
                                        </Button>
                                                    </Col>
                                                    <Col span={12} style={{ textAlign: 'right' }}>
                                                        <Popconfirm
                                                            placement="topRight"
                                                            title="Do you want to finish your registration?"
                                                            onConfirm={next}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button style={{ color: '#ffffff', backgroundColor: '#52c41a' }}>
                                                                Finish Registrations
                                                        </Button>
                                                        </Popconfirm>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col span={6}></Col>
                                        </Row>
                                    </Col>

                                </React.Fragment>
                            ) : null}

                        </Col>
                    </Row>
                </Col>




            </Row>
        </React.Fragment>
    )
}));
export default UploadProfilePhoto