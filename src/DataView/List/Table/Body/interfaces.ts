import { TableViewProps } from '../interfaces'

export interface TBodyProps {
  data: Record<string, any>[]

  columnData: TableViewProps['columnData']
}
