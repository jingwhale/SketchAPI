/* globals expect */

import { Group } from '../Group'
import { Text } from '../Text'
import { Shape } from '../Shape'
import { Rectangle } from '../../Rectangle'

export const tests = {
  'should return the layers and can iterate through them': (
    context,
    document
  ) => {
    const page = document.selectedPage
    const group = new Group({ parent: page })
    const text = new Text({ parent: page }) // eslint-disable-line

    let iterations = 0
    let groups = 0
    page.layers.forEach(layer => {
      iterations += 1
      if (layer.isEqual(group)) {
        groups += 1
      }
    })
    expect(iterations).toBe(2)
    expect(groups).toBe(1)
  },

  testPageToLocalRect(context, document) {
    const page = document.selectedPage
    const group = new Group({
      parent: page,
      frame: new Rectangle(100, 100, 100, 100),
    })

    const local = group.pageRectToLocalRect(new Rectangle(125, 75, 50, 200))
    expect(local).toEqual(new Rectangle(25, -25, 50, 200))
  },

  testAdjustToFit(context, document) {
    const page = document.selectedPage
    const group = new Group({
      parent: page,
      frame: new Rectangle(100, 100, 100, 100),
    })
    const shape = new Shape({
      parent: group,
      frame: new Rectangle(50, 50, 50, 50),
    })
    group.adjustToFit()
    expect(shape.parent.sketchObject).toEqual(group.sketchObject)
    expect(group.frame).toEqual(new Rectangle(150, 150, 50, 50))
  },

  'should create a group': (context, document) => {
    const page = document.selectedPage

    const group = new Group({ parent: page })
    expect(group.type).toBe('Group')
  },
}
