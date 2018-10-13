

import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import Component from '../../../../../DataView/List/Table'

describe('DataView List Table', () => {
  let node

  let name = "Test";
  let newName = "Test dirty";

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Check content is not empty', () => {

    const data = {
      "variables": {
        "first": 10,
        "skip": 0,
        "orderBy": "username_ASC",
        "where": null
      },
      "loading": false,
      "networkStatus": 7,
      "objectsConnection": {
        "pageInfo": {
          "hasNextPage": false,
          "hasPreviousPage": false,
          "startCursor": "cjn27lkhv08sp0950dcfp61c3",
          "endCursor": "cjn29b63508zn09504gf24kde",
          "__typename": "PageInfo"
        },
        "aggregate": {
          "count": 2,
          "__typename": "AggregateUser"
        },
        "edges": [
          {
            "node": {
              "id": "cjn27lkhv08sp0950dcfp61c3",
              "username": "Test",
              "fullname": "",
              "image": null,
              "sudo": false,
              "__typename": "User"
            },
            "__typename": "UserEdge"
          },
          {
            "node": {
              "id": "cjn29andg08zb0950gba9l3yo",
              "username": "test",
              "fullname": null,
              "image": null,
              "sudo": false,
              "__typename": "User"
            },
            "__typename": "UserEdge"
          },
        ],
        "__typename": "UserConnection"
      }
    };

    render(<Component
      data={data}
      title="Test"
      limit={1}
    />, node, () => {

      return true;
    })
  })
})


