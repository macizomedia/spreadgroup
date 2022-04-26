import { Dispatch, SetStateAction } from 'react';

export type State = {
    from?: {
        pathname: string;
    };
};

export type FormError = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
};

export type Dispatcher<S> = Dispatch<SetStateAction<S>>;
