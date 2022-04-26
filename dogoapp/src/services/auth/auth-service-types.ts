export type Token = {
  token: string;
};

export type ServerError = {
  errors?: {
    email?: string;
    password?: string;
  };
  message?: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type Success = {
  message: 'success';
};
