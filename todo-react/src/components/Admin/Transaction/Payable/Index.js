import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PagePayment from './PagePayment';


const Index = ({ match, location }) => {
    const {
        params: { id }
      } = match; 
  
        return (
           <React.Fragment>
               <PagePayment id={id}/>
           </React.Fragment>
        );
    
}

Index.propTypes = {

};

export default Index;