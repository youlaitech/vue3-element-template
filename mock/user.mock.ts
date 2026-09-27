import { defineMock } from "./base";

export default defineMock([
  {
    url: "users/me",
    method: ["GET"],
    body: {
      code: "00000",
      data: {
        // 登录账号 admin 的用户 id 与部门 id（见本文件 users 列表）
        userId: "2",
        username: "admin",
        nickname: "系统管理员",
        avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
        gender: 1,
        deptName: "有来技术",
        roles: ["ADMIN", "ROOT"],
        roleNames: ["系统管理员", "超级管理员"],
        perms: [],
      },
      msg: "一切ok",
    },
  },

  // 下载用户导入模板
  {
    url: "users/template",
    method: ["GET"],
    headers: {
      "Content-Disposition":
        "attachment; filename=%E7%94%A8%E6%88%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx",
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  },

  // 导入用户
  {
    url: "users/import",
    method: ["POST"],
    body: {
      code: "00000",
      data: {
        code: "00000",
        invalidCount: 0,
        validCount: 2,
        messageList: [],
      },
      msg: "一切ok",
    },
  },

  // 获取用户下拉列表
  {
    url: "users/options",
    method: ["GET"],
    body() {
      return {
        code: "00000",
        data: userList.map((item) => ({ value: item.id, label: item.nickname })),
        msg: "一切ok",
      };
    },
  },

  // 发送短信验证码（绑定或更换手机号）
  {
    url: "users/mobile/code",
    method: ["POST"],
    body({ query }) {
      return {
        code: "00000",
        data: null,
        msg: "验证码已发送至 " + (query?.mobile ?? ""),
      };
    },
  },

  // 绑定或更换手机号
  {
    url: "users/mobile",
    method: ["PUT"],
    body() {
      return {
        code: "00000",
        data: null,
        msg: "手机号绑定成功",
      };
    },
  },

  // 解绑手机号
  {
    url: "users/mobile",
    method: ["DELETE"],
    body() {
      return {
        code: "00000",
        data: null,
        msg: "手机号解绑成功",
      };
    },
  },

  // 发送邮箱验证码（绑定或更换邮箱）
  {
    url: "users/email/code",
    method: ["POST"],
    body({ query }) {
      return {
        code: "00000",
        data: null,
        msg: "验证码已发送至 " + (query?.email ?? ""),
      };
    },
  },

  // 绑定或更换邮箱
  {
    url: "users/email",
    method: ["PUT"],
    body() {
      return {
        code: "00000",
        data: null,
        msg: "邮箱绑定成功",
      };
    },
  },

  // 解绑邮箱
  {
    url: "users/email",
    method: ["DELETE"],
    body() {
      return {
        code: "00000",
        data: null,
        msg: "邮箱解绑成功",
      };
    },
  },

  {
    url: "users",
    method: ["GET"],
    body({ query }) {
      const keywords = String(query?.keywords ?? "").trim();
      const status =
        query?.status === undefined || query?.status === "" ? undefined : Number(query.status);
      const pageNum = Math.max(1, Number(query?.pageNum) || 1);
      const pageSize = Math.max(1, Number(query?.pageSize) || 10);
      const deptId = String(query?.deptId ?? "").trim();
      const range = query?.createTime;
      const [start, end] = (Array.isArray(range) ? range : String(range ?? "").split(",")).map(
        (value) => String(value ?? "").slice(0, 10)
      );
      const day = (value: unknown) =>
        String(value ?? "")
          .replace(/\//g, "-")
          .slice(0, 10);
      const deptName = deptId ? DEPT_ID_NAME[deptId] : "";

      const list = userList.filter((item) => {
        if (
          keywords &&
          !item.username.includes(keywords) &&
          !String(item.nickname ?? "").includes(keywords) &&
          !String(item.mobile ?? "").includes(keywords)
        ) {
          return false;
        }
        if (status !== undefined && item.status !== status) return false;
        if (deptName && item.deptName !== deptName) return false;
        if (start && day(item.createTime) < start) return false;
        if (end && day(item.createTime) > end) return false;
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

  // 新增用户
  {
    url: "users",
    method: ["POST"],
    body({ body }) {
      const id = String(nextUserId++);
      const item = {
        id,
        username: body.username ?? "",
        nickname: body.nickname ?? "",
        mobile: body.mobile ?? "",
        gender: body.gender ?? 1,
        avatar: body.avatar ?? "",
        email: body.email ?? "",
        status: body.status ?? 1,
        deptName: DEPT_ID_NAME[String(body.deptId ?? "")] ?? null,
        roleNames: String(body.roleIds ?? "")
          .split(",")
          .map((rid) => ROLE_ID_NAME[String(rid).trim()])
          .filter(Boolean)
          .join(","),
        createTime: "2026-09-26 08:10",
      };
      userList.unshift(item);
      userMap[id] = {
        ...item,
        deptId: String(body.deptId ?? ""),
        roleIds: String(body.roleIds ?? "")
          .split(",")
          .filter(Boolean),
      };
      return {
        code: "00000",
        data: null,
        msg: "新增用户" + item.nickname + "成功",
      };
    },
  },

  // 获取用户表单数据
  {
    url: "users/:userId/form",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: userMap[params.userId],
        msg: "一切ok",
      };
    },
  },
  // 修改用户
  {
    url: "users/:userId",
    method: ["PUT"],
    body({ params, body }) {
      const item = userList.find((row) => row.id === params.userId);
      if (item) {
        Object.assign(item, {
          username: body.username ?? item.username,
          nickname: body.nickname ?? item.nickname,
          mobile: body.mobile ?? item.mobile,
          gender: body.gender ?? item.gender,
          email: body.email ?? item.email,
          status: body.status ?? item.status,
          deptName: body.deptId
            ? (DEPT_ID_NAME[String(body.deptId)] ?? item.deptName)
            : item.deptName,
          roleNames: body.roleIds
            ? String(body.roleIds)
                .split(",")
                .map((rid) => ROLE_ID_NAME[String(rid).trim()])
                .filter(Boolean)
                .join(",")
            : item.roleNames,
        });
      }
      userMap[params.userId] = {
        ...(userMap[params.userId] ?? {}),
        ...body,
        id: params.userId,
      };
      return {
        code: "00000",
        data: null,
        msg: "修改用户" + (body.nickname ?? params.userId) + "成功",
      };
    },
  },

  // 删除用户
  {
    url: "users/:userId",
    method: ["DELETE"],
    body({ params }) {
      String(params.userId)
        .split(",")
        .forEach((id) => {
          const index = userList.findIndex((row) => row.id === id);
          if (index !== -1) userList.splice(index, 1);
          delete userMap[id];
        });
      return {
        code: "00000",
        data: null,
        msg: "删除用户" + params.userId + "成功",
      };
    },
  },

  // 重置密码
  {
    url: "users/:userId/password/reset",
    method: ["PUT"],
    body({ query }) {
      return {
        code: "00000",
        data: null,
        msg: "重置密码成功，新密码为：" + query.password,
      };
    },
  },

  // 导出Excel
  {
    url: "users/export",
    method: ["GET"],
    headers: {
      "Content-Disposition": "attachment; filename=%E7%94%A8%E6%88%B7%E5%88%97%E8%A1%A8.xlsx",
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  },

  {
    url: "users/profile",
    method: ["GET"],
    body: {
      code: "00000",
      data: {
        // 登录账号 admin 对应的用户记录（见本文件 users 列表）
        id: "2",
        username: "admin",
        nickname: "系统管理员",
        avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
        gender: 1,
        mobile: "18888888888",
        email: "youlaitech@163.com",
        deptName: "有来技术",
        roleNames: "系统管理员",
        createTime: "2026-09-26",
      },
    },
  },

  {
    url: "users/profile",
    method: ["PUT"],
    body() {
      return {
        code: "00000",
        data: null,
        msg: "修改个人信息成功",
      };
    },
  },

  {
    url: "users/password",
    method: ["PUT"],
    body() {
      return {
        code: "00000",
        data: null,
        msg: "修改密码成功",
      };
    },
  },
]);

// 用户列表（内存态，新增/删除即时生效）
const userList: UserRow[] = [
  {
    id: "8",
    username: "manager",
    nickname: "总经理",
    mobile: "18812345684",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "manager@youlaitech.com",
    status: 1,
    deptName: "有来技术",
    roleNames: "总经理",
    createTime: "2026/09/26 08:10",
  },
  {
    id: "9",
    username: "finance",
    nickname: "财务专员",
    mobile: "18812345685",
    gender: 2,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "finance@youlaitech.com",
    status: 1,
    deptName: "有来技术",
    roleNames: "财务",
    createTime: "2026/09/26 08:10",
  },
  {
    id: "10",
    username: "clerk",
    nickname: "行政专员",
    mobile: "18812345686",
    gender: 2,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "clerk@youlaitech.com",
    status: 1,
    deptName: "有来技术",
    roleNames: "行政",
    createTime: "2026/09/26 08:10",
  },
  {
    id: "2",
    username: "admin",
    nickname: "系统管理员",
    mobile: "18888888888",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "youlaitech@163.com",
    status: 1,
    deptName: "有来技术",
    roleNames: "系统管理员",
    createTime: "2026/09/26 08:10",
  },
  {
    id: "3",
    username: "test",
    nickname: "测试小用户",
    mobile: "18812345679",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "youlaitech@163.com",
    status: 1,
    deptName: "测试部门",
    roleNames: "访问游客",
    createTime: "2026/09/26 08:10",
  },
  {
    id: "4",
    username: "dept_manager",
    nickname: "部门主管",
    mobile: "18812345680",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "manager@youlaitech.com",
    status: 1,
    deptName: "有来技术",
    roleNames: "部门主管",
    createTime: "2026/09/26 08:10",
  },
  {
    id: "5",
    username: "dept_member",
    nickname: "部门成员",
    mobile: "18812345681",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "member@youlaitech.com",
    status: 1,
    deptName: "有来技术",
    roleNames: "部门成员",
    createTime: "2026/09/26 08:10",
  },
  {
    id: "6",
    username: "employee",
    nickname: "普通员工",
    mobile: "18812345682",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "employee@youlaitech.com",
    status: 1,
    deptName: "研发部门",
    roleNames: "普通员工",
    createTime: "2026/09/26 08:10",
  },
  {
    id: "7",
    username: "custom_user",
    nickname: "自定义权限用户",
    mobile: "18812345683",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "custom@youlaitech.com",
    status: 1,
    deptName: "测试部门",
    roleNames: "自定义权限用户",
    createTime: "2026/09/26 08:10",
  },
];

// 部门 / 角色名称映射（表单提交的是 id）
const DEPT_ID_NAME: Record<string, string> = {
  "1": "有来技术",
  "2": "研发部门",
  "3": "测试部门",
};

const ROLE_ID_NAME: Record<string, string> = {
  "1": "超级管理员",
  "2": "系统管理员",
  "3": "访问游客",
  "4": "部门主管",
  "5": "部门成员",
  "6": "普通员工",
  "7": "自定义权限用户",
  "8": "总经理",
  "9": "财务",
  "10": "行政",
};

// 新增用户 id 游标
let nextUserId = 100;

interface UserRow {
  id: string;
  username: string;
  nickname: string;
  mobile: string;
  gender: number;
  avatar: string;
  email: string;
  status: number;
  deptName: string | null;
  roleNames: string | null;
  createTime: string;
}

// 用户映射表数据
const userMap: Record<string, any> = {
  "1": {
    id: "1",
    username: "youlai",
    nickname: "有来技术",
    mobile: "",
    gender: 0,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "",
    status: 1,
    deptId: "",
    roleIds: ["1"],
  },
  "8": {
    id: "8",
    username: "manager",
    nickname: "总经理",
    mobile: "18812345684",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "manager@youlaitech.com",
    status: 1,
    deptId: "1",
    roleIds: ["8"],
  },
  "9": {
    id: "9",
    username: "finance",
    nickname: "财务专员",
    mobile: "18812345685",
    gender: 2,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "finance@youlaitech.com",
    status: 1,
    deptId: "1",
    roleIds: ["9"],
  },
  "10": {
    id: "10",
    username: "clerk",
    nickname: "行政专员",
    mobile: "18812345686",
    gender: 2,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "clerk@youlaitech.com",
    status: 1,
    deptId: "1",
    roleIds: ["10"],
  },
  "2": {
    id: "2",
    username: "admin",
    nickname: "系统管理员",
    mobile: "18888888888",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "youlaitech@163.com",
    status: 1,
    deptId: "1",
    roleIds: ["2"],
  },
  "3": {
    id: "3",
    username: "test",
    nickname: "测试小用户",
    mobile: "18812345679",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "youlaitech@163.com",
    status: 1,
    deptId: "3",
    roleIds: ["3"],
  },
  "4": {
    id: "4",
    username: "dept_manager",
    nickname: "部门主管",
    mobile: "18812345680",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "manager@youlaitech.com",
    status: 1,
    deptId: "1",
    roleIds: ["4"],
  },
  "5": {
    id: "5",
    username: "dept_member",
    nickname: "部门成员",
    mobile: "18812345681",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "member@youlaitech.com",
    status: 1,
    deptId: "1",
    roleIds: ["5"],
  },
  "6": {
    id: "6",
    username: "employee",
    nickname: "普通员工",
    mobile: "18812345682",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "employee@youlaitech.com",
    status: 1,
    deptId: "2",
    roleIds: ["6"],
  },
  "7": {
    id: "7",
    username: "custom_user",
    nickname: "自定义权限用户",
    mobile: "18812345683",
    gender: 1,
    avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
    email: "custom@youlaitech.com",
    status: 1,
    deptId: "3",
    roleIds: ["7"],
  },
};
