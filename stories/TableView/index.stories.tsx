/* eslint-disable react/jsx-no-bind */

import React from 'react'

import { Meta } from '@storybook/react'
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'
// import styled from 'styled-components'

import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button'

import { styles, TableView as Component } from '../../src/DataView/List/Table'

import withStyles from 'material-ui/styles/withStyles'
import { ColumnConfig, TableViewProps } from '../../src/DataView/List/Table'

const title = 'apollo-cms/TableView'

const edges = [
  {
    node: {
      id: 'cjn27lkhv08sp0950dcfp61c3',
      username: 'Test',
      fullname: '',
      image: null,
      sudo: false,
      email: 'test@localhost',
      __typename: 'User',
    },
    __typename: 'UserEdge',
  },
  {
    node: {
      id: 'cjn29andg08zb0950gba9l3yo',
      username: 'test',
      fullname: null,
      image: null,
      sudo: false,
      __typename: 'User',
    },
    __typename: 'UserEdge',
  },
]

const data = {
  variables: {
    first: 10,
    skip: 0,
    orderBy: 'username_ASC',
    where: null,
  },
  loading: false,
  networkStatus: 7,
  objects: edges.map(({ node }) => node),
}

interface DevTableViewProps extends TableViewProps {}

type UserFragment = {
  id: string
  username: string | null
  email: string | null
}

class TableViewCustom<
  P extends DevTableViewProps = DevTableViewProps
> extends Component<P> {
  // static defaultProps = {
  //   ...Component.defaultProps,
  //   data,
  //   title: 'Test',
  //   limit,
  // }

  // constructor(props: P) {
  //   super(props)

  //   this.state = {
  //     ...this.state,
  //   }
  // }

  renderFilters(): JSX.Element {
    const _filters: Record<string, any> = this.getFilters() || {}

    const { query, advantages_not, with_employes } = _filters

    const filters = (
      <Grid container spacing={8} alignItems="baseline">
        <Grid item>
          <TextField
            label="Поиск"
            style={{
              marginLeft: 10,
              width: 200,
            }}
            name="query"
            value={query || ''}
            onChange={(event) => {
              const { value } = event.target

              this.setFilters({
                query: value,
              })
            }}
            inputProps={{
              className: 'searchInput',
            }}
          />
        </Grid>

        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Checkbox
                checked={advantages_not === null ? true : false}
                // bool="true"
                onChange={(_event, checked) => {
                  // const {
                  //   value,
                  // } = event.target;

                  this.setFilters({
                    advantages_not: checked ? null : undefined,
                  })
                }}
              />
            </Grid>

            <Grid item>С преимуществами</Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Checkbox
                checked={with_employes === true ? true : false}
                // bool="true"
                onChange={(_event, checked) => {
                  this.setFilters({
                    with_employes: checked ? true : undefined,
                  })
                }}
              />
            </Grid>

            <Grid item>С сотрудниками</Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Button onClick={() => this.cleanFilters()}>Сброс</Button>
        </Grid>
      </Grid>
    )

    return filters
  }

  getColumns(): ColumnConfig<UserFragment>[] {
    return [
      {
        id: 'id',
        key: 'id',
        label: 'ID',
        hidden: true,
      },
      {
        id: 'username',
        key: 'username',
        label: 'Username',
        description: 'Unique username',
        hidden: false,
        renderer: (value: UserFragment['username']) => {
          return <span className="username">{value}</span>
        },
      },
      {
        id: 'email',
        key: 'email',
        label: 'Email',
        hidden: false,
        renderer: (value: UserFragment['email'], record) => {
          return value ? (
            <a href={`mailto:${value}`}>
              {value}&laquo;{record.username}&raquo;
            </a>
          ) : null
        },
      },
    ]
  }
}

// export { styles, TableViewCustom as TableView }

const TableViewWithStyles = withStyles(styles)((props: DevTableViewProps) => (
  <TableViewCustom {...props} />
))

export const TableView: React.FC<TableViewProps> = (props) => {
  return <TableViewWithStyles {...props} />
}

const args: Partial<TableViewProps> = {
  objects: data.objects,
  title: 'Test TableView',
}

export default {
  title,
  component: TableView,
  argTypes: {
    // color: { control: 'color' },
    // backgroundColor: { control: 'color' },
  },
  args,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>{title}</Title>
          <Subtitle></Subtitle>
          <Description></Description>
          <Primary></Primary>
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta
