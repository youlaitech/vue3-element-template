import { defineMock } from "./base";

/* ------------------------------------------------------------------
 * 菜单 mock（内存态）
 * 数据与 youlai-boot 的 sys_menu 保持一致，仅保留模板已有页面的菜单：
 * 系统管理(1) 与 代码生成(3)；新增/修改/删除直接作用于内存数据，
 * 「动态路由」由菜单树实时生成，便于演示完整闭环。
 * ------------------------------------------------------------------ */

const MENU_TREE: MenuTreeNode[] = [
  {
    id: "1",
    parentId: "0",
    name: "系统管理",
    type: "C",
    routeName: null,
    routePath: "/system",
    component: "Layout",
    perm: null,
    visible: 1,
    sort: 1,
    icon: "system",
    redirect: "/system/user",
    keepAlive: null,
    children: [
      {
        id: "101",
        parentId: "1",
        name: "用户管理",
        type: "M",
        routeName: "User",
        routePath: "user",
        component: "system/user/index",
        perm: null,
        visible: 1,
        sort: 1,
        icon: "el-icon-User",
        redirect: null,
        keepAlive: true,
        children: [
          {
            id: "10101",
            parentId: "101",
            name: "用户查询",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:user:list",
            visible: 1,
            sort: 1,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10102",
            parentId: "101",
            name: "用户新增",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:user:create",
            visible: 1,
            sort: 2,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10103",
            parentId: "101",
            name: "用户编辑",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:user:update",
            visible: 1,
            sort: 3,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10104",
            parentId: "101",
            name: "用户删除",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:user:delete",
            visible: 1,
            sort: 4,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10105",
            parentId: "101",
            name: "重置密码",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:user:reset-password",
            visible: 1,
            sort: 5,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10106",
            parentId: "101",
            name: "用户导入",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:user:import",
            visible: 1,
            sort: 6,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10107",
            parentId: "101",
            name: "用户导出",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:user:export",
            visible: 1,
            sort: 7,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
        ],
      },
      {
        id: "102",
        parentId: "1",
        name: "角色管理",
        type: "M",
        routeName: "Role",
        routePath: "role",
        component: "system/role/index",
        perm: null,
        visible: 1,
        sort: 2,
        icon: "role",
        redirect: null,
        keepAlive: true,
        children: [
          {
            id: "10201",
            parentId: "102",
            name: "角色查询",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:role:list",
            visible: 1,
            sort: 1,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10202",
            parentId: "102",
            name: "角色新增",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:role:create",
            visible: 1,
            sort: 2,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10203",
            parentId: "102",
            name: "角色编辑",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:role:update",
            visible: 1,
            sort: 3,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10204",
            parentId: "102",
            name: "角色删除",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:role:delete",
            visible: 1,
            sort: 4,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10205",
            parentId: "102",
            name: "角色分配权限",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:role:assign",
            visible: 1,
            sort: 5,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
        ],
      },
      {
        id: "103",
        parentId: "1",
        name: "菜单管理",
        type: "M",
        routeName: "SysMenu",
        routePath: "menu",
        component: "system/menu/index",
        perm: null,
        visible: 1,
        sort: 3,
        icon: "menu",
        redirect: null,
        keepAlive: true,
        children: [
          {
            id: "10301",
            parentId: "103",
            name: "菜单查询",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:menu:list",
            visible: 1,
            sort: 1,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10302",
            parentId: "103",
            name: "菜单新增",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:menu:create",
            visible: 1,
            sort: 2,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10303",
            parentId: "103",
            name: "菜单编辑",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:menu:update",
            visible: 1,
            sort: 3,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10304",
            parentId: "103",
            name: "菜单删除",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:menu:delete",
            visible: 1,
            sort: 4,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
        ],
      },
      {
        id: "104",
        parentId: "1",
        name: "部门管理",
        type: "M",
        routeName: "Dept",
        routePath: "dept",
        component: "system/dept/index",
        perm: null,
        visible: 1,
        sort: 4,
        icon: "tree",
        redirect: null,
        keepAlive: true,
        children: [
          {
            id: "10401",
            parentId: "104",
            name: "部门查询",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dept:list",
            visible: 1,
            sort: 1,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10402",
            parentId: "104",
            name: "部门新增",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dept:create",
            visible: 1,
            sort: 2,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10403",
            parentId: "104",
            name: "部门编辑",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dept:update",
            visible: 1,
            sort: 3,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10404",
            parentId: "104",
            name: "部门删除",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dept:delete",
            visible: 1,
            sort: 4,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
        ],
      },
      {
        id: "105",
        parentId: "1",
        name: "字典管理",
        type: "M",
        routeName: "Dict",
        routePath: "dict",
        component: "system/dict/index",
        perm: null,
        visible: 1,
        sort: 5,
        icon: "dict",
        redirect: null,
        keepAlive: true,
        children: [
          {
            id: "10501",
            parentId: "105",
            name: "字典查询",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dict:list",
            visible: 1,
            sort: 1,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10502",
            parentId: "105",
            name: "字典新增",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dict:create",
            visible: 1,
            sort: 2,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10503",
            parentId: "105",
            name: "字典编辑",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dict:update",
            visible: 1,
            sort: 3,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10504",
            parentId: "105",
            name: "字典删除",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dict:delete",
            visible: 1,
            sort: 4,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10505",
            parentId: "105",
            name: "字典项查询",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dict-item:list",
            visible: 1,
            sort: 5,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10506",
            parentId: "105",
            name: "字典项新增",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dict-item:create",
            visible: 1,
            sort: 6,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10507",
            parentId: "105",
            name: "字典项编辑",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dict-item:update",
            visible: 1,
            sort: 7,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10508",
            parentId: "105",
            name: "字典项删除",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:dict-item:delete",
            visible: 1,
            sort: 8,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
        ],
      },
      {
        id: "107",
        parentId: "1",
        name: "系统日志",
        type: "M",
        routeName: "Log",
        routePath: "log",
        component: "system/log/index",
        perm: null,
        visible: 1,
        sort: 7,
        icon: "document",
        redirect: null,
        keepAlive: true,
        children: [
          {
            id: "10701",
            parentId: "107",
            name: "日志查询",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:log:list",
            visible: 1,
            sort: 1,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
        ],
      },
      {
        id: "108",
        parentId: "1",
        name: "系统配置",
        type: "M",
        routeName: "Config",
        routePath: "config",
        component: "system/config/index",
        perm: null,
        visible: 1,
        sort: 8,
        icon: "setting",
        redirect: null,
        keepAlive: true,
        children: [
          {
            id: "10801",
            parentId: "108",
            name: "系统配置查询",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:config:list",
            visible: 1,
            sort: 1,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10802",
            parentId: "108",
            name: "系统配置新增",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:config:create",
            visible: 1,
            sort: 2,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10803",
            parentId: "108",
            name: "系统配置修改",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:config:update",
            visible: 1,
            sort: 3,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10804",
            parentId: "108",
            name: "系统配置删除",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:config:delete",
            visible: 1,
            sort: 4,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10805",
            parentId: "108",
            name: "系统配置刷新",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:config:refresh",
            visible: 1,
            sort: 5,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
        ],
      },
      {
        id: "109",
        parentId: "1",
        name: "通知公告",
        type: "M",
        routeName: "Notice",
        routePath: "notice",
        component: "system/notice/index",
        perm: null,
        visible: 1,
        sort: 9,
        icon: "",
        redirect: null,
        keepAlive: null,
        children: [
          {
            id: "10901",
            parentId: "109",
            name: "通知查询",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:notice:list",
            visible: 1,
            sort: 1,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10902",
            parentId: "109",
            name: "通知新增",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:notice:create",
            visible: 1,
            sort: 2,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10903",
            parentId: "109",
            name: "通知编辑",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:notice:update",
            visible: 1,
            sort: 3,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10904",
            parentId: "109",
            name: "通知删除",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:notice:delete",
            visible: 1,
            sort: 4,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10905",
            parentId: "109",
            name: "通知发布",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:notice:publish",
            visible: 1,
            sort: 5,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
          {
            id: "10906",
            parentId: "109",
            name: "通知撤回",
            type: "B",
            routeName: null,
            routePath: "",
            component: null,
            perm: "sys:notice:revoke",
            visible: 1,
            sort: 6,
            icon: "",
            redirect: null,
            keepAlive: null,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    parentId: "0",
    name: "代码生成",
    type: "M",
    routeName: "Codegen",
    routePath: "/codegen",
    component: "codegen/index",
    perm: null,
    visible: 1,
    sort: 3,
    icon: "code",
    redirect: null,
    keepAlive: true,
    children: [],
  },
];
/* ---------------- 类型 ---------------- */

interface MenuTreeNode {
  id: string;
  parentId: string;
  name: string;
  type: string;
  routeName: string | null;
  routePath: string;
  component: string | null;
  perm: string | null;
  visible: number;
  sort: number;
  icon: string;
  redirect: string | null;
  /** 页面缓存（DB 的 keep_alive，接口列表不返回，仅用于生成动态路由） */
  keepAlive: boolean | null;
  children: MenuTreeNode[];
}

interface MenuOptionNode {
  value: string;
  label: string;
  type: string;
  children?: MenuOptionNode[];
}

interface RouteMeta {
  title: string;
  icon: string;
  hidden: boolean;
  keepAlive?: boolean;
  params: null;
}

interface RouteNode {
  path: string;
  component: string;
  name?: string;
  redirect?: string;
  meta: RouteMeta;
  children?: RouteNode[];
}

/* ---------------- 工具函数 ---------------- */

/** 新增菜单的 id 游标 */
let nextMenuId = 20000;

/** 按 id 查找菜单 */
function findMenu(nodes: MenuTreeNode[], id: string): MenuTreeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    const hit = findMenu(node.children, id);
    if (hit) return hit;
  }
  return undefined;
}

/** 从树中摘除菜单（连同其子菜单） */
function removeMenu(nodes: MenuTreeNode[], id: string): MenuTreeNode | undefined {
  const index = nodes.findIndex((item) => item.id === id);
  if (index !== -1) return nodes.splice(index, 1)[0];
  for (const node of nodes) {
    const hit = removeMenu(node.children, id);
    if (hit) return hit;
  }
  return undefined;
}

/** 挂载菜单到父级下（父级不存在时作为顶级），同级按 sort 排序 */
function insertMenu(node: MenuTreeNode): void {
  const parent = node.parentId === "0" ? undefined : findMenu(MENU_TREE, node.parentId);
  const bucket = parent ? parent.children : MENU_TREE;
  node.parentId = parent ? parent.id : "0";
  bucket.push(node);
  bucket.sort((a, b) => a.sort - b.sort);
}

/** 按关键字过滤菜单树（命中节点保留祖先链，便于树形表格展示） */
function filterMenuTree(nodes: MenuTreeNode[], keywords: string): MenuTreeNode[] {
  const lower = keywords.toLowerCase();
  return nodes.reduce<MenuTreeNode[]>((acc, node) => {
    const children = filterMenuTree(node.children, keywords);
    if (node.name.toLowerCase().includes(lower) || children.length) {
      acc.push({ ...node, children });
    }
    return acc;
  }, []);
}

/** 归一化 types 参数（支持 "C,M" 与重复键） */
function normalizeTypes(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  return String(raw ?? "")
    .split(",")
    .filter(Boolean);
}

/** 生成下拉树（按钮类型默认不参与上级菜单选择） */
function filterMenuOptions(nodes: MenuTreeNode[], types: string[]): MenuOptionNode[] {
  return nodes
    .filter((node) => !types.length || types.includes(node.type))
    .map((node) => ({
      value: node.id,
      label: node.name,
      type: node.type,
      ...(node.children.length ? { children: filterMenuOptions(node.children, types) } : {}),
    }));
}

/** 菜单树 → 前端动态路由（仅目录与可见菜单） */
function buildRoutes(nodes: MenuTreeNode[]): RouteNode[] {
  return nodes
    .filter((node) => node.type !== "B" && node.visible === 1)
    .map((node) => {
      const meta: RouteMeta = {
        title: node.name,
        icon: node.icon,
        hidden: node.visible !== 1,
        ...(node.keepAlive ? { keepAlive: true } : {}),
        params: null,
      };

      // 目录（Layout 容器）：保留分组信息，递归子路由
      if (!node.component || node.component === "Layout") {
        return {
          path: node.routePath,
          component: "Layout",
          name: node.routePath,
          ...(node.redirect ? { redirect: node.redirect } : {}),
          meta,
          ...(node.children.length ? { children: buildRoutes(node.children) } : {}),
        };
      }

      // 页面：顶级由前端自动套 Layout，子级直接用相对路径
      return {
        path: node.routePath,
        component: node.component,
        name: node.routeName ?? undefined,
        meta,
        ...(node.children.length ? { children: buildRoutes(node.children) } : {}),
      };
    });
}

/* ---------------- 接口 ---------------- */

export default defineMock([
  // 当前用户的路由（由菜单树实时生成）
  {
    url: "menus/routes",
    method: ["GET"],
    body() {
      return {
        code: "00000",
        data: buildRoutes(MENU_TREE),
        msg: "一切ok",
      };
    },
  },

  // 菜单树形表格（支持关键字搜索）
  {
    url: "menus",
    method: ["GET"],
    body({ query }) {
      const keywords = String(query?.keywords ?? "").trim();
      return {
        code: "00000",
        data: keywords ? filterMenuTree(MENU_TREE, keywords) : MENU_TREE,
        msg: "一切ok",
      };
    },
  },

  // 菜单下拉列表（可按类型过滤）
  {
    url: "menus/options",
    method: ["GET"],
    body({ query }) {
      const types = normalizeTypes((query as Record<string, unknown>)?.types);
      return {
        code: "00000",
        data: filterMenuOptions(MENU_TREE, types),
        msg: "一切ok",
      };
    },
  },

  // 新增菜单（支持按权限前缀生成增删改查按钮）
  {
    url: "menus",
    method: ["POST"],
    body({ body }) {
      const node: MenuTreeNode = {
        id: String(nextMenuId++),
        parentId: String(body.parentId ?? "0"),
        name: body.name ?? "",
        type: body.type ?? "M",
        routeName: body.routeName ?? null,
        routePath: body.routePath ?? "",
        component: body.component ?? null,
        perm: body.perm ?? null,
        visible: body.visible ?? 1,
        sort: Number(body.sort ?? 1),
        icon: body.icon ?? "",
        redirect: body.redirect ?? null,
        keepAlive: body.keepAlive === 1 || body.keepAlive === true ? true : null,
        children: [],
      };

      if (body.generateCrudButtons && node.type === "M" && body.buttonPermPrefix) {
        ["查询:list", "新增:create", "修改:update", "删除:delete"].forEach(
          (pair: string, index: number) => {
            const [label, action] = pair.split(":");
            node.children.push({
              id: String(nextMenuId++),
              parentId: node.id,
              name: `${node.name}${label}`,
              type: "B",
              routeName: null,
              routePath: "",
              component: null,
              perm: `${body.buttonPermPrefix}:${action}`,
              visible: 1,
              sort: index + 1,
              icon: "",
              redirect: null,
              keepAlive: null,
              children: [],
            });
          }
        );
      }

      insertMenu(node);
      return {
        code: "00000",
        data: null,
        msg: "新增菜单" + node.name + "成功",
      };
    },
  },

  // 获取菜单表单数据
  {
    url: "menus/:id/form",
    method: ["GET"],
    body: ({ params }) => {
      const menu = findMenu(MENU_TREE, params.id);
      return {
        code: "00000",
        data: {
          // 与线上表单接口字段保持一致（不返回 children）
          id: menu?.id ?? params.id,
          parentId: menu?.parentId ?? "0",
          name: menu?.name ?? "",
          type: menu?.type ?? "M",
          routeName: menu?.routeName ?? "",
          routePath: menu?.routePath ?? "",
          component: menu?.component ?? "",
          perm: menu?.perm ?? null,
          visible: menu?.visible ?? 1,
          sort: menu?.sort ?? 1,
          icon: menu?.icon ?? "",
          redirect: menu?.redirect ?? "",
          keepAlive: menu?.keepAlive ? 1 : null,
          params: null,
          externalUrl: null,
          generateCrudButtons: null,
          buttonPermPrefix: null,
        },
        msg: "一切ok",
      };
    },
  },

  // 修改菜单（含父级调整）
  {
    url: "menus/:id",
    method: ["PUT"],
    body({ params, body }) {
      const menu = findMenu(MENU_TREE, params.id);
      if (menu) {
        const nextParentId = String(body.parentId ?? menu.parentId);
        if (nextParentId !== menu.parentId) {
          removeMenu(MENU_TREE, menu.id);
          menu.parentId = nextParentId;
          insertMenu(menu);
        }
        Object.assign(menu, {
          name: body.name ?? menu.name,
          type: body.type ?? menu.type,
          routeName: body.routeName ?? menu.routeName,
          routePath: body.routePath ?? menu.routePath,
          component: body.component ?? menu.component,
          perm: body.perm ?? menu.perm,
          visible: body.visible ?? menu.visible,
          sort: Number(body.sort ?? menu.sort),
          icon: body.icon ?? menu.icon,
          redirect: body.redirect ?? menu.redirect,
          keepAlive:
            body.keepAlive === 1 || body.keepAlive === true
              ? true
              : body.keepAlive === 0 || body.keepAlive === false
                ? null
                : menu.keepAlive,
        });
      }
      return {
        code: "00000",
        data: null,
        msg: "修改菜单" + (body.name ?? params.id) + "成功",
      };
    },
  },

  // 删除菜单（连同子菜单）
  {
    url: "menus/:id",
    method: ["DELETE"],
    body({ params }) {
      const removed = removeMenu(MENU_TREE, params.id);
      return {
        code: "00000",
        data: null,
        msg: "删除菜单" + (removed ? removed.name : params.id) + "成功",
      };
    },
  },
]);
