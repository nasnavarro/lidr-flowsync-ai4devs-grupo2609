import { request } from "@/lib/api";
import type { AuthResponse, ProfileResponse } from "./types";

export function login(email: string, password: string) {
  return request<AuthResponse>("/api/v1/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function signup(
  fullName: string | null,
  email: string,
  password: string,
  passwordConfirmation: string,
) {
  return request<AuthResponse>("/api/v1/auth/signup", {
    method: "POST",
    body: { fullName, email, password, passwordConfirmation },
  });
}

export function fetchProfile(token: string) {
  return request<ProfileResponse>("/api/v1/account/profile", { token });
}

export function logout(token: string) {
  return request<{ message: string }>("/api/v1/account/logout", {
    method: "POST",
    token,
  });
}
