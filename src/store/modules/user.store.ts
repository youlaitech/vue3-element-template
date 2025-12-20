import { store } from "@/store";
import { usePermissionStoreHook } from "@/store/modules/permission.store";
import { useDictStoreHook } from "@/store/modules/dict.store";

import AuthAPI from "@/api/auth.api";
import UserAPI, { type UserInfo } from "@/api/system/user.api";
import type { LoginRequest, LoginResponse } from "@/types/api/auth";

import { clearAuth, setTokens, getAccessToken } from "@/utils/auth";

export const useUserStore = defineStore("user", () => {
  const userInfo = useStorage<UserInfo>("userInfo", {} as UserInfo);

  /** 是否已登录 */
  function isLoggedIn() {
    return !!getAccessToken();
  }

  /**
   * 登录
   *
   * @param {LoginRequest}
   * @returns
   */
  function login(loginData: LoginRequest) {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.login(loginData)
        .then((data: LoginResponse) => {
          const { accessToken, refreshToken } = data;
          setTokens(accessToken, refreshToken, loginData.rememberMe ?? false);
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * 获取用户信息
   *
   * @returns {UserInfo} 用户信息
   */
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      UserAPI.getInfo()
        .then((data: UserInfo) => {
          if (!data) {
            reject("Verification failed, please Login again.");
            return;
          }
          Object.assign(userInfo.value, { ...data });
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * 登出
   */
  function logout() {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.logout()
        .then(() => {
          clearSessionAndCache();
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * 清除用户会话和缓存
   */
  function clearSessionAndCache() {
    return new Promise<void>((resolve) => {
      clearAuth();
      usePermissionStoreHook().resetRouter();
      useDictStoreHook().clearDictCache();
      userInfo.value = {} as UserInfo;
      resolve();
    });
  }

  /** 重置所有状态（用于路由守卫兜底） */
  function resetAllState() {
    return clearSessionAndCache();
  }

  return {
    userInfo,
    isLoggedIn,
    getUserInfo,
    login,
    logout,
    clearSessionAndCache,
    resetAllState,
  };
});

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useUserStoreHook() {
  return useUserStore(store);
}
