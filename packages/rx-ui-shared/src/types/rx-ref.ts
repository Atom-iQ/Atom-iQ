import {RxObservableProp, RxStaticProp} from './dom/props';

export interface RxRefPropReference<
  T extends RxStaticProp = RxStaticProp
  > {
  prop$?: RxObservableProp<T>;
  next?: (nextPropValue: T) => void;
  staticProp?: T;
}

export type RxRefPropsMap<P extends RxProps> =
  Record<keyof P, RxRefPropReference>;

export interface RxRef<
  P extends RxProps = RxProps
> {
  props: RxRefPropsMap<P>
}

export type RxRefProp = () => RxRef;
