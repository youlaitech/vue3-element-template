import * as ElementPlusIconsVue from "@element-plus/icons-vue";

/**
 * 本地 SVG 图标名
 *
 * @description
 * 取自 src/assets/icons 下的文件名，存入菜单时无前缀
 */
export const svgIconNames: string[] = Object.keys(import.meta.glob("../assets/icons/*.svg")).map(
  (path) => path.replace(/.*\/(.*)\.svg$/, "$1"),
);

/**
 * Element Plus 图标名
 *
 * @description
 * 存入菜单时需加 el-icon- 前缀
 */
export const elementIconNames: string[] = Object.keys(ElementPlusIconsVue);
