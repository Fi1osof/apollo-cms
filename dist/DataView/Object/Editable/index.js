'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

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

// import Grid from 'material-ui/Grid';
var propTypes = (0, _objectWithoutProperties3.default)(_2.default.propTypes, []);


(0, _assign2.default)(propTypes, {
  mutate: _propTypes2.default.func.isRequired
});

var _ref3 = (0, _jsx3.default)(_Restore2.default, {});

var _ref4 = (0, _jsx3.default)(_ModeEdit2.default, {});

var EditableView = function (_View) {
  (0, _inherits3.default)(EditableView, _View);

  function EditableView(props) {
    (0, _classCallCheck3.default)(this, EditableView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EditableView.__proto__ || (0, _getPrototypeOf2.default)(EditableView)).call(this, props));

    _this.state = {
      inEditMode: false,
      _dirty: null,
      notifications: []
    };

    return _this;
  }

  (0, _createClass3.default)(EditableView, [{
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
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this2 = this;

        var _dirty, result;

        return _regenerator2.default.wrap(function _callee$(_context) {
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
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
        var mutate, mutation;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:

                // const {
                //   object,
                //   saveObject,
                // } = this.props;

                // if(saveObject){
                //   return saveObject(data);
                // }

                // console.log("saveObject data", data);

                mutate = this.props.mutate;

                if (mutate) {
                  _context2.next = 3;
                  break;
                }

                throw new Error("Mutate not defined");

              case 3:
                mutation = this.getMutation(data);
                return _context2.abrupt('return', mutate(mutation));

              case 5:
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
    key: 'getMutation',
    value: function getMutation(data) {

      var variables = this.getMutationVariables(data);

      return {
        variables: variables
      };
    }
  }, {
    key: 'getMutationVariables',
    value: function getMutationVariables(data) {

      var object = this.getObjectWithMutations();

      var id = object.id;


      return {
        id: id,
        data: data
      };
    }
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


      this.updateObject((0, _defineProperty3.default)({}, name, value));
    }
  }, {
    key: 'updateObject',
    value: function updateObject(data) {
      var _state$_dirty = this.state._dirty,
          _dirty = _state$_dirty === undefined ? {} : _state$_dirty;

      this.setState({
        _dirty: (0, _assign2.default)((0, _extends3.default)({}, _dirty), data)
      });
    }
  }, {
    key: 'getEditor',
    value: function getEditor(props) {
      var _this3 = this;

      var Editor = props.Editor,
          name = props.name,
          other = (0, _objectWithoutProperties3.default)(props, ['Editor', 'name']);


      var object = this.getObjectWithMutations();

      if (!object) {
        return null;
      }

      var value = object[name] || "";

      // console.log("Editor", Editor, props);

      // return null;

      return Editor ? _react2.default.createElement(Editor, (0, _extends3.default)({
        onChange: function onChange(event) {
          _this3.onChange(event);
        },
        name: name,
        value: value,
        style: {
          width: "100%"
        }
      }, other)) : null;
    }
  }, {
    key: 'getTextField',
    value: function getTextField() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      props = (0, _assign2.default)({
        Editor: _TextField2.default
      }, props);

      return this.getEditor(props);
    }
  }, {
    key: 'getObjectWithMutations',
    value: function getObjectWithMutations() {
      var object = this.props.data.object;


      if (!object) {
        return object;
      }

      var _dirty = this.state._dirty;


      if (_dirty) {

        var draftObject = (0, _extends3.default)({}, object);

        return (0, _assign2.default)(draftObject, _dirty);
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

          buttons.push((0, _jsx3.default)(_IconButton2.default, {
            onClick: function onClick(event) {
              _this4.resetEdit();
            }
          }, 'reset', _ref3));

          if (isDirty) {

            buttons.push((0, _jsx3.default)(_IconButton2.default, {
              onClick: function onClick(event) {
                _this4.save();
              }
            }, 'save', (0, _jsx3.default)(_Save2.default, {
              style: {
                color: "red"
              }
            })));
          }
        } else {
          buttons.push((0, _jsx3.default)(_IconButton2.default, {
            onClick: function onClick(event) {
              _this4.startEdit();
            }
          }, 'edit', _ref4));
        }
      }

      return buttons && buttons.length ? buttons : null;
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

      return (0, _jsx3.default)(_Typography2.default, {
        type: 'title'
      }, void 0, this.getTitle(), this.getButtons());
    }
  }, {
    key: 'renderEmpty',
    value: function renderEmpty() {
      return null;
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

        return (0, _jsx3.default)('div', {}, void 0, notifications.map(function (error, index) {

          return (0, _jsx3.default)('p', {
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
      var data = this.props.data;
      var object = data.object;


      if (!object) {
        return this.renderEmpty();
      }

      // const draftObject = this.getObjectWithMutations();


      var inEditMode = this.isInEditMode();

      // let defaultView;
      // let editView;

      // const isDirty = this.isDirty();


      var content = void 0;

      if (inEditMode) {

        content = this.renderEditableView();
      } else {

        content = this.renderDefaultView();
      }

      return (0, _jsx3.default)('div', {}, void 0, this.renderHeader(), this.renderErrors(), content);
    }
  }]);
  return EditableView;
}(_2.default);

EditableView.propTypes = propTypes;
exports.default = EditableView;