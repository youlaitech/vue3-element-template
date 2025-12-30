// AI 相关
export { useAiAction } from "./ai/useAiAction";
export type { UseAiActionOptions, AiActionHandler } from "./ai/useAiAction";

// 表格相关
export { useTableSelection } from "./table/useTableSelection";

// ============================================
// WebSocket 相关功能已在 template 版本中移除
// 如需 WebSocket 功能，请使用 vue3-element-admin 完整版
// ============================================

// 为保持 API 兼容，提供空实现
export function setupWebSocket() {
  // Template 版本不包含 WebSocket 功能
}

export function cleanupWebSocket() {
  // Template 版本不包含 WebSocket 功能
}
