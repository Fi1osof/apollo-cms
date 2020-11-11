import { TableViewProps } from '../../interfaces'

export interface TableViewChoseColumnsProps {
  columnData: TableViewProps['columnData']

  toggleColumnVisibility(
    _event: React.MouseEvent,
    checked: boolean,
    index: number
  ): void
}

export interface TableViewChoseColumnsState {
  anchorEl: HTMLElement | undefined
}
