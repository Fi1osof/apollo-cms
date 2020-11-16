import React from 'react'
// import PropTypes from 'prop-types'
import { withStyles, Theme } from 'material-ui/styles'

import Paper from 'material-ui/Paper'

import TableHeader from './Header'
import Toolbar from './Toolbar'
import Body from './Body'
import { TBodyProps } from './Body/interfaces'

import PrismaCmsComponent from '@prisma-cms/component'
import { ColumnConfig, TableViewProps, TableViewState } from './interfaces'
import { ToolbarProps } from './Toolbar/interfaces'
// import EnhancedTableHead from './Header'

export * from './interfaces'

export const styles = (theme: Theme): Record<string, any> => {
  return {
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    loading: {},
    table: {
      minWidth: 800,
      width: '100%',
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  }
}

export class TableView<
  P extends TableViewProps = TableViewProps,
  S extends TableViewState = TableViewState
> extends PrismaCmsComponent<P, S> {
  // static propTypes = {
  //   ...PrismaCmsComponent.propTypes,
  //   classes: PropTypes.object.isRequired,
  //   columnData: PropTypes.array.isRequired,
  //   data: PropTypes.object.isRequired,
  //   title: PropTypes.string.isRequired,

  //   Header: PropTypes.func.isRequired,
  //   Toolbar: PropTypes.func.isRequired,
  //   Body: PropTypes.func.isRequired,
  //   filters: PropTypes.array,
  // }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    Header: TableHeader,
    Toolbar,
    Body,
    columnData: [],
  }

  state!: S

  constructor(props: P) {
    super(props)

    this.state = {
      ...this.state,
      page: 0,
      rowsPerPage: 5,
    }
  }

  // TODO get type front array
  getColumns(): ColumnConfig[] | undefined {
    return this.state.columnData || this.props.columnData || []
  }

  toggleColumnVisibility = (
    _event: React.MouseEvent,
    checked: boolean,
    index: number
  ): void => {
    const { columnData } = this.state

    const newColumnsData: P['columnData'] = columnData ? [...columnData] : []

    newColumnsData[index].hidden = !checked

    this.setState({
      columnData: newColumnsData,
    })
  }

  renderFilters(): React.ReactNode | null {
    return null
  }

  render(): React.ReactNode {
    // TODO: Сейчас если table не передан, тулбар не прорисовывается.
    // Надо поправить тесты и перепроверить все.

    const {
      classes,
      // data,
      objects,
      title,
      // Header,
      // Toolbar,
      // Body,
      addObject,
      className,
      loading,
      // ...other
    } = this.props

    const Header = this.props.Header as typeof TableHeader
    const Toolbar = (this.props.Toolbar as unknown) as React.FC<ToolbarProps>
    const Body = (this.props.Body as unknown) as React.FC<TBodyProps>

    const columnData = this.getColumns()

    const filters = this.renderFilters()

    // if (!data) {
    //   return null
    // }

    // const objectsConnection = data.objectsConnection
    // const objects = data.objects

    // const edges = objectsConnection?.edges

    // const count = objectsConnection?.aggregate?.count || 0;

    // const rows = (edges && edges.map((n) => n?.node)) || objects || []

    // let rows: any[] = []

    // if (edges) {
    //   edges.reduce<any[]>((curr, next) => {
    //     if (next) {
    //       curr.push(next.node)
    //     }

    //     return curr
    //   }, rows)
    // } else if (objects) {
    //   rows = objects
    // }

    // const rowCount = rows.length

    return (
      <>
        {super.render()}
        <Paper
          className={[
            classes?.root,
            loading ? classes?.loading : '',
            className,
          ].join(' ')}
        >
          <Toolbar
            // numSelected={selected.length}
            title={title}
            addObject={addObject}
            filters={filters}
            columnData={columnData}
            toggleColumnVisibility={this.toggleColumnVisibility}
          />

          <div className={classes?.tableWrapper}>
            <table className={classes?.table}>
              <Header
                // numSelected={selected.length}
                // onSelectAllClick={this.handleSelectAllClick}
                // onRequestSort={this.handleRequestSort}
                // rowCount={rowCount}
                columnData={columnData}
              />

              <Body
                data={objects}
                // isSelected={this.isSelected}
                // handleClick={this.handleClick}
                // onRowSelect={this.onRowSelect}
                columnData={columnData}
              />
            </table>
          </div>
        </Paper>
      </>
    )
  }
}

export default withStyles(styles)((props: TableViewProps) => (
  <TableView {...props} />
))
