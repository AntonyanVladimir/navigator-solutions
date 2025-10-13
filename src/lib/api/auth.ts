const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:8080";

const AUTH_BASE = `${API_BASE_URL}/api/auth`;

export type AppUserRole = "Admin" | "RegularUser";

export interface AppUser {
  id: number;
  email: string;
  role: AppUserRole;
  createdAt: string;
  lastLoginAt?: string | null;
}

export interface RegisterUserPayload {
  email: string;
  password: string;
  role?: AppUserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface ApiError {
  message: string;
}

const handleResponse = async (response: Response) => {
  if (response.ok) {
    return response.json() as Promise<AppUser>;
  }

  let message = "Request failed. Please try again.";

  try {
    const data = (await response.json()) as ApiError;
    if (typeof data?.message === "string" && data.message.trim().length > 0) {
      message = data.message;
    }
  } catch {
    // ignore JSON parsing errors for non-json responses
  }

  throw new Error(message);
};

export const registerUser = async (payload: RegisterUserPayload): Promise<AppUser> => {
  const response = await fetch(`${AUTH_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      role: payload.role ?? "RegularUser",
    }),
  });

  return handleResponse(response);
};

export const loginUser = async (payload: LoginPayload): Promise<AppUser> => {
  const response = await fetch(`${AUTH_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const loadUserFromStorage = (): AppUser | null => {
  try {
    const raw = localStorage.getItem("app_user");
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as AppUser;
    if (typeof parsed?.email === "string" && typeof parsed?.id === "number") {
      return parsed;
    }
  } catch {
    // ignore parsing issues and treat as not logged in
  }
  return null;
};

export const persistUser = (user: AppUser | null) => {
  if (user) {
    localStorage.setItem("app_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("app_user");
  }
};
