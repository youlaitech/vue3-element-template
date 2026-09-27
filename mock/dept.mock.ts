import { defineMock } from "./base";

/* ------------------------------------------------------------------
 * 部门 mock（内存态）
 * 数据与线上接口一致；新增、修改、删除直接作用于内存数据，
 * 删除部门会连同其子部门一起删除，与后端级联行为保持一致。
 * ------------------------------------------------------------------ */

interface DeptRow {
  id: string;
  parentId: string;
  name: string;
  code: string;
  sort: number;
  status: number;
  createTime: string | null;
  updateTime: string | null;
}

interface DeptNode extends DeptRow {
  children: DeptNode[];
}

// 部门数据（扁平存储，树形按需生成）
const deptList: DeptRow[] = [
  {
    id: "1",
    parentId: "0",
    name: "有来技术",
    code: "YOULAI",
    sort: 1,
    status: 1,
    createTime: null,
    updateTime: "2026-09-26 08:10",
  },
  {
    id: "2",
    parentId: "1",
    name: "研发部门",
    code: "RD001",
    sort: 1,
    status: 1,
    createTime: null,
    updateTime: "2026-09-26 08:10",
  },
  {
    id: "3",
    parentId: "1",
    name: "测试部门",
    code: "QA001",
    sort: 1,
    status: 1,
    createTime: null,
    updateTime: "2026-09-26 08:10",
  },
];

/** 新增部门的 id 游标 */
let nextDeptId = 100;

/** 扁平数据 → 部门树 */
function buildDeptTree(): DeptNode[] {
  const map = new Map<string, DeptNode>();
  deptList.forEach((item) => map.set(item.id, { ...item, children: [] }));

  const roots: DeptNode[] = [];
  map.forEach((node) => {
    const parent = node.parentId === "0" ? undefined : map.get(node.parentId);
    if (parent) parent.children.push(node);
    else roots.push(node);
  });

  const sortTree = (nodes: DeptNode[]) => {
    nodes.sort((a, b) => a.sort - b.sort);
    nodes.forEach((node) => sortTree(node.children));
  };
  sortTree(roots);
  return roots;
}

/** 收集部门及其子部门 id（带环保护） */
function collectDeptIds(id: string, acc: string[] = []): string[] {
  if (acc.includes(id)) return acc;
  acc.push(id);
  deptList.filter((item) => item.parentId === id).forEach((child) => collectDeptIds(child.id, acc));
  return acc;
}

export default defineMock([
  // 部门树形列表
  {
    url: "depts",
    method: ["GET"],
    body() {
      return {
        code: "00000",
        data: buildDeptTree(),
        msg: "一切ok",
      };
    },
  },

  // 部门下拉数据源
  {
    url: "depts/options",
    method: ["GET"],
    body() {
      const toOptions = (nodes: DeptNode[]): unknown[] =>
        nodes.map((node) => ({
          value: node.id,
          label: node.name,
          ...(node.children.length ? { children: toOptions(node.children) } : {}),
        }));

      return {
        code: "00000",
        data: toOptions(buildDeptTree()),
        msg: "一切ok",
      };
    },
  },

  // 新增部门
  {
    url: "depts",
    method: ["POST"],
    body({ body }) {
      const item: DeptRow = {
        id: String(nextDeptId++),
        parentId: String(body.parentId ?? "0"),
        name: body.name ?? "",
        code: body.code ?? "",
        sort: Number(body.sort ?? 1),
        status: body.status ?? 1,
        createTime: "2026-09-26 08:10",
        updateTime: null,
      };
      deptList.push(item);
      return {
        code: "00000",
        data: null,
        msg: "新增部门" + item.name + "成功",
      };
    },
  },

  // 获取部门表单数据
  {
    url: "depts/:id/form",
    method: ["GET"],
    body: ({ params }) => ({
      code: "00000",
      data:
        deptList.find((item) => item.id === params.id) ??
        ({
          id: params.id,
          parentId: "0",
          name: "",
          code: "",
          sort: 1,
          status: 1,
        } as any),
      msg: "一切ok",
    }),
  },

  // 修改部门
  {
    url: "depts/:id",
    method: ["PUT"],
    body({ params, body }) {
      const item = deptList.find((row) => row.id === params.id);
      if (item) {
        // 不允许把自身或其子部门设为上级，避免形成环
        const nextParentId = String(body.parentId ?? item.parentId);
        const cyclic = nextParentId === item.id || collectDeptIds(item.id).includes(nextParentId);

        Object.assign(item, {
          parentId: cyclic ? item.parentId : nextParentId,
          name: body.name ?? item.name,
          code: body.code ?? item.code,
          sort: Number(body.sort ?? item.sort),
          status: body.status ?? item.status,
          updateTime: "2026-09-26 08:10",
        });
      }
      return {
        code: "00000",
        data: null,
        msg: "修改部门" + (body.name ?? params.id) + "成功",
      };
    },
  },

  // 删除部门（连同子部门）
  {
    url: "depts/:id",
    method: ["DELETE"],
    body({ params }) {
      collectDeptIds(params.id).forEach((id) => {
        const index = deptList.findIndex((row) => row.id === id);
        if (index !== -1) deptList.splice(index, 1);
      });
      return {
        code: "00000",
        data: null,
        msg: "删除部门" + params.id + "成功",
      };
    },
  },
]);
