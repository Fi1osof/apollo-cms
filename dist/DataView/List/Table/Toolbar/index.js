'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnhancedTableToolbar = undefined;

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var _ref = _jsx(_Tooltip2.default, {
  title: 'Delete'
}, void 0, _jsx(_IconButton2.default, {
  'aria-label': 'Delete'
}, void 0, _jsx(_Delete2.default, {})));

var _ref2 = _jsx(_Tooltip2.default, {
  title: 'Filter list'
}, void 0, _jsx(_IconButton2.default, {
  'aria-label': 'Filter list'
}, void 0, _jsx(_FilterList2.default, {})));

var EnhancedTableToolbar = exports.EnhancedTableToolbar = function (_Component) {
  _inherits(EnhancedTableToolbar, _Component);

  function EnhancedTableToolbar() {
    _classCallCheck(this, EnhancedTableToolbar);

    return _possibleConstructorReturn(this, (EnhancedTableToolbar.__proto__ || Object.getPrototypeOf(EnhancedTableToolbar)).apply(this, arguments));
  }

  _createClass(EnhancedTableToolbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          numSelected = _props.numSelected,
          classes = _props.classes,
          title = _props.title;


      return _jsx(_Toolbar2.default, {
        className: [classes.root, numSelected > 0 ? classes.highlight : null].join(" ")
      }, void 0, _jsx('div', {
        className: classes.title
      }, void 0, numSelected > 0 ? _jsx(_Typography2.default, {
        type: 'subheading'
      }, void 0, numSelected, ' selected') : _jsx(_Typography2.default, {
        type: 'title'
      }, void 0, title)), _jsx('div', {
        className: classes.spacer
      }), _jsx('div', {
        className: classes.actions
      }, void 0, numSelected > 0 ? _ref : _ref2));
    }
  }]);

  return EnhancedTableToolbar;
}(_react.Component);

exports.default = (0, _styles.withStyles)(toolbarStyles)(EnhancedTableToolbar);