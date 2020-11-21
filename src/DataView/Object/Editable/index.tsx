import React, { Fragment } from 'react'

// import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/ModeEdit'
import ResetIcon from 'material-ui-icons/Restore'
import Save from 'material-ui-icons/Save'

import CircularProgress from 'material-ui/Progress/CircularProgress'

// import View from '..'
import PrismaCmsComponent, {
  PrismaCmsComponentError,
} from '@prisma-cms/component'
import {
  EditableObjectEditorProps,
  EditableObjectMutateProps,
  EditableObjectProps,
  EditableObjectState,
  EditableObjectSaveResult,
  EditableObjectProcessorResponse,
} from './interfaces'

export * from './interfaces'

const SaveIcon: React.ComponentType = () => {
  return (
    <Save
      style={{
        color: 'red',
      }}
    />
  )
}

export class EditableObject<
  P extends EditableObjectProps = EditableObjectProps,
  S extends EditableObjectState = EditableObjectState
  > extends PrismaCmsComponent<P, S> {
  // static propTypes = {
  //   ...View.propTypes,

  //   mutate: PropTypes.func,
  //   mutation: PropTypes.object,
  //   _dirty: PropTypes.object,
  //   errorDelay: PropTypes.number.isRequired,
  //   SaveIcon: PropTypes.func.isRequired,
  //   ResetIcon: PropTypes.func.isRequired,
  //   EditIcon: PropTypes.func.isRequired,
  //   cacheKey: PropTypes.string,
  //   cacheKeyPrefix: PropTypes.string.isRequired,
  // }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    errorDelay: 5000,
    SaveIcon,
    ResetIcon,
    EditIcon,
    cacheKeyPrefix: 'item_',
  }

  constructor(props: P) {
    super(props)

    this.getObjectWithMutations = this.getObjectWithMutations.bind(this)
    this.getMutation = this.getMutation.bind(this)
    this.save = this.save.bind(this)
    this.mutate = this.mutate.bind(this)
    this.startEdit = this.startEdit.bind(this)
    this.updateObject = this.updateObject.bind(this)
    this.getEditor = this.getEditor.bind(this)
    this.inEditMode = this.inEditMode.bind(this)
    this.getButtons = this.getButtons.bind(this)

    this.state = {
      ...this.state,
      inEditMode: false,
      notifications: [],
      loading: false,
    }
  }

  UNSAFE_componentWillMount(): void {
    this.initCache()

    // deprecated
    // super.UNSAFE_componentWillMount && super.UNSAFE_componentWillMount()
  }

  getStorage = () => {
    return this.context.localStorage ?? global.localStorage
  }

  initCache(): void {
    const { _dirty = null } = this.props

    const cache = this.getCache()

    Object.assign(this.state, {
      _dirty:
        _dirty || cache
          ? {
            ..._dirty,
            ...cache,
          }
          : undefined,
    })
  }

  getCacheKey(): string | null | undefined {
    const { cacheKey, cacheKeyPrefix } = this.props

    const id = this.getObject()?.id

    return cacheKey !== undefined
      ? cacheKey
      : id
        ? `${cacheKeyPrefix}${id}`
        : null
  }

  setCache(data: Record<string, any> | null): boolean {
    const localStorage = this.getStorage()

    if (!localStorage) {
      return false
    }

    let cacheData

    const key = this.getCacheKey()

    if (key) {
      if (data) {
        try {
          cacheData = JSON.stringify(data)
        } catch (error) {
          console.error(error)
          return false
        }
        localStorage.setItem(key, cacheData)
      } else {
        localStorage.removeItem(key)
      }
    }

    return true
  }

  getCache(): Record<string, any> | null | undefined {
    const localStorage = this.getStorage()

    let cacheData

    const key = this.getCacheKey()

    if (key && localStorage) {
      try {
        cacheData = localStorage.getItem(key)

        if (cacheData) {
          cacheData = JSON.parse(cacheData)
        }
      } catch (error) {
        console.error(error)
        return
      }
    }

    return cacheData
  }

  clearCache(): void {
    const localStorage = this.getStorage()

    const key = this.getCacheKey()

    if (key && localStorage) {
      localStorage.removeItem(key)
    }
  }

  onSave = (result: EditableObjectSaveResult): (() => void) => {
    // let callback = () => undefined

    const { onSave } = this.props

    const callback = async () => {

      await this.resetStore()

      if (onSave) {
        onSave(result)
      }

      return undefined
    }

    return callback
  }

  async save(): Promise<EditableObjectSaveResult | Error> {
    const { _dirty } = this.state

    return await this.saveObject(_dirty)
      .then((result: EditableObjectSaveResult) => {
        if (result && !(result instanceof Error)) {
          this.clearCache()

          this.setState(
            {
              _dirty: null,
              inEditMode: false,
            },
            this.onSave(result)
          )
        }

        return result
      })
      .catch((error: Error) => {
        console.error('Save error', error)

        return error
      })
  }

  async saveObject(data: P['_dirty']): Promise<EditableObjectSaveResult> {
    const options = this.getMutation(data)

    return this.mutate(options)
  }

  async mutate(
    props: EditableObjectMutateProps
  ): Promise<EditableObjectSaveResult> {
    const { loading } = this.state

    // const { client } = this.context

    if (loading) {
      return
    }

    const { mutate: mutateProp, mutation } = {
      ...this.props,
      ...props,
    }

    let mutate = mutateProp

    return new Promise((resolve, reject) => {
      if (props && mutation && !props.mutation) {
        props.mutation = mutation
      }

      if (!mutate) {
        const { client } = this.context

        mutate = client.mutate
      }

      if (!mutate) {
        throw new Error('Mutate is not defined')
      }

      this.setState(
        {
          loading: true,
        },
        async () => {
          const newState = {
            loading: false,
          }

          let result: EditableObjectSaveResult

          if (mutate) {
            result = await mutate(props)
              .then(async (result) => {
                if (!(result instanceof Error)) {
                  // const { data: resultData } = result || {}

                  // const { response } = resultData || {}

                  const resultData: EditableObjectProcessorResponse =
                    result?.data

                  const response = resultData.response

                  // const { success: successProp, message, errors = null } = response;

                  let success = response?.success
                  const message = response?.message
                  const errors =
                    response?.errors?.map(({ key, message, ...other }) => {
                      const error: PrismaCmsComponentError = new Error(message)

                      /**
                       * For Fields compability
                       */
                      Object.assign(error, {
                        key,
                        name: key,
                        ...other,
                      })

                      return error
                    }) ?? []

                  Object.assign(newState, {
                    errors,
                  })

                  if (success === undefined) {
                    success = true
                  }

                  if (!success) {
                    this.addError(message || 'Request error')

                    return reject(result)
                  }
                  // else {
                  //   await this.resetStore()
                  // }
                }

                return result
              })
              .catch((error) => {
                const message =
                  (error.message &&
                    error.message.replace(/^GraphQL error: */, '')) ||
                  ''

                this.addError(message)

                return error
              })
          }

          this.setState(newState, () => {
            return resolve(result)
          })

          return
        }
      )
    })
  }

  resetStore = async (): Promise<void> => {
    const { apiClientResetStore } = this.context

    if (apiClientResetStore) {
      return apiClientResetStore.call(this)
    } else {
      const { client } = this.context

      if (!client.queryManager.fetchQueryRejectFns.size) {
        await client.resetStore().catch(console.error)
      }
    }
  }

  getMutation(data: EditableObjectMutateProps): EditableObjectMutateProps {
    const variables = this.getMutationVariables(data)

    return {
      variables,
    }
  }

  getMutationVariables(
    data: EditableObjectMutateProps
  ): EditableObjectMutateProps {
    const object = this.getObjectWithMutations()

    const id = object?.id

    const where = id ? { id } : undefined

    return {
      where,
      data,
    }
  }

  startEdit(): void {
    this.setState({
      inEditMode: true,
    })
  }

  resetEdit = (): Promise<void> => {
    return new Promise((resolve) => {
      this.clearCache()

      this.setState(
        {
          inEditMode: false,
          _dirty: null,
        },
        resolve
      )
    })
  }

  inEditMode(): boolean {
    const { inEditMode, _dirty } = this.state

    return inEditMode || _dirty ? true : false
  }

  isDirty(): boolean {
    return this.state._dirty ? true : false
  }

  updateObject(data: P['_dirty']): void {
    const { _dirty = {} } = this.state

    const localStorage = this.getStorage()

    const newData = Object.assign({ ..._dirty }, data)

    const key = this.getCacheKey()

    if (key && newData && localStorage) {
      localStorage.setItem(this.getCacheKey(), JSON.stringify(newData))
    }

    /**
     * Переделал, так как ТС ругался на ридонли,
     * но надо будет понаблюдать. Ранее так делалось, чтобы получить изменения
     * в стейте сразу же. Вероятно надо будет как-то вернуть.
     */
    // this.state._dirty = newData
    // this.forceUpdate()

    this.setState({
      _dirty: newData,
    })
  }

  getEditor(props: EditableObjectEditorProps): React.ReactNode {
    const {
      Editor = TextField,
      name,
      helperText,
      onFocus,
      fullWidth = true,
      label,
      ...other
    } = props

    const object = this.getObjectWithMutations()

    if (!object) {
      return null
    }

    const value = object[name] || ''

    const errors = this.state.errors

    // const error = errors ? errors.find((n) => n.key === name) : ''
    const error = errors ? errors.find((n) => n.name === name) : ''

    const helperTextMessage = (error && error.message) || helperText

    return Editor ? (
      <Editor
        onChange={this.onChangeBind}
        name={name}
        value={value}
        style={
          fullWidth
            ? {
              width: '100%',
            }
            : undefined
        }
        label={label ? this.lexicon(label) : label}
        error={error ? true : false}
        helperText={
          helperTextMessage
            ? this.lexicon(helperTextMessage)
            : helperTextMessage
        }
        // onFocus={(event: React.FocusEvent) => {
        //   if (error) {
        //     const index = errors.indexOf(error)
        //     if (index !== -1) {
        //       errors.splice(index, 1)
        //       this.setState({
        //         errors,
        //       })
        //     }
        //   }

        //   return onFocus ? onFocus(event) : null
        // }}
        fullWidth={fullWidth}
        {...other}
        // TODO: call both onFocus and this.onFocusBind
        onFocus={onFocus || this.onFocusBind}
      />
    ) : null
  }

  getTextField(
    props: EditableObjectEditorProps = { name: '', Editor: TextField }
  ): React.ReactNode {
    props = {
      Editor: TextField,
      autoComplete: 'off',
      ...props,
    }
    return this.getEditor(props)
  }

  // TODO add generic
  // getObjectWithMutations(): Partial<P["object"]> | null | undefined {
  getObjectWithMutations() {
    const object = this.getObject()

    // if (!object) {
    //   return object
    // }

    const { _dirty } = this.state

    if (_dirty) {
      const draftObject: typeof object = { ...object }

      return Object.assign(draftObject, _dirty)
    } else {
      return object
    }
  }

  getButtons(): Array<React.ReactNode> {
    const inEditMode = this.inEditMode()

    const isDirty = this.isDirty()

    const buttons = []

    if (this.canEdit()) {
      if (inEditMode) {
        buttons.push(this.renderResetButton())

        if (isDirty) {
          buttons.push(this.renderSaveButton())
        }
      } else {
        buttons.push(this.renderEditButton())
      }
    }

    return buttons
  }

  renderResetButton(): React.ReactNode {
    const ResetIcon = this.props.ResetIcon as
      | React.ElementType
      | null
      | undefined

    return ResetIcon ? (
      <IconButton key="reset" onClick={this.resetEdit}>
        <ResetIcon />
      </IconButton>
    ) : null
  }

  renderSaveButton(): React.ReactNode {
    const SaveIcon = this.props.SaveIcon as React.ElementType | null | undefined

    const { loading } = this.state

    return (
      <IconButton key="save" onClick={this.save} disabled={loading}>
        {loading ? <CircularProgress /> : SaveIcon ? <SaveIcon /> : null}
      </IconButton>
    )
  }

  renderEditButton(): React.ReactNode {
    const EditIcon = this.props.EditIcon as React.ElementType | null | undefined

    return EditIcon ? (
      <IconButton key="edit" onClick={this.startEdit}>
        <EditIcon />
      </IconButton>
    ) : null
  }

  getTitle() {
    return this.getObjectWithMutations()?.name
  }

  renderHeader(): React.ReactNode {
    return (
      <Typography variant="title">
        {this.getTitle()}

        {this.getButtons()}
      </Typography>
    )
  }

  renderEmpty(): React.ReactNode {
    return null
  }

  renderDefaultView(): React.ReactNode {
    return null
  }

  renderEditableView(): React.ReactNode {
    return null
  }

  closeError(error: Record<string, any>): void {
    Object.assign(error, {
      open: false,
    })

    this.forceUpdate()
  }


  // TODO: Move in @prisma-cms/component with checking _dirty
  canEdit() {
    const object = this.getObjectWithMutations() ?? null

    if (object) {
      const { id: objectId, CreatedBy } = object

      const { id: currentUserId, sudo } = this.getCurrentUser() || {}

      const { id: createdById } = CreatedBy || {}

      if (objectId) {
        if (sudo || (createdById && createdById === currentUserId)) {
          return true
        }
      } else {
        return true
      }
    }

    return false
  }


  render(): React.ReactNode {
    const { loading } = this.props

    let output = null

    // const object = this.getObject()
    const object = this.getObjectWithMutations()

    if (!object) {
      if (loading) {
        return null
      } else {
        output = this.renderEmpty()
      }
    } else {
      const inEditMode = this.canEdit() && this.inEditMode()

      let content = null

      if (inEditMode) {
        content = this.renderEditableView()
      } else {
        content = this.renderDefaultView()
      }

      output = (
        <Fragment>
          {this.renderHeader()}

          {content}
        </Fragment>
      )
    }

    return (
      <Fragment>
        {output}

        {this.renderErrors()}
      </Fragment>
    )
  }
}

/**
 * For backward compatibility
 */
export const EditableView = EditableObject

export default EditableObject
