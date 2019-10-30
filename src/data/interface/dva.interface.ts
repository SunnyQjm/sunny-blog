
export interface Action<T> {
  type: string,
  data: T
}

export interface Operators {
  call: any,
  put: any,
  select: any,
}


export interface DispatchProps {
  dispatch: any
}
