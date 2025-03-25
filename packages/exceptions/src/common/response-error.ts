export class ResponseError extends Error {
  constructor(
    readonly statusCode: number,
    readonly message: string,
    readonly error: string,
  ) {
    super(message);
    this.name = 'ResponseError';
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
