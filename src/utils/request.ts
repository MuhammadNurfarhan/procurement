import axios, {
  type InternalAxiosRequestConfig,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";
import { requestConfig } from "@/config/request";
import router from "@/router";

import { ElMessage } from "element-plus";

const { baseURL, contentType, requestTimeout, successCode, noPermissionCode } = requestConfig;
const handleCode = (code: any, msg: any) => {
  switch (code) {
    case noPermissionCode:
      router.push({ path: "/401" }).catch(() => {});
      break;
    default:
      ElMessage.error(msg || `request.apiErrorWithCode, ${ code }`);
      break;
  }
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": contentType,
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  // do something before request
  (config: InternalAxiosRequestConfig) => {
    // ==avoid browser caching==
    if (config.method === "get") {
      config.params = {
        ...config.params,
        t: new Date().getTime(),
      };
    }
    // ==avoid browser caching==
    return config;
  },
  // handle request error
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  // do something with response
  (response: AxiosResponse) => {
    const res = response.data;
    const { data } = response;
    const { code, message } = data;

    if (successCode.indexOf(code) !== -1) {
      return res;
    } else {
      handleCode(code, message);
      return Promise.reject();
    }
  },
  // handle response error
  (error: any) => {
    const { response, message } = error;

    if (error.response && error.response.data) {
      const { status, data } = response;
      handleCode(status, data.message || message);
      return Promise.reject(error);
    } else {
      let { message } = error;

      if (message === "Network Error") {
        message = "request.accessFailed";
      }
      if (message.includes("timeout")) {
        message = "request.accessTimeout";
      }
      if (message.includes("Request failed with status code")) {
        const code = message.substr(message.length - 3);
        message = `request.apiErrorWithCode, ${ code }`;
      }

      ElMessage.error(message);
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
