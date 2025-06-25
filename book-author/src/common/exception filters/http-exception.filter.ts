import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Handle validation errors from class-validator
    let message = exception.message;
    let validationErrors = null;

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();
      
      // Check if this is a validation error from ValidationPipe
      if (typeof exceptionResponse === 'object' && 
          exceptionResponse !== null && 
          'message' in exceptionResponse && 
          Array.isArray((exceptionResponse as any).message)) {
        
        validationErrors = (exceptionResponse as any).message;
        message = 'Validation failed';
      }
    }

    const errorResponse: any = {
      statusCode: status,
      statusName: HttpStatus[status],
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (validationErrors) {
      errorResponse.validationErrors = validationErrors;
    }

    response
      .status(status)
      .json(errorResponse);
  }
}
