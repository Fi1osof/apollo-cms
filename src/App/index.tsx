import React from 'react'

import PropTypes from 'prop-types'

import Context from '@prisma-cms/context'

import gql from 'graphql-tag'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient, ApolloQueryResult } from 'apollo-client'

// import { createUploadLink } from 'apollo-upload-client'
import { createUploadLink } from '../external/apollo-upload-client'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link'
import { onError } from 'apollo-link-error'
// import { createHttpLink } from "apollo-link-http";

import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

import Renderer from './Renderer'
import {
  ApolloCmsAppProps,
  ApolloCmsAppState,
  AuthSuccessData,
} from './interfaces'
// import { HttpLink } from 'apollo-boost/lib/bundle.umd';

const globalAny: any = global

// class ApolloCmsApp<P extends ApolloCmsAppProps = ApolloCmsAppProps, S extends ApolloCmsAppState = ApolloCmsAppState>
//   extends React.Component<P, S> {

class ApolloCmsApp<
  P extends ApolloCmsAppProps = ApolloCmsAppProps,
  S extends ApolloCmsAppState = ApolloCmsAppState
> extends React.Component<P, S> {
  // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    Renderer: PropTypes.func.isRequired,
    apiQuery: PropTypes.string,
    localStorage: PropTypes.object.isRequired,
  }

  static defaultProps = {
    Renderer,
    apiQuery: `{
      user:me{
        id
        username
      }
    }`,
    localStorage: global.localStorage,
  }

  // state: Readonly<S> | S;
  state!: S

  static childContextTypes = {
    onAuthSuccess: PropTypes.func,
    loadApiData: PropTypes.func,
    logout: PropTypes.func,
    token: PropTypes.string,
    user: PropTypes.object,
    errors: PropTypes.array,
    localStorage: PropTypes.object,
  }

  constructor(props: P) {
    super(props)

    const { endpoint, credentials = 'same-origin', localStorage } = this.props

    if (!endpoint) {
      throw new Error('Endpoind required')
    }

    const authMiddleware = new ApolloLink((operation, forward) => {
      // eslint-disable-line react/prefer-stateless-function
      // add the authorization to the headers
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          Authorization:
            (localStorage && localStorage.getItem('token')) || null,
        },
      }))

      return forward(operation)
    })

    const httpLink = createUploadLink({
      uri: endpoint,
      credentials,
    })

    // const httpLink = createHttpLink({
    //   uri: endpoint,
    // });

    const wsLink = new WebSocketLink({
      uri: endpoint.replace(/^http/, 'ws'),
      options: {
        reconnect: true,
        connectionParams: () => ({
          Authorization: (localStorage && localStorage.token) || undefined,
        }),
      },
    })

    // const subscriptionClient = wsLink["subscriptionClient"];

    // console.log("App wsClient subscriptionClient", subscriptionClient);

    // this.prepareSubscriptionClient(subscriptionClient)

    globalAny.wsLink = wsLink

    const wsHttpLink = split(
      // split based on operation type
      (request) => {
        const { query } = request

        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    )

    const errorLink = onError(this.onError)

    const link = errorLink.concat(wsHttpLink)
    // const link = errorLink.concat(httpLink);

    const client = new ApolloClient({
      link: from([authMiddleware, link]),
      cache: new InMemoryCache().restore(globalAny.__APOLLO_STATE__),
      connectToDevTools: true,
    })

    this.state = {
      ...this.state,
      client,
      errors: [],
      wsLink,
    }
  }

  getChildContext(): any {
    const { token, user, errors } = this.state

    const { localStorage } = this.props

    const context = {
      token,
      user,
      onAuthSuccess: (data: AuthSuccessData) => this.onAuthSuccess(data),
      loadApiData: () => this.loadApiData(),
      logout: () => this.logout(),
      errors,
      localStorage,
    }

    return context
  }

  async onAuthSuccess(data: AuthSuccessData): Promise<void> {
    const { token, user } = data

    const { localStorage } = this.props

    const { client } = this.state

    token && localStorage && localStorage.setItem('token', `Bearer ${token}`)

    // setTimeout(async () => {
    // }, 1000);

    this.setState(
      {
        user,
      },
      async () => {
        await client.resetStore()

        this.reconnectWs()

        // this.forceUpdate();
      }
    )
  }

  async logout(): Promise<void> {
    const { localStorage } = this.props

    const { client } = this.state

    localStorage && localStorage.setItem('token', ``)

    this.setState(
      {
        user: null,
      },
      async () => {
        await client.resetStore()

        this.reconnectWs()
      }
    )
  }

  reconnectWs = async (): Promise<void> => {
    const { wsLink } = this.state

    // const { subscriptionClient } = wsLink || {}

    const subscriptionClient = wsLink['subscriptionClient']

    // console.log("reconnectWs subscriptionClient status", subscriptionClient.status);

    if (subscriptionClient) {
      // subscriptionClient.unsubscribeAll();
      subscriptionClient.close(false, false)
    }
  }

  // subscribe = (options, observer) => {

  //   const {
  //     wsLink,
  //   } = this.state;

  // }

  onError = (response: Record<string, any>): void => {
    const {
      // networkError,
      graphQLErrors,
      messageDelay = 5000,
    } = response

    // if (networkError && networkError.statusCode === 401) {
    // }

    graphQLErrors &&
      graphQLErrors.map((n: Record<string, any> | undefined) => {
        const { message } = n || {}

        const { errors = [] } = this.state

        if (message) {
          const error = {
            message,
          }

          errors.push(error)

          setTimeout(() => {
            const { errors } = this.state

            const index = errors && errors.indexOf(error)

            if (index !== -1) {
              errors.splice(index, 1)

              this.setState({
                errors,
              })
            }
          }, messageDelay)
        }

        if (errors && errors.length) {
          this.setState({
            errors,
          })
        }

        return n
      })

    return
  }

  componentDidMount(): void {
    this.loadApiData()

    super.componentDidMount && super.componentDidMount()
  }

  async loadApiData(): Promise<ApolloQueryResult<any> | void> {
    const { apiQuery } = this.props

    if (!apiQuery) {
      return
    }

    const { client } = this.state

    const result = await client
      .query({
        query: gql`
          ${apiQuery}
        `,
        fetchPolicy: 'network-only',
      })
      .then((r) => {
        return r
      })
      .catch((e) => {
        console.error(e)
      })

    const { data } = result || {}

    if (data) {
      this.setState({
        ...data,
      })
    }

    return result
  }

  render(): React.ReactNode {
    const { client, errors, wsLink } = this.state

    const { children, Renderer, ...other } = this.props

    const RendererComponent: React.ComponentType = Renderer

    return (
      <ApolloProvider client={client}>
        <Context.Consumer>
          {(context: Record<string, any>) => {
            return (
              <Context.Provider
                value={Object.assign(context, {
                  client,
                  errors,
                  wsLink,
                  reconnectWs: this.reconnectWs,
                  ...this.getChildContext(),
                })}
              >
                <RendererComponent {...other}>{children}</RendererComponent>
              </Context.Provider>
            )
          }}
        </Context.Consumer>
      </ApolloProvider>
    )
  }
}

export default ApolloCmsApp
