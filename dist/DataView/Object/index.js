'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectView = function (_React$Component) {
  (0, _inherits3.default)(ObjectView, _React$Component);

  function ObjectView() {
    (0, _classCallCheck3.default)(this, ObjectView);
    return (0, _possibleConstructorReturn3.default)(this, (ObjectView.__proto__ || (0, _getPrototypeOf2.default)(ObjectView)).apply(this, arguments));
  }

  (0, _createClass3.default)(ObjectView, [{
    key: 'canEdit',
    // eslint-disable-line react/prefer-stateless-function

    value: function canEdit() {

      var object = this.getObjectWithMutations();

      if (!object) {
        return false;
      }

      var currentUser = this.getCurrentUser();

      var id = object.id;


      var canEdit = currentUser && currentUser.id === id ? true : false;

      return canEdit;
    }
  }, {
    key: 'getCurrentUser',
    value: function getCurrentUser() {
      var currentUser = this.context.user;


      return currentUser;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return ObjectView;
}(_react2.default.Component);

ObjectView.contextTypes = {
  user: _propTypes2.default.object
};
exports.default = ObjectView;