import { RvdDOMPropName, RvdDOMProp, RvdObservableDOMProp } from '../../../shared/types'
import { isBoolean, isNullOrUndef } from '../../../shared'
import type { Subscription } from 'rxjs'

export function connectDOMProp(propName: string, propValue: RvdDOMProp, element: Element): void {
  switch (propName) {
    case 'autoFocus':
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(element as any).autofocus = !!propValue
      break
    case 'allowfullscreen':
    case 'autoplay':
    case 'capture':
    case 'checked':
    case 'controls':
    case 'default':
    case 'disabled':
    case 'hidden':
    case 'indeterminate':
    case 'loop':
    case 'muted':
    case 'novalidate':
    case 'open':
    case 'readOnly':
    case 'required':
    case 'reversed':
    case 'scoped':
    case 'seamless':
    case 'selected':
      element[propName] = !!propValue
      break
    case 'defaultChecked':
    case 'value':
    case 'volume':
    case 'id': {
      const value = isNullOrUndef(propValue) ? '' : propValue
      if (element[propName] !== value) {
        element[propName] = value
      }
      break
    }
    default:
      if (isNullOrUndef(propValue)) {
        element.removeAttribute(propName)
      } else if (isBoolean(propValue)) {
        if (propValue) {
          element.setAttribute(propName, propName)
        } else {
          element.removeAttribute(propName)
        }
      } else {
        element.setAttribute(propName, propValue + '')
      }
  }
}

export function connectObservableDOMProp(
  propName: RvdDOMPropName,
  observableProp: RvdObservableDOMProp,
  element: Element,
  propsSubscription: Subscription
): void {
  let previousValue: RvdDOMProp
  propsSubscription.add(
    observableProp.subscribe(function (propValue: RvdDOMProp) {
      if (propValue !== previousValue) {
        connectDOMProp(propName, propValue, element)
      }
    })
  )
}
