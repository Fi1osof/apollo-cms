import proxy from '../setupProxy'

describe('@prisma-cms/tests proxy', () => {
  it('Proxy test', () => {
    let fakeServer = {
      use: () => {
        // console.log("rule", rule);
      },
    }

    proxy(fakeServer)
  })
})
