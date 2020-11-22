import React, { useCallback, useMemo, useState } from 'react'
import { action } from '@storybook/addon-actions'

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
import {
  EditableObject,
  EditableObjectProps,
  EditableObjectSaveResult,
  EditableObjectProcessorResponse,
  EditableObjectPropsDataObject,
} from '../../src'
import Grid from 'material-ui/Grid'
import PrismaCmsContext from '@prisma-cms/context'

const title = 'apollo-cms/EditableObject'

interface EditableObjectStoryProps extends EditableObjectProps {
  canEdit: boolean
}

class EditableObjectCustom extends EditableObject<EditableObjectStoryProps> {
  canEdit() {
    return this.props.canEdit
  }

  renderEditableView() {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          {this.getTextField({
            name: 'name',
            fullWidth: true,
          })}
        </Grid>
      </Grid>
    )
  }

  // render() {

  //   return super.render();
  // }
}

const testObject: EditableObjectPropsDataObject = {
  name: 'Editable Object',
}

export const Component: React.FC<EditableObjectStoryProps> = (props) => {
  const [object, setObject] = useState(testObject)

  const mutate = useCallback(async (props: EditableObjectProps["_dirty"]): Promise<
    EditableObjectSaveResult
  > => {
    action('mutate props')(props)

    const object = props?.variables.data

    const response: EditableObjectProcessorResponse['response'] = {
      success: false,
      message: '',
      errors: [],
      data: null,
    }

    if (!object.name) {
      response.errors.push({
        key: 'name',  
        message: 'Cannot be empty',
      })
    } else {
      response.success = true
      response.data = object
    }

    const data: EditableObjectProcessorResponse = {
      response,
    }

    return {
      data,
    }
  }, [])

  const onSave = useCallback((result: EditableObjectSaveResult) => {
    action('onSave result')(result)

    if (result && !(result instanceof Error)) {
      const data = result?.data

      const object = data?.response?.data

      if (object) {
        setObject(object)
      }
    }
  }, [])

  const context = useMemo(() => {
    return {
      /**
       * Pass reset store mock.
       * Not required in production,
       */
      apiClientResetStore: () => {
        action('apiClientResetStore')(true)
      },
    }
  }, [])

  return (
    <PrismaCmsContext.Provider value={context}>
      <EditableObjectCustom
        {...props}
        object={object}
        mutate={mutate}
        onSave={onSave}
      />
    </PrismaCmsContext.Provider>
  )
}

const args: Partial<EditableObjectStoryProps> = {
  canEdit: true,

  cacheKey: 'test_object',
}

export default {
  title,
  component: Component,
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
