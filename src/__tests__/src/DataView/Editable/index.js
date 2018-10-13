

import expect from 'expect'
import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import PropTypes from 'prop-types';

import chalk from "chalk";

import App from "../../../App";

import EditableProto from '../../../../DataView/Object/Editable'

let name = "Test";
let newName = "Test dirty";


const object = {
  id: "Sdfsdf",
  name,
};


class EditableEmpty extends EditableProto { }


class Editable extends EditableProto {


  static propTypes = {
    ...EditableProto.propTypes,
    resolve: PropTypes.func.isRequired,
  }

  static defaultProps = {
    ...EditableProto.defaultProps,
    errorDelay: 200,
  }



  componentDidMount() {


    super.componentDidMount && super.componentDidMount();

    const {
      errorDelay,
    } = this.props;

    expect(errorDelay).toBe(200);

    // await this.testSetCache();

    // await this.testStartEdit();

    // await this.testSavesd();

    // jest.useFakeTimers();

    // const callback = jest.fn();

    // this.startTests(callback);
    this.startTests();

    // setTimeout(() => {

    // }, 1000);

    // jest.runAllTimers();





  }


  canEdit() {

    super.canEdit();

    return true;

  }

  async testS() {

    return new Promise(resolve => {

      setTimeout(() => {
        resolve(111111111);
      }, 1000)

    });

  }


  startTests() {

    let tests = [
      this.testS,
    ]


    // describe('Pages test', () => {
    // first way
    // })
    // for (let i in tests) {

    //   const test = tests[i];

    //   console.log(chalk.green("Got test"), new Date());

    //   it(name, () => {

    //     return new Promise(async resolve => {

    //       const result = await test();

    //       console.log(chalk.green(`Test ${i} result`), new Date(), result);

    //     });

    //   })
    // }



    it(("Save object"), async () => {

      console.log(chalk.green("Loop test"), new Date(), true);

      return new Promise(async resolve => {

        console.log(chalk.green("Loop test promise"), new Date(), true);

        // setTimeout(() => {

        //   console.log(chalk.green("Loop test setTimeout"), true);

        //   sdfgfdfdsf();

        // }, 200)

        // let result = await this.ttt();
        // let result = await this.save();
        let result = await this.testSave();


        console.log(chalk.green("Loop test promise result"), new Date(), result);

        resolve();

      })

    })


    it(("testSetCache"), async () => {

      console.log(chalk.green("Loop testSetCache"), new Date(), true);

      return new Promise(async resolve => {

        console.log(chalk.green("Loop testSetCache promise"), new Date(), true);

        let result = await this.testSetCache();

        console.log(chalk.green("Loop testSetCache promise result"), new Date(), result);

        resolve();

      })

    })


    it(("testStartEdit"), async () => {

      console.log(chalk.green("Loop testStartEdit"), new Date(), true);

      return new Promise(async resolve => {

        console.log(chalk.green("Loop testStartEdit promise"), new Date(), true);

        let result = await this.testStartEdit();

        console.log(chalk.green("Loop testStartEdit promise result"), new Date(), result);

        resolve();

      })

    })

    // it(("testStartEdit"), async () => {

    //   console.log(chalk.green("Loop testStartEdit"), new Date(), true);

    //   return new Promise(async resolve => {

    //     console.log(chalk.green("Loop testStartEdit promise"), new Date(), true);

    //     let result = await this.testStartEdit();

    //     console.log(chalk.green("Loop testStartEdit promise result"), new Date(), result);

    //     resolve();

    //   })

    // }) 

    this.testRenderFields();


    this.testErrors();
  }


  testRenderFields() {

    it("Check TextField rendered", () => {


      return new Promise(resolve => {

        setTimeout(() => {

          const {
            element,
          } = this;

          console.log(chalk.green("element", element));

          expect(element !== undefined).toBe(true);


          const input = element.querySelector("input[type=text]");

          // console.log(chalk.green("element input"), input);

          expect(input).toNotBe(null);

          input.dispatchEvent(new Event("focus"));


          resolve();

        }, 100);

      });

    })

  }


  testErrors() {

    it("testErrors", () => {


      return new Promise(resolve => {

        let error = {
          message: "Test Error",
        }

        let secondError = "error";

        const newError = this.addError(error);

        expect(newError).toBe(error);

        let secondErrorAdded = this.addError(secondError);

        expect(secondErrorAdded).toNotBe(secondError);

        setTimeout(() => {

          expect(this.state.notifications.findIndex(n => n.message === error.message)).toNotBe(-1);
          expect(this.state.notifications.findIndex(n => n.message === secondError)).toNotBe(-1);

          this.removeError(secondErrorAdded);

          setTimeout(() => {

            expect(this.state.notifications.findIndex(n => n.message === secondError)).toBe(-1);


            // fake
            this.closeError({});

            resolve();

          }, 50)


        }, 100);

      });

    })

  }




  async testSetCache() {

    const key = this.getCacheKey();

    expect(key).toNotBe(null);

    this.setCache(object);

    let cachedData = this.getCache();

    expect(cachedData).toNotBe(null);

    expect(cachedData.id).toBe(object.id);

    expect(localStorage.getItem(key)).toNotBe(null);

    // clear cache
    this.clearCache();

    expect(localStorage.getItem(key)).toBe(null);

  }


  async testStartEdit() {

    return new Promise((resolve) => {

      expect(this.isInEditMode()).toBe(false);

      this.startEdit();

      setTimeout(() => {

        expect(this.isInEditMode()).toBe(true);

        this.resetEdit();

        setTimeout(() => {

          expect(this.isInEditMode()).toBe(false);

          resolve();

        }, 100);


      }, 100);

    });

  }


  async testSave() {

    console.log(chalk.green("Start test"));

    return new Promise((resolve) => {

      expect(this.isInEditMode()).toBe(false);

      var input = document.createElement("INPUT");

      Object.assign(input, {
        type: "text",
        name: "name",
        value: newName,
      });


      input.addEventListener(
        "change",
        (event) => {

          this.onChange(event);

        },
        false
      );

      var event = new Event("change");

      input.dispatchEvent(event);


      // let Editor = this.getEditor({
      //   name: "name",
      // });

      // console.log("Editor", Editor);


      setTimeout(async () => {

        const {
          name,
        } = this.getObjectWithMutations();

        expect(name).toBe(newName);

        expect(this.isInEditMode()).toBe(true);

        await this.save()
          .then(r => {

            console.log(chalk.green("Save result"), r);

          })
          .catch(error => {
            console.error(chalk.yellow("Save error"), error);
          })

        resolve();

      }, 100);


    });

  }


  getCacheKey() {

    const {
      id,
    } = this.getObjectWithMutations();

    expect(id).toBe(object.id);

    const key = super.getCacheKey();

    expect(key).toNotBe(null);

    expect(key).toBe(`item_${id}`);

    return key;

  }


  render() {


    return <div>

      {this.renderEmpty()}

      <div
        ref={element => {
          this.element = element
        }}
      >
        {this.getTextField({
          name: "name",
          className: "input",
        })}
      </div>

      {super.render()}

    </div >

  }

}


class Renderer extends Component {


  render() {

    const {
      ...other
    } = this.props;

    return <Editable
      data={{
        object,
      }}
      // _dirty={{
      //   name: newName,
      // }}
      mutate={async (data) => {

        console.log(chalk.green("mutate data"), data);

      }}
      {...other}
    />

  }
}

describe('DataView Object/Editable', () => {
  let node

  node = document.createElement('div')

  beforeEach(() => {
    // node = document.createElement('div')
  })

  afterEach(() => {
    // unmountComponentAtNode(node)
  })


  // return new Promise(async resolve => {
  //   render(<App
  //     Renderer={Renderer}
  //     resolve={resolve}
  //   />, node, () => {

  //     console.log(chalk.green("Test Render"), true);

  //     return true;
  //   });

  // })
  // it('Render', () => {




  return new Promise(async resolve => {
    render(<App
      Renderer={Renderer}
      resolve={resolve}
    />, node, () => {

      // jest.useFakeTimers();

      setTimeout(() => {
        resolve();
      }, 4000);

      // jest.runAllTimers();

    })
  });


  // return true;


  // })
})

describe('DataView Object/Editable Empty', () => {
  let node

  node = document.createElement('div')



  it("Render empty object with error", () => {

    render(<App
      Renderer={EditableEmpty} 
    />, node, () => { 

    })

  })


  it("Render empty object", () => {

    render(<App
      Renderer={EditableEmpty}
      data={{}}
    />, node, () => {


    })

  })

  it("Render empty object loading", () => {

    render(<App
      Renderer={EditableEmpty}
      data={{
        loading: true,
      }}
    />, node, () => {


    })

  })

})


