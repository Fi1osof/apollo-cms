import React from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField';
// import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import EditIcon from 'material-ui-icons/ModeEdit';
import ResetIcon from 'material-ui-icons/Restore';
import SaveIcon from 'material-ui-icons/Save';

import View from '../';


let {...propTypes} = View.propTypes;

Object.assign(propTypes, {
  mutate: PropTypes.func.isRequired,
});

export default class EditableView extends View {

  static propTypes = propTypes;


  constructor(props){

    super(props);

    this.state = {
      inEditMode: false,
      _dirty: null,
      notifications: [],
    }

  }


  startEdit(){

    this.setState({
      inEditMode: true,
    });

  }

  resetEdit(){

    this.setState({
      inEditMode: false,
      _dirty: null,
    });

  }


  async save(){

    const {
      _dirty,
    } = this.state;


    // const result = await saveObject(_dirty);

    // console.log("EditView result", result);


    const result = await this.saveObject(_dirty)
    .then(r => {

      this.setState({
        _dirty: null,
        inEditMode: false,
        errors: null,
      });

      return r;
    })
    .catch(e => {
      console.error(e);
    });

    return result;

  }


  async saveObject(data){

    // const {
    //   object,
    //   saveObject,
    // } = this.props;

    // if(saveObject){
    //   return saveObject(data);
    // }

    // console.log("saveObject data", data);

    const {
      mutate,
    } = this.props;
        
    if(!mutate){
      throw(new Error("Mutate not defined"));
    }

    const mutation = this.getMutation(data);

    return mutate(mutation);

  }


  getMutation(data){

    const variables = this.getMutationVariables(data);

    return {
      variables,
    }

  }


  getMutationVariables(data){

    const object = this.getObjectWithMutations();
    
    const {
      id,
    } = object;

    return {
      id,
      data,
    };
  }


  isInEditMode(){

    const {
      inEditMode,
      _dirty,
    } = this.state;

    return inEditMode || _dirty ? true : false;

  }


  isDirty(){

    return this.state._dirty ? true : false;

  }


  onChange(event){

    const {
      name,
      value,
    } = event.target;

    this.updateObject({
      [name]: value,
    });

  }


  updateObject(data){

    const {
      _dirty = {},
    } = this.state;

    this.setState({
      _dirty: Object.assign({..._dirty}, data),
    });

  }


  getEditor(props){

    const {
      Editor,
      name,
      ...other
    } = props;


    const object = this.getObjectWithMutations();

    
    if(!object){
      return null;
    }

    const value = object[name] || "";

    // console.log("Editor", Editor, props);

    // return null;

    return Editor ? <Editor
      onChange={event => {
        this.onChange(event);
      }}
      name={name}
      value={value}
      style={{
        width: "100%",
      }}
      {...other}
    /> : null;

  }


  getTextField(props = {}){

    props = Object.assign({
      Editor: TextField,
    }, props);

    return this.getEditor(props);

  }


  getObjectWithMutations(){

    const {
      data: {
        object,
      },
    } = this.props;


    if(!object){
      return object;
    }

    const {
      _dirty,
    } = this.state;

    if(_dirty){

      const draftObject = {...object}

      return Object.assign(draftObject, _dirty);

    }
    else{
      return object;
    }

  }

  
  getButtons(){


    const inEditMode = this.isInEditMode();

    const isDirty = this.isDirty();

    let buttons = [];

    if(this.canEdit()){

      if(inEditMode){

        buttons.push(<IconButton
          key="reset"
          onClick={event => {
            this.resetEdit();
          }}
        >
          <ResetIcon 
          />
        </IconButton>);


        if(isDirty){

          buttons.push(<IconButton
            key="save"
            onClick={event => {
              this.save();
            }}
          >
            <SaveIcon
              style={{
                color: "red",
              }}
            />
          </IconButton>);

        }

      }
      else{
        buttons.push(<IconButton
          key="edit"
          onClick={event => {
            this.startEdit()
          }}
        >
          <EditIcon 
          />
        </IconButton>);
      }

    }

    return buttons && buttons.length ? buttons : null;
  }


  



  getTitle(){
    
    // const {
    //   object,
    // } = this.props;

    const object = this.getObjectWithMutations();
  
    const {
      name,
    } = object;

    return name;

  }


  renderHeader(){
    

    return <Typography
      type="title"
    >
      {this.getTitle()}

      {this.getButtons()}

    </Typography>
  }


  renderEmpty(){
    return null;
  }


  renderDefaultView(){

    return null;

  }


  renderEditableView(){

    return null;
    
  }


  addError(error){

    const {
      notifications = [],
    } = this.state;

    notifications.push(error);

    setTimeout(() => {

      const {
        notifications,
      } = this.state;

      if(notifications){

        const index = notifications.indexOf(error);

        if(index !== -1){

          notifications.splice(index, 1);

          this.setState({
            notifications,
          });

        }

      }

    }, 5000);


    this.setState({
      notifications,
    });

  }


  renderErrors(){

    const {
      notifications,
    } = this.state;

    if(notifications && notifications.length){

      return <div>
        {notifications.map((error, index) => {
          
          return <p
            key={index}
            style={{
              color: 'red',
            }}
          >

            {error}

          </p>

        })}
      </div>

    }
    else{
      return null;
    }

  }


  render() {


    const {
      data,
    } = this.props;

    const {
      object,
    } = data;

    if(!object){
      return this.renderEmpty();
    }

    // const draftObject = this.getObjectWithMutations();

    
    const inEditMode = this.isInEditMode();




    // let defaultView;
    // let editView;

    // const isDirty = this.isDirty();

    

    let content;


    if(inEditMode){

      content = this.renderEditableView();

    }
    else{

      content = this.renderDefaultView();

    }


    return (
      <div>
        
        {this.renderHeader()}

        {this.renderErrors()}

        {content}

      </div>
    )
  }

}
