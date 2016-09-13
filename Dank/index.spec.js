/* globals describe, it */
import React from 'react'
import { mount } from 'enzyme'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'

import { Dank } from './'

chai.use(chaiEnzyme())

const baseProps = {}

describe('<Dank/>', () => {
  it('Should load a default meme', () => {
    const wrapper = mount(<Dank {...baseProps} />)
    chai.expect(wrapper.find('div')).to.exist
  })
})
