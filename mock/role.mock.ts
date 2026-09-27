import { defineMock } from "./base";

export default defineMock([
  {
    url: "roles/options",
    method: ["GET"],
    body: {
      code: "00000",
      data: [
        { value: "1", label: "超级管理员" },
        { value: "2", label: "系统管理员" },
        { value: "3", label: "访问游客" },
        { value: "4", label: "部门主管" },
        { value: "5", label: "部门成员" },
        { value: "6", label: "普通员工" },
        { value: "7", label: "自定义权限用户" },
        { value: "8", label: "总经理" },
        { value: "9", label: "财务" },
        { value: "10", label: "行政" },
      ],
      msg: "一切ok",
    },
  },

  // 角色编码下拉数据源（value 为角色编码）
  {
    url: "roles/code-options",
    method: ["GET"],
    body: {
      code: "00000",
      data: [
        { value: "ROOT", label: "超级管理员" },
        { value: "ADMIN", label: "系统管理员" },
        { value: "GUEST", label: "访问游客" },
        { value: "DEPT_MANAGER", label: "部门主管" },
        { value: "DEPT_MEMBER", label: "部门成员" },
        { value: "EMPLOYEE", label: "普通员工" },
        { value: "CUSTOM_USER", label: "自定义权限用户" },
        { value: "GENERAL_MANAGER", label: "总经理" },
        { value: "FINANCE", label: "财务" },
        { value: "ADMINISTRATION", label: "行政" },
      ],
      msg: "一切ok",
    },
  },

  {
    url: "roles",
    method: ["GET"],
    body({ query }) {
      const keywords = String(query?.keywords ?? "").trim();
      const status =
        query?.status === undefined || query?.status === "" ? undefined : Number(query.status);
      const pageNum = Math.max(1, Number(query?.pageNum) || 1);
      const pageSize = Math.max(1, Number(query?.pageSize) || 10);

      const list = listRoles().filter((item) => {
        if (
          keywords &&
          !String(item.name ?? "").includes(keywords) &&
          !String(item.code ?? "").includes(keywords)
        ) {
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

  // 新增角色
  {
    url: "roles",
    method: ["POST"],
    body({ body }) {
      const id = String(nextRoleId++);
      const dataScope = Number(body.dataScope || 1);
      const role: RoleRow = {
        id,
        name: body.name ?? "",
        code: body.code ?? "",
        status: body.status ?? 1,
        sort: body.sort ?? 99,
        dataScope,
        dataScopeLabel: DATA_SCOPE_LABEL[dataScope] ?? "所有数据",
        createTime: "2026-09-26 08:10",
        updateTime: null,
      };
      if (dataScope === 5) role.deptIds = body.deptIds ?? [];
      roleMap[id] = role;
      return {
        code: "00000",
        data: null,
        msg: "新增角色" + role.name + "成功",
      };
    },
  },

  // 获取角色表单数据
  {
    url: "roles/:id/form",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: roleMap[params.id],
        msg: "一切ok",
      };
    },
  },
  // 修改角色
  {
    url: "roles/:id",
    method: ["PUT"],
    body({ params, body }) {
      const role = roleMap[params.id];
      if (!role) return { code: "00000", data: null, msg: "角色不存在" };
      const dataScope = Number(body.dataScope ?? role.dataScope);
      Object.assign(role, {
        name: body.name ?? role.name,
        code: body.code ?? role.code,
        status: body.status ?? role.status,
        sort: body.sort ?? role.sort,
        dataScope,
        dataScopeLabel: DATA_SCOPE_LABEL[dataScope] ?? role.dataScopeLabel,
        updateTime: "2026-09-26 08:10",
      });
      if (dataScope === 5) role.deptIds = body.deptIds ?? role.deptIds ?? [];
      return {
        code: "00000",
        data: null,
        msg: "修改角色" + role.name + "成功",
      };
    },
  },

  // 删除角色（同时清理该角色的菜单授权）
  {
    url: "roles/:id",
    method: ["DELETE"],
    body({ params }) {
      delete roleMap[params.id];
      delete roleMenuIds[params.id];
      return {
        code: "00000",
        data: null,
        msg: "删除角色" + params.id + "成功",
      };
    },
  },

  // 获取角色拥有的菜单ID（内存态，保存后即时生效）
  {
    url: "roles/:id/menu-ids",
    method: ["GET"],
    body({ params }) {
      return {
        code: "00000",
        data: roleMenuIds[params.id] ?? [],
        msg: "一切ok",
      };
    },
  },
  // 保存角色菜单
  {
    url: "roles/:id/menus",
    method: ["PUT"],
    body({ params, body }) {
      const ids = Array.isArray(body) ? body : (body?.menuIds ?? []);
      roleMenuIds[params.id] = ids.map(String);
      return {
        code: "00000",
        data: null,
        msg: "分配权限成功",
      };
    },
  },

  // 获取角色部门ID列表(自定义数据权限)
  {
    url: "roles/:id/dept-ids",
    method: ["GET"],
    body: ({ params }) => {
      const role = roleMap[params.id];
      return {
        code: "00000",
        data: role?.dataScope === 5 ? role.deptIds || [1, 2] : [],
        msg: "一切ok",
      };
    },
  },
]);

// 全部菜单 ID（与 mock/menu.mock.ts 的菜单树一致）
const ALL_MENU_IDS = [
  "1",
  "101",
  "10101",
  "10102",
  "10103",
  "10104",
  "10105",
  "10106",
  "10107",
  "102",
  "10201",
  "10202",
  "10203",
  "10204",
  "10205",
  "103",
  "10301",
  "10302",
  "10303",
  "10304",
  "104",
  "10401",
  "10402",
  "10403",
  "10404",
  "105",
  "10501",
  "10502",
  "10503",
  "10504",
  "10505",
  "10506",
  "10507",
  "10508",
  "107",
  "10701",
  "108",
  "10801",
  "10802",
  "10803",
  "10804",
  "10805",
  "109",
  "10901",
  "10902",
  "10903",
  "10904",
  "10905",
  "10906",
  "3",
];

// 角色已授权菜单（内存态；超级管理员与系统管理员默认拥有全部菜单）
const roleMenuIds: Record<string, string[]> = {
  "1": [...ALL_MENU_IDS],
  "2": [...ALL_MENU_IDS],
};

// 角色映射表数据
const roleMap: Record<string, any> = {
  "1": {
    id: "1",
    name: "超级管理员",
    code: "ROOT",
    status: 1,
    sort: 1,
    dataScope: 1,
    dataScopeLabel: "所有数据",
    createTime: "2026-09-26T08:10:02",
    updateTime: "2026-09-26T08:10:02",
  },
  "2": {
    id: "2",
    name: "系统管理员",
    code: "ADMIN",
    status: 1,
    sort: 2,
    dataScope: 1,
    dataScopeLabel: "所有数据",
    createTime: "2026-09-26T08:10:02",
    updateTime: null,
  },
  "3": {
    id: "3",
    name: "访问游客",
    code: "GUEST",
    status: 1,
    sort: 3,
    dataScope: 3,
    dataScopeLabel: "本部门数据",
    createTime: "2026-09-26T08:10:02",
    updateTime: "2026-09-26T08:10:02",
  },
  "4": {
    id: "4",
    name: "部门主管",
    code: "DEPT_MANAGER",
    status: 1,
    sort: 4,
    dataScope: 2,
    dataScopeLabel: "部门及子部门数据",
    createTime: "2026-09-26T08:10:02",
    updateTime: "2026-09-26T08:10:02",
  },
  "5": {
    id: "5",
    name: "部门成员",
    code: "DEPT_MEMBER",
    status: 1,
    sort: 5,
    dataScope: 3,
    dataScopeLabel: "本部门数据",
    createTime: "2026-09-26T08:10:02",
    updateTime: "2026-09-26T08:10:02",
  },
  "6": {
    id: "6",
    name: "普通员工",
    code: "EMPLOYEE",
    status: 1,
    sort: 6,
    dataScope: 4,
    dataScopeLabel: "本人数据",
    createTime: "2026-09-26T08:10:02",
    updateTime: "2026-09-26T08:10:02",
  },
  "7": {
    id: "7",
    name: "自定义权限用户",
    code: "CUSTOM_USER",
    status: 1,
    sort: 7,
    dataScope: 5,
    dataScopeLabel: "自定义部门数据",
    createTime: "2026-09-26T08:10:02",
    updateTime: "2026-09-26T08:10:02",
    deptIds: [1, 2],
  },
  "8": {
    id: "8",
    name: "总经理",
    code: "GENERAL_MANAGER",
    status: 1,
    sort: 8,
    dataScope: 4,
    dataScopeLabel: "本人数据",
    createTime: "2026-09-26T08:10:03",
    updateTime: "2026-09-26T08:10:03",
  },
  "9": {
    id: "9",
    name: "财务",
    code: "FINANCE",
    status: 1,
    sort: 9,
    dataScope: 4,
    dataScopeLabel: "本人数据",
    createTime: "2026-09-26T08:10:03",
    updateTime: "2026-09-26T08:10:03",
  },
  "10": {
    id: "10",
    name: "行政",
    code: "ADMINISTRATION",
    status: 1,
    sort: 10,
    dataScope: 4,
    dataScopeLabel: "本人数据",
    createTime: "2026-09-26T08:10:03",
    updateTime: "2026-09-26T08:10:03",
  },
};

/** 角色行数据 */
interface RoleRow {
  id: string;
  name: string;
  code: string;
  status: number;
  sort: number;
  dataScope: number;
  dataScopeLabel: string;
  createTime: string;
  updateTime: string | null;
  deptIds?: number[];
}

/** 新增角色 id 游标 */
let nextRoleId = 100;

/** 数据权限文案 */
const DATA_SCOPE_LABEL: Record<number, string> = {
  1: "所有数据",
  2: "部门及子部门数据",
  3: "本部门数据",
  4: "本人数据",
  5: "自定义部门数据",
};

/** 角色列表：从 roleMap 派生，保证增删改后立即生效（按 sort 升序） */
function listRoles(): RoleRow[] {
  return (Object.values(roleMap) as RoleRow[]).sort((a, b) => a.sort - b.sort);
}
