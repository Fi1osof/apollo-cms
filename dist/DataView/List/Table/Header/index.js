'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Table = require('material-ui/Table');

var _Table2 = _interopRequireDefault(_Table);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Tooltip = require('material-ui/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnhancedTableHead = function (_Component) {
  _inherits(EnhancedTableHead, _Component);

  function EnhancedTableHead() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EnhancedTableHead);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EnhancedTableHead.__proto__ || Object.getPrototypeOf(EnhancedTableHead)).call.apply(_ref, [this].concat(args))), _this), _this.createSortHandler = function (property) {
      return function (event) {
        _this.props.onRequestSort(event, property);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EnhancedTableHead, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          onSelectAllClick = _props.onSelectAllClick,
          order = _props.order,
          orderBy = _props.orderBy,
          numSelected = _props.numSelected,
          rowCount = _props.rowCount,
          columnData = _props.columnData;


      return _jsx(_Table.TableHead, {}, void 0, _jsx(_Table.TableRow, {}, void 0, _jsx(_Table.TableCell, {
        padding: 'checkbox'
      }, void 0, _jsx(_Checkbox2.default, {
        indeterminate: numSelected > 0 && numSelected < rowCount,
        checked: numSelected === rowCount,
        onChange: onSelectAllClick
      })), columnData.map(function (column) {
        return _jsx(_Table.TableCell, {
          numeric: column.numeric,
          padding: column.disablePadding ? 'none' : 'default',
          sortDirection: orderBy === column.id ? order : false
        }, column.id, _jsx(_Tooltip2.default, {
          title: 'Sort',
          placement: column.numeric ? 'bottom-end' : 'bottom-start',
          enterDelay: 300
        }, void 0, _jsx(_Table.TableSortLabel, {
          active: orderBy === column.id,
          direction: order,
          onClick: _this2.createSortHandler(column.id)
        }, void 0, column.label)));
      }, this)));
    }
  }]);

  return EnhancedTableHead;
}(_react.Component);

EnhancedTableHead.defaultProps = {};
exports.default = EnhancedTableHead;