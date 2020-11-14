import {
  PrismaCmsComponentProps,
  // PrismaCmsComponentPropsData,
  PrismaCmsComponentState,
} from '@prisma-cms/component'
// import { ApolloQueryResult } from 'apollo-client';
// import { QueryResult } from 'react-apollo'

export interface EditableObjectPropsDataObject extends Record<string, any> {}

export interface EditableObjectProcessorResponse {
  response?: {
    success: boolean
    message: string
    errors: Array<{
      key: string
      message: string
    }>
    data: EditableObjectPropsDataObject | null
  }
}

// export type EditableObjectSaveResult = Record<string, any> | boolean | null | number | undefined | Error;

export type EditableObjectSaveResult =
  | {
      data: EditableObjectProcessorResponse | undefined | null
    }
  | undefined
  | Error

export type EditableObject_Dirty = Record<string, any> | null

// export type EditableObjectPropsDataObject = Record<string, any> | null

// export interface EditableObjectPropsData extends PrismaCmsComponentPropsData {
// }

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

  // data: EditableObjectPropsData | null | undefined
  object: EditableObjectPropsDataObject | null | undefined

  mutate?(arg0: any): Promise<EditableObjectSaveResult | Record<string, any>>
  // mutation: MutationFn<EditableObjectSaveResult>;

  /**
   * gql`[query]`
   */
  mutation?: Record<string, any>

  _dirty?: EditableObject_Dirty

  cacheKey?: string

  cacheKeyPrefix?: string

  onSave?(result: EditableObjectSaveResult): void

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
