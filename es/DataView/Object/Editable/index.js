import _regeneratorRuntime from 'babel-runtime/regenerator';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
// import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import EditIcon from 'material-ui-icons/ModeEdit';
import ResetIcon from 'material-ui-icons/Restore';
import SaveIcon from 'material-ui-icons/Save';

import View from '../';

var propTypes = _objectWithoutProperties(View.propTypes, []);

Object.assign(propTypes, {
  mutate: PropTypes.func.isRequired
});

var EditableView = (_temp = _class = function (_View) {
  _inherits(EditableView, _View);

  function EditableView(props) {
    _classCallCheck(this, EditableView);

    var _this = _possibleConstructorReturn(this, _View.call(this, props));

    _this.state = {
      inEditMode: false,
      _dirty: null,
      notifications: []
    };

    return _this;
  }

  EditableView.prototype.startEdit = function startEdit() {

    this.setState({
      inEditMode: true
    });
  };

  EditableView.prototype.resetEdit = function resetEdit() {

    this.setState({
      inEditMode: false,
      _dirty: null
    });
  };

  EditableView.prototype.save = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _this2 = this;

      var _dirty, result;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
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
  }();

  EditableView.prototype.saveObject = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(data) {
      var mutate, mutation;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
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
  }();

  EditableView.prototype.getMutation = function getMutation(data) {

    var variables = this.getMutationVariables(data);

    return {
      variables: variables
    };
  };

  EditableView.prototype.getMutationVariables = function getMutationVariables(data) {

    var object = this.getObjectWithMutations();

    var id = object.id;


    return {
      id: id,
      data: data
    };
  };

  EditableView.prototype.isInEditMode = function isInEditMode() {
    var _state = this.state,
        inEditMode = _state.inEditMode,
        _dirty = _state._dirty;


    return inEditMode || _dirty ? true : false;
  };

  EditableView.prototype.isDirty = function isDirty() {

    return this.state._dirty ? true : false;
  };

  EditableView.prototype.onChange = function onChange(event) {
    var _updateObject;

    var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;


    this.updateObject((_updateObject = {}, _updateObject[name] = value, _updateObject));
  };

  EditableView.prototype.updateObject = function updateObject(data) {
    var _state$_dirty = this.state._dirty,
        _dirty = _state$_dirty === undefined ? {} : _state$_dirty;

    this.setState({
      _dirty: Object.assign(_extends({}, _dirty), data)
    });
  };

  EditableView.prototype.getEditor = function getEditor(props) {
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

    return Editor ? React.createElement(Editor, _extends({
      onChange: function onChange(event) {
        _this3.onChange(event);
      },
      name: name,
      value: value,
      style: {
        width: "100%"
      }
    }, other)) : null;
  };

  EditableView.prototype.getTextField = function getTextField() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    props = Object.assign({
      Editor: TextField
    }, props);

    return this.getEditor(props);
  };

  EditableView.prototype.getObjectWithMutations = function getObjectWithMutations() {
    var object = this.props.data.object;


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
  };

  EditableView.prototype.getButtons = function getButtons() {
    var _this4 = this;

    var inEditMode = this.isInEditMode();

    var isDirty = this.isDirty();

    var buttons = [];

    if (this.canEdit()) {

      if (inEditMode) {

        buttons.push(React.createElement(
          IconButton,
          {
            key: 'reset',
            onClick: function onClick(event) {
              _this4.resetEdit();
            }
          },
          React.createElement(ResetIcon, null)
        ));

        if (isDirty) {

          buttons.push(React.createElement(
            IconButton,
            {
              key: 'save',
              onClick: function onClick(event) {
                _this4.save();
              }
            },
            React.createElement(SaveIcon, {
              style: {
                color: "red"
              }
            })
          ));
        }
      } else {
        buttons.push(React.createElement(
          IconButton,
          {
            key: 'edit',
            onClick: function onClick(event) {
              _this4.startEdit();
            }
          },
          React.createElement(EditIcon, null)
        ));
      }
    }

    return buttons && buttons.length ? buttons : null;
  };

  EditableView.prototype.getTitle = function getTitle() {

    // const {
    //   object,
    // } = this.props;

    var object = this.getObjectWithMutations();

    var name = object.name;


    return name;
  };

  EditableView.prototype.renderHeader = function renderHeader() {

    return React.createElement(
      Typography,
      {
        type: 'title'
      },
      this.getTitle(),
      this.getButtons()
    );
  };

  EditableView.prototype.renderEmpty = function renderEmpty() {
    return null;
  };

  EditableView.prototype.renderDefaultView = function renderDefaultView() {

    return null;
  };

  EditableView.prototype.renderEditableView = function renderEditableView() {

    return null;
  };

  EditableView.prototype.addError = function addError(error) {
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
  };

  EditableView.prototype.renderErrors = function renderErrors() {
    var notifications = this.state.notifications;


    if (notifications && notifications.length) {

      return React.createElement(
        'div',
        null,
        notifications.map(function (error, index) {

          return React.createElement(
            'p',
            {
              key: index,
              style: {
                color: 'red'
              }
            },
            error
          );
        })
      );
    } else {
      return null;
    }
  };

  EditableView.prototype.render = function render() {
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

    return React.createElement(
      'div',
      null,
      this.renderHeader(),
      this.renderErrors(),
      content
    );
  };

  return EditableView;
}(View), _class.propTypes = propTypes, _temp);
export { EditableView as default };