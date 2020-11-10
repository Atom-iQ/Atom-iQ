import * as css from '../dom/css'
import type {
  AnimationEventHandler,
  ChangeEventHandler,
  ClipboardEventHandler,
  CompositionEventHandler,
  DragEventHandler,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  ReactiveAnimationEventHandler,
  ReactiveChangeEventHandler,
  ClassicEventHandler,
  ReactiveClipboardEventHandler,
  ReactiveCompositionEventHandler,
  ReactiveDragEventHandler,
  ReactiveEventHandler,
  ReactiveFocusEventHandler,
  ReactiveFormEventHandler,
  ReactiveKeyboardEventHandler,
  ReactiveMouseEventHandler,
  ReactivePointerEventHandler,
  ReactiveTouchEventHandler,
  ReactiveTransitionEventHandler,
  ReactiveUIEventHandler,
  ReactiveWheelEventHandler,
  TouchEventHandler,
  TransitionEventHandler,
  UIEventHandler,
  WheelEventHandler,
  CSSProperties,
  RedEvent,
  ReactiveControlledFormEventHandler,
  RedFormEvent,
  RedChangeEvent
} from '..'
import { RvdChildFlags, RvdElementFlags } from '../../flags'
import { Observable } from 'rxjs'

/**
 * Reactive Virtual DOM Element
 */
export interface RvdElement<P extends RvdProps = RvdProps> {
  type: RvdElementType
  elementFlag: RvdElementFlags
  props?: P | null
  className?: string | null | Observable<string | null>
  children?: RvdChild | RvdChild[] | null
  childFlags?: RvdChildFlags
  key?: string | number
  ref?: ElementRefProp | ComponentRefProp
  selectValue?: Observable<string | number | string[] | number[]>
}

export interface RvdHTMLElement<P extends RvdHTMLProps<HTMLAttributes<T>, T>, T extends HTMLElement>
  extends RvdDOMElement<P> {
  type: keyof RvdHTML
}

export interface RvdSVGElement extends RvdDOMElement<RvdSVGProps<SVGElement>> {
  type: keyof RvdSVG
}

export interface RvdDOMElement<P extends RvdDOMProps = RvdDOMProps> extends RvdElement<P> {
  type: RvdDOMElementType
  ref?: ElementRefProp
}

export interface RvdFragmentElement extends RvdElement<null> {
  type: RvdFragmentElementType
  children: RvdChild[] | null
}

export interface RvdComponentElement<P extends RvdComponentProps = RvdComponentProps>
  extends RvdElement<P> {
  type: RvdComponent<P>
  elementFlag: RvdElementFlags.Component
  ref?: ComponentRefProp
}

/**
 * Reactive Virtual DOM Element Type
 */
export type RvdElementType = RvdDOMElementType | RvdFragmentElementType | RvdComponent

export type RvdDOMElementType = RvdHTMLElementType | RvdSVGElementType

export type RvdHTMLElementType = keyof RvdHTML

export type RvdSVGElementType = keyof RvdSVG

export type RvdFragmentElementType = '_F_'

/**
 * Reactive Virtual DOM Component
 */
export interface RvdComponent<P extends {} = {}, M extends {} = {}> {
  (props?: RvdComponentProps<P>, middlewareProps?: M): RvdChild

  useMiddlewares?: (keyof M | string)[]
}

/**
 * Reactive Virtual DOM Props
 */
export type RvdProps = RvdComponentProps | RvdDOMProps

export type RvdDOMProps = RvdHTMLProps<HTMLAttributes<Element>, Element> | RvdSVGProps<SVGElement>

export type RvdHTMLProps<
  E extends HTMLAttributes<T>,
  T extends EventTarget
> = RvdSpecialAttributes & E

export interface RvdSVGProps<T extends EventTarget>
  extends SVGAttributes<T>,
    RvdSpecialAttributes {}

export type RvdComponentProps<P extends {} = {}> = P & RvdComponentSpecialProps

export interface RvdComponentSpecialProps {
  children?: RvdComponentChild
  ref?: ComponentRefProp
  key?: string | number
}

export interface RvdSpecialAttributes {
  ref?: ElementRefProp
  key?: string | number
}

export type RvdEventHandlerProp = ClassicEventHandler<RedEvent> | ReactiveEventHandler<RedEvent>

export type RvdDOMProp =
  | RvdEventHandlerProp
  | DangerousHTML
  | CSSProperties
  | RvdChild[]
  | string
  | number
  | boolean

export type RvdObservableDOMProp = Observable<RvdDOMProp>

/**
 * Reactive Virtual DOM Child
 */
export type RvdChild<P extends RvdProps = RvdProps> = RvdStaticChild<P> | RvdObservableChild<P>

export type RvdComponentChild<P extends RvdProps = RvdProps> =
  | RvdChild<P>
  | RvdCallbackChild
  | Observable<RvdCallbackChild>

export type RvdPrimitiveChild = string | number | boolean | null | undefined

export type RvdCallbackChild = Function

export type RvdArrayChild = RvdChild[]

export type RvdStaticChild<P extends RvdProps = RvdProps> =
  | RvdElement<P>
  | RvdPrimitiveChild
  | RvdArrayChild

export type RvdObservableChild<P extends RvdProps = RvdProps> = Observable<RvdStaticChild<P>>

/**
 * Reactive Virtual DOM Refs
 */
export type ElementRefPropState = [
  Observable<RvdDOMProp>,
  (nextPropOrCallback: RvdDOMProp | ((currentProp: RvdDOMProp) => RvdDOMProp)) => void
]

export type ComponentRefState = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Observable<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (nextPropOrCallback: any | ((currentProp: any) => any)) => void
]

export type ElementRefPropType =
  | ElementRefPropState
  | ClassicEventHandler<RedEvent>
  | Observable<RvdDOMProp>
  | RvdDOMProp
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentRefPropOrState = ComponentRefState | Observable<any> | any

export interface ElementRefProps {
  [key: string]: ElementRefPropType
}

export interface ElementRef {
  props: ElementRefProps
  events: {
    [key: string]: Observable<Event>
  }
  domElement: Element
}

export interface ComponentRef {
  props: {
    [key: string]: ComponentRefPropOrState
  }
  state: {
    [key: string]: ComponentRefPropOrState
  }
  functions: {
    [key: string]: Function
  }
}

export interface ElementRef {
  props: ElementRefProps
  events: {
    [key: string]: Observable<Event>
  }
  domElement: Element
}

export interface ComponentRef {
  props: {
    [key: string]: ComponentRefPropOrState
  }
  state: {
    [key: string]: ComponentRefPropOrState
  }
  functions: {
    [key: string]: Function
  }
}

export interface ElementRefProp {
  (ref: ElementRef): void

  controlProps: string[]
  getEvents: string[]
  complete: () => void
}

export type ComponentRefProp = (ref: ComponentRef) => void

export type RvdContextField = string | number | boolean | null | undefined | Object

export type RvdObservableContextField = Observable<RvdContextField> | Observable<RvdContextField[]>

export type RvdContextStateField = [
  Observable<RvdContextField> | Observable<RvdContextField[]>,
  (
    nextPropOrCallback:
      | RvdContextField
      | RvdContextField[]
      | ((currentProp: RvdContextField | RvdContextField[]) => RvdContextField | RvdContextField[])
  ) => void
]

export type RvdContextFieldUnion =
  | RvdContextStateField
  | RvdContextField
  | RvdContextField[]
  | RvdObservableContextField
  | Function

/**
 * Reactive Virtual DOM Context
 */
export interface RvdContext {
  [key: string]: RvdContextFieldUnion
}

export type RvdControlledFormElement = RvdHTML['input'] | RvdHTML['select'] | RvdHTML['textarea']

export type DOMFormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export interface RvdHTML {
  a: RvdHTMLElement<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
  abbr: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  address: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  area: RvdHTMLElement<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>
  article: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  aside: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  audio: RvdHTMLElement<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>
  b: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  base: RvdHTMLElement<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>
  bdi: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  bdo: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  big: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  blockquote: RvdHTMLElement<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>
  body: RvdHTMLElement<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>
  br: RvdHTMLElement<HTMLAttributes<HTMLBRElement>, HTMLBRElement>
  button: RvdHTMLElement<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  canvas: RvdHTMLElement<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
  caption: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  cite: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  code: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  col: RvdHTMLElement<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
  colgroup: RvdHTMLElement<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
  data: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  datalist: RvdHTMLElement<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>
  dd: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  del: RvdHTMLElement<DelHTMLAttributes<HTMLElement>, HTMLElement>
  details: RvdHTMLElement<DetailsHTMLAttributes<HTMLElement>, HTMLElement>
  dfn: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  dialog: RvdHTMLElement<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>
  div: RvdHTMLElement<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  dl: RvdHTMLElement<HTMLAttributes<HTMLDListElement>, HTMLDListElement>
  dt: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  em: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  embed: RvdHTMLElement<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
  fieldset: RvdHTMLElement<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>
  figcaption: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  figure: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  footer: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  form: RvdHTMLElement<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
  h1: RvdHTMLElement<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  h2: RvdHTMLElement<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  h3: RvdHTMLElement<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  h4: RvdHTMLElement<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  h5: RvdHTMLElement<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  h6: RvdHTMLElement<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  head: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLHeadElement>
  header: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  hgroup: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  hr: RvdHTMLElement<HTMLAttributes<HTMLHRElement>, HTMLHRElement>
  html: RvdHTMLElement<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>
  i: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  iframe: RvdHTMLElement<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>
  img: RvdHTMLElement<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
  input: RvdHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  ins: RvdHTMLElement<InsHTMLAttributes<HTMLModElement>, HTMLModElement>
  kbd: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  keygen: RvdHTMLElement<KeygenHTMLAttributes<HTMLElement>, HTMLElement>
  label: RvdHTMLElement<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
  legend: RvdHTMLElement<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>
  li: RvdHTMLElement<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
  link: RvdHTMLElement<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>
  main: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  map: RvdHTMLElement<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>
  mark: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  menu: RvdHTMLElement<MenuHTMLAttributes<HTMLElement>, HTMLElement>
  menuitem: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  meta: RvdHTMLElement<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>
  meter: RvdHTMLElement<MeterHTMLAttributes<HTMLElement>, HTMLElement>
  nav: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  noindex: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  noscript: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  object: RvdHTMLElement<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>
  ol: RvdHTMLElement<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
  optgroup: RvdHTMLElement<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>
  option: RvdHTMLElement<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
  output: RvdHTMLElement<OutputHTMLAttributes<HTMLElement>, HTMLElement>
  p: RvdHTMLElement<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
  param: RvdHTMLElement<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>
  picture: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  pre: RvdHTMLElement<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
  progress: RvdHTMLElement<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>
  q: RvdHTMLElement<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
  rp: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  rt: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  ruby: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  s: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  samp: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  script: RvdHTMLElement<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>
  section: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  select: RvdHTMLElement<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
  small: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  source: RvdHTMLElement<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>
  span: RvdHTMLElement<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
  strong: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  style: RvdHTMLElement<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>
  sub: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  summary: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  sup: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  table: RvdHTMLElement<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>
  tbody: RvdHTMLElement<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
  td: RvdHTMLElement<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>
  textarea: RvdHTMLElement<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
  tfoot: RvdHTMLElement<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
  th: RvdHTMLElement<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>
  thead: RvdHTMLElement<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
  time: RvdHTMLElement<TimeHTMLAttributes<HTMLElement>, HTMLElement>
  title: RvdHTMLElement<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>
  tr: RvdHTMLElement<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
  track: RvdHTMLElement<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>
  u: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  ul: RvdHTMLElement<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
  var: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  video: RvdHTMLElement<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
  wbr: RvdHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>
  // webview: RvdHTMLElement<WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>
}

export interface RvdSVG {
  animate: RvdSVGElement
  animateTransform: RvdSVGElement
  circle: RvdSVGElement
  clipPath: RvdSVGElement
  defs: RvdSVGElement
  desc: RvdSVGElement
  ellipse: RvdSVGElement
  feBlend: RvdSVGElement
  feColorMatrix: RvdSVGElement
  feComponentTransfer: RvdSVGElement
  feComposite: RvdSVGElement
  feConvolveMatrix: RvdSVGElement
  feDiffuseLighting: RvdSVGElement
  feDisplacementMap: RvdSVGElement
  feDistantLight: RvdSVGElement
  feDropShadow: RvdSVGElement
  feFlood: RvdSVGElement
  feFuncA: RvdSVGElement
  feFuncB: RvdSVGElement
  feFuncG: RvdSVGElement
  feFuncR: RvdSVGElement
  feGaussianBlur: RvdSVGElement
  feImage: RvdSVGElement
  feMerge: RvdSVGElement
  feMergeNode: RvdSVGElement
  feMorphology: RvdSVGElement
  feOffset: RvdSVGElement
  fePointLight: RvdSVGElement
  feSpecularLighting: RvdSVGElement
  feSpotLight: RvdSVGElement
  feTile: RvdSVGElement
  feTurbulence: RvdSVGElement
  filter: RvdSVGElement
  foreignObject: RvdSVGElement
  g: RvdSVGElement
  image: RvdSVGElement
  line: RvdSVGElement
  linearGradient: RvdSVGElement
  marker: RvdSVGElement
  mask: RvdSVGElement
  metadata: RvdSVGElement
  path: RvdSVGElement
  pattern: RvdSVGElement
  polygon: RvdSVGElement
  polyline: RvdSVGElement
  radialGradient: RvdSVGElement
  rect: RvdSVGElement
  stop: RvdSVGElement
  svg: RvdSVGElement
  switch: RvdSVGElement
  symbol: RvdSVGElement
  text: RvdSVGElement
  textPath: RvdSVGElement
  tspan: RvdSVGElement
  use: RvdSVGElement
  view: RvdSVGElement
}

export interface DangerousHTML {
  __html: string | Observable<string>
}

/**
 * Reactive Virtual DOM Attributes
 */
export interface DOMAttributes<T extends EventTarget> {
  children?: RvdChild | RvdChild[]
  dangerouslySetInnerHTML?: DangerousHTML
  title?: string
  value?: string | number | boolean | Array<string | number | boolean>

  /** SYNTHETIC EVENT HANDLERS **/

  // ----------------------------------------------------
  // Classic Event Handlers
  // ----------------------------------------------------

  // Clipboard Events
  onCopy?: ClipboardEventHandler<T>
  onCut?: ClipboardEventHandler<T>
  onPaste?: ClipboardEventHandler<T>

  // Composition Events
  onCompositionEnd?: CompositionEventHandler<T>
  onCompositionStart?: CompositionEventHandler<T>
  onCompositionUpdate?: CompositionEventHandler<T>

  // Focus Events
  onFocus?: FocusEventHandler<T>
  onBlur?: FocusEventHandler<T>

  // Form Events
  onChange?: ChangeEventHandler<T>
  onInput?: FormEventHandler<T>
  onReset?: FormEventHandler<T>
  onSubmit?: FormEventHandler<T>
  onInvalid?: FormEventHandler<T>

  // Image Events
  onLoad?: ClassicEventHandler<RedEvent<T>, T>
  onError?: ClassicEventHandler<RedEvent<T>, T> // also a Media Event

  // Keyboard Events
  onKeyDown?: KeyboardEventHandler<T>
  onKeyPress?: KeyboardEventHandler<T>
  onKeyUp?: KeyboardEventHandler<T>

  // Media Events
  onAbort?: ClassicEventHandler<RedEvent<T>, T>
  onCanPlay?: ClassicEventHandler<RedEvent<T>, T>
  onCanPlayThrough?: ClassicEventHandler<RedEvent<T>, T>
  onDurationChange?: ClassicEventHandler<RedEvent<T>, T>
  onEmptied?: ClassicEventHandler<RedEvent<T>, T>
  onEncrypted?: ClassicEventHandler<RedEvent<T>, T>
  onEnded?: ClassicEventHandler<RedEvent<T>, T>
  onLoadedData?: ClassicEventHandler<RedEvent<T>, T>
  onLoadedMetadata?: ClassicEventHandler<RedEvent<T>, T>
  onLoadStart?: ClassicEventHandler<RedEvent<T>, T>
  onPause?: ClassicEventHandler<RedEvent<T>, T>
  onPlay?: ClassicEventHandler<RedEvent<T>, T>
  onPlaying?: ClassicEventHandler<RedEvent<T>, T>
  onProgress?: ClassicEventHandler<RedEvent<T>, T>
  onRateChange?: ClassicEventHandler<RedEvent<T>, T>
  onSeeked?: ClassicEventHandler<RedEvent<T>, T>
  onSeeking?: ClassicEventHandler<RedEvent<T>, T>
  onStalled?: ClassicEventHandler<RedEvent<T>, T>
  onSuspend?: ClassicEventHandler<RedEvent<T>, T>
  onTimeUpdate?: ClassicEventHandler<RedEvent<T>, T>
  onVolumeChange?: ClassicEventHandler<RedEvent<T>, T>
  onWaiting?: ClassicEventHandler<RedEvent<T>, T>

  // MouseEvents
  onClick?: MouseEventHandler<T>
  onContextMenu?: MouseEventHandler<T>
  onDblClick?: MouseEventHandler<T>
  onDrag?: DragEventHandler<T>
  onDragEnd?: DragEventHandler<T>
  onDragEnter?: DragEventHandler<T>
  onDragExit?: DragEventHandler<T>
  onDragLeave?: DragEventHandler<T>
  onDragOver?: DragEventHandler<T>
  onDragStart?: DragEventHandler<T>
  onDrop?: DragEventHandler<T>
  onMouseDown?: MouseEventHandler<T>
  onMouseEnter?: MouseEventHandler<T>
  onMouseLeave?: MouseEventHandler<T>
  onMouseMove?: MouseEventHandler<T>
  onMouseOut?: MouseEventHandler<T>
  onMouseOver?: MouseEventHandler<T>
  onMouseUp?: MouseEventHandler<T>

  // Selection Events
  onSelect?: ClassicEventHandler<RedEvent<T>, T>

  // Touch Events
  onTouchCancel?: TouchEventHandler<T>
  onTouchEnd?: TouchEventHandler<T>
  onTouchMove?: TouchEventHandler<T>
  onTouchStart?: TouchEventHandler<T>

  // Pointer events
  onPointerDown?: PointerEventHandler<T>
  onPointerMove?: PointerEventHandler<T>
  onPointerUp?: PointerEventHandler<T>
  onPointerCancel?: PointerEventHandler<T>
  onPointerEnter?: PointerEventHandler<T>
  onPointerLeave?: PointerEventHandler<T>
  onPointerOver?: PointerEventHandler<T>
  onPointerOut?: PointerEventHandler<T>

  // UI Events
  onScroll?: UIEventHandler<T>

  // Wheel Events
  onWheel?: WheelEventHandler<T>

  // Animation Events
  onAnimationStart?: AnimationEventHandler<T>
  onAnimationEnd?: AnimationEventHandler<T>
  onAnimationIteration?: AnimationEventHandler<T>

  // Transition Events
  onTransitionEnd?: TransitionEventHandler<T>

  //
  // Reactive Event Handlers
  // ----------------------------------------------------

  // Clipboard Events
  onCopy$?: ReactiveClipboardEventHandler<T>
  onCut$?: ReactiveClipboardEventHandler<T>
  onPaste$?: ReactiveClipboardEventHandler<T>

  // Composition Events
  onCompositionEnd$?: ReactiveCompositionEventHandler<T>
  onCompositionStart$?: ReactiveCompositionEventHandler<T>
  onCompositionUpdate$?: ReactiveCompositionEventHandler<T>

  // Focus Events
  onFocus$?: ReactiveFocusEventHandler<T>
  onBlur$?: ReactiveFocusEventHandler<T>

  // Form Events
  onChange$?:
    | ReactiveChangeEventHandler<T>
    | ReactiveControlledFormEventHandler<RedChangeEvent<T>, T>
  onInput$?: ReactiveFormEventHandler<T> | ReactiveControlledFormEventHandler<RedFormEvent<T>, T>
  onReset$?: ReactiveFormEventHandler<T>
  onSubmit$?: ReactiveFormEventHandler<T>
  onInvalid$?: ReactiveFormEventHandler<T>

  // Image Events
  onLoad$?: ReactiveEventHandler<RedEvent<T>, T>
  onError$?: ReactiveEventHandler<RedEvent<T>, T> // also a Media Event

  // Keyboard Events
  onKeyDown$?: ReactiveKeyboardEventHandler<T>
  onKeyPress$?: ReactiveKeyboardEventHandler<T>
  onKeyUp$?: ReactiveKeyboardEventHandler<T>

  // Media Events
  onAbort$?: ReactiveEventHandler<RedEvent<T>, T>
  onCanPlay$?: ReactiveEventHandler<RedEvent<T>, T>
  onCanPlayThrough$?: ReactiveEventHandler<RedEvent<T>, T>
  onDurationChange$?: ReactiveEventHandler<RedEvent<T>, T>
  onEmptied$?: ReactiveEventHandler<RedEvent<T>, T>
  onEncrypted$?: ReactiveEventHandler<RedEvent<T>, T>
  onEnded$?: ReactiveEventHandler<RedEvent<T>, T>
  onLoadedData$?: ReactiveEventHandler<RedEvent<T>, T>
  onLoadedMetadata$?: ReactiveEventHandler<RedEvent<T>, T>
  onLoadStart$?: ReactiveEventHandler<RedEvent<T>, T>
  onPause$?: ReactiveEventHandler<RedEvent<T>, T>
  onPlay$?: ReactiveEventHandler<RedEvent<T>, T>
  onPlaying$?: ReactiveEventHandler<RedEvent<T>, T>
  onProgress$?: ReactiveEventHandler<RedEvent<T>, T>
  onRateChange$?: ReactiveEventHandler<RedEvent<T>, T>
  onSeeked$?: ReactiveEventHandler<RedEvent<T>, T>
  onSeeking$?: ReactiveEventHandler<RedEvent<T>, T>
  onStalled$?: ReactiveEventHandler<RedEvent<T>, T>
  onSuspend$?: ReactiveEventHandler<RedEvent<T>, T>
  onTimeUpdate$?: ReactiveEventHandler<RedEvent<T>, T>
  onVolumeChange$?: ReactiveEventHandler<RedEvent<T>, T>
  onWaiting$?: ReactiveEventHandler<RedEvent<T>, T>

  // MouseEvents
  onClick$?: ReactiveMouseEventHandler<T>
  onContextMenu$?: ReactiveMouseEventHandler<T>
  onDblClick$?: ReactiveMouseEventHandler<T>
  onDrag$?: ReactiveDragEventHandler<T>
  onDragEnd$?: ReactiveDragEventHandler<T>
  onDragEnter$?: ReactiveDragEventHandler<T>
  onDragExit$?: ReactiveDragEventHandler<T>
  onDragLeave$?: ReactiveDragEventHandler<T>
  onDragOver$?: ReactiveDragEventHandler<T>
  onDragStart$?: ReactiveDragEventHandler<T>
  onDrop$?: ReactiveDragEventHandler<T>
  onMouseDown$?: ReactiveMouseEventHandler<T>
  onMouseEnter$?: ReactiveMouseEventHandler<T>
  onMouseLeave$?: ReactiveMouseEventHandler<T>
  onMouseMove$?: ReactiveMouseEventHandler<T>
  onMouseOut$?: ReactiveMouseEventHandler<T>
  onMouseOver$?: ReactiveMouseEventHandler<T>
  onMouseUp$?: ReactiveMouseEventHandler<T>

  // Selection Events
  onSelect$?: ReactiveEventHandler<RedEvent<T>, T>

  // Touch Events
  onTouchCancel$?: ReactiveTouchEventHandler<T>
  onTouchEnd$?: ReactiveTouchEventHandler<T>
  onTouchMove$?: ReactiveTouchEventHandler<T>
  onTouchStart$?: ReactiveTouchEventHandler<T>

  // Pointer events
  onPointerDown$?: ReactivePointerEventHandler<T>
  onPointerMove$?: ReactivePointerEventHandler<T>
  onPointerUp$?: ReactivePointerEventHandler<T>
  onPointerCancel$?: ReactivePointerEventHandler<T>
  onPointerEnter$?: ReactivePointerEventHandler<T>
  onPointerLeave$?: ReactivePointerEventHandler<T>
  onPointerOver$?: ReactivePointerEventHandler<T>
  onPointerOut$?: ReactivePointerEventHandler<T>

  // UI Events
  onScroll$?: ReactiveUIEventHandler<T>

  // Wheel Events
  onWheel$?: ReactiveWheelEventHandler<T>

  // Animation Events
  onAnimationStart$?: ReactiveAnimationEventHandler<T>
  onAnimationEnd$?: ReactiveAnimationEventHandler<T>
  onAnimationIteration$?: ReactiveAnimationEventHandler<T>

  // Transition Events
  onTransitionEnd$?: ReactiveTransitionEventHandler<T>
}

export type HTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticHTMLAttributes<T>]:
    | StaticHTMLAttributes<T>[V]
    | Observable<StaticHTMLAttributes<T>[V]>
}

interface StaticHTMLAttributes<T extends EventTarget> extends DOMAttributes<T> {
  // Standard HTML Attributes
  accessKey?: string
  class?: string
  className?: string
  contentEditable?: boolean
  contextMenu?: string
  dir?: string
  draggable?: boolean
  hidden?: boolean
  id?: string
  lang?: string
  slot?: string
  spellCheck?: boolean
  style?: css.CSSProperties | string
  styleName?: string // CSS Modules support
  tabIndex?: number
  title?: string

  // Unknown
  inputMode?: string
  is?: string
  radioGroup?: string // <command>, <menuitem>

  // WAI-ARIA
  role?: string

  // RDFa Attributes
  about?: string
  datatype?: string
  inlist?: unknown
  prefix?: string
  property?: string
  resource?: string
  typeof?: string
  vocab?: string

  // Non-standard Attributes
  autoCapitalize?: string
  autoCorrect?: string
  autoSave?: string
  color?: string
  itemProp?: string
  itemScope?: boolean
  itemType?: string
  itemID?: string
  itemRef?: string
  results?: number
  security?: string
  unselectable?: boolean

  /**
   * Identifies the currently active element when DOM focus is
   * on a composite widget, textbox, group, or application.
   */
  'aria-activedescendant'?: string
  /**
   * Indicates whether assistive technologies will present all,
   * or only parts of, the changed region based on the change
   * notifications defined by the aria-relevant attribute.
   */
  'aria-atomic'?: boolean | 'false' | 'true'
  /**
   * Indicates whether inputting text could trigger display of
   * one or more predictions of the user's intended value for an
   * input and specifies how predictions would be
   * presented if they are made.
   */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both'
  /**
   * Indicates an element is being modified and that assistive technologies
   * MAY want to wait until the modifications are complete before exposing them to the user.
   */
  'aria-busy'?: boolean | 'false' | 'true'
  /**
   * Indicates the current "checked" state of checkboxes,
   * radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  'aria-checked'?: boolean | 'false' | 'mixed' | 'true'
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  'aria-colcount'?: number
  /**
   * Defines an element's column index or position with respect to the
   * total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  'aria-colindex'?: number
  /**
   * Defines the number of columns spanned by a cell or gridcell
   * within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  'aria-colspan'?: number
  /**
   * Indicates the element that represents the current item within
   * a container or set of related elements.
   */
  'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'aria-describedby'?: string
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  'aria-details'?: string
  /**
   * Indicates that the element is perceivable but disabled,
   * so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  'aria-disabled'?: boolean | 'false' | 'true'
  /**
   * Indicates what functions can be performed when
   * a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  'aria-errormessage'?: string
  /**
   * Indicates whether the element, or another grouping
   * element it controls, is currently expanded or collapsed.
   */
  'aria-expanded'?: boolean | 'false' | 'true'
  /**
   * Identifies the next element (or elements) in an alternate
   * reading order of content which, at the user's discretion,
   * allows assistive technology to override the general
   * default of reading in document source order.
   */
  'aria-flowto'?: string
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  'aria-grabbed'?: boolean | 'false' | 'true'
  /**
   * Indicates the availability and type of interactive
   * popup element, such as menu or dialog, that can be
   * triggered by an element.
   */
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  'aria-hidden'?: boolean | 'false' | 'true'
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling'
  /**
   * Indicates keyboard shortcuts that an author has
   * implemented to activate or give focus to an element.
   */
  'aria-keyshortcuts'?: string
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label'?: string
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby'?: string
  /** Defines the hierarchical level of an element within a structure. */
  'aria-level'?: number
  /**
   * Indicates that an element will be updated, and describes the types
   * of updates the user agents, assistive technologies, and user can expect
   * from the live region.
   */
  'aria-live'?: 'off' | 'assertive' | 'polite'
  /** Indicates whether an element is modal when displayed. */
  'aria-modal'?: boolean | 'false' | 'true'
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  'aria-multiline'?: boolean | 'false' | 'true'
  /**
   * Indicates that the user may select more
   * than one item from the current selectable descendants.
   */
  'aria-multiselectable'?: boolean | 'false' | 'true'
  /**
   * Indicates whether the element's orientation is horizontal,
   * vertical, or unknown/ambiguous.
   */
  'aria-orientation'?: 'horizontal' | 'vertical'
  /**
   * Identifies an element (or elements) in order to define a visual,
   * functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used
   * to represent the relationship.
   * @see aria-controls.
   */
  'aria-owns'?: string
  /**
   * Defines a short hint (a word or short phrase) intended
   * to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  'aria-placeholder'?: string
  /**
   * Defines an element's number or position in the current set of listitems
   * or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  'aria-posinset'?: number
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  'aria-pressed'?: boolean | 'false' | 'mixed' | 'true'
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  'aria-readonly'?: boolean | 'false' | 'true'
  /**
   * Indicates what notifications the user agent will trigger when
   * the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text'
  /** Indicates that user input is required on the element before a form may be submitted. */
  'aria-required'?: boolean | 'false' | 'true'
  /** Defines a human-readable, author-localized description for the role of an element. */
  'aria-roledescription'?: string
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  'aria-rowcount'?: number
  /**
   * Defines an element's row index or position with respect to
   * the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  'aria-rowindex'?: number
  /**
   * Defines the number of rows spanned by a cell
   * or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  'aria-rowspan'?: number
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  'aria-selected'?: boolean | 'false' | 'true'
  /**
   * Defines the number of items in the current set of listitems
   * or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  'aria-setsize'?: number
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other'
  /** Defines the maximum allowed value for a range widget. */
  'aria-valuemax'?: number
  /** Defines the minimum allowed value for a range widget. */
  'aria-valuemin'?: number
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  'aria-valuenow'?: number
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  'aria-valuetext'?: string
}

export type AnchorHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticAnchorHTMLAttributes<T>]:
    | StaticAnchorHTMLAttributes<T>[V]
    | Observable<StaticAnchorHTMLAttributes<T>[V]>
}

interface StaticAnchorHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  download?: unknown
  href?: string
  hrefLang?: string
  media?: string
  rel?: string
  target?: string
  type?: string
  as?: string
}

export type AudioHTMLAttributes<T extends EventTarget> = MediaHTMLAttributes<T>

export type AreaHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticAreaHTMLAttributes<T>]:
    | StaticAreaHTMLAttributes<T>[V]
    | Observable<StaticAreaHTMLAttributes<T>[V]>
}

interface StaticAreaHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  alt?: string
  coords?: string
  download?: unknown
  href?: string
  hrefLang?: string
  media?: string
  rel?: string
  shape?: string
  target?: string
}

export type BaseHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticBaseHTMLAttributes<T>]:
    | StaticBaseHTMLAttributes<T>[V]
    | Observable<StaticBaseHTMLAttributes<T>[V]>
}

interface StaticBaseHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  href?: string
  target?: string
}

export type BlockquoteHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticBlockquoteHTMLAttributes<T>]:
    | StaticBlockquoteHTMLAttributes<T>[V]
    | Observable<StaticBlockquoteHTMLAttributes<T>[V]>
}

interface StaticBlockquoteHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  cite?: string
}

export type ButtonHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticButtonHTMLAttributes<T>]:
    | StaticButtonHTMLAttributes<T>[V]
    | Observable<StaticButtonHTMLAttributes<T>[V]>
}

interface StaticButtonHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  autoFocus?: boolean
  disabled?: boolean
  form?: string
  formAction?: string
  formEncType?: string
  formMethod?: string
  formNoValidate?: boolean
  formTarget?: string
  name?: string
  type?: string
  value?: string
}

export type CanvasHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticCanvasHTMLAttributes<T>]:
    | StaticCanvasHTMLAttributes<T>[V]
    | Observable<StaticCanvasHTMLAttributes<T>[V]>
}

interface StaticCanvasHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  height?: number | string
  width?: number | string
}

export type ColHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticColHTMLAttributes<T>]:
    | StaticColHTMLAttributes<T>[V]
    | Observable<StaticColHTMLAttributes<T>[V]>
}

interface StaticColHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  span?: number
  width?: number | string
}

export type ColgroupHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticColgroupHTMLAttributes<T>]:
    | StaticColgroupHTMLAttributes<T>[V]
    | Observable<StaticColgroupHTMLAttributes<T>[V]>
}

interface StaticColgroupHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  span?: number
}

export type DetailsHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticDetailsHTMLAttributes<T>]:
    | StaticDetailsHTMLAttributes<T>[V]
    | Observable<StaticDetailsHTMLAttributes<T>[V]>
}

interface StaticDetailsHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  open?: boolean
}

export type DelHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticDelHTMLAttributes<T>]:
    | StaticDelHTMLAttributes<T>[V]
    | Observable<StaticDelHTMLAttributes<T>[V]>
}

interface StaticDelHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  cite?: string
  dateTime?: string
}

export type DialogHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticDialogHTMLAttributes<T>]:
    | StaticDialogHTMLAttributes<T>[V]
    | Observable<StaticDialogHTMLAttributes<T>[V]>
}

interface StaticDialogHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  open?: boolean
}

export type EmbedHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticEmbedHTMLAttributes<T>]:
    | StaticEmbedHTMLAttributes<T>[V]
    | Observable<StaticEmbedHTMLAttributes<T>[V]>
}

interface StaticEmbedHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  height?: number | string
  src?: string
  type?: string
  width?: number | string
}

export type FieldsetHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticFieldsetHTMLAttributes<T>]:
    | StaticFieldsetHTMLAttributes<T>[V]
    | Observable<StaticFieldsetHTMLAttributes<T>[V]>
}

interface StaticFieldsetHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  disabled?: boolean
  form?: string
  name?: string
}

export type FormHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticStaticFormHTMLAttributes<T>]:
    | StaticStaticFormHTMLAttributes<T>[V]
    | Observable<StaticStaticFormHTMLAttributes<T>[V]>
}

interface StaticStaticFormHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  acceptCharset?: string
  action?: string
  autoComplete?: string
  encType?: string
  method?: string
  name?: string
  noValidate?: boolean
  target?: string
}

export type HtmlHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticHtmlHTMLAttributes<T>]:
    | StaticHtmlHTMLAttributes<T>[V]
    | Observable<StaticHtmlHTMLAttributes<T>[V]>
}

interface StaticHtmlHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  manifest?: string
}

export type IframeHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticIframeHTMLAttributes<T>]:
    | StaticIframeHTMLAttributes<T>[V]
    | Observable<StaticIframeHTMLAttributes<T>[V]>
}

interface StaticIframeHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  allowFullScreen?: boolean
  allowTransparency?: boolean
  frameBorder?: number | string
  height?: number | string
  marginHeight?: number
  marginWidth?: number
  name?: string
  sandbox?: string
  scrolling?: string
  seamless?: boolean
  src?: string
  srcDoc?: string
  width?: number | string
}

export type ImgHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticImgHTMLAttributes<T>]:
    | StaticImgHTMLAttributes<T>[V]
    | Observable<StaticImgHTMLAttributes<T>[V]>
}

interface StaticImgHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  alt?: string
  crossOrigin?:
    | 'anonymous'
    | 'use-credentials'
    | ''
    | Observable<'anonymous' | 'use-credentials' | ''>
  height?: number | string
  sizes?: string
  src?: string
  srcSet?: string
  useMap?: string
  width?: number | string
}

export type InsHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticInsHTMLAttributes<T>]:
    | StaticInsHTMLAttributes<T>[V]
    | Observable<StaticInsHTMLAttributes<T>[V]>
}

interface StaticInsHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  cite?: string
  dateTime?: string
}

export type InputHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticInputHTMLAttributes<T>]:
    | StaticInputHTMLAttributes<T>[V]
    | Observable<StaticInputHTMLAttributes<T>[V]>
}

interface StaticInputHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  accept?: string
  alt?: string
  autoComplete?: string
  autoFocus?: boolean
  capture?: boolean
  checked?: boolean
  crossOrigin?: string
  disabled?: boolean
  form?: string
  formAction?: string
  formEncType?: string
  formMethod?: string
  formNoValidate?: boolean
  formTarget?: string
  height?: number | string
  list?: string
  max?: number | string
  maxLength?: number
  min?: number | string
  minLength?: number
  multiple?: boolean
  name?: string
  pattern?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  size?: number
  src?: string
  step?: number | string
  type?: string
  value?: string | number
  defaultValue?: string | number
  width?: number | string

  onChange?: ChangeEventHandler<T>
  onChange$?:
    | ReactiveChangeEventHandler<T>
    | ReactiveControlledFormEventHandler<RedChangeEvent<T>, T>
}

export type KeygenHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticKeygenHTMLAttributes<T>]:
    | StaticKeygenHTMLAttributes<T>[V]
    | Observable<StaticKeygenHTMLAttributes<T>[V]>
}

interface StaticKeygenHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  autoFocus?: boolean
  challenge?: string
  disabled?: boolean
  form?: string
  keyType?: string
  keyParams?: string
  name?: string
}

export type LabelHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticLabelHTMLAttributes<T>]:
    | StaticLabelHTMLAttributes<T>[V]
    | Observable<StaticLabelHTMLAttributes<T>[V]>
}

interface StaticLabelHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  form?: string
  htmlFor?: string
}

export type LiHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticLiHTMLAttributes<T>]:
    | StaticLiHTMLAttributes<T>[V]
    | Observable<StaticLiHTMLAttributes<T>[V]>
}

interface StaticLiHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  value?: string | string[] | number
}

export type LinkHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticLinkHTMLAttributes<T>]:
    | StaticLinkHTMLAttributes<T>[V]
    | Observable<StaticLinkHTMLAttributes<T>[V]>
}

interface StaticLinkHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  as?: string
  crossOrigin?: string
  href?: string
  hrefLang?: string
  integrity?: string
  media?: string
  rel?: string
  sizes?: string
  type?: string
}

export type MapHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticMapHTMLAttributes<T>]:
    | StaticMapHTMLAttributes<T>[V]
    | Observable<StaticMapHTMLAttributes<T>[V]>
}

interface StaticMapHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  name?: string
}

export type MenuHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticMenuHTMLAttributes<T>]:
    | StaticMenuHTMLAttributes<T>[V]
    | Observable<StaticMenuHTMLAttributes<T>[V]>
}

interface StaticMenuHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  type?: string
}

export type MediaHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticMediaHTMLAttributes<T>]:
    | StaticMediaHTMLAttributes<T>[V]
    | Observable<StaticMediaHTMLAttributes<T>[V]>
}

interface StaticMediaHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  autoPlay?: boolean
  controls?: boolean
  controlsList?: string
  crossOrigin?: string
  loop?: boolean
  mediaGroup?: string
  muted?: boolean
  playsinline?: boolean
  preload?: string
  src?: string
}

export type MetaHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticMetaHTMLAttributes<T>]:
    | StaticMetaHTMLAttributes<T>[V]
    | Observable<StaticMetaHTMLAttributes<T>[V]>
}

interface StaticMetaHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  charSet?: string
  content?: string
  httpEquiv?: string
  name?: string
}

export type MeterHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticMeterHTMLAttributes<T>]:
    | StaticMeterHTMLAttributes<T>[V]
    | Observable<StaticMeterHTMLAttributes<T>[V]>
}

interface StaticMeterHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  form?: string
  high?: number
  low?: number
  max?: number | string
  min?: number | string
  optimum?: number
  value?: string | string[] | number
}

export type QuoteHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticQuoteHTMLAttributes<T>]:
    | StaticQuoteHTMLAttributes<T>[V]
    | Observable<StaticQuoteHTMLAttributes<T>[V]>
}

interface StaticQuoteHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  cite?: string
}

export type ObjectHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticObjectHTMLAttributes<T>]:
    | StaticObjectHTMLAttributes<T>[V]
    | Observable<StaticObjectHTMLAttributes<T>[V]>
}

interface StaticObjectHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  classID?: string
  data?: string
  form?: string
  height?: number | string
  name?: string
  type?: string
  useMap?: string
  width?: number | string
  wmode?: string
}

export type OlHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticOlHTMLAttributes<T>]:
    | StaticOlHTMLAttributes<T>[V]
    | Observable<StaticOlHTMLAttributes<T>[V]>
}

interface StaticOlHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  reversed?: boolean
  start?: number
}

export type OptgroupHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticOptgroupHTMLAttributes<T>]:
    | StaticOptgroupHTMLAttributes<T>[V]
    | Observable<StaticOptgroupHTMLAttributes<T>[V]>
}

interface StaticOptgroupHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  disabled?: boolean
  label?: string
}

export type OptionHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticOptionHTMLAttributes<T>]:
    | StaticOptionHTMLAttributes<T>[V]
    | Observable<StaticOptionHTMLAttributes<T>[V]>
}

interface StaticOptionHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  disabled?: boolean
  label?: string
  selected?: boolean
  value?: string | string[] | number
}

export type OutputHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticOutputHTMLAttributes<T>]:
    | StaticOutputHTMLAttributes<T>[V]
    | Observable<StaticOutputHTMLAttributes<T>[V]>
}

interface StaticOutputHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  form?: string
  htmlFor?: string
  name?: string
}

export type ParamHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticParamHTMLAttributes<T>]:
    | StaticParamHTMLAttributes<T>[V]
    | Observable<StaticParamHTMLAttributes<T>[V]>
}

interface StaticParamHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  name?: string
  value?: string | string[] | number
}

export type ProgressHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticProgressHTMLAttributes<T>]:
    | StaticProgressHTMLAttributes<T>[V]
    | Observable<StaticProgressHTMLAttributes<T>[V]>
}

interface StaticProgressHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  max?: number | string
  value?: string | string[] | number
}

export type ScriptHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticScriptHTMLAttributes<T>]:
    | StaticScriptHTMLAttributes<T>[V]
    | Observable<StaticScriptHTMLAttributes<T>[V]>
}

interface StaticScriptHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  async?: boolean
  charSet?: string
  crossOrigin?: string
  defer?: boolean
  integrity?: string
  nonce?: string
  src?: string
  type?: string
}

export type SelectHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticSelectHTMLAttributes<T>]:
    | StaticSelectHTMLAttributes<T>[V]
    | Observable<StaticSelectHTMLAttributes<T>[V]>
}

interface StaticSelectHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  autoFocus?: boolean
  disabled?: boolean
  form?: string
  multiple?: boolean
  name?: string
  required?: boolean
  size?: number
  value?: string | string[] | number | number[]
  defaultValue?: string | string[] | number | number[]
  selectedIndex?: number
  onChange?: ChangeEventHandler<T>
  onChange$?:
    | ReactiveChangeEventHandler<T>
    | ReactiveControlledFormEventHandler<RedChangeEvent<T>, T>
}

export type SourceHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticSourceHTMLAttributes<T>]:
    | StaticSourceHTMLAttributes<T>[V]
    | Observable<StaticSourceHTMLAttributes<T>[V]>
}

interface StaticSourceHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  media?: string
  sizes?: string
  src?: string
  srcSet?: string
  type?: string
}

export type StyleHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticStyleHTMLAttributes<T>]:
    | StaticStyleHTMLAttributes<T>[V]
    | Observable<StaticStyleHTMLAttributes<T>[V]>
}

interface StaticStyleHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  media?: string
  nonce?: string
  scoped?: boolean
  type?: string
}

export type TableHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticTableHTMLAttributes<T>]:
    | StaticTableHTMLAttributes<T>[V]
    | Observable<StaticTableHTMLAttributes<T>[V]>
}

interface StaticTableHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  cellPadding?: number | string
  cellSpacing?: number | string
  summary?: string
}

export type TextareaHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticTextareaHTMLAttributes<T>]:
    | StaticTextareaHTMLAttributes<T>[V]
    | Observable<StaticTextareaHTMLAttributes<T>[V]>
}

interface StaticTextareaHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  autoComplete?: string
  autoFocus?: boolean
  cols?: number
  dirName?: string
  disabled?: boolean
  form?: string
  maxLength?: number
  minLength?: number
  name?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  rows?: number
  value?: string | number
  defaultValue?: string | number
  wrap?: string

  onChange?: ChangeEventHandler<T>
  onChange$?: ReactiveChangeEventHandler<T>
}

export type TdHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticTdHTMLAttributes<T>]:
    | StaticTdHTMLAttributes<T>[V]
    | Observable<StaticTdHTMLAttributes<T>[V]>
}

interface StaticTdHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  colSpan?: number
  headers?: string
  rowSpan?: number
  scope?: string
}

export type ThHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticThHTMLAttributes<T>]:
    | StaticThHTMLAttributes<T>[V]
    | Observable<StaticThHTMLAttributes<T>[V]>
}

interface StaticThHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  colSpan?: number
  headers?: string
  rowSpan?: number
  scope?: string
}

export type TimeHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticTimeHTMLAttributes<T>]:
    | StaticTimeHTMLAttributes<T>[V]
    | Observable<StaticTimeHTMLAttributes<T>[V]>
}

interface StaticTimeHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  dateTime?: string
}

export type TrackHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticTrackHTMLAttributes<T>]:
    | StaticTrackHTMLAttributes<T>[V]
    | Observable<StaticTrackHTMLAttributes<T>[V]>
}

interface StaticTrackHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  default?: boolean
  kind?: string
  label?: string
  src?: string
  srcLang?: string
}

export type VideoHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticVideoHTMLAttributes<T>]:
    | StaticVideoHTMLAttributes<T>[V]
    | Observable<StaticVideoHTMLAttributes<T>[V]>
}

interface StaticVideoHTMLAttributes<T extends EventTarget> extends StaticMediaHTMLAttributes<T> {
  height?: number | string
  playsInline?: boolean
  poster?: string
  width?: number | string
}

// this list is "complete" in that it contains every SVG attribute
// that Inferno supports, but the types can be improved.
// Full list here: https://facebook.github.io/Inferno/docs/dom-elements.html
//
// The three broad type categories are (in order of restrictiveness):
//   - "number | string"
//   - "string"
//   - union of string literals
export type SVGAttributes<T extends EventTarget> = {
  [V in keyof StaticSVGAttributes<T>]:
    | StaticSVGAttributes<T>[V]
    | Observable<StaticSVGAttributes<T>[V]>
}

interface StaticSVGAttributes<T extends EventTarget> extends DOMAttributes<T> {
  // Attributes which also defined in HTMLAttributes
  // See comment in SVGDOMPropertyConfig.old_lib
  class?: string
  className?: string
  color?: string
  height?: number | string
  id?: string
  lang?: string
  max?: number | string
  media?: string
  method?: string
  min?: number | string
  name?: string
  style?: css.CSSProperties
  target?: string
  type?: string
  width?: number | string

  // Other HTML properties supported by SVG elements in browsers
  role?: string
  tabIndex?: number

  // SVG Specific attributes
  accentHeight?: number | string
  accumulate?: 'none' | 'sum'
  additive?: 'replace' | 'sum'
  alignmentBaseline?:
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'inherit'
  allowReorder?: 'no' | 'yes'
  alphabetic?: number | string
  amplitude?: number | string
  arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated'
  ascent?: number | string
  attributeName?: string
  attributeType?: string
  autoReverse?: number | string
  azimuth?: number | string
  baseFrequency?: number | string
  baselineShift?: number | string
  baseProfile?: number | string
  bbox?: number | string
  begin?: number | string
  bias?: number | string
  by?: number | string
  calcMode?: number | string
  capHeight?: number | string
  clip?: number | string
  clipPath?: string
  clipPathUnits?: number | string
  clipRule?: number | string
  colorInterpolation?: number | string
  colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
  colorProfile?: number | string
  colorRendering?: number | string
  contentScriptType?: number | string
  contentStyleType?: number | string
  cursor?: number | string
  cx?: number | string
  cy?: number | string
  d?: string
  decelerate?: number | string
  descent?: number | string
  diffuseConstant?: number | string
  direction?: number | string
  display?: number | string
  divisor?: number | string
  dominantBaseline?: number | string
  dur?: number | string
  dx?: number | string
  dy?: number | string
  edgeMode?: number | string
  elevation?: number | string
  enableBackground?: number | string
  end?: number | string
  exponent?: number | string
  externalResourcesRequired?: number | string
  fill?: string
  fillOpacity?: number | string
  fillRule?: 'nonzero' | 'evenodd' | 'inherit'
  filter?: string
  filterRes?: number | string
  filterUnits?: number | string
  floodColor?: number | string
  floodOpacity?: number | string
  focusable?: number | string
  fontFamily?: string
  fontSize?: number | string
  fontSizeAdjust?: number | string
  fontStretch?: number | string
  fontStyle?: number | string
  fontVariant?: number | string
  fontWeight?: number | string
  format?: number | string
  from?: number | string
  fx?: number | string
  fy?: number | string
  g1?: number | string
  g2?: number | string
  glyphName?: number | string
  glyphOrientationHorizontal?: number | string
  glyphOrientationVertical?: number | string
  glyphRef?: number | string
  gradientTransform?: string
  gradientUnits?: string
  hanging?: number | string
  horizAdvX?: number | string
  horizOriginX?: number | string
  ideographic?: number | string
  imageRendering?: number | string
  in2?: number | string
  in?: string
  intercept?: number | string
  k1?: number | string
  k2?: number | string
  k3?: number | string
  k4?: number | string
  k?: number | string
  kernelMatrix?: number | string
  kernelUnitLength?: number | string
  kerning?: number | string
  keyPoints?: number | string
  keySplines?: number | string
  keyTimes?: number | string
  lengthAdjust?: number | string
  letterSpacing?: number | string
  lightingColor?: number | string
  limitingConeAngle?: number | string
  local?: number | string
  markerEnd?: string
  markerHeight?: number | string
  markerMid?: string
  markerStart?: string
  markerUnits?: number | string
  markerWidth?: number | string
  mask?: string
  maskContentUnits?: number | string
  maskUnits?: number | string
  mathematical?: number | string
  mode?: number | string
  numOctaves?: number | string
  offset?: number | string
  opacity?: number | string
  operator?: number | string
  order?: number | string
  orient?: number | string
  orientation?: number | string
  origin?: number | string
  overflow?: number | string
  overlinePosition?: number | string
  overlineThickness?: number | string
  paintOrder?: number | string
  panose1?: number | string
  pathLength?: number | string
  patternContentUnits?: string
  patternTransform?: number | string
  patternUnits?: string
  pointerEvents?: number | string
  points?: string
  pointsAtX?: number | string
  pointsAtY?: number | string
  pointsAtZ?: number | string
  preserveAlpha?: number | string
  preserveAspectRatio?: string
  primitiveUnits?: number | string
  r?: number | string
  radius?: number | string
  refX?: number | string
  refY?: number | string
  renderingIntent?: number | string
  repeatCount?: number | string
  repeatDur?: number | string
  requiredExtensions?: number | string
  requiredFeatures?: number | string
  restart?: number | string
  result?: string
  rotate?: number | string
  rx?: number | string
  ry?: number | string
  scale?: number | string
  seed?: number | string
  shapeRendering?: number | string
  slope?: number | string
  spacing?: number | string
  specularConstant?: number | string
  specularExponent?: number | string
  speed?: number | string
  spreadMethod?: string
  startOffset?: number | string
  stdDeviation?: number | string
  stemh?: number | string
  stemv?: number | string
  stitchTiles?: number | string
  stopColor?: string
  stopOpacity?: number | string
  strikethroughPosition?: number | string
  strikethroughThickness?: number | string
  string?: number | string
  stroke?: string
  strokeDasharray?: string | number
  strokeDashoffset?: string | number
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit'
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit'
  strokeMiterlimit?: number | string
  strokeOpacity?: number | string
  strokeWidth?: number | string
  surfaceScale?: number | string
  systemLanguage?: number | string
  tableValues?: number | string
  targetX?: number | string
  targetY?: number | string
  textAnchor?: string
  textDecoration?: number | string
  textLength?: number | string
  textRendering?: number | string
  to?: number | string
  transform?: string
  u1?: number | string
  u2?: number | string
  underlinePosition?: number | string
  underlineThickness?: number | string
  unicode?: number | string
  unicodeBidi?: number | string
  unicodeRange?: number | string
  unitsPerEm?: number | string
  vAlphabetic?: number | string
  values?: string
  vectorEffect?: number | string
  version?: string
  vertAdvY?: number | string
  vertOriginX?: number | string
  vertOriginY?: number | string
  vHanging?: number | string
  vIdeographic?: number | string
  viewBox?: string
  viewTarget?: number | string
  visibility?: number | string
  vMathematical?: number | string
  widths?: number | string
  wordSpacing?: number | string
  writingMode?: number | string
  x1?: number | string
  x2?: number | string
  x?: number | string
  xChannelSelector?: string
  xHeight?: number | string
  xlinkActuate?: string
  xlinkArcrole?: string
  xlinkHref?: string
  xlinkRole?: string
  xlinkShow?: string
  xlinkTitle?: string
  xlinkType?: string
  xmlBase?: string
  xmlLang?: string
  xmlns?: string
  xmlnsXlink?: string
  xmlSpace?: string
  y1?: number | string
  y2?: number | string
  y?: number | string
  yChannelSelector?: string
  z?: number | string
  zoomAndPan?: string
}

export type WebViewHTMLAttributes<T extends EventTarget> = {
  [V in keyof StaticWebViewHTMLAttributes<T>]:
    | StaticWebViewHTMLAttributes<T>[V]
    | Observable<StaticWebViewHTMLAttributes<T>[V]>
}

interface StaticWebViewHTMLAttributes<T extends EventTarget> extends StaticHTMLAttributes<T> {
  allowFullScreen?: boolean
  allowpopups?: boolean
  autoFocus?: boolean
  autosize?: boolean
  blinkfeatures?: string
  disableblinkfeatures?: string
  disableguestresize?: boolean
  disablewebsecurity?: boolean
  guestinstance?: string
  httpreferrer?: string
  nodeintegration?: boolean
  partition?: string
  plugins?: boolean
  preload?: string
  src?: string
  useragent?: string
  webpreferences?: string
}
