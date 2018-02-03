'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Grid = require('material-ui/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _ModeEdit = require('material-ui-icons/ModeEdit');

var _ModeEdit2 = _interopRequireDefault(_ModeEdit);

var _Restore = require('material-ui-icons/Restore');

var _Restore2 = _interopRequireDefault(_Restore);

var _Save = require('material-ui-icons/Save');

var _Save2 = _interopRequireDefault(_Save);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref3 = _jsx(_Restore2.default, {});

var _ref4 = _jsx(_ModeEdit2.default, {});

var EditableView = function (_View) {
  _inherits(EditableView, _View);

  function EditableView(props) {
    _classCallCheck(this, EditableView);

    var _this = _possibleConstructorReturn(this, (EditableView.__proto__ || Object.getPrototypeOf(EditableView)).call(this, props));

    _this.state = {
      inEditMode: false,
      _dirty: null,
      notifications: []
    };

    return _this;
  }

  _createClass(EditableView, [{
    key: 'startEdit',
    value: function startEdit() {

      this.setState({
        inEditMode: true
      });
    }
  }, {
    key: 'resetEdit',
    value: function resetEdit() {

      this.setState({
        inEditMode: false,
        _dirty: null
      });
    }
  }, {
    key: 'save',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var _dirty, result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _dirty = this.state._dirty;

                // const result = await saveObject(_dirty);

                // console.log("EditView result", result);


                _context.next = 3;
                return this.saveObject(_dirty).then(function (r) {

                  _this2.setState({
                    _dirty: null,
                    inEditMode: false,
                    errors: null
                  });

                  return r;
                }).catch(function (e) {
                  console.error(e);
                });

              case 3:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: 'saveObject',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(data) {
        var _props, object, saveObject, mutate, id;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _props = this.props, object = _props.object, saveObject = _props.saveObject;

                if (!saveObject) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return', saveObject(data));

              case 3:

                console.log("saveObject data", data);

                mutate = this.props.mutate;
                id = object.id;
                return _context2.abrupt('return', mutate({
                  variables: {
                    id: id,
                    data: data
                  }
                }));

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveObject(_x) {
        return _ref2.apply(this, arguments);
      }

      return saveObject;
    }()
  }, {
    key: 'isInEditMode',
    value: function isInEditMode() {
      var _state = this.state,
          inEditMode = _state.inEditMode,
          _dirty = _state._dirty;


      return inEditMode || _dirty ? true : false;
    }
  }, {
    key: 'isDirty',
    value: function isDirty() {

      return this.state._dirty ? true : false;
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;


      this.updateObject(_defineProperty({}, name, value));
    }
  }, {
    key: 'updateObject',
    value: function updateObject(data) {
      var _state$_dirty = this.state._dirty,
          _dirty = _state$_dirty === undefined ? {} : _state$_dirty;

      this.setState({
        _dirty: Object.assign(_extends({}, _dirty), data)
      });
    }
  }, {
    key: 'getEditor',
    value: function getEditor(props) {
      var _this3 = this;

      var Editor = props.Editor,
          name = props.name,
          other = _objectWithoutProperties(props, ['Editor', 'name']);

      var object = this.getObjectWithMutations();

      if (!object) {
        return null;
      }

      var value = object[name] || "";

      // console.log("Editor", Editor, props);

      // return null;

      return Editor && _react2.default.createElement(Editor, _extends({
        onChange: function onChange(event) {
          _this3.onChange(event);
        },
        name: name,
        value: value,
        style: {
          width: "100%"
        }
      }, other)) || null;
    }
  }, {
    key: 'getTextField',
    value: function getTextField() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      props = Object.assign({
        Editor: _TextField2.default
      }, props);

      return this.getEditor(props);
    }
  }, {
    key: 'getObjectWithMutations',
    value: function getObjectWithMutations() {
      var object = this.props.object;


      if (!object) {
        return object;
      }

      var _dirty = this.state._dirty;


      if (_dirty) {

        var draftObject = _extends({}, object);

        return Object.assign(draftObject, _dirty);
      } else {
        return object;
      }
    }
  }, {
    key: 'getButtons',
    value: function getButtons() {
      var _this4 = this;

      var inEditMode = this.isInEditMode();

      var isDirty = this.isDirty();

      var buttons = [];

      if (this.canEdit()) {

        if (inEditMode) {

          buttons.push(_jsx(_IconButton2.default, {
            onClick: function onClick(event) {
              _this4.resetEdit();
            }
          }, 'reset', _ref3));

          if (isDirty) {

            buttons.push(_jsx(_IconButton2.default, {
              onClick: function onClick(event) {
                _this4.save();
              }
            }, 'save', _jsx(_Save2.default, {
              style: {
                color: "red"
              }
            })));
          }
        } else {
          buttons.push(_jsx(_IconButton2.default, {
            onClick: function onClick(event) {
              _this4.startEdit();
            }
          }, 'edit', _ref4));
        }
      }

      return buttons && buttons.length ? buttons : null;
    }
  }, {
    key: 'canEdit',
    value: function canEdit() {

      return false;
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {

      // const {
      //   object,
      // } = this.props;

      var object = this.getObjectWithMutations();

      var name = object.name;


      return name;
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {

      return _jsx(_Typography2.default, {
        type: 'title'
      }, void 0, this.getTitle(), this.getButtons());
    }
  }, {
    key: 'renderDefaultView',
    value: function renderDefaultView() {

      return null;
    }
  }, {
    key: 'renderEditableView',
    value: function renderEditableView() {

      return null;
    }
  }, {
    key: 'addError',
    value: function addError(error) {
      var _this5 = this;

      var _state$notifications = this.state.notifications,
          notifications = _state$notifications === undefined ? [] : _state$notifications;


      notifications.push(error);

      setTimeout(function () {
        var notifications = _this5.state.notifications;


        if (notifications) {

          var index = notifications.indexOf(error);

          if (index !== -1) {

            notifications.splice(index, 1);

            _this5.setState({
              notifications: notifications
            });
          }
        }
      }, 5000);

      this.setState({
        notifications: notifications
      });
    }
  }, {
    key: 'renderErrors',
    value: function renderErrors() {
      var notifications = this.state.notifications;


      if (notifications && notifications.length) {

        return _jsx('div', {}, void 0, notifications.map(function (error, index) {

          return _jsx('p', {
            style: {
              color: 'red'
            }
          }, index, error);
        }));
      } else {
        return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var object = this.props.object;


      if (!object) {
        return null;
      }

      var draftObject = this.getObjectWithMutations();

      var inEditMode = this.isInEditMode();

      var defaultView = void 0;
      var editView = void 0;

      var isDirty = this.isDirty();

      var content = void 0;

      if (inEditMode) {

        content = this.renderEditableView();
      } else {

        content = this.renderDefaultView();
      }

      return _jsx('div', {}, void 0, this.renderHeader(), this.renderErrors(), content);
    }
  }]);

  return EditableView;
}(_2.default);

EditableView.propTypes = {
  object: _propTypes2.default.object.isRequired,
  saveObject: _propTypes2.default.func,
  mutate: _propTypes2.default.func.isRequired,
  refetch: _propTypes2.default.func.isRequired
};
EditableView.contextTypes = {
  user: _propTypes2.default.object
};
exports.default = EditableView;