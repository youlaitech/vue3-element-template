import vue from "@vitejs/plugin-vue";
import { type ConfigEnv, type Plugin, type UserConfig, loadEnv, defineConfig } from "vite";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { mockDevServerPlugin } from "vite-plugin-mock-dev-server";

import UnoCSS from "unocss/vite";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { name, version } from "./package.json" with { type: "json" };

// 平台名称、版本信息
const __APP_INFO__ = {
  pkg: { name, version },
  buildTimestamp: Date.now(),
};

const pathSrc = resolve(import.meta.dirname, "src");

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, import.meta.dirname, "");
  const port = Number(env.APP_PORT) || undefined;
  const proxyTarget = env.API_PROXY_TARGET;

  return {
    // 子路径部署由 VITE_BASE_URL 指定，缺省为站点根路径
    base: env.VITE_BASE_URL || "/",
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port,
      open: true,
      proxy: {
        [env.VITE_API_BASE]: {
          changeOrigin: true,
          target: proxyTarget,
          rewrite: (path: string) => path.replace(new RegExp(`^${env.VITE_API_BASE}`), ""),
        },
        // 通知中心 WebSocket，单独代理以转发握手请求
        "/api/v1/realtime/ws": {
          changeOrigin: true,
          rewriteWsOrigin: true,
          target: proxyTarget,
          ws: true,
        },
      },
    },
    plugins: [
      vue(),
      ...(env.VITE_MOCK_ENABLED === "true"
        ? [
            mockDevServerPlugin(
              // 产出独立可部署的 mock 服务：pnpm build:mock 生成 dist/mockServer（Node HTTP 服务）
              env.VITE_MOCK_BUILD === "true"
                ? {
                    build: {
                      serverPort: +env.VITE_MOCK_PORT || 8081,
                      // 绝对路径：直接写到项目根下的 .deploy/mock-server，不进前端 dist，
                      // 部署时前端与 mock 各自独立上传，无需排除
                      dist: resolve(import.meta.dirname, ".deploy/mock-server"),
                    },
                  }
                : {},
            ),
          ]
        : []),
      UnoCSS(),
      // 函数自动导入
      AutoImport({
        imports: ["vue", "@vueuse/core", "pinia", "vue-router"],
        // Element Plus 函数按需导入
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
        vueTemplate: true,
        // 默认不生成类型声明，需要时改用下面的 dts 路径
        dts: false,
        // dts: "types/auto-imports.d.ts",
      }),
      // 组件自动导入
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
        // 全局组件与页面内组件目录
        dirs: ["src/components", "src/**/components"],
        // 默认不生成类型声明，需要时改用下面的 dts 路径
        dts: false,
        // dts: "types/components.d.ts",
      }),
      distVersionPlugin,
    ],
    // 预加载项目必需的依赖
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "element-plus",
        "pinia",
        "axios",
        "@vueuse/core",
        "codemirror-editor-vue3",
        "exceljs",
        "path-to-regexp",
        "echarts/core",
        "echarts/renderers",
        "echarts/charts",
        "echarts/components",
        "nprogress",
        "sortablejs",
        "qs",
        "path-browserify",
        "lodash-es",
        "@element-plus/icons-vue",
        "element-plus/es",
        "element-plus/es/locale/lang/en",
        "element-plus/es/locale/lang/zh-cn",
        // Element Plus 组件样式：按组件目录枚举，新增组件时不会在运行期补优化并刷新页面
        ...getElementPlusStyleDeps(),
      ],
    },
    // 构建配置（Vite 8 使用 Rolldown + Oxc）
    build: {
      // 单个 chunk 告警阈值（kB），取略高于最大 vendor 包的值
      chunkSizeWarningLimit: 1200,
      // 跳过 gzip 体积统计，加快构建
      reportCompressedSize: false,
      rolldownOptions: {
        output: {
          // 资源目录避开站点子路径，统一用 assets/
          entryFileNames: "assets/[name].[hash].js",
          chunkFileNames: "assets/[name].[hash].js",
          assetFileNames: (assetInfo) => {
            const assetName = assetInfo.names[0];

            if (!assetName) {
              return "assets/[name].[hash][extname]";
            }

            const info = assetName.split(".");
            let extType = info[info.length - 1];
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetName)) {
              extType = "media";
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetName)) {
              extType = "img";
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetName)) {
              extType = "fonts";
            }
            return `${extType}/[name].[hash].[ext]`;
          },
          codeSplitting: {
            groups: [
              // 框架核心，每个页面都依赖
              {
                name: "vendor-vue",
                test: /node_modules[\\/](vue|@vue|vue-router|pinia|@vueuse)[\\/]/,
              },
              // 图表：首页趋势图使用
              {
                name: "vendor-echarts",
                test: /node_modules[\\/](echarts|zrender)[\\/]/,
              },
            ],
          },
        },
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
});

// 按组件目录枚举 Element Plus 样式入口，避免手写清单漏项后运行期补优化并刷新页面
function getElementPlusStyleDeps(): string[] {
  const componentsDir = resolve(import.meta.dirname, "node_modules/element-plus/es/components");
  if (!existsSync(componentsDir)) return [];
  return readdirSync(componentsDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() && existsSync(resolve(componentsDir, entry.name, "style/index.mjs")),
    )
    .map((entry) => `element-plus/es/components/${entry.name}/style/index`);
}

// 生成 version.json，供前端检测版本更新
const distVersionPlugin: Plugin = {
  name: "dist-version",
  apply: "build",
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "version.json",
      source: JSON.stringify({ version: __APP_INFO__.buildTimestamp }),
    });
  },
};
