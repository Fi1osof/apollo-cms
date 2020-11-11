import chalk from 'chalk'

// import {
//   createUploadLink,
// } from "../../../external/apollo-upload-client";

import App from '../../App'
import React, { Component } from 'react'

import { render } from 'react-dom'

import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import expect from 'expect'

class Renderer extends Component {
  static propTypes = {
    resolve: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  }

  static contextTypes = {
    client: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.testUpload()
  }

  testUpload() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res) => {
      const { resolve, token } = this.props

      const { client } = this.context

      const file = new Blob(['Foo.'], { type: 'text/plain' })

      // Optional, defaults to `blob`.
      file.name = 'bar.txt'

      const { localStorage } = global

      localStorage.setItem('token', token)

      await client
        .mutate({
          mutation: gql`
            mutation($file: Upload!) {
              singleUpload(file: $file) {
                id
                path
                filename
                mimetype
                encoding
                createdby {
                  id
                }
                hash
              }
            }
          `,
          variables: { file },
        })
        .then((result) => {
          // console.log(chalk.green("Upload success"), result);

          const {
            data: { singleUpload },
          } = result

          let {
            id: fileId,
            path,
            // filename,
            // mimetype,
            // encoding,
            createdby,
            // hash,
          } = singleUpload || {}

          const { id: userId } = createdby || {}

          expect(fileId).toNotBe(null)
          expect(path).toNotBe(null)
          expect(userId).toNotBe(null)
        })
        .catch((error) => {
          console.error(chalk.red('Upload error'), error)
          throw error
        })

      setTimeout(() => {
        // console.log(chalk.green("componentDidMount client"), "client");

        resolve()
        res()
      }, 2000)

      localStorage.removeItem('token')
    })
  }

  render() {
    return <div>Upload</div>
  }
}

describe('UploadClient', () => {
  // console.log(chalk.green("createUploadLink"), createUploadLink);

  it('Test', () => {
    let node

    node = document.createElement('div')

    return new Promise((resolve) => {
      render(
        <App
          Renderer={Renderer}
          resolve={resolve}
          token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjam43Z3pvYmEwZ2RsMDk1MHZuMHNsOGhpIiwiaWF0IjoxNTM5NDU1ODM5fQ.0Y93cI4QhVGGxNbjYjxmECtEWtvn_cqDf8-W3is8bx4"
        />,
        node,
        () => {
          // let client = createUploadLink({});

          // console.log(chalk.green("createUploadLink client"), client);

          // const file = new Blob(['Foo.'], { type: 'text/plain' })

          return
        }
      )
    })
  })
})
