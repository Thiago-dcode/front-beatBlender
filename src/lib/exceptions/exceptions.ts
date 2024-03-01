export class CustomError extends Error {
  public statusCode: number;
  public errors: { [key: string]: string };

  constructor(
    message: string,
    errors: { [key: string]: string } = {},
    statusCode: number
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class InternalError extends CustomError {
  constructor(
    message: string = "Internal error",
    errors: { [key: string]: string } = {},
    statusCode: number = 500
  ) {
    super(message, errors, statusCode);
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}

export class EntityNotFoundError extends CustomError {
  constructor(
    message: string = "Error fetching",
    errors: { [key: string]: string } = {},
    statusCode: number = 404
  ) {
    super(message, errors, statusCode);
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
export class HttpClientError extends CustomError {
  constructor(
    message: string = "Error HttpClientError",
    errors: { [key: string]: string } = {},
    statusCode: number = 500
  ) {
    super(message, errors, statusCode);
    Object.setPrototypeOf(this, HttpClientError.prototype);
  }
}
