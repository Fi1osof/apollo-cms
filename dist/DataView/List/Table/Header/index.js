'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Table = require('material-ui/Table');

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Tooltip = require('material-ui/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnhancedTableHead = function (_Component) {
  (0, _inherits3.default)(EnhancedTableHead, _Component);

  function EnhancedTableHead() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, EnhancedTableHead);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EnhancedTableHead.__proto__ || (0, _getPrototypeOf2.default)(EnhancedTableHead)).call.apply(_ref, [this].concat(args))), _this), _this.createSortHandler = function (property) {
      return function (event) {
        _this.props.onRequestSort(event, property);
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(EnhancedTableHead, [{
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


      return (0, _jsx3.default)(_Table.TableHead, {}, void 0, (0, _jsx3.default)(_Table.TableRow, {}, void 0, (0, _jsx3.default)(_Table.TableCell, {
        padding: 'checkbox'
      }, void 0, (0, _jsx3.default)(_Checkbox2.default, {
        indeterminate: numSelected > 0 && numSelected < rowCount,
        checked: numSelected === rowCount,
        onChange: onSelectAllClick
      })), columnData.map(function (column) {
        return (0, _jsx3.default)(_Table.TableCell, {
          numeric: column.numeric,
          padding: column.disablePadding ? 'none' : 'default',
          sortDirection: orderBy === column.id ? order : false
        }, column.id, (0, _jsx3.default)(_Tooltip2.default, {
          title: 'Sort',
          placement: column.numeric ? 'bottom-end' : 'bottom-start',
          enterDelay: 300
        }, void 0, (0, _jsx3.default)(_Table.TableSortLabel, {
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