import { createSSEStream } from "vite-plugin-mock-dev-server";
import { defineMock } from "./base";

/** 事件名与后端 SseTopics / 前端 src/enums/sse.ts 保持一致 */
const TOPIC = {
  ONLINE_USERS: "online-users",
} as const;

/**
 * SSE 长连接（GET /dev-api/api/v1/sse/connect）
 *
 * 前端 main.ts 启动即建立连接，用于：
 *  - 字典实时同步（dict 事件）
 *  - 首页在线用户数（online-users 事件）
 *  - 通知推送 / 撤回（notice / notice-revoke 事件）
 *
 * 此处只推送 online-users 与心跳：dict/notice 事件若自动推送，会在演示时
 * 无端清空字典缓存或弹出浏览器通知，故留空，需要时再手工补。
 */
export default defineMock([
  {
    url: "sse/connect",
    method: ["GET"],
    response(req, res) {
      const sse = createSSEStream(req, res);
      const write = (event: string, data: unknown) => sse.write({ event, data });

      // 连接后立即回一次在线人数，首页无需等待即可显示。
      // 注意：插件只支持 data 为 string | object，传数字会被丢弃（SSE 报文里没有 data 行），
      // 因此这里传字符串，前端 JSON.parse('12') 得到的仍是数字，满足 Number.isFinite 校验。
      write(TOPIC.ONLINE_USERS, "12");

      // 之后每 10s 波动一次，演示实时刷新
      let tick = 0;
      const countTimer = setInterval(() => {
        tick += 1;
        write(TOPIC.ONLINE_USERS, String(12 + (tick % 5)));
      }, 10000);

      // 心跳：SSE 注释行，避免中间层因空闲主动断开
      const pingTimer = setInterval(() => sse.write({ comment: "ping" }), 15000);

      // 客户端断开时清理定时器，避免 dev server 长跑时累积
      const cleanup = () => {
        clearInterval(countTimer);
        clearInterval(pingTimer);
      };
      req.on("close", cleanup);
      req.on("aborted", cleanup);
      res.on("close", cleanup);
    },
  },
]);
