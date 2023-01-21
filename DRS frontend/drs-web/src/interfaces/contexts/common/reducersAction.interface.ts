export interface IReducersAction<T> {
  type: string;
  payload?: T;
}
