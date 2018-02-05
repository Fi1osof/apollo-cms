'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectView = function (_React$Component) {
  _inherits(ObjectView, _React$Component);

  function ObjectView() {
    _classCallCheck(this, ObjectView);

    return _possibleConstructorReturn(this, (ObjectView.__proto__ || Object.getPrototypeOf(ObjectView)).apply(this, arguments));
  }

  _createClass(ObjectView, [{
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