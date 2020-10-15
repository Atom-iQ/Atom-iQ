import type {
  DOMAttributes,
  HTMLAttributes,
  RvdChild,
  RvdComponentElement,
  RvdDOMElement,
  RvdDOMProp,
  RvdFragmentElement,
  RvdFragmentElementType,
  RvdHTMLProps,
  RvdConnectedNode,
  RvdObservableDOMProp,
  RvdProps,
  RvdStaticChild,
  RvdSVGProps,
  RvdDOMElementType
} from './rv-dom'
import type { RxO, RxSub } from '../rxjs'
import type { CustomMap, Dictionary } from '../common'
import type { CSSProperties } from '..'

export type CreateRvDomFn<P extends RvdProps = RvdProps> = (
  middlewares?: []
) => (rootNode: RvdChild<P>, elementOrQuerySelector?: Element | string) => RxSub

export interface RvdRenderer {
  renderRvdComponent: RvdComponentRenderer
  renderRvdFragment: RvdFragmentRenderer
  renderRvdElement: RvdElementRenderer
}

export type RvdComponentRenderer = (rvdComponent: RvdComponentElement) => void

export type RvdElementRenderer = (rvdElement: RvdDOMElement) => RvdConnectedNode

export type RvdFragmentRenderer = (rvdFragment: RvdFragmentElement) => void

export type RenderElementChildrenFn = (rvdElement: RvdDOMElement, element: Element) => RxSub

export type RenderCallback = (
  childIndex: string,
  element: Element,
  createdChildrenMap: CreatedChildrenManager,
  childrenSubscription?: RxSub
) => (child?: RvdStaticChild) => void

export type FragmentRenderCallback = (
  childIndex: string,
  element: Element,
  createdChildrenMap: CreatedChildrenManager,
  childrenSubscription: RxSub,
  renderNewCallback: RenderNewChildCallbackFn
) => (child?: RvdStaticChild) => void

export type RenderStaticChildFn = (
  childIndex: string,
  element: Element,
  createdChildrenMap: CreatedChildrenManager,
  childrenSubscription: RxSub
) => (child: RvdStaticChild) => void

export type RenderChildFn = (
  element: Element,
  createdChildrenMap: CreatedChildrenManager,
  childrenSubscription: RxSub,
  isStatic: boolean
) => (child: RvdChild, index: number) => void

export type RenderNewChildCallbackFn = (child: RvdChild, childIndex: string) => void

export interface KeyedChild {
  index: string
  child: CreatedChild | CreatedFragmentChild
  fragmentChildren?: CreatedNodeChild[]
}

export interface CreatedChild {
  index: string
  element: Element | Text | RvdFragmentElementType
  type?: RvdDOMElementType
  isText?: boolean
  key?: string | number
  subscription?: RxSub
  fromFragment?: boolean
  fragmentChildIndexes?: string[]
  fragmentChildKeys?: Dictionary<string>
  fragmentChildrenLength?: number
  oldKeyElementMap?: Dictionary<KeyedChild>
}

export interface CreatedFragmentChild extends CreatedChild {
  element: RvdFragmentElementType
  subscription?: RxSub
  fragmentChildIndexes: string[]
  fragmentChildKeys: Dictionary<string>
  fragmentChildrenLength: number
  oldKeyElementMap?: Dictionary<KeyedChild>
}

export interface CreatedNodeChild extends CreatedChild {
  element: Element | Text
}

export type CreatedChildren = Dictionary<CreatedNodeChild>
export type CreatedFragmentChildren = Dictionary<CreatedFragmentChild>

export interface CreatedChildPositionInfo {
  indexInArray: number
  allSortedIndexes: string[]
  isFirst: boolean
  isLast: boolean
  previousSibling: CreatedNodeChild
  nextSibling: CreatedNodeChild
  firstChild: CreatedNodeChild
}

export interface CreatedChildrenManager extends CustomMap<CreatedNodeChild> {
  hasOneChild: () => boolean
  getFirstIndex: () => string
  getFirstChild: () => CreatedNodeChild
  getPositionInfoForNewChild: (index: string) => CreatedChildPositionInfo
  hasFragment: (key: string) => boolean
  getFragment: (key: string) => CreatedFragmentChild
  addFragment: (key: string, value: CreatedFragmentChild) => boolean
  replaceFragment: (key: string, value: CreatedFragmentChild) => boolean
  removeFragment: (key: string) => boolean
  createEmptyFragment: (index: string) => boolean
  sortIndexes: (indexes: string[]) => string[]
}

/*
 * CONNECT PROPS
 */

export type DOMElementProps =
  | RvdHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
  | RvdSVGProps<SVGElement>
export type DOMElementPropName = keyof DOMElementProps
export type DOMElementConnectableProp = Exclude<RvdElementProp, RvdChild[] | RxO<RvdChild[]>>
export type DOMEventHandlerPropName = keyof Omit<
  DOMAttributes<Element>,
  'children' | 'dangerouslySetInnerHTML'
>

export type RvdElementProp = RvdDOMProp | RvdObservableDOMProp

export type PropEntryCallback = ([propName, propValue]: [
  DOMElementPropName,
  RvdElementProp
]) => void

export type ConnectPropCallback<T extends DOMElementConnectableProp = DOMElementConnectableProp> = (
  propName: DOMElementPropName,
  propValue: T
) => void

export type RvdStyleProp = CSSProperties | string | RxO<CSSProperties | string>
