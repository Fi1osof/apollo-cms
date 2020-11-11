import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'

export interface ApolloCmsAppProps {
  /**
   * API endpoint url
   */
  endpoint: string

  /**
   * Headers credentials
   */
  credentials?: string

  localStorage?: typeof global.localStorage

  /**
   * Autoquery on initialize
   */
  apiQuery?: string

  Renderer: React.ComponentType
}

export interface ApolloCmsAppState {
  client: ApolloClient<NormalizedCacheObject>

  errors: any[]

  wsLink: WebSocketLink

  token?: string | null | undefined

  user?: Record<string, any> | null | undefined
}

export interface AuthSuccessData {
  token: string

  user: Record<string, any>
}
