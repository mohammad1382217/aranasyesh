import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Function to get a cookie by name
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

// Function to set a cookie
export const setCookie = (name: string, value: string, days: number, secure: boolean = false, SameSite: string = "Strict") => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  let cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=${SameSite}`;
  if (secure) {
    cookie += ';secure';
  }
  document.cookie = cookie;
}

// Function to delete a cookie
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/; secure`;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.aranasayesh.ir/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const accessToken: string | null = getCookie("accessToken");
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.detail === "درخواست ناقص."
      ||
      error.response &&
      error.response.status === 401 
    ) {
      // Handle token expiration (e.g., logout)
      deleteCookie("accessToken");
      // handle the logout process
      delete error.config.headers.Authorization;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;