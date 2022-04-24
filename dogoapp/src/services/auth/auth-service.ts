
import ky from 'ky';
import { Token, ServerError, User, Success } from './auth-service-types';

const API_URL = 'http://localhost:4000';

const http = ky.create({
    prefixUrl: API_URL,
    /* hooks: {
        beforeRequest: [
            (request) => {
                const token = localStorage.getItem('token');
                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`);
                }
            },
        ],
    }, */
});

export async function loginService(
    email: string,
    password: string,
): Promise<Token | ServerError> {
    try {
        const json: { message: string, token: string } = await http.post('login', { json: { email, password } }).json();
        if (json.token) {
            return json as Token;
        }
        return { message: json.message };
    } catch (error) {
        return error as ServerError;
    }
}

export async function signupService(user: User): Promise<Token | ServerError> {
    try {
        const json: { message: string, token: string } = await http.post('signup', { json: { name: user.firstName, email: user.email, password: user.password } }).json();
        if (json.token) {
            return json;
        }
        return { message: json.message };
    } catch (error) {
        return error as ServerError;

    }
}

export async function resetPasswordService(
    email: string,
    password: string,
): Promise<Success | ServerError> {
    try {
        const json: Success & { message: string } = await http.post('reset', { json: { email, password } }).json();
        if (json.message === 'success') {
            return json as Success;
        }
        return { message: json.message };
    } catch (error) {
        return error as ServerError;
    }
}

