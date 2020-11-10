import { createDomElement } from '../../../../../src/reactive-virtual-dom/renderer/utils'
import { setClassName } from '../../../../../src/reactive-virtual-dom/renderer/dom-renderer'

/* eslint-disable max-len */
describe('setClassName function', () => {
  test('setClassName should set className for HTML Element', () => {
    const element = createDomElement('div', false)
    setClassName(false, element, 'mock-div')
    expect(element.className).toBe('mock-div')
  })

  test('setClassName should set class attribute for SVG Element', () => {
    const element = createDomElement('circle', true)
    setClassName(true, element, 'test-svg')
    expect(element.getAttribute('class')).toBe('test-svg')
  })
})
