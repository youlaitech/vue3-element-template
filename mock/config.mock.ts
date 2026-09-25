import { defineMock } from "./base";

/** 配置数据源（内存态，支持增删改） */
const configList: Array<Record<string, any>> = [
  {
    id: "1",
    configName: "系统名称",
    configKey: "system.name",
    configValue: "vue3-element-admin",
    remark: "后台管理系统名称",
  },
  {
    id: "2",
    configName: "系统Logo",
    configKey: "system.logo",
    configValue: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    remark: "后台管理系统 Logo 地址",
  },
  {
    id: "3",
    configName: "系统版本",
    configKey: "system.version",
    configValue: "4.8.4",
    remark: "后台管理系统版本号",
  },
];

export default defineMock([
  // 配置分页列表
  {
    url: "configs",
    method: ["GET"],
    body({ query }) {
      const { keywords, pageNum = "1", pageSize = "10" } = query;
      const filtered = configList.filter((item) => {
        if (keywords && !`${item.configName}${item.configKey}`.includes(keywords)) {
          return false;
        }
        return true;
      });
      const page = Number(pageNum);
      const size = Number(pageSize);
      const start = (page - 1) * size;
      return {
        code: "00000",
        data: {
          list: filtered.slice(start, start + size),
          total: filtered.length,
        },
        msg: "一切ok",
      };
    },
  },

  // 获取配置表单数据
  {
    url: "configs/:id/form",
    method: ["GET"],
    body({ params }) {
      const data = configList.find((item) => item.id === params.id);
      return {
        code: "00000",
        data: data ?? null,
        msg: "一切ok",
      };
    },
  },

  // 新增配置
  {
    url: "configs",
    method: ["POST"],
    body({ body }) {
      configList.unshift({ id: String(configList.length + 1), ...body });
      return {
        code: "00000",
        data: null,
        msg: "新增成功",
      };
    },
  },

  // 修改配置
  {
    url: "configs/:id",
    method: ["PUT"],
    body({ params, body }) {
      const index = configList.findIndex((item) => item.id === params.id);
      if (index !== -1) {
        configList[index] = { ...configList[index], ...body };
      }
      return {
        code: "00000",
        data: null,
        msg: "修改成功",
      };
    },
  },

  // 删除配置
  {
    url: "configs/:id",
    method: ["DELETE"],
    body({ params }) {
      const index = configList.findIndex((item) => item.id === params.id);
      if (index !== -1) {
        configList.splice(index, 1);
      }
      return {
        code: "00000",
        data: null,
        msg: "删除成功",
      };
    },
  },

  // 刷新配置缓存
  {
    url: "configs/refresh",
    method: ["PUT"],
    body: {
      code: "00000",
      data: null,
      msg: "刷新成功",
    },
  },
]);
