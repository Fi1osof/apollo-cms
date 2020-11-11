declare module '@prisma-cms/component' {
  import { PrismaCmsContext } from 'src/pages/_App/interfaces'
  import React from 'react'

  export interface PrismaCmsComponentProps {}

  export interface PrismaCmsComponentState {
    inRequest: boolean

    errors: any[]

    locales: any
  }

  export default class PrismaCmsComponent<
    P extends PrismaCmsComponentProps = PrismaCmsComponentProps,
    S extends PrismaCmsComponentState = PrismaCmsComponentState
  > extends React.PureComponent<P, S> {
    static propTypes: any

    static defaultProps: any

    context!: PrismaCmsContext

    lexicon(word: string, options?: Record<string, any>): any

    mutate(arg0: () => any): any

    renderField(arg0: Record<string, any>): React.Element | null

    getFilters(): Record<string, any> | null | undefined
    setFilters(data: Record<string, any> | null | undefined): void
    cleanFilters(): void

    addError(arg0: string | Error): void

    render(arg0?: React.ReactNode | null): React.Element | null

    getObject(): any | null

    onChange(event: React.ChangeEvent): void
    onChangeBind = this.onChange.bind

    onFocus(event: React.FocusEvent): void
    onFocusBind = this.onFocus.bind

    canEdit: () => boolean

    renderErrors: () => JSX.Element[] | null
  }
}
