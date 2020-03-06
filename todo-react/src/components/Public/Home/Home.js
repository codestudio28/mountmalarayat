import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Input, Icon, Tooltip, notification } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import Navs from '../Navs';
import "./index.css";
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header';
import PageContent from './PageContent';

@inject('TodoStore')
@observer
class Home extends Component {


  render() {
    const TodoStore = this.props.TodoStore;

    return (
      <React.Fragment>
      <Header/>
      <Navs/>
      <PageContent/>
      </React.Fragment>
        );
    }
}

Home.propTypes = {

        };
        
export default Home;