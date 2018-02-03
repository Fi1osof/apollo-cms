'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _reactApollo = require('react-apollo');

var _apolloClient = require('apollo-client');

var _apolloUploadClient = require('apollo-upload-client');

var _apolloCacheInmemory = require('apollo-cache-inmemory');

var _apolloLink = require('apollo-link');

var _apolloLinkError = require('apollo-link-error');

var _apolloLinkWs = require('apollo-link-ws');

var _apolloUtilities = require('apollo-utilities');

var _timers = require('timers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var authMiddleware = new _apolloLink.ApolloLink(function (operation, forward) {
  // eslint-disable-line react/prefer-stateless-function
  // add the authorization to the headers
  operation.setContext(function (_ref) {
    var _ref$headers = _ref.headers,
        headers = _ref$headers === undefined ? {} : _ref$headers;
    return {
      headers: _extends({}, headers, {
        Authorization: localStorage.getItem('token') || null
      })
    };
  });

  return forward(operation);
});

var ApolloCmsApp = function (_Component) {
  _inherits(ApolloCmsApp, _Component);

  // eslint-disable-line react/prefer-stateless-function

  function ApolloCmsApp(props) {
    _classCallCheck(this, ApolloCmsApp);

    var _this = _possibleConstructorReturn(this, (ApolloCmsApp.__proto__ || Object.getPrototypeOf(ApolloCmsApp)).call(this, props));

    _this.onAuthSuccess = function (data) {
      var token = data.token,
          user = data.user;


      token && localStorage.setItem("token", 'Bearer ' + token);

      _this.setState({
        user: user
      });
    };

    _this.logout = function () {

      localStorage.setItem("token", '');

      _this.setState({
        user: null
      });
    };

    _this.onError = function (_ref2) {
      var networkError = _ref2.networkError,
          graphQLErrors = _ref2.graphQLErrors;


      if (networkError && networkError.statusCode === 401) {
        ;
      }

      graphQLErrors && graphQLErrors.map(function (n) {
        var _ref3 = n || {},
            message = _ref3.message;

        var _this$state$errors = _this.state.errors,
            errors = _this$state$errors === undefined ? [] : _this$state$errors;


        if (message) {

          var error = {
            message: message
          };

          errors.push(error);

          (0, _timers.setTimeout)(function () {
            var errors = _this.state.errors;


            var index = errors && errors.indexOf(error);

            if (index !== -1) {

              errors.splice(index, 1);

              _this.setState({
                errors: errors
              });
            }
          }, 3000);
        }

        if (errors && errors.length) {

          _this.setState({
            errors: errors
          });
        }
      });

      return graphQLErrors;
    };

    var endpoint = _this.props.endpoint;


    var wsLink = void 0;

    var hostname = void 0;

    var protocol = 'http';
    var ws_protocol = 'ws';

    if (typeof window !== "undefined") {
      var host_protocol = window.location.protocol;


      if (host_protocol === 'https:') {
        ws_protocol = 'wss';
        protocol = 'https';
      }
    }

    var httpLink = (0, _apolloUploadClient.createUploadLink)({
      uri: protocol + '://' + endpoint + '/'
    });

    wsLink = new _apolloLinkWs.WebSocketLink({
      uri: ws_protocol + '://' + endpoint + '/',
      options: {
        reconnect: true
      }
    });

    var wsHttpLink = (0, _apolloLink.split)(
    // split based on operation type
    function (_ref4) {
      var query = _ref4.query;

      var _getMainDefinition = (0, _apolloUtilities.getMainDefinition)(query),
          kind = _getMainDefinition.kind,
          operation = _getMainDefinition.operation;

      return kind === 'OperationDefinition' && operation === 'subscription';
    }, wsLink, httpLink);

    var errorLink = (0, _apolloLinkError.onError)(_this.onError);

    var link = errorLink.concat(wsHttpLink);

    var client = new _apolloClient.ApolloClient({
      link: (0, _apolloLink.from)([authMiddleware, link]),
      cache: new _apolloCacheInmemory.InMemoryCache(),
      connectToDevTools: true
    });

    _this.state = {
      client: client,
      errors: []
    };

    return _this;
  }

  _createClass(ApolloCmsApp, [{
    key: 'getChildContext',
    value: function getChildContext() {
      _objectDestructuringEmpty(this.props);

      var _state = this.state,
          token = _state.token,
          user = _state.user;


      var context = {
        token: token,
        user: user,
        onAuthSuccess: this.onAuthSuccess,
        logout: this.logout
      };

      return context;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          client = _state2.client,
          errors = _state2.errors;


      return _react2.default.createElement(_reactApollo.ApolloProvider, _extends({
        client: client,
        errors: errors
      }, this.props));
    }
  }]);

  return ApolloCmsApp;
}(_react.Component);

ApolloCmsApp.childContextTypes = {
  onAuthSuccess: _propTypes2.default.func,
  logout: _propTypes2.default.func,
  token: _propTypes2.default.string,
  user: _propTypes2.default.object
};
exports.default = ApolloCmsApp;