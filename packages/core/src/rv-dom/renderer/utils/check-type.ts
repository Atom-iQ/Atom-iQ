import {
  CreatedChildrenManager,
  CreatedFragmentChild,
  CreatedNodeChild,
  HTMLAttributes,
  RvdChild,
  RvdComponentElement,
  RvdDOMElement,
  RvdElement,
  RvdFragmentElement,
  RvdFragmentNode,
  RvdHTMLElement, RvdHTMLElementType,
  RvdNode,
  RvdStaticChild,
  RvdSVGElement,
  RvdSVGElementType
} from '../../../shared/types'
import {
  isArray,
  isBoolean,
  isFunction,
  isNullOrUndef,
  isString,
  isStringOrNumber
} from '../../../shared/utils'
import { HTMLElementTypes, SVGElementTypes } from '../../../shared/utils/elements'
import { _FRAGMENT } from '../../../shared'

/*
 * ELEMENTS
 */

/**
 * Check if given child is element (Component, Fragment, DOM Element)
 * @param rvdChild
 */
export function isRvdElement(rvdChild: RvdChild): rvdChild is RvdElement {
  return !!(rvdChild && (rvdChild as RvdElement).type)
}

/**
 * Check if given element is Component
 * @param rvdElement
 */
export function isComponent(rvdElement: RvdElement): rvdElement is RvdComponentElement {
  return Boolean(isFunction(rvdElement.type) && rvdElement._component)
}


/**
 * Check if given element is Fragment
 * @param rvdElement
 */
export function isFragment(rvdElement: RvdElement): rvdElement is RvdFragmentElement {
  return isString(rvdElement.type) && rvdElement.type === _FRAGMENT
}

/**
 * Check if given element is DOM Element
 * @param rvdElement
 */
export function isElement(rvdElement: RvdElement): rvdElement is RvdDOMElement {
  return isString(rvdElement.type) && rvdElement.type !== _FRAGMENT
}

/**
 * Check if given DOM Element is HTML Element
 * @param rvdElement
 */
export function isHtmlElement(
  rvdElement: RvdDOMElement
): rvdElement is RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement> {
  return HTMLElementTypes.includes(rvdElement.type as RvdHTMLElementType)
}

/**
 * Check if given DOM Element is SVG Element
 * @param rvdElement
 */
export function isSvgElement(rvdElement: RvdDOMElement): rvdElement is RvdSVGElement {
  return SVGElementTypes.includes(rvdElement.type as RvdSVGElementType)
}

/*
 * NODES
 */

/**
 * Check if given node is RvdNode (Element Node)
 * @param node
 */
export function isRvdNode(node: RvdNode | RvdFragmentNode): node is RvdNode {
  return node.dom !== undefined && node.elementSubscription !== undefined
}

/**
 * Check if given node is RvdFragmentNode
 * @param node
 */
export function isRvdFragmentNode(node: RvdNode | RvdFragmentNode): node is RvdFragmentNode {
  return !isRvdNode(node)
}

type ChildTypeSwitchCallback<T, R> = (child?: T) => R;

export function childTypeSwitch<O, F = O, C = F>(
  nullCallback: ChildTypeSwitchCallback<undefined, O>,
  textCallback: ChildTypeSwitchCallback<string | number, O>,
  arrayCallback: ChildTypeSwitchCallback<RvdChild[], F>,
  componentCallback: ChildTypeSwitchCallback<RvdComponentElement, C>,
  fragmentCallback: ChildTypeSwitchCallback<RvdFragmentElement, F>,
  elementCallback: ChildTypeSwitchCallback<RvdDOMElement, O>
): (child: RvdStaticChild) => O | F | C {
  return child => {
    console.log('Child Type Switch: ', child)
    if (isNullOrUndef(child) || isBoolean(child)) {
      return nullCallback && nullCallback()
    } else if (isStringOrNumber(child)) {
      return textCallback(child)
    } else if (isArray(child)) {
      console.log('IS ARRAY')
      return arrayCallback(child)
    } else if (isRvdElement(child)) {
      if (isComponent(child)) {
        return componentCallback(child)
      } else if (isFragment(child)) {
        return fragmentCallback(child)
      } else if (isElement(child)) {
        return elementCallback(child)
      }
    }
  }
}

export function renderTypeSwitch(
  hasOneCallback: (existingChild?: CreatedNodeChild) => void,
  hasFragmentCallback: (existingFragment?: CreatedFragmentChild) => void,
  hasNothingCallback?: () => void
): (childIndex: string, createdChildren: CreatedChildrenManager) => void {
  return (childIndex, createdChildren) => {
    console.log('Render type switch, child index: ', childIndex)
    if (createdChildren.has(childIndex)) {
      console.log('has one')
      return hasOneCallback(createdChildren.get(childIndex))
    } else if (createdChildren.hasFragment(childIndex)) {
      console.log('has many')
      return hasFragmentCallback(createdChildren.getFragment(childIndex))
    } else {
      console.log('has nothing')
      return hasNothingCallback !== undefined && hasNothingCallback()
    }
  }
}