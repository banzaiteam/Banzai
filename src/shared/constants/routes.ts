export const ROUTES = {
  home: '/' as const,

  // 🔐 Аутентификация
  login: '/auth/login' as const,
  logout: '/auth/logout' as const,
  signIn: '/auth/signIn' as const,
  forgotPassword: '/auth/forgot-password' as const,
  restorePassword: '/auth/restore-password' as const,
  googleAuth: '/auth/google' as const,
  verifyEmail: (email: string) => `/signup/email-verify/${email}` as const,

  // 🆕 Регистрация
  signUp: '/signup' as const,

  // 👤 Профили
  myProfile: '/profile/me' as const,
  profile: (id: string) => `/profile/${id}` as const,

  // 📝 Посты
  createPost: '/posts/create' as const,
  post: (id: string) => `/posts/${id}` as const,
  allPosts: '/posts' as const,
  cancelPost: '/posts/cancel' as const,

  // 🎥 SSE upload views
  sseAvatarUpload: '/signup/sse-avatar' as const,
  ssePhotoUpload: '/posts/sse-file' as const,
  sseCancelToken: '/posts/sse-cancel-token' as const,
}

// Категории с проверкой по точному совпадению (без RegExp)
const publicRoutes: Set<string> = new Set([
  ROUTES.home,
  ROUTES.login,
  ROUTES.signIn,
  ROUTES.signUp,
  ROUTES.forgotPassword,
  ROUTES.restorePassword,
  ROUTES.googleAuth,
  ROUTES.allPosts,
])

const authOnlyRoutes: Set<string> = new Set([
  ROUTES.myProfile,
  ROUTES.createPost,
  ROUTES.cancelPost,
])

const guestOnlyRoutes: Set<string> = new Set([
  ROUTES.login,
  ROUTES.signUp,
  ROUTES.forgotPassword,
  ROUTES.restorePassword,
])

// Проверка, есть ли точное совпадение в категории
export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.has(pathname)
}

export function isAuthRoute(pathname: string) {
  return authOnlyRoutes.has(pathname)
}

export function isGuestRoute(pathname: string) {
  return guestOnlyRoutes.has(pathname)
}
