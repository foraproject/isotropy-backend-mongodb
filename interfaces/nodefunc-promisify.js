declare module "nodefunc-promisify" {
  //declare type NodeCallbackWithoutResultType = (err?: Error) => void;
  declare type NodeCallbackType<TResult> = (err?: Error, result: TResult) => void;

  // declare type AsyncAction = () => Promise<void>;
  // declare type AsyncAction1<T1> = (p1: T1) => Promise<void>;
  // declare type AsyncAction2<T1, T2> = (p1: T1, p2: T2) => Promise<void>;
  // declare type AsyncAction3<T1, T2, T3> = (p1: T1, p2: T2, p3: T3) => Promise<void>;
  // declare type AsyncAction4<T1, T2, T3, T4> = (p1: T1, p2: T2, p3: T3, p4: T4) => Promise<void>;
  // declare type AsyncAction5<T1, T2, T3, T4, T5> = (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5) => Promise<void>;
  // declare type AsyncAction6<T1, T2, T3, T4, T5, T6> = (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6) => Promise<void>;
  //
  // declare function exports(
  //   nodefunc: (cb: NodeCallbackWithoutResultType) => void
  // ) : AsyncAction;
  //
  // declare function exports<T1>(
  //   nodefunc: (p1: T1, cb: NodeCallbackWithoutResultType) => void
  // ) : AsyncAction1<T1>;
  //
  // declare function exports<T1, T2>(
  //   nodefunc: (p1: T1, p2: T2, cb: NodeCallbackWithoutResultType) => void
  // ) : AsyncAction2<T1, T2>;
  //
  // declare function exports<T1, T2, T3>(
  //   nodefunc: (p1: T1, p2: T2, p3: T3, cb: NodeCallbackWithoutResultType) => void
  // ) : AsyncAction3<T1, T2, T3>;
  //
  // declare function exports<T1, T2, T3, T4>(
  //   nodefunc: (p1: T1, p2: T2, p3: T3, p4: T4, cb: NodeCallbackWithoutResultType) => void
  // ) : AsyncAction4<T1, T2, T3, T4>;
  //
  // declare function exports<T1, T2, T3, T4, T5>(
  //   nodefunc: (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, cb: NodeCallbackWithoutResultType) => void
  // ) : AsyncAction5<T1, T2, T3, T4, T5>;
  //
  // declare function exports<T1, T2, T3, T4, T5, T6>(
  //   nodefunc: (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, cb: NodeCallbackWithoutResultType) => void
  // ) : AsyncAction6<T1, T2, T3, T4, T5, T6>;
  //
  declare type AsyncFunc<TResult> = () => Promise<TResult>;
  declare type AsyncFunc1<T1, TResult> = (p1: T1) => Promise<TResult>;
  declare type AsyncFunc2<T1, T2, TResult> = (p1: T1, p2: T2) => Promise<TResult>;
  declare type AsyncFunc3<T1, T2, T3, TResult> = (p1: T1, p2: T2, p3: T3) => Promise<TResult>;
  declare type AsyncFunc4<T1, T2, T3, T4, TResult> = (p1: T1, p2: T2, p3: T3, p4: T4) => Promise<TResult>;
  declare type AsyncFunc5<T1, T2, T3, T4, T5, TResult> = (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5) => Promise<TResult>;
  declare type AsyncFunc6<T1, T2, T3, T4, T5, T6, TResult> = (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6) => Promise<TResult>;

  declare function exports(
    nodefunc: (cb: NodeCallbackType<void>) => void
  ) : AsyncFunc<void>;

  declare function exports<TResult>(
    nodefunc: (cb: NodeCallbackType<TResult>) => void
  ) : AsyncFunc<TResult>;

  declare function exports<T1, TResult>(
    nodefunc: (p1: T1, cb: NodeCallbackType<TResult>) => void
  ) : AsyncFunc1<T1, TResult>;

  declare function exports<T1, T2, TResult>(
    nodefunc: (p1: T1, p2: T2, cb: NodeCallbackType<TResult>) => void
  ) : AsyncFunc2<T1, T2, TResult>;

  declare function exports<T1, T2, T3, TResult>(
    nodefunc: (p1: T1, p2: T2, p3: T3, cb: NodeCallbackType<TResult>) => void
  ) : AsyncFunc3<T1, T2, T3, TResult>;

  declare function exports<T1, T2, T3, T4, TResult>(
    nodefunc: (p1: T1, p2: T2, p3: T3, p4: T4, cb: NodeCallbackType<TResult>) => void
  ) : AsyncFunc4<T1, T2, T3, T4, TResult>;

  declare function exports<T1, T2, T3, T4, T5, TResult>(
    nodefunc: (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, cb: NodeCallbackType<TResult>) => void
  ) : AsyncFunc5<T1, T2, T3, T4, T5, TResult>;

  declare function exports<T1, T2, T3, T4, T5, T6, TResult>(
    nodefunc: (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, cb: NodeCallbackType<TResult>) => void
  ) : AsyncFunc6<T1, T2, T3, T4, T5, T6, TResult>;
}
