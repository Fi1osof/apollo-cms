'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// import { createUploadLink } from 'apollo-upload-client'

// import { createHttpLink } from "apollo-link-http";

var _templateObject = _taggedTemplateLiteral(['', ''], ['', '']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _reactApollo = require('react-apollo');

var _reactRouterDom = require('react-router-dom');

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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


  _createClass(ApolloCmsApp, [{
    key: 'getChildContext',
    value: function getChildContext() {
      _objectDestructuringEmpty(this.props);

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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var apiQuery, client, result, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
                  this.setState(_extends({}, data));
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
          other = _objectWithoutProperties(_props, ['Renderer']);

      return _jsx(_reactApollo.ApolloProvider, {
        client: client
      }, void 0, _react2.default.createElement(Renderer, other));
    }
  }]);

  return ApolloCmsApp;
}(_react.Component);

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