import { http } from "#/utils/http";
import useSWR from "swr";
import type { SWRMutationConfiguration } from "swr/mutation";
import useSWRMutation from "swr/mutation";

export interface AuthBody {
  fullName: string;
  email: string;
  phoneNumber: string;
  role_id: string;
}

interface ErrorResponse {
  body: {
    error: string;
  };
}

interface SuperagentError {
  status: number;
  response: ErrorResponse;
}

const url = {
  register: () => "/auth/signup",
  loginWithGoogle: () => "/auth/google/callback",
  login: () => "/auth/login",
  users: () => "/auth/profile",
  changePassword: (id: string) => `/auth/change-password/${id}`,
  forgotPassword: () => "/auth/forgot-password",
  resend: () => "/auth/send-otp",
  verifyOtp: () => "/auth/verify-otp",
  resetPassword: () => "/auth/reset-password",
};

const hooks = {
  useUsers() {
    return useSWR(url.users(), http.fetcher);
  },
  useRegister(config?: SWRMutationConfiguration<any, SuperagentError>) {
    return useSWRMutation(url.register, api.authPost, config);
  },
};

const api = {
  register(data: any) {
    return http.post(url.register()).send(data);
  },
  loginWithGoogle() {
    return http.get(url.loginWithGoogle());
  },
  login(data: any) {
    return http.post(url.login()).send(data);
  },
  getUser() {
    return http.fetcher(url.users());
  },
  changePassword(id: string, data: any) {
    return http.put(url.changePassword(id)).send(data);
  },
  forgotPassword(data: any) {
    return http.post(url.forgotPassword()).send(data);
  },
  sendOtp(email: any) {
    return http.post(url.resend()).send(email);
  },
  verifyOtp(data: any) {
    return http.post(url.verifyOtp()).send(data);
  },
  resetPassword(data: any) {
    return http.put(url.resetPassword()).send(data);
  },
  async authPost(url: string, { arg }: { arg: AuthBody }) {
    return http.post(url).send(arg);
  },
};

export const authRepository = {
  url,
  hooks,
  api,
};
