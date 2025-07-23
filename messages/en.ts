const en = {
  app: {
    name: "Kaltech POS Manager",
    description: "A modern POS system for Kaltech",
    version: "Version 1.0.0",
    author: "Muhammed Kasujja",
    license: "MIT License",
    copyright: "© 2025 Kaltech Inc.",
  },
  common: {
    cancel: "Cancel",
    close: "Close",
    continue: "Continue",
    save: "Save",
    submit: "Submit",
  },
  AppLayout: {
    home: "Home",
    logout: "Logout",
    profile: "Profile",
  },
  HomePage: {
    title: "Home",
  },
  LoginPage: {
    credentials: "Credentials: jane@doe.com / next-intl",
    description: "Login to your Acme Inc account",
    email: "Email",
    invalidCredentials: "Please check your credentials.",
    invalidEmail: "Please enter a valid email address.",
    invalidPassword: "Please enter a password.",
    login: "Sign in",
    password: "Password",
    title: "Welcome back",
  },
  ProfilePage: {
    title: "Profile",
  },
} as const;

export default en;
