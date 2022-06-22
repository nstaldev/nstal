
export enum ResponseType {
  Completed = 'Completed',
  Error = 'Error'
};

export type Response = {
  type: ResponseType.Error,
  message: string;
} | {
  type: ResponseType.Completed
}
