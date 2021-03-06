// v0.2.0

import {
  RvdChildrenManager,
  RvdComponentNode,
  RvdContext,
  RvdElementNode,
  RvdStaticChild
} from '..'
import { Subscription } from 'rxjs'

export type CombineMiddlewaresFn = (
  ...middlewares: MiddlewarePackageDefinition[]
) => (middlewaresOrder?: CombinedMiddlewaresOrder) => CombinedMiddlewares

export interface CombinedMiddlewares {
  init?: Middlewares<InitMiddleware>
  component?: ComponentMiddlewares
  elementPreRender?: Middlewares<ElementPreRenderMiddleware>
  elementPreConnect?: Middlewares<ElementPreConnectMiddleware>
  elementPostConnect?: Middlewares<ElementPostConnectMiddleware>
  textPreRender?: Middlewares<TextPreRenderMiddleware>
  componentPreRender?: Middlewares<ComponentPreRenderMiddleware>
  componentChildRender?: Middlewares<ComponentChildRenderMiddleware>
}

export interface CombinedMiddlewaresOrder {
  elementPreRender?: string[]
  elementPreConnect?: string[]
  elementPostConnect?: string[]
  textPreRender?: string[]
  componentPreRender?: string[]
  componentChildRender?: string[]
}

export interface ComponentMiddlewares {
  [alias: string]: ComponentMiddleware
}

export interface Middlewares<TMiddlewareFunction extends Function = Function> {
  order: string[]
  middlewares: {
    [name: string]: TMiddlewareFunction
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface MiddlewareFactory<TArgs extends Array<any>> {
  (...args: TArgs): MiddlewarePackageDefinition
}

export interface MiddlewarePackageDefinition {
  /** should be the same as a package name or last part of package name for atom-iq scoped packages **/
  name: string
  /** names of middleware packages needed for this package to work **/
  dependencies?: string[]
  /** All package middlewares, grouped by type **/
  middlewares: MiddlewaresMap
}

export interface MiddlewaresMap {
  renderer?: RendererMiddlewaresMap
  component?: Middleware<ComponentMiddleware> | Middleware<ComponentMiddleware>[]
  init?: Middleware<InitMiddleware>
}

export interface InitMiddleware {
  (rootRvdElement: RvdStaticChild, rootDOMElement: Element, context: RvdContext): RvdStaticChild
}

export interface ComponentMiddleware {
  (rvdComponentElement: RvdComponentNode, context?: RvdContext, parentSubscription?: Subscription):
    | ComponentMiddlewareFn
    | ComponentMiddlewareTuple
}

export interface ComponentMiddlewareFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): any
}

export type ComponentMiddlewareTuple = [ComponentMiddlewareFn, RvdContext]

export interface ElementPreRenderMiddleware {
  (
    rvdElement: RvdElementNode,
    parentElement: Element,
    parentCreatedChildren: RvdChildrenManager,
    elementIndex: string,
    parentChildrenSubscription: Subscription
  ): RvdElementNode
}

export interface ElementPreConnectMiddleware {
  (rvdElement: RvdElementNode, element: Element, elementSubscription: Subscription): RvdElementNode
}

export interface ElementPostConnectMiddleware {
  (
    rvdElement: RvdElementNode,
    element: Element,
    createdChildren: RvdChildrenManager,
    childrenSubscription: Subscription
  ): RvdElementNode
}

export interface TextPreRenderMiddleware {
  (
    textChild: string | number,
    parentElement: Element,
    parentCreatedChildren: RvdChildrenManager,
    textChildIndex: string,
    parentChildrenSubscription: Subscription
  ): string | number
}

export interface ComponentPreRenderMiddleware {
  (
    rvdComponentElement: RvdComponentNode,
    componentIndex: string,
    parentChildrenSubscription: Subscription
  ): RvdComponentNode
}

export interface ComponentChildRenderMiddleware {
  (
    componentChild: RvdStaticChild,
    rvdComponentElement: RvdComponentNode,
    parentChildrenSubscription: Subscription
  ): RvdStaticChild
}

export interface RendererMiddlewaresMap {
  /** Before DOM element create **/
  elementPreRender?:
    | Middleware<ElementPreRenderMiddleware>
    | Middleware<ElementPreRenderMiddleware>[]
  /** After DOM element create, before connecting props and rendering children  **/
  elementPreConnect?:
    | Middleware<ElementPreConnectMiddleware>
    | Middleware<ElementPreConnectMiddleware>[]
  /** After DOM element create, connecting props and rendering children,
   * but before appending it to parent  **/
  elementPostConnect?:
    | Middleware<ElementPostConnectMiddleware>
    | Middleware<ElementPostConnectMiddleware>[]
  /** Before creating/updating TextNode **/
  textPreRender?: Middleware<TextPreRenderMiddleware> | Middleware<TextPreRenderMiddleware>[]
  /** Before calling Component function **/
  componentPreRender?:
    | Middleware<ComponentPreRenderMiddleware>
    | Middleware<ComponentPreRenderMiddleware>[]
  /** After calling component function, before rendering rvDOM returned from Component **/
  componentChildRender?:
    | Middleware<ComponentChildRenderMiddleware>
    | Middleware<ComponentChildRenderMiddleware>[]
}

export interface Middleware<TMiddlewareFunction extends Function = Function> {
  /** Only when package has multiple middlewares of the same type, otherwise package name is used **/
  name?: string
  /**  name of middleware prop of component middlewares **/
  alias?: string
  /** names of middlewares that have to run before given middleware **/
  fn: TMiddlewareFunction
}
