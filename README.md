
<div align="center">
  <img alt="vue3-element-admin" width="80" height="80" src="./src/assets/logo.png">
  <h1>vue3-element-admin</h1>

  <img src="https://img.shields.io/badge/Vue-3.5.13-brightgreen.svg"/>
  <img src="https://img.shields.io/badge/Vite-6.2.1-green.svg"/>
  <img src="https://img.shields.io/badge/Element Plus-2.9.6-blue.svg"/>
  <img src="https://img.shields.io/badge/license-MIT-green.svg"/>
  <a href="https://gitee.com/youlaiorg" target="_blank">
      <img src="https://img.shields.io/badge/Author-有来开源组织-orange.svg"/>
  </a>
</div>

![](https://foruda.gitee.com/images/1708618984641188532/a7cca095_716974.png "rainbow.png")


<div align="center">
  <a target="_blank" href="https://vue.youlai.tech/template">🔍 在线预览</a> |  <a target="_blank" href="https://juejin.cn/post/7228990409909108793">📖 阅读文档</a> | <a href="./README.en-US.md">🌐English
</div>


## 项目简介

[vue3-element-template](https://gitee.com/youlaiorg/vue3-element-admin) 是  [vue3-element-admin](https://gitee.com/youlaiorg/vue3-element-admin) 精简的 Vue3 中后台开发模板，采用 Vue3 + Vite6 + TypeScript5 + Element-Plus + Pinia 等前沿技术栈构建，配套提供 [Java 后端](https://gitee.com/youlaiorg/youlai-boot) 和 [Node 后端](https://gitee.com/youlaiorg/youlai-nest)，完全免费开源。


## 项目特色

- 🚀 **核心优势**
  - **技术升级**：基于经典项目 [vue-element-admin](https://gitee.com/panjiachen/vue-element-admin) 的 Vue3 重构版，避免过度封装，学习曲线平缓
  - **开箱即用**：预设代码规范、Git 提交规范和工程化配置，内置常用业务组件
  - **全栈方案**：支持本地 Mock 和线上 API 切换，配套 [Java 后端系统](https://gitee.com/youlaiorg/youlai-boot) 和 [在线接口文档](https://www.apifox.cn/apidoc/shared-195e783f-4d85-4235-a038-eec696de4ea5)

- 🛡️ 权限体系
  - **完整功能**：用户/角色/菜单/字典/部门五位一体的权限管理系统
  - **精细控制**：动态路由加载 + 按钮级权限控制，支持国际化多语言方案

- 🛠️ 持续维护
  - **版本更新**：持续跟进主流技术更新，定期升级依赖和工具链
  - **多端适配**：提供基础版、开发版、精简版多种形态，满足不同场景需求


## 项目预览

![明亮模式](https://foruda.gitee.com/images/1709651876583793739/0ba1ee1c_716974.png)

![暗黑模式](https://foruda.gitee.com/images/1709651875494206224/2a2b0b53_716974.png)

![接口文档](https://foruda.gitee.com/images/1687755822857820115/96054330_716974.png)

## 项目源码

| 版本类型       | 功能亮点                                | Gitee 源码                                                                 | GitHub 源码                                                               | GitCode 镜像                                                              |
|----------------|---------------------------------------|----------------------------------------------------------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------|
| **基础版**     | ✅ 权限体系 + 🌐 国际化 + 🛠️ 代码生成 + 🎥 演示案例 | [vue3-element-admin](https://gitee.com/youlaiorg/vue3-element-admin)       | [vue3-element-admin](https://github.com/youlaitech/vue3-element-admin)    | [vue3-element-admin](https://gitcode.com/youlai/vue3-element-admin)      |
| **开发版**     | ✅ 权限系统 + 📦 基础功能               | [vue3-element-template](https://gitee.com/youlaiorg/vue3-element-template) | [vue3-element-template](https://github.com/youlaitech/vue3-element-template) | [vue3-element-template](https://gitcode.com/youlai/vue3-element-template) |
| **精简版**     | 🔐 基础登录 + 🧩 最小功能集                  | [vue3-element-admin-thin](https://gitee.com/cshaptx4869/vue3-element-admin-thin) | [vue3-element-admin-thin](https://github.com/youlaitech/vue3-element-admin-thin) | -                                                                         |
| **Java 后端**  | 🏗️ SpringBoot 全栈解决方案                | [youlai-boot](https://gitee.com/youlaiorg/youlai-boot)                     | [youlai-boot](https://github.com/haoxianrui/youlai-boot)                  | [youlai-boot](https://gitcode.com/youlai/youlai-boot)                    |
| **Node 后端**  | 🚀 NestJS 全栈解决方案                    | [youlai-nest](https://gitee.com/youlaiorg/youlai-nest)                     | [youlai-nest](https://github.com/youlaitech/youlai-nest)                  | [youlai-nest](https://gitcode.com/youlai/youlai-nest)                    |


## 环境准备


| 环境                 | 名称版本                                                     | 下载地址                                                     |
| -------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| **开发工具**         | VSCode    | [下载](https://code.visualstudio.com/Download)           |
| **运行环境**         | Node ≥18 (其中 20.6.0 版本不可用)    | [下载](http://nodejs.cn/download)                        |




## 项目启动

```bash
# 克隆代码
git clone https://gitee.com/youlaiorg/vue3-element-template.git

# 切换目录
cd vue3-element-template

# 安装 pnpm
npm install pnpm -g

# 设置镜像源(可忽略)
pnpm config set registry https://registry.npmmirror.com

# 安装依赖
pnpm install

# 启动运行
pnpm run dev
```



## 项目部署

```bash
# 项目打包
pnpm run build

# 上传文件至远程服务器
将本地打包生成的 dist 目录下的所有文件拷贝至服务器的 /usr/share/nginx/html 目录。

# nginx.cofig 配置
server {
	listen     80;
	server_name  localhost;
	location / {
			root /usr/share/nginx/html;
			index index.html index.htm;
	}
	# 反向代理配置
	location /prod-api/ {
      # api.youlai.tech 替换后端API地址，注意保留后面的斜杠 /
      proxy_pass http://api.youlai.tech/;
	}
}
```

## 本地Mock

项目同时支持在线和本地 Mock 接口，默认使用线上接口，如需替换为 Mock 接口，修改文件 `.env.development` 的 `VITE_MOCK_DEV_SERVER` 为  `true` **即可**。

## 后端接口

> 如果您具备Java开发基础，按照以下步骤将在线接口转为本地后端接口，创建企业级前后端分离开发环境，助您走向全栈之路。

1. 获取基于 `Java` 和 `SpringBoot` 开发的后端 [youlai-boot](https://gitee.com/youlaiorg/youlai-boot.git) 源码。
2. 根据后端工程的说明文档 [README.md](https://gitee.com/youlaiorg/youlai-boot#%E9%A1%B9%E7%9B%AE%E8%BF%90%E8%A1%8C) 完成本地启动。
3. 修改 `.env.development` 文件中的 `VITE_APP_API_URL` 的值，将其从 https://api.youlai.tech 更改为 http://localhost:8000 即可。


## 注意事项

- **自动导入插件自动生成默认关闭**

  模板项目的组件类型声明已自动生成。如果添加和使用新的组件，请按照图示方法开启自动生成。在自动生成完成后，记得将其设置为 `false`，避免重复执行引发冲突。

  ![](https://foruda.gitee.com/images/1687755823137387608/412ea803_716974.png)

- **项目启动浏览器访问空白**

  请升级浏览器尝试，低版本浏览器内核可能不支持某些新的 JavaScript 语法，比如可选链操作符 `?.`。

- **项目同步仓库更新升级**

  项目同步仓库更新升级之后，建议 `pnpm install` 安装更新依赖之后启动 。

- **项目组件、函数和引用爆红**

	重启 VSCode 尝试

- **其他问题**

  如果有其他问题或者建议，建议 [ISSUE](https://gitee.com/youlaiorg/vue3-element-admin/issues/new)



## 项目文档

- [基于 Vue3 + Vite + TypeScript + Element-Plus 从0到1搭建后台管理系统](https://blog.csdn.net/u013737132/article/details/130191394)
- [ESLint+Prettier+Stylelint+EditorConfig 约束和统一前端代码规范](https://youlai.blog.csdn.net/article/details/145608723)
- [Husky + Lint-staged + Commitlint + Commitizen + cz-git 配置 Git 提交规范](https://youlai.blog.csdn.net/article/details/145615236)


## 提交规范

执行 `pnpm run commit` 唤起 git commit 交互，根据提示完成信息的输入和选择。

![](https://foruda.gitee.com/images/1687755823165218215/c1705416_716974.png)


## 项目统计

![](https://repobeats.axiom.co/api/embed/aa7cca3d6fa9c308fc659fa6e09af9a1910506c3.svg "Repobeats analytics image")


Thanks to all the contributors!

[![contributors](https://contrib.rocks/image?repo=youlaitech/vue3-element-admin)](https://github.com/youlaitech/vue3-element-admin/graphs/contributors)

## G-Star

![](https://foruda.gitee.com/images/1728577513089814203/95f2a70d_716974.jpeg)


## 加群交流

> **关注「有来技术」公众号，点击菜单“交流群”获取加群二维码。**
>
> 如果二维码过期，请加微信(haoxianrui)备注「前端」、「后端」或「全栈」拉你进群。
>
> 交流群仅限技术交流，为过滤广告营销暂设此门槛，感谢理解与配合

![有来技术公众号二维码](https://foruda.gitee.com/images/1737108820762592766/3390ed0d_716974.png)

