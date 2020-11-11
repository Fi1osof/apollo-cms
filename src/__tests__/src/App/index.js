/* eslint-disable no-async-promise-executor */
import expect from 'expect'
import React from 'react'

import { render, unmountComponentAtNode } from 'react-dom'

import App from '../../../App'

let done = false

class Renderer extends App {
  async componentDidMount() {
    super.componentDidMount && super.componentDidMount()

    this.getChildContext()

    await this.loadApiData()

    await this.onAuthSuccess({})

    await this.logout()

    await this.testOnError()

    done = true
  }

  testOnError() {
    return new Promise(async (resolve) => {
      jest.useFakeTimers()

      this.state.errors = []

      await this.onError({
        graphQLErrors: [
          {
            message: 'test',
            messageDelay: 100,
          },
        ],
      })

      setTimeout(() => {
        resolve()
      }, 100)

      jest.runAllTimers()
    })
  }
}

describe('src/App', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Render', () => {
    return new Promise(async (resolve) => {
      let options

      let testURL

      try {
        options = JSON.parse(process.env.npm_config_argv)

        const { original } = options

        testURL = original && original.find((n) => /--testURL=/.test(n))

        testURL = (testURL && testURL.replace(/--testURL=/, '')) || ''
      } catch (error) {
        console.error(error)
      }

      let endpoint = testURL || 'http://localhost'

      await render(<Renderer endpoint={endpoint + '/api/'} />, node, () => {
        return true
      })

      setTimeout(() => {
        expect(done).toBe(true)

        resolve()
      }, 2000)
    })
  })
})
