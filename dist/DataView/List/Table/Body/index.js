'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Table = require('material-ui/Table');

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { withStyles } from 'material-ui/styles';

var TBody = function (_Component) {
  _inherits(TBody, _Component);

  function TBody() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TBody);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TBody.__proto__ || Object.getPrototypeOf(TBody)).call.apply(_ref, [this].concat(args))), _this), _this.isSelected = function (id) {
      var isSelected = _this.props.isSelected;


      return isSelected(id);
    }, _this.handleClick = function (event, id) {
      var handleClick = _this.props.handleClick;


      return handleClick ? handleClick(event, id) : false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TBody, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          onRowSelect = _props.onRowSelect,
          columnData = _props.columnData;

      // const emptyRows = 7;


      return _jsx(_Table.TableBody, {}, void 0, data.map(function (n, index) {
        var id = n.id;


        var isSelected = _this2.isSelected(n.id);

        var columns = columnData.map(function (record, index) {
          var fieldName = record.id,
              label = record.label,
              disablePadding = record.disablePadding,
              padding = record.padding,
              numeric = record.numeric,
              renderer = record.renderer,
              other = _objectWithoutProperties(record, ['id', 'label', 'disablePadding', 'padding', 'numeric', 'renderer']);

          var value = n[fieldName];

          return _react2.default.createElement(
            _Table.TableCell,
            _extends({
              key: index,
              padding: disablePadding === true ? "none" : padding
            }, other),
            renderer ? renderer(value, n) : value || ""
          );
        });

        return _jsx(_Table.TableRow, {
          hover: true,
          onClick: function onClick(event) {
            return _this2.handleClick(event, id);
          },
          role: 'checkbox',
          'aria-checked': isSelected,
          tabIndex: -1,
          selected: isSelected
        }, id, _jsx(_Table.TableCell, {
          padding: 'checkbox'
        }, void 0, _jsx(_Checkbox2.default, {
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