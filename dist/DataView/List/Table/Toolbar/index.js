'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnhancedTableToolbar = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

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

var _styles = require('material-ui/styles');

var _Toolbar = require('material-ui/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Tooltip = require('material-ui/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Delete = require('material-ui-icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _FilterList = require('material-ui-icons/FilterList');

var _FilterList2 = _interopRequireDefault(_FilterList);

var _colorManipulator = require('material-ui/styles/colorManipulator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolbarStyles = function toolbarStyles(theme) {
  return {
    root: {
      paddingRight: theme.spacing.unit
    },
    highlight: theme.palette.type === 'light' ? {
      color: theme.palette.secondary.dark,
      backgroundColor: (0, _colorManipulator.lighten)(theme.palette.secondary.light, 0.4)
    } : {
      color: (0, _colorManipulator.lighten)(theme.palette.secondary.light, 0.4),
      backgroundColor: theme.palette.secondary.dark
    },
    spacer: {
      flex: '1 1 100%'
    },
    actions: {
      color: theme.palette.text.secondary
    },
    title: {
      flex: '0 0 auto'
    }
  };
};

var _ref = (0, _jsx3.default)(_Tooltip2.default, {
  title: 'Delete'
}, void 0, (0, _jsx3.default)(_IconButton2.default, {
  'aria-label': 'Delete'
}, void 0, (0, _jsx3.default)(_Delete2.default, {})));

var _ref2 = (0, _jsx3.default)(_Tooltip2.default, {
  title: 'Filter list'
}, void 0, (0, _jsx3.default)(_IconButton2.default, {
  'aria-label': 'Filter list'
}, void 0, (0, _jsx3.default)(_FilterList2.default, {})));

var EnhancedTableToolbar = exports.EnhancedTableToolbar = function (_Component) {
  (0, _inherits3.default)(EnhancedTableToolbar, _Component);

  function EnhancedTableToolbar() {
    (0, _classCallCheck3.default)(this, EnhancedTableToolbar);
    return (0, _possibleConstructorReturn3.default)(this, (EnhancedTableToolbar.__proto__ || (0, _getPrototypeOf2.default)(EnhancedTableToolbar)).apply(this, arguments));
  }

  (0, _createClass3.default)(EnhancedTableToolbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          numSelected = _props.numSelected,
          classes = _props.classes,
          title = _props.title;


      return (0, _jsx3.default)(_Toolbar2.default, {
        className: [classes.root, numSelected > 0 ? classes.highlight : null].join(" ")
      }, void 0, (0, _jsx3.default)('div', {
        className: classes.title
      }, void 0, numSelected > 0 ? (0, _jsx3.default)(_Typography2.default, {
        type: 'subheading'
      }, void 0, numSelected, ' selected') : (0, _jsx3.default)(_Typography2.default, {
        type: 'title'
      }, void 0, title)), (0, _jsx3.default)('div', {
        className: classes.spacer
      }), (0, _jsx3.default)('div', {
        className: classes.actions
      }, void 0, numSelected > 0 ? _ref : _ref2));
    }
  }]);
  return EnhancedTableToolbar;
}(_react.Component);

exports.default = (0, _styles.withStyles)(toolbarStyles)(EnhancedTableToolbar);