import { ZodError } from "zod";

interface ErrorDetails {
  code: number;
  data?: unknown;
}

export class AppError extends Error {
  constructor(readonly message: string, readonly details?: ErrorDetails) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static handler(error: unknown) {
    switch (true) {
      case error instanceof AppError:
        return error;
      case error instanceof ZodError:
        return new AppError("Validation failed", { code: 400, data: error });
      default:
        throw error;
    }
  }
}
