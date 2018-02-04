// @flow

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types';

import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'

import { createUploadLink } from 'apollo-upload-client'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';

import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';


import { setTimeout } from 'timers';

const authMiddleware = new ApolloLink((operation, forward) => { // eslint-disable-line react/prefer-stateless-function
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: localStorage.getItem('token') || null,
    }
  }));

  return forward(operation);
})




export default class ApolloCmsApp extends Component{ // eslint-disable-line react/prefer-stateless-function

  constructor(props){

    super(props);


    let {
      endpoint,
    } = this.props;



    let wsLink;

    let hostname;

    let protocol = 'http';
    let ws_protocol = 'ws';

    if(typeof window !== "undefined"){

      const {
        protocol: host_protocol,
      } = window.location;

      if(host_protocol === 'https:'){
        ws_protocol = 'wss';
        protocol = 'https';
      }

    }

    const httpLink = createUploadLink({ 
      uri: `${protocol}://${endpoint}/`,
    });

    wsLink = new WebSocketLink({
      uri: `${ws_protocol}://${endpoint}/`,
      options: {
        reconnect: true
      }
    });


    const wsHttpLink = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    );


    const errorLink = onError(this.onError);
    
    const link = errorLink.concat(wsHttpLink);
    
    const client = new ApolloClient({
      link: from([
        authMiddleware,
        link,
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: true,
    });
    

    this.state = {
      client,
      errors: [],
    };

  }

  
  static childContextTypes = {
    onAuthSuccess: PropTypes.func,
    logout: PropTypes.func,
    token: PropTypes.string,
    user: PropTypes.object,
    errors: PropTypes.array,
  };

  getChildContext() {

    let {
    } = this.props;


    const {
      token,
      user,
      errors,
    } = this.state;
    
    
    let context = {
      token,
      user,
      onAuthSuccess: this.onAuthSuccess,
      logout: this.logout,
      errors,
    };

    return context;
  }


  onAuthSuccess = (data) => {

    const {
      token,
      user,
    } = data;

    token && localStorage.setItem("token", `Bearer ${token}`);

    this.setState({
      user,
    });

  }


  logout = () => {

    localStorage.setItem("token", ``);

    this.setState({
      user: null,
    });

  }



  onError = ({ networkError, graphQLErrors }) => {
  
    if (networkError && networkError.statusCode === 401) {
      ;
    }

    
    graphQLErrors && graphQLErrors.map(n => {

      const {
        message,
      } = n || {};

      const {
        errors = [],
      } = this.state;

      if(message){

        const error = {
          message,
        };

        errors.push(error);

        setTimeout(() => {

          const {
            errors,
          } = this.state;

          const index = errors && errors.indexOf(error);

          if(index !== -1){
            
            errors.splice(index, 1);

            this.setState({
              errors,
            });

          }

        }, 3000);

      }

      if(errors && errors.length){

        this.setState({
          errors,
        });

      }

    });
    

    return graphQLErrors;
  }


  render(){

    const {
      client,
    } = this.state;
    

    return (
      <ApolloProvider
        client={client}
        {...this.props}
      />
    );


  }

}



