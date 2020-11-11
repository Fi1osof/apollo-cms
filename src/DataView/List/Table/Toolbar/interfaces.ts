import { TableViewChoseColumnsProps } from './ChoseColumns/interfaces'

export interface ToolbarProps extends TableViewChoseColumnsProps {
  classes?: Record<
    'root' | 'title' | 'highlight' | 'spacer' | 'actions',
    string
  >
  // classes: any;

  addObject?: () => void
  // addObject: Requireable<(...args: any[]) => any>;

  title?: string

  filters?: any
}
