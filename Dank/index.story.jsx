import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import { Dank } from './'

const baseProps = {}

storiesOf('Dank', module)
  .add('default', () => (
    <Dank {...baseProps} />
  ))
