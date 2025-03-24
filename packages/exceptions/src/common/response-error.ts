export class ResponseError {
  constructor(
    private readonly statusCode: number,
    private readonly message: string,
    private readonly readonly: string,
  ) {}
}
