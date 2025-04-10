export interface LoginModel {
  email: string;
  password: string;

  // Optional: useful if implementing "Remember Me" functionality
  rememberMe?: boolean;

  // Optional: for tracking login attempts or device
  deviceInfo?: string;

  // Optional: to support login with 2FA or other security measures
  otpToken?: string;
}
