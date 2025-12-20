import request from "@/utils/request";
// 菜单基础URL
const MENU_BASE_URL = "/api/v1/menus";

const MenuAPI = {
  /**
   * 获取当前用户的路由列表
   * <p/>
   * 无需传入角色，后端解析token获取角色自行判断是否拥有路由的权限
   *
   * @returns 路由列表
   */
  getRoutes() {
    return request<any, RouteVO[]>({
      url: `${MENU_BASE_URL}/routes`,
      method: "get",
    });
  },

  /**
   * 获取菜单树形列表
   *
   * @param queryParams 查询参数
   * @returns 菜单树形列表
   */
  getList(queryParams: MenuQuery) {
    return request<any, MenuVO[]>({
      url: `${MENU_BASE_URL}`,
      method: "get",
      params: queryParams,
    }).then((data) => mapMenuListFromBackend(data));
  },

  /**
   * 获取菜单下拉数据源
   *
   * @returns 菜单下拉数据源
   */
  getOptions(onlyParent?: boolean) {
    return request<any, OptionType[]>({
      url: `${MENU_BASE_URL}/options`,
      method: "get",
      params: { onlyParent: onlyParent },
    });
  },

  /**
   * 获取菜单表单数据
   *
   * @param id 菜单ID
   */
  getFormData(id: string) {
    return request<any, MenuForm>({
      url: `${MENU_BASE_URL}/${id}/form`,
      method: "get",
    }).then((data) => mapMenuFormFromBackend(data));
  },

  /**
   * 添加菜单
   *
   * @param data 菜单表单数据
   * @returns 请求结果
   */
  create(data: MenuForm) {
    return request({
      url: `${MENU_BASE_URL}`,
      method: "post",
      data: mapMenuFormToBackend(data),
    });
  },

  /**
   * 修改菜单
   *
   * @param id 菜单ID
   * @param data 菜单表单数据
   * @returns 请求结果
   */
  update(id: string, data: MenuForm) {
    return request({
      url: `${MENU_BASE_URL}/${id}`,
      method: "put",
      data: mapMenuFormToBackend(data),
    });
  },

  /**
   * 删除菜单
   *
   * @param id 菜单ID
   * @returns 请求结果
   */
  deleteById(id: string) {
    return request({
      url: `${MENU_BASE_URL}/${id}`,
      method: "delete",
    });
  },
};

export default MenuAPI;

/** 菜单查询参数 */
export interface MenuQuery {
  /** 搜索关键字 */
  keywords?: string;
}

/** 菜单视图对象 */
export interface MenuVO {
  /** 子菜单 */
  children?: MenuVO[];
  /** 组件路径 */
  component?: string;
  /** ICON */
  icon?: string;
  /** 菜单ID */
  id?: string;
  /** 菜单名称 */
  name?: string;
  /** 父菜单ID */
  parentId?: string;
  /** 按钮权限标识 */
  perm?: string;
  /** 跳转路径 */
  redirect?: string;
  /** 路由名称 */
  routeName?: string;
  /** 路由相对路径 */
  routePath?: string;
  /** 菜单排序(数字越小排名越靠前) */
  sort?: number;
  /** 菜单 */
  type?: number;
  /** 菜单是否可见(1:显示;0:隐藏) */
  visible?: number;
}

/** 菜单表单对象 */
export interface MenuForm {
  /** 菜单ID */
  id?: string;
  /** 父菜单ID */
  parentId?: string;
  /** 菜单名称 */
  name?: string;
  /** 菜单是否可见(1-是 0-否) */
  visible: number;
  /** ICON */
  icon?: string;
  /** 排序 */
  sort?: number;
  /** 路由名称 */
  routeName?: string;
  /** 路由路径 */
  routePath?: string;
  /** 组件路径 */
  component?: string;
  /** 跳转路由路径 */
  redirect?: string;
  /** 菜单 */
  type?: number;
  /** 权限标识 */
  perm?: string;
  /** 【菜单】是否开启页面缓存 */
  keepAlive?: number;
  /** 【目录】只有一个子路由是否始终显示 */
  alwaysShow?: number;
  /** 参数 */
  params?: KeyValue[];
}

interface KeyValue {
  key: string;
  value: string;
}

type BackendMenuType = "C" | "M" | "B";

const isExternalLink = (routePath?: string) => {
  if (!routePath) return false;
  return /^https?:\/\//i.test(routePath);
};

const mapTypeFromBackend = (type: BackendMenuType, routePath?: string): number => {
  if (type === "C") return 2;
  if (type === "B") return 3;
  return isExternalLink(routePath) ? 4 : 1;
};

const mapTypeToBackend = (type?: number): BackendMenuType | undefined => {
  if (type === undefined || type === null) return undefined;
  if (type === 2) return "C";
  if (type === 3) return "B";
  return "M";
};

const mapMenuItemFromBackend = (item: MenuVO): MenuVO => {
  const mapped: MenuVO = {
    ...item,
    type: item.type ? item.type : (item as any).type,
  };
  if (typeof (item as any).type === "string") {
    mapped.type = mapTypeFromBackend((item as any).type as BackendMenuType, item.routePath);
  }
  if (item.children?.length) {
    mapped.children = item.children.map(mapMenuItemFromBackend);
  }
  return mapped;
};

const mapMenuListFromBackend = (data: MenuVO[]) => {
  return (data || []).map(mapMenuItemFromBackend);
};

const mapMenuFormFromBackend = (data: MenuForm): MenuForm => {
  if (!data) return data;
  if (typeof (data as any).type === "string") {
    return {
      ...data,
      type: mapTypeFromBackend((data as any).type as BackendMenuType, (data as any).routePath),
    };
  }
  return data;
};

const mapMenuFormToBackend = (data: MenuForm): Record<string, any> => {
  const payload: Record<string, any> = { ...data };
  payload.type = mapTypeToBackend(data.type);
  return payload;
};

/** RouteVO，路由对象 */
export interface RouteVO {
  /** 子路由列表 */
  children: RouteVO[];
  /** 组件路径 */
  component?: string;
  /** 路由属性 */
  meta?: Meta;
  /** 路由名称 */
  name?: string;
  /** 路由路径 */
  path?: string;
  /** 跳转链接 */
  redirect?: string;
}

/** Meta，路由属性 */
export interface Meta {
  /** 【目录】只有一个子路由是否始终显示 */
  alwaysShow?: boolean;
  /** 是否隐藏(true-是 false-否) */
  hidden?: boolean;
  /** ICON */
  icon?: string;
  /** 【菜单】是否开启页面缓存 */
  keepAlive?: boolean;
  /** 路由title */
  title?: string;
}
