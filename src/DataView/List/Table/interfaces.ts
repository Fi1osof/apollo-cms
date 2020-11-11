import {
  PrismaCmsComponentProps,
  PrismaCmsComponentState,
} from '@prisma-cms/component'
import { ApolloQueryResult } from 'apollo-client'
import { Padding } from 'material-ui/Table'
import { Exact } from 'src/interfaces'
import TBody from './Body'
import EnhancedTableHead from './Header'
import { EnhancedTableToolbar } from './Toolbar'

// import { Exact, Maybe } from 'src/modules/gql/generated'

export type Column<P> = {
  /**
   * Любое из полей полученного из запроса объекта
   */
  id: keyof P

  key?: string

  /**
   * Заголовок колонки
   */
  label?: string

  description?: string

  className?: string

  renderer?(value: any, record: P): any

  hidden?: boolean

  numeric?: boolean

  padding?: Padding

  disablePadding?: boolean
}

export type ColumnConfig<P = Record<string, unknown>> = Column<P>

export interface TableViewProps
  extends PrismaCmsComponentProps,
    ApolloQueryResult<{
      objectsConnection?: {
        edges: Record<string, any>[]
      }
      objects?: Record<string, any>[]
    }> {
  columnData?: ColumnConfig[]

  page: number

  withPagination?: boolean

  // data:
  // | {
  //   objectsConnection: any
  // }
  // | null
  // | undefined

  variables?: Exact<{
    first?: number | null
  }>

  classes: Record<string, string>

  className?: string

  title?: string

  Header: typeof EnhancedTableHead
  // Header: React.FC;

  Toolbar: EnhancedTableToolbar

  Body: typeof TBody

  addObject?: () => void
}

export interface TableViewState extends PrismaCmsComponentState {
  columnData?: TableViewProps['columnData']
}

// export class TableView<
//   P extends TableViewProps = TableViewProps,
//   S extends TableViewState = TableViewState
//   > extends PrismaCmsComponent<P, S> {
//   static defaultProps = {
//     columnData: [],
//   }

//   mutate(arg0: any): void
// }

// export const styles: any = {}
