import React from 'react'
import Head from 'next/head'
import EditableObject from '../src/DataView/Object/Editable'

const MainPage: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>TableView</title>
        <meta name="description" content="Component TableView for prisma-cms" />
      </Head>
      <EditableObject
        {...props}
        object={{
          id: 'objectId',
          name: 'Test TableView',
        }}
      />
    </>
  )
}

export default MainPage
