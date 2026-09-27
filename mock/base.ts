import { createDefineMock } from "vite-plugin-mock-dev-server";

/**
 * 接口前缀：
 *   完整请求路径 = VITE_API_BASE + /api/v1 + 业务路径，如 /dev-api/api/v1/users
 *
 * 说明：插件的 mock url 需为**完整请求路径**（内部用 path-to-regexp 匹配完整 pathname），
 * 因此这里统一拼接前缀，各 mock 文件内只写业务路径（如 users、auth/login）。
 */
const API_BASE = `${import.meta.env.VITE_API_BASE ?? "/dev-api"}`.replace(/\/+$/, "");
const API_VERSION = "/api/v1";

export const defineMock = createDefineMock((mock) => {
  // 拼接完整请求路径：/dev-api/api/v1/users
  mock.url = `${API_BASE}${API_VERSION}/${`${mock.url}`.replace(/^\/+/, "")}`;
});
