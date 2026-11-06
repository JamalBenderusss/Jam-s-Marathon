export const AUTH_FORM_CONTENT = {
  login: {
    title: 'Welcome back!',
    submit: 'Log in',
    pending: 'Logging in...',
    footerText: 'Don`t have account?',
    footerAction: 'Sign up',
    footerHref: '/register'
  },
  register: {
    title: 'Create account',
    submit: 'Sign up',
    pending: 'Creating account...',
    footerText: 'Already have an account?',
    footerAction: 'sign in',
    footerHref: '/login'
  }
} as const