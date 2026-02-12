import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import qs from "qs";
import { ApiCodeEnum } from "@/enums/api";
import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { AuthStorage, redirectToLogin } from "@/utils/auth";

// ============================================
// HTTP 请求实例
// ============================================

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

// ============================================
// 请求拦截器
// ============================================

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = AuthStorage.getAccessToken();

    if (config.headers.Authorization === "no-auth") {
      delete config.headers.Authorization;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================
// 响应拦截器
// ============================================

http.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 二进制数据直接返回
    const { responseType } = response.config;
    if (responseType === "blob" || responseType === "arraybuffer") {
      return response;
    }

    const { code, data, msg } = response.data;

    if (code === ApiCodeEnum.SUCCESS) {
      return data;
    }

    ElMessage.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "Error"));
  },

  async (error) => {
    const { config, response } = error;

    if (!response) {
      ElMessage.error("网络连接失败");
      return Promise.reject(error);
    }

    const { code, msg } = response.data as ApiResponse;

    // Token 过期处理
    if (code === ApiCodeEnum.ACCESS_TOKEN_INVALID) {
      return retryWithRefresh(config);
    }

    if (code === ApiCodeEnum.REFRESH_TOKEN_INVALID) {
      await redirectToLogin("登录已过期，请重新登录");
      return Promise.reject(new Error(msg || "Token Invalid"));
    }

    if (code === ApiCodeEnum.PERMISSION_DENIED) {
      return handlePermissionDenied(msg);
    }

    ElMessage.error(msg || "请求失败");
    return Promise.reject(new Error(msg || "Error"));
  }
);

export default http;

// ============================================
// Token 刷新重试
// ============================================

/**
 * 权限不足处理：刷新用户信息与动态路由，并提示用户
 */
async function handlePermissionDenied(msg?: string): Promise<never> {
  const permissionStore = usePermissionStoreHook();
  await permissionStore.reloadPermissionSnapshotOnce();
  ElMessage.error(msg || "权限不足");
  return Promise.reject(new Error(msg || "Forbidden"));
}

/**
 * 访问令牌过期后，自动刷新 token 并重试请求（队列化避免并发刷新）。
 */

async function retryWithRefresh(config: InternalAxiosRequestConfig): Promise<unknown> {
  const retryConfig = config as InternalAxiosRequestConfig & { __retry?: boolean };
  if (retryConfig.__retry) {
    await redirectToLogin("登录已过期，请重新登录");
    return Promise.reject(new Error("Token Invalid"));
  }
  retryConfig.__retry = true;

  try {
    const userStore = useUserStoreHook();
    await userStore.refreshTokenOnce();

    const token = AuthStorage.getAccessToken();
    if (token) retryConfig.headers.Authorization = `Bearer ${token}`;

    return http(retryConfig);
  } catch {
    await redirectToLogin("登录已过期，请重新登录");
    return Promise.reject(new Error("Token refresh failed"));
  }
}
