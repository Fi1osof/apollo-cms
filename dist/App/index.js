'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['', ''], ['', '']);

// import { createUploadLink } from 'apollo-upload-client'

// import { createHttpLink } from "apollo-link-http";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _reactApollo = require('react-apollo');

var _apolloClient = require('apollo-client');

var _apolloUploadClient = require('../external/apollo-upload-client');

var _apolloCacheInmemory = require('apollo-cache-inmemory');

var _apolloLink = require('apollo-link');

var _apolloLinkError = require('apollo-link-error');

var _apolloLinkWs = require('apollo-link-ws');

var _apolloUtilities = require('apollo-utilities');

var _timers = require('timers');

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authMiddleware = new _apolloLink.ApolloLink(function (operation, forward) {
  // eslint-disable-line react/prefer-stateless-function
  // add the authorization to the headers
  operation.setContext(function (_ref) {
    var _ref$headers = _ref.headers,
        headers = _ref$headers === undefined ? {} : _ref$headers;
    return {
      headers: (0, _extends3.default)({}, headers, {
        Authorization: localStorage.getItem('token') || null
      })
    };
  });

  return forward(operation);
});

var ApolloCmsApp = function (_React$Component) {
  (0, _inherits3.default)(ApolloCmsApp, _React$Component);

  function ApolloCmsApp(props) {
    (0, _classCallCheck3.default)(this, ApolloCmsApp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ApolloCmsApp.__proto__ || (0, _getPrototypeOf2.default)(ApolloCmsApp)).call(this, props));

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

    _this.onError = function (response) {

      // console.log("onError response", response);

      var networkError = response.networkError,
          graphQLErrors = response.graphQLErrors;


      if (networkError && networkError.statusCode === 401) {
        ;
      }

      // console.log("onError networkError", networkError);
      // console.log("onError graphQLErrors", graphQLErrors);

      graphQLErrors && graphQLErrors.map(function (n) {
        var _ref2 = n || {},
            message = _ref2.message;

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

        return n;
      });

      return graphQLErrors;
    };

    var endpoint = _this.props.endpoint;


    var wsLink = void 0;

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

    // const httpLink = createHttpLink({ 
    //   uri: `${protocol}://${endpoint}/`,
    // });

    wsLink = new _apolloLinkWs.WebSocketLink({
      uri: ws_protocol + '://' + endpoint + '/',
      options: {
        reconnect: true
      }
    });

    var wsHttpLink = (0, _apolloLink.split)(
    // split based on operation type
    function (request) {

      // console.log("request", request);

      var query = request.query;

      var _getMainDefinition = (0, _apolloUtilities.getMainDefinition)(query),
          kind = _getMainDefinition.kind,
          operation = _getMainDefinition.operation;

      return kind === 'OperationDefinition' && operation === 'subscription';
    }, wsLink, httpLink);

    var errorLink = (0, _apolloLinkError.onError)(_this.onError);

    var link = errorLink.concat(wsHttpLink);
    // const link = errorLink.concat(httpLink);

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
  } // eslint-disable-line react/prefer-stateless-function


  (0, _createClass3.default)(ApolloCmsApp, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _state = this.state,
          token = _state.token,
          user = _state.user,
          errors = _state.errors;


      var context = {
        token: token,
        user: user,
        onAuthSuccess: this.onAuthSuccess,
        logout: this.logout,
        errors: errors
      };

      return context;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      this.loadApiData();
    }
  }, {
    key: 'loadApiData',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var apiQuery, client, result, data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apiQuery = this.props.apiQuery;

                if (apiQuery) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', false);

              case 3:
                client = this.state.client;
                _context.next = 6;
                return client.query({
                  query: (0, _graphqlTag2.default)(_templateObject, apiQuery),
                  fetchPolicy: "network-only"
                }, {}).then(function (r) {
                  return r;
                }).catch(function (e) {
                  console.error(e);
                });

              case 6:
                result = _context.sent;
                data = result.data;


                if (data) {
                  this.setState((0, _extends3.default)({}, data));
                }

                return _context.abrupt('return', result);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadApiData() {
        return _ref3.apply(this, arguments);
      }

      return loadApiData;
    }()
  }, {
    key: 'render',
    value: function render() {
      var client = this.state.client;
      var _props = this.props,
          Renderer = _props.Renderer,
          other = (0, _objectWithoutProperties3.default)(_props, ['Renderer']);


      return (0, _jsx3.default)(_reactApollo.ApolloProvider, {
        client: client
      }, void 0, _react2.default.createElement(Renderer, other));
    }
  }]);
  return ApolloCmsApp;
}(_react2.default.Component);

ApolloCmsApp.defaultProps = {
  Renderer: _Renderer2.default,
  apiQuery: '{\n      user:me{\n        id\n        username\n      }\n    }'
};
ApolloCmsApp.childContextTypes = {
  onAuthSuccess: _propTypes2.default.func,
  logout: _propTypes2.default.func,
  token: _propTypes2.default.string,
  user: _propTypes2.default.object,
  errors: _propTypes2.default.array
};
exports.default = ApolloCmsApp;