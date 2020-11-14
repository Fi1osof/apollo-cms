import {
  PrismaCmsComponentProps,
  PrismaCmsComponentPropsData,
  PrismaCmsComponentState,
} from '@prisma-cms/component'
// import { ApolloQueryResult } from 'apollo-client';
// import { QueryResult } from 'react-apollo'

export interface ProcessorResponse {
  response?: {
    success: boolean
    message: string
    errors: Array<{
      key: string
      message: string
    }>
    data: PrismaCmsComponentPropsData
  }
}

// export type saveResult = Record<string, any> | boolean | null | number | undefined | Error;

export type saveResult = {
  data?: ProcessorResponse | undefined | null
} | undefined | Error

export type EditableObject_Dirty = Record<string, any> | null

// export type EditableObjectPropsDataObject = Record<string, any> | null

// export interface EditableObjectPropsData {
//   object?: EditableObjectPropsDataObject
//   data?: {
//     object?: EditableObjectPropsDataObject
//   }
// }

// export interface EditableObjectPropsData {
//   // object: EditableObjectPropsDataObject | null | undefined
//   // data?: {
//   //   object?: EditableObjectPropsDataObject
//   // }
// }

// export interface EditableObjectMutationResult extends ApolloQueryResult<{ object?: EditableObjectPropsDataObject }> {
// }

export interface EditableObjectProps extends PrismaCmsComponentProps {
  loading?: boolean

  // data: EditableObjectPropsData
  // object?: EditableObjectPropsDataObject

  mutate?(arg0: any): Promise<saveResult | Record<string, any>>
  // mutation: MutationFn<saveResult>;

  /**
   * gql`[query]`
   */
  mutation?: Record<string, any>

  _dirty?: EditableObject_Dirty

  cacheKey?: string

  cacheKeyPrefix?: string

  onSave? (result: saveResult): void

  ResetIcon?: React.ElementType
  SaveIcon?: React.ElementType
  EditIcon?: React.ElementType
}

export interface EditableObjectState extends PrismaCmsComponentState {
  _dirty: EditableObject_Dirty

  inEditMode: boolean

  loading: boolean
}

export type EditableObjectMutateProps = EditableObjectProps['_dirty']

// export interface EditableObjectEditorProps extends Record<string, any> {
export interface EditableObjectEditorProps {
  Editor?: React.ElementType

  name: string

  helperText?: string

  onFocus?(event: React.FocusEvent): void

  fullWidth?: boolean

  label?: string

  autoComplete?: 'on' | 'off'
}
