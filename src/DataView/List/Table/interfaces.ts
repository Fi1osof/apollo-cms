import {
  PrismaCmsComponentProps,
  // PrismaCmsComponentPropsData,
  PrismaCmsComponentState,
} from '@prisma-cms/component'
import { Padding } from 'material-ui/Table'
import TBody from './Body'
import EnhancedTableHead from './Header'
import { EnhancedTableToolbar } from './Toolbar'

// import { Exact, Maybe } from 'src/modules/gql/generated'

// export type Column<P extends Record<string, any> = Record<string, any>> = {
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

// export type ColumnConfig<P = Record<string, unknown>> = Column<P>

// export interface TableViewQueryFragment extends Record<string, any> {
//   id: string | null
// }

/**
 * Нельзя расширять интерфейс, так как тогда будет требовать на вход расширенный
 * от него же
 */
// export type ColumnConfig<P extends TableViewQueryFragment = any > = Column<P>
export type ColumnConfig<P = any> = Column<P>

interface Variables extends Record<string, any> {
  first?: number | null
}

// export interface TableViewPropsData extends PrismaCmsComponentPropsData {

export interface TableViewPropsData {
  objectsConnection?: {
    edges: Array<{ node: Record<string, any> } | null>
    aggregate: {
      count: number
    }
  }
  objects?: Record<string, any>[]
}

export interface TableViewProps extends PrismaCmsComponentProps {
  columnData?: ColumnConfig[]

  data: TableViewPropsData | null | undefined
  // data: {
  //   objectsConnection?: {
  //     edges: Array<{node: Record<string, any>} | null>
  //     aggregate: {
  //       count: number
  //     }
  //   }
  //   objects?: Record<string, any>[]
  //   object?: PrismaCmsComponentPropsDataObject | null
  // };

  loading: boolean

  // page: number

  // withPagination?: boolean

  // data:
  // | {
  //   objectsConnection: any
  // }
  // | null
  // | undefined

  variables?: Variables

  classes?: Record<string, string>

  className?: string

  title?: string

  Header?: typeof EnhancedTableHead
  // Header: React.FC;

  Toolbar?: EnhancedTableToolbar

  Body?: typeof TBody

  addObject?: () => void
}

export interface TableViewState extends PrismaCmsComponentState {
  columnData: TableViewProps['columnData']
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
