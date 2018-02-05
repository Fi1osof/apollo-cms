'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { withStyles } from 'material-ui/styles';

var TBody = function (_Component) {
  (0, _inherits3.default)(TBody, _Component);

  function TBody() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TBody);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TBody.__proto__ || (0, _getPrototypeOf2.default)(TBody)).call.apply(_ref, [this].concat(args))), _this), _this.isSelected = function (id) {
      var isSelected = _this.props.isSelected;


      return isSelected(id);
    }, _this.handleClick = function (event, id) {
      var handleClick = _this.props.handleClick;


      return handleClick ? handleClick(event, id) : false;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TBody, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          onRowSelect = _props.onRowSelect,
          columnData = _props.columnData;

      // const emptyRows = 7;


      return (0, _jsx3.default)(_Table.TableBody, {}, void 0, data.map(function (n, index) {
        var id = n.id;


        var isSelected = _this2.isSelected(n.id);

        var columns = columnData.map(function (record, index) {
          var fieldName = record.id,
              label = record.label,
              disablePadding = record.disablePadding,
              padding = record.padding,
              numeric = record.numeric,
              renderer = record.renderer,
              other = (0, _objectWithoutProperties3.default)(record, ['id', 'label', 'disablePadding', 'padding', 'numeric', 'renderer']);


          var value = n[fieldName];

          return _react2.default.createElement(
            _Table.TableCell,
            (0, _extends3.default)({
              key: index,
              padding: disablePadding === true ? "none" : padding
            }, other),
            renderer ? renderer(value, n) : value || ""
          );
        });

        return (0, _jsx3.default)(_Table.TableRow, {
          hover: true,
          onClick: function onClick(event) {
            return _this2.handleClick(event, id);
          },
          role: 'checkbox',
          'aria-checked': isSelected,
          tabIndex: -1,
          selected: isSelected
        }, id, (0, _jsx3.default)(_Table.TableCell, {
          padding: 'checkbox'
        }, void 0, (0, _jsx3.default)(_Checkbox2.default, {
          checked: isSelected,
          onChange: function onChange(event) {
            onRowSelect(event, id);
          },
          onClick: function onClick(event) {
            event.stopPropagation();
          }
        })), columns);
      }));
    }
  }]);
  return TBody;
}(_react.Component);

exports.default = TBody;