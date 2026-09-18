export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type LoginOutRequest = Array<{
  tokens: ["string"]; // Кортеж ровно с одним элементом "string"
}>;



export type AuthError = {
  status: number | 'FETCH_ERROR' | 'PARSING_ERROR';
  data: {
    message?: string,
    error?: string
    statusCode: number,
    timestamp: string,
    path: string
  },
  error?: string;
};

export function isApiError(error: unknown): error is {
  status: number;
  data: {
    message?: string,
    error?: string
    statusCode: number,
    timestamp: string,
    path: string
  }
  error?: string;
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data &&
    'statusCode' in error.data
  );
}
