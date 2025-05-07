
// Тип для успешного ответа авторизации
export type AuthResponse = {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
  };
  expiresIn: number; // Время жизни токена в секундах
};

// Тип для данных входа
export type LoginCredentials = {
  email: string;
  password: string;
};

// Тип для ошибки API
export type AuthError = {
  status: number;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
};