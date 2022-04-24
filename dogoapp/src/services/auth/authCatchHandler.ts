import { ServerError } from './auth-service-types';

export function authCatchHandler(error: Error): ServerError {
    if (error) {
        const serverError: ServerError = error;
        return serverError;
    }
    return { message: 'something is wrong' };
}
