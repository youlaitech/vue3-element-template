import { defineMock } from "./base";

/* ------------------------------------------------------------------
 * 字典 / 字典项 mock（内存态）
 * 数据与线上接口一致；新增、修改、删除直接作用于内存数据，
 * 删除字典时级联删除其字典项。
 * ------------------------------------------------------------------ */

// 字典数据
const dictList = [
  {
    id: "1",
    name: "性别",
    dictCode: "gender",
    status: 1,
  },
  {
    id: "2",
    name: "通知类型",
    dictCode: "notice_type",
    status: 1,
  },
  {
    id: "3",
    name: "通知级别",
    dictCode: "notice_level",
    status: 1,
  },
];

// 字典项数据（按字典编码分组）
const dictItemList: Record<string, any[]> = {
  gender: [
    {
      id: "1",
      dictCode: "gender",
      label: "男",
      value: "1",
      sort: 1,
      status: 1,
      tagType: "primary",
    },
    {
      id: "2",
      dictCode: "gender",
      label: "女",
      value: "2",
      sort: 2,
      status: 1,
      tagType: "danger",
    },
    {
      id: "3",
      dictCode: "gender",
      label: "保密",
      value: "0",
      sort: 3,
      status: 1,
      tagType: "info",
    },
  ],
  notice_type: [
    {
      id: "4",
      dictCode: "notice_type",
      label: "系统升级",
      value: "1",
      sort: 1,
      status: 1,
      tagType: "success",
    },
    {
      id: "5",
      dictCode: "notice_type",
      label: "系统维护",
      value: "2",
      sort: 2,
      status: 1,
      tagType: "primary",
    },
    {
      id: "6",
      dictCode: "notice_type",
      label: "安全警告",
      value: "3",
      sort: 3,
      status: 1,
      tagType: "danger",
    },
    {
      id: "7",
      dictCode: "notice_type",
      label: "假期通知",
      value: "4",
      sort: 4,
      status: 1,
      tagType: "success",
    },
    {
      id: "8",
      dictCode: "notice_type",
      label: "公司新闻",
      value: "5",
      sort: 5,
      status: 1,
      tagType: "primary",
    },
    {
      id: "9",
      dictCode: "notice_type",
      label: "其他",
      value: "99",
      sort: 99,
      status: 1,
      tagType: "info",
    },
  ],
  notice_level: [
    {
      id: "10",
      dictCode: "notice_level",
      label: "低",
      value: "L",
      sort: 1,
      status: 1,
      tagType: "info",
    },
    {
      id: "11",
      dictCode: "notice_level",
      label: "中",
      value: "M",
      sort: 2,
      status: 1,
      tagType: "warning",
    },
    {
      id: "12",
      dictCode: "notice_level",
      label: "高",
      value: "H",
      sort: 3,
      status: 1,
      tagType: "danger",
    },
  ],
};

/** 新增字典/字典项的 id 游标 */
let nextDictId = 100;
let nextItemId = 1000;

/** 按 id 查找字典 */
function findDict(id: string) {
  return dictList.find((item) => item.id === id);
}

/** 按字典编码与 id 查找字典项 */
function findItem(dictCode: string, itemId: string) {
  return (dictItemList[dictCode] ?? []).find((item) => item.id === itemId);
}

export default defineMock([
  // 字典分页列表（支持关键字搜索）
  {
    url: "dicts",
    method: ["GET"],
    body({ query }) {
      const keywords = String(query?.keywords ?? "").trim();
      const status =
        query?.status === undefined || query?.status === "" ? undefined : Number(query.status);

      const pageNum = Math.max(1, Number(query?.pageNum) || 1);
      const pageSize = Math.max(1, Number(query?.pageSize) || 10);

      const list = dictList.filter((item) => {
        if (keywords && !item.name.includes(keywords) && !item.dictCode.includes(keywords)) {
          return false;
        }
        if (status !== undefined && item.status !== status) return false;
        return true;
      });

      return {
        code: "00000",
        data: {
          list: list.slice((pageNum - 1) * pageSize, pageNum * pageSize),
          total: list.length,
        },
        msg: "一切ok",
      };
    },
  },

  // 字典下拉数据源
  {
    url: "dicts/options",
    method: ["GET"],
    body: {
      code: "00000",
      data: dictList.map((item) => ({ value: item.dictCode, label: item.name })),
      msg: "一切ok",
    },
  },

  // 新增字典
  {
    url: "dicts",
    method: ["POST"],
    body({ body }) {
      const item = {
        id: String(nextDictId++),
        name: body.name ?? "",
        dictCode: body.dictCode ?? "",
        status: body.status ?? 1,
      };
      dictList.push(item);
      dictItemList[item.dictCode] = dictItemList[item.dictCode] ?? [];
      return {
        code: "00000",
        data: null,
        msg: "新增字典" + item.name + "成功",
      };
    },
  },

  // 获取字典表单数据
  {
    url: "dicts/:id/form",
    method: ["GET"],
    body: ({ params }) => {
      const item = findDict(params.id);
      return {
        code: "00000",
        data: {
          id: item?.id ?? params.id,
          name: item?.name ?? "",
          dictCode: item?.dictCode ?? "",
          status: item?.status ?? 1,
          remark: null,
        },
        msg: "一切ok",
      };
    },
  },

  // 修改字典
  {
    url: "dicts/:id",
    method: ["PUT"],
    body({ params, body }) {
      const item = findDict(params.id);
      if (item) {
        Object.assign(item, {
          name: body.name ?? item.name,
          dictCode: body.dictCode ?? item.dictCode,
          status: body.status ?? item.status,
        });
      }
      return {
        code: "00000",
        data: null,
        msg: "修改字典" + (body.name ?? params.id) + "成功",
      };
    },
  },

  // 删除字典（级联删除字典项）
  {
    url: "dicts/:ids",
    method: ["DELETE"],
    body({ params }) {
      String(params.ids)
        .split(",")
        .forEach((id) => {
          const index = dictList.findIndex((item) => item.id === id);
          if (index !== -1) {
            const [removed] = dictList.splice(index, 1);
            delete dictItemList[removed.dictCode];
          }
        });
      return {
        code: "00000",
        data: null,
        msg: "删除字典" + params.ids + "成功",
      };
    },
  },

  //---------------------------------------------------
  // 字典项相关接口
  //---------------------------------------------------

  // 字典项分页列表（支持关键字搜索）
  {
    url: "dicts/:dictCode/items",
    method: ["GET"],
    body({ params, query }) {
      const all = dictItemList[params.dictCode] ?? [];
      const keywords = String(query?.keywords ?? "").trim();
      const filtered = keywords
        ? all.filter((item) => item.label.includes(keywords) || item.value.includes(keywords))
        : all;
      const pageNum = Number(query?.pageNum ?? 1);
      const pageSize = Number(query?.pageSize ?? 10);
      const start = (pageNum - 1) * pageSize;

      return {
        code: "00000",
        data: { list: filtered.slice(start, start + pageSize), total: filtered.length },
        msg: "一切ok",
      };
    },
  },

  // 字典项下拉数据源
  {
    url: "dicts/:dictCode/items/options",
    method: ["GET"],
    body({ params }) {
      const list = (dictItemList[params.dictCode] ?? [])
        .filter((item) => item.status === 1)
        .map((item) => ({ value: item.value, label: item.label, tagType: item.tagType }));

      return { code: "00000", data: list, msg: "一切ok" };
    },
  },

  // 新增字典项
  {
    url: "dicts/:dictCode/items",
    method: ["POST"],
    body({ params, body }) {
      const item = {
        id: String(nextItemId++),
        dictCode: params.dictCode,
        label: body.label ?? "",
        value: body.value ?? "",
        sort: Number(body.sort ?? 1),
        status: body.status ?? 1,
        tagType: body.tagType ?? "",
      };
      dictItemList[params.dictCode] = dictItemList[params.dictCode] ?? [];
      dictItemList[params.dictCode].push(item);
      return {
        code: "00000",
        data: null,
        msg: "新增字典项" + item.label + "成功",
      };
    },
  },

  // 字典项表单数据
  {
    url: "dicts/:dictCode/items/:itemId/form",
    method: ["GET"],
    body: ({ params }) => ({
      code: "00000",
      data:
        findItem(params.dictCode, params.itemId) ??
        ({
          id: params.itemId,
          dictCode: params.dictCode,
          label: "",
          value: "",
          sort: 1,
          status: 1,
          tagType: "",
        } as any),
      msg: "一切ok",
    }),
  },

  // 修改字典项
  {
    url: "dicts/:dictCode/items/:itemId",
    method: ["PUT"],
    body({ params, body }) {
      const item = findItem(params.dictCode, params.itemId);
      if (item) {
        Object.assign(item, {
          label: body.label ?? item.label,
          value: body.value ?? item.value,
          sort: Number(body.sort ?? item.sort),
          status: body.status ?? item.status,
          tagType: body.tagType ?? item.tagType,
        });
      }
      return {
        code: "00000",
        data: null,
        msg: "修改字典项" + (body.label ?? params.itemId) + "成功",
      };
    },
  },

  // 删除字典项（支持逗号分隔的批量删除）
  {
    url: "dicts/:dictCode/items/:itemId",
    method: ["DELETE"],
    body({ params }) {
      const rows = dictItemList[params.dictCode] ?? [];
      String(params.itemId)
        .split(",")
        .forEach((id) => {
          const index = rows.findIndex((item) => item.id === id);
          if (index !== -1) rows.splice(index, 1);
        });
      return {
        code: "00000",
        data: null,
        msg: "删除字典项" + params.itemId + "成功",
      };
    },
  },
]);
