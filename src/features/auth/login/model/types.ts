export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type AuthError = {
  status: number;
  message: string;
};