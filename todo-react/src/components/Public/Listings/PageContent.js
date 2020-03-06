import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Input, Icon, Tooltip, notification} from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import "./index.css";
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from "./CarouselPage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FeaturedList from './FeaturedList';
import Footers from './Footers';
@inject('TodoStore')
@observer
class PageContent extends Component {


  render() {
    const TodoStore = this.props.TodoStore;
   
    return (
      <React.Fragment>
         <Container fluid={true} style={{minHeight:'1em',
                                        height:'auto',
                                        backgroundColor:'#ffffff',
                                        marginTop:'1em'}}>
            <Carousel/>
            <FeaturedList/>
            <Footers/>

        </Container>
      </React.Fragment>
        );
    }
}

PageContent.propTypes = {

        };
        
export default PageContent;