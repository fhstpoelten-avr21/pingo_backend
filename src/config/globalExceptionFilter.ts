import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * @author Malek Morad
 * Global Exception Filter
 * 1. Catches all unhandled exceptions
 * 2. Returns 500-Error if it is not a HttpException
 * 3. Logs Errors and returns dev / prod Error Response
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
        }
        
        response
            .status(statusCode)
            .json({
                timestamp: new Date().toISOString(),
                path: request?.url,
                method: request?.method,
                errorName: exception.name,
                message: exception?.response?.message === exception?.message ? exception?.message : exception?.response?.message,
                sqlMessage: exception?.sqlMessage,
                message2: exception?.message
            });
    }
}