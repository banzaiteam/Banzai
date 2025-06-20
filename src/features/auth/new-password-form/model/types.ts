export type PasswordResetRequest = {
  email: string;
  password: string;
};

export type PasswordResetSuccessResponse = {
  success: true;
  message: string; // Например: "Password updated successfully"
};

export type PasswordResetErrorResponse = {
  success: false;
  error: {
    status: 404 | 500;
    message: string;
  };
};

export type PasswordResetResponse = PasswordResetSuccessResponse | PasswordResetErrorResponse;



// export type LoginRequest = {
//   email: string;
//   password: string;
// };

// export type LoginResponse = {
//   access_token: string;
//   refresh_token: string;
//   token_type: string;
// };

// export type AuthError = {
//   status: number;
//   message: string;
// };