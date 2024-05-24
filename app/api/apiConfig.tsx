import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.aranasayesh.ir/api/",
  headers: {
    "Content-Type": "application/json",
    // "Accept-Encoding": "gzip, compress, br",
    // "Content-Encoding": "br"
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const accessToken: string | null = JSON.parse(
      localStorage.getItem("accessToken")!
    )!?.token;
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
    ) {
      // Handle token expiration (e.g., logout)
      localStorage.removeItem("accessToken");
      // Redirect to logout or handle the logout process
      delete error.config.headers.Authorization;
      // window.location.href = '/logout';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
