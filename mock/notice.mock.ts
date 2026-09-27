import { defineMock } from "./base";

/**
 * 同步修改某条通知的字段
 *
 * 通知数据分两份：列表用 noticeList、表单/详情用 noticeMap，
 * 任何状态变更（发布/撤回/已读）都必须同时改两处，否则列表与表单会显示不一致。
 */
function patchNotice(id: string, patch: Record<string, unknown>) {
  const row = noticeList.find((item) => item.id === String(id));
  if (row) Object.assign(row, patch);
  if (noticeMap[id]) Object.assign(noticeMap[id], patch);
}

export default defineMock([
  {
    url: "notices",
    method: ["GET"],
    body({ query }) {
      const keywords = String(query?.keywords ?? "").trim();
      const title = String(query?.title ?? "").trim();
      const publishStatus =
        query?.publishStatus === undefined || query?.publishStatus === ""
          ? undefined
          : Number(query.publishStatus);
      const isRead =
        query?.isRead === undefined || query?.isRead === "" ? undefined : Number(query.isRead);

      const pageNum = Math.max(1, Number(query?.pageNum) || 1);
      const pageSize = Math.max(1, Number(query?.pageSize) || 10);

      const list = noticeList.filter((item) => {
        if (keywords && !String(item.title ?? "").includes(keywords)) return false;
        if (title && !String(item.title ?? "").includes(title)) return false;
        if (publishStatus !== undefined && item.publishStatus !== publishStatus) return false;
        if (isRead !== undefined && item.isRead !== isRead) return false;
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

  // 新增通知
  {
    url: "notices",
    method: ["POST"],
    body({ body }) {
      const id = String(nextNoticeId++);
      const item = {
        id,
        title: body.title ?? "",
        publishStatus: 0,
        type: body.type ?? 1,
        publisherName: "有来技术",
        level: body.level ?? "L",
        publishTime: null,
        isRead: null,
        targetType: body.targetType ?? 1,
        createTime: "2026-09-26 08:10",
        revokeTime: null,
      } as NoticeRow;
      noticeList.unshift(item);
      noticeMap[id] = { ...item, content: body.content ?? "" };
      return { code: "00000", data: null, msg: "新增成功" };
    },
  },

  // 获取通知表单数据
  {
    url: "notices/:id/form",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: noticeMap[params.id],
        msg: "一切ok",
      };
    },
  },

  // 获取通知详情
  {
    url: "notices/:id/detail",
    method: ["GET"],
    body: ({ params }) => {
      const myNotice = myNoticeList.find((item) => item.id === String(params.id));
      if (myNotice) myNotice.isRead = 1;
      // 已读状态同样需要同步到列表数据
      patchNotice(params.id, { isRead: 1 });

      return {
        code: "00000",
        data: noticeMap[params.id],
        msg: "一切ok",
      };
    },
  },
  // 发布通知
  {
    url: "notices/:id/publish",
    method: ["PUT"],
    body({ params }) {
      // 列表与表单两处数据同步，避免"列表已发布、表单仍显示草稿"
      patchNotice(params.id, {
        publishStatus: 1,
        publishTime: "2026-09-26 08:10",
        revokeTime: null,
      });
      return {
        code: "00000",
        data: null,
        msg: "发布通知" + params.id + "成功",
      };
    },
  },

  // 撤回通知
  {
    url: "notices/:id/revoke",
    method: ["PUT"],
    body({ params }) {
      // 同上：撤回状态需同时落到列表与表单
      patchNotice(params.id, {
        publishStatus: -1,
        revokeTime: "2026-09-26 08:10",
      });
      return {
        code: "00000",
        data: null,
        msg: "撤回通知" + params.id + "成功",
      };
    },
  },

  // 全部已读
  {
    url: "notices/read-all",
    method: ["PUT"],
    body() {
      myNoticeList.forEach((item) => {
        item.isRead = 1;
      });

      return {
        code: "00000",
        data: null,
        msg: "全部已读成功",
      };
    },
  },
  // 修改通知
  {
    url: "notices/:id",
    method: ["PUT"],
    body({ params, body }) {
      const item = noticeList.find((row) => row.id === params.id);
      if (item) {
        Object.assign(item, {
          title: body.title ?? item.title,
          type: body.type ?? item.type,
          level: body.level ?? item.level,
          targetType: body.targetType ?? item.targetType,
        });
      }
      noticeMap[params.id] = { ...(noticeMap[params.id] ?? {}), ...body };
      return {
        code: "00000",
        data: null,
        msg: "修改通知" + (body.title ?? params.id) + "成功",
      };
    },
  },

  // 删除通知
  {
    url: "notices/:id",
    method: ["DELETE"],
    body({ params }) {
      String(params.id)
        .split(",")
        .forEach((id) => {
          const index = noticeList.findIndex((row) => row.id === id);
          if (index !== -1) noticeList.splice(index, 1);
          delete noticeMap[id];
        });
      return {
        code: "00000",
        data: null,
        msg: "删除通知" + params.id + "成功",
      };
    },
  },

  // 我的通知分页列表
  {
    url: "notices/my",
    method: ["GET"],
    body({ query }) {
      const pageNum = Number(query?.pageNum || 1);
      const pageSize = Number(query?.pageSize || 10);
      const isRead =
        query?.isRead == null || query.isRead === "" ? undefined : Number(query.isRead);
      const filtered =
        isRead == null ? myNoticeList : myNoticeList.filter((item) => item.isRead === isRead);
      const start = (pageNum - 1) * pageSize;

      return {
        code: "00000",
        data: {
          list: filtered.slice(start, start + pageSize),
          total: filtered.length,
        },
        msg: "一切ok",
      };
    },
  },
]);

const myNoticeList = [
  {
    id: "5",
    title: "新产品发布会邀请",
    type: 5,
    level: "M",
    publisherName: "有来技术",
    publishTime: "2024-12-28 11:00",
    isRead: 0,
  },
  {
    id: "4",
    title: "元旦假期安排通知",
    type: 4,
    level: "M",
    publisherName: "有来技术",
    publishTime: "2024-12-25 16:00",
    isRead: 1,
  },
  {
    id: "7",
    title: "年终总结会议通知",
    type: 5,
    level: "M",
    publisherName: "有来技术",
    publishTime: "2024-12-22 10:00",
    isRead: 0,
  },
  {
    id: "9",
    title: "员工培训计划",
    type: 5,
    level: "M",
    publisherName: "有来技术",
    publishTime: "2024-12-20 09:30",
    isRead: 0,
  },
  {
    id: "2",
    title: "系统维护通知 - 2024年12月20日",
    type: 2,
    level: "H",
    publisherName: "有来技术",
    publishTime: "2024-12-18 14:30",
    isRead: 1,
  },
  {
    id: "1",
    title: "v3.0.0 版本发布 - 多租户功能上线",
    type: 1,
    level: "H",
    publisherName: "有来技术",
    publishTime: "2024-12-15 10:00",
    isRead: 0,
  },
  {
    id: "8",
    title: "系统功能优化完成",
    type: 1,
    level: "L",
    publisherName: "有来技术",
    publishTime: "2024-12-12 14:20",
    isRead: 1,
  },
  {
    id: "3",
    title: "安全提醒 - 防范钓鱼邮件",
    type: 3,
    level: "H",
    publisherName: "有来技术",
    publishTime: "2024-12-10 09:00",
    isRead: 0,
  },
  {
    id: "10",
    title: "数据备份提醒",
    type: 3,
    level: "L",
    publisherName: "有来技术",
    publishTime: "2024-12-08 08:00",
    isRead: 1,
  },
  {
    id: "6",
    title: "v2.16.1 版本更新",
    type: 1,
    level: "M",
    publisherName: "有来技术",
    publishTime: "2024-12-05 15:30",
    isRead: 1,
  },
];

// 通知列表（内存态，新增/发布/撤回即时生效）
const noticeList: NoticeRow[] = [
  {
    id: "5",
    title: "新产品发布会邀请",
    publishStatus: 1,
    type: 5,
    publisherName: "有来技术",
    level: "M",
    publishTime: "2024-12-28 11:00",
    isRead: null,
    targetType: 1,
    createTime: "2024-12-28 11:00",
    revokeTime: null,
  },
  {
    id: "4",
    title: "元旦假期安排通知",
    publishStatus: 1,
    type: 4,
    publisherName: "有来技术",
    level: "M",
    publishTime: "2024-12-25 16:00",
    isRead: null,
    targetType: 1,
    createTime: "2024-12-25 16:00",
    revokeTime: null,
  },
  {
    id: "7",
    title: "年终总结会议通知",
    publishStatus: 1,
    type: 5,
    publisherName: "有来技术",
    level: "M",
    publishTime: "2024-12-22 10:00",
    isRead: null,
    targetType: 2,
    createTime: "2024-12-22 10:00",
    revokeTime: null,
  },
  {
    id: "9",
    title: "员工培训计划",
    publishStatus: 1,
    type: 5,
    publisherName: "有来技术",
    level: "M",
    publishTime: "2024-12-20 09:30",
    isRead: null,
    targetType: 1,
    createTime: "2024-12-20 09:30",
    revokeTime: null,
  },
  {
    id: "2",
    title: "系统维护通知 - 2024年12月20日",
    publishStatus: 1,
    type: 2,
    publisherName: "有来技术",
    level: "H",
    publishTime: "2024-12-18 14:30",
    isRead: null,
    targetType: 1,
    createTime: "2024-12-18 14:30",
    revokeTime: null,
  },
  {
    id: "1",
    title: "v3.0.0 版本发布 - 多租户功能上线",
    publishStatus: 1,
    type: 1,
    publisherName: "有来技术",
    level: "H",
    publishTime: "2024-12-15 10:00",
    isRead: null,
    targetType: 1,
    createTime: "2024-12-15 10:00",
    revokeTime: null,
  },
  {
    id: "8",
    title: "系统功能优化完成",
    publishStatus: 1,
    type: 1,
    publisherName: "有来技术",
    level: "L",
    publishTime: "2024-12-12 14:20",
    isRead: null,
    targetType: 1,
    createTime: "2024-12-12 14:20",
    revokeTime: null,
  },
  {
    id: "3",
    title: "安全提醒 - 防范钓鱼邮件",
    publishStatus: 1,
    type: 3,
    publisherName: "有来技术",
    level: "H",
    publishTime: "2024-12-10 09:00",
    isRead: null,
    targetType: 1,
    createTime: "2024-12-10 09:00",
    revokeTime: null,
  },
  {
    id: "10",
    title: "数据备份提醒",
    publishStatus: 1,
    type: 3,
    publisherName: "有来技术",
    level: "L",
    publishTime: "2024-12-08 08:00",
    isRead: null,
    targetType: 1,
    createTime: "2024-12-08 08:00",
    revokeTime: null,
  },
  {
    id: "6",
    title: "v2.16.1 版本更新",
    publishStatus: 1,
    type: 1,
    publisherName: "有来技术",
    level: "M",
    publishTime: "2024-12-05 15:30",
    isRead: null,
    targetType: 1,
    createTime: "2024-12-05 15:30",
    revokeTime: null,
  },
];

// 新增通知 id 游标
let nextNoticeId = 100;

interface NoticeRow {
  id: string;
  title: string;
  publishStatus: number;
  type: number;
  publisherName: string;
  level: string;
  publishTime: string | null;
  isRead: number | null;
  targetType: number;
  createTime: string;
  revokeTime: string | null;
}

// 通知映射表数据
const noticeMap: Record<string, any> = {
  "1": {
    id: "1",
    title: "v3.0.0 版本发布 - 多租户功能上线",
    content:
      "<p>🎉 新版本发布，主要更新内容：</p><p>1. 新增多租户功能，支持租户隔离和数据管理</p><p>2. 优化系统性能，提升响应速度</p><p>3. 完善权限管理，增强安全性</p><p>4. 修复已知问题，提升系统稳定性</p>",
    publishStatus: 1,
    type: 1,
    publisherName: "有来技术",
    level: "H",
    levelLabel: "高",
    publishTime: "2024-12-15 10:00:00",
    isRead: null,
    targetType: 1,
    targetUserIds: [],
    createTime: "2024-12-15 10:00:00",
    revokeTime: null,
  },
  "2": {
    id: "2",
    title: "系统维护通知 - 2024年12月20日",
    content:
      "<p>⏰ 系统维护通知</p><p>系统将于 <strong>2024年12月20日（本周五）凌晨 2:00-4:00</strong> 进行例行维护升级。</p><p>维护期间系统将暂停服务，请提前做好数据备份工作。</p><p>给您带来的不便，敬请谅解！</p>",
    publishStatus: 1,
    type: 2,
    publisherName: "有来技术",
    level: "H",
    levelLabel: "高",
    publishTime: "2024-12-18 14:30:00",
    isRead: null,
    targetType: 1,
    targetUserIds: [],
    createTime: "2024-12-18 14:30:00",
    revokeTime: null,
  },
  "3": {
    id: "3",
    title: "安全提醒 - 防范钓鱼邮件",
    content:
      "<p>⚠️ 安全提醒</p><p>近期发现有不法分子通过钓鱼邮件进行网络攻击，请大家提高警惕：</p><p>1. 不要点击来源不明的邮件链接</p><p>2. 不要下载可疑附件</p><p>3. 遇到可疑邮件请及时联系IT部门</p><p>4. 定期修改密码，使用强密码策略</p>",
    publishStatus: 1,
    type: 3,
    publisherName: "有来技术",
    level: "H",
    levelLabel: "高",
    publishTime: "2024-12-10 09:00:00",
    isRead: null,
    targetType: 1,
    targetUserIds: [],
    createTime: "2024-12-10 09:00:00",
    revokeTime: null,
  },
  "4": {
    id: "4",
    title: "元旦假期安排通知",
    content:
      "<p>📅 元旦假期安排</p><p>根据国家法定节假日安排，公司元旦假期时间为：</p><p><strong>2024年12月30日（周一）至 2025年1月1日（周三）</strong>，共3天。</p><p>2024年12月29日（周日）正常上班。</p><p>祝大家元旦快乐，假期愉快！</p>",
    publishStatus: 1,
    type: 4,
    publisherName: "有来技术",
    level: "M",
    levelLabel: "中",
    publishTime: "2024-12-25 16:00:00",
    isRead: null,
    targetType: 1,
    targetUserIds: [],
    createTime: "2024-12-25 16:00:00",
    revokeTime: null,
  },
  "5": {
    id: "5",
    title: "新产品发布会邀请",
    content:
      "<p>🎊 新产品发布会邀请</p><p>公司将于 <strong>2025年1月15日下午14:00</strong> 在总部会议室举办新产品发布会。</p><p>届时将展示最新研发的产品和技术成果，欢迎全体员工参加。</p><p>请各部门提前安排好工作，准时参加。</p>",
    publishStatus: 1,
    type: 5,
    publisherName: "有来技术",
    level: "M",
    levelLabel: "中",
    publishTime: "2024-12-28 11:00:00",
    isRead: null,
    targetType: 1,
    targetUserIds: [],
    createTime: "2024-12-28 11:00:00",
    revokeTime: null,
  },
  "6": {
    id: "6",
    title: "v2.16.1 版本更新",
    content:
      "<p>✨ 版本更新</p><p>v2.16.1 版本已发布，主要修复内容：</p><p>1. 修复 WebSocket 重复连接导致的后台线程阻塞问题</p><p>2. 优化通知公告功能，提升用户体验</p><p>3. 修复部分已知bug</p><p>建议尽快更新到最新版本。</p>",
    publishStatus: 1,
    type: 1,
    publisherName: "有来技术",
    level: "M",
    levelLabel: "中",
    publishTime: "2024-12-05 15:30:00",
    isRead: null,
    targetType: 1,
    targetUserIds: [],
    createTime: "2024-12-05 15:30:00",
    revokeTime: null,
  },
  "7": {
    id: "7",
    title: "年终总结会议通知",
    content:
      "<p>📋 年终总结会议通知</p><p>各部门年终总结会议将于 <strong>2024年12月30日上午9:00</strong> 召开。</p><p>请各部门负责人提前准备好年度工作总结和下年度工作计划。</p><p>会议地点：总部大会议室</p>",
    publishStatus: 1,
    type: 5,
    publisherName: "系统管理员",
    level: "M",
    levelLabel: "中",
    publishTime: "1",
    isRead: null,
    targetType: 2,
    targetUserIds: ["1", "2"],
    createTime: "2024-12-22 10:00:00",
    revokeTime: null,
  },
  "8": {
    id: "8",
    title: "系统功能优化完成",
    content:
      "<p>✅ 系统功能优化</p><p>已完成以下功能优化：</p><p>1. 优化用户管理界面，提升操作体验</p><p>2. 增强数据导出功能，支持更多格式</p><p>3. 优化搜索功能，提升查询效率</p><p>4. 修复部分界面显示问题</p>",
    publishStatus: 1,
    type: 1,
    publisherName: "有来技术",
    level: "L",
    levelLabel: "低",
    publishTime: "2024-12-12 14:20:00",
    isRead: null,
    targetType: 1,
    targetUserIds: [],
    createTime: "2024-12-12 14:20:00",
    revokeTime: null,
  },
  "9": {
    id: "9",
    title: "员工培训计划",
    content:
      "<p>📚 员工培训计划</p><p>为提升员工专业技能，公司将于 <strong>2025年1月8日-10日</strong> 组织技术培训。</p><p>培训内容：</p><p>1. 新技术框架应用</p><p>2. 代码规范与最佳实践</p><p>3. 系统架构设计</p><p>请各部门合理安排工作，确保培训顺利进行。</p>",
    publishStatus: 1,
    type: 5,
    publisherName: "有来技术",
    level: "M",
    levelLabel: "中",
    publishTime: "2024-12-20 09:30:00",
    isRead: null,
    targetType: 1,
    targetUserIds: [],
    createTime: "2024-12-20 09:30:00",
    revokeTime: null,
  },
  "10": {
    id: "10",
    title: "数据备份提醒",
    content:
      "<p>💾 数据备份提醒</p><p>请各部门注意定期备份重要数据，建议每周至少备份一次。</p><p>备份方式：</p><p>1. 使用系统自带备份功能</p><p>2. 手动导出重要数据</p><p>3. 联系IT部门协助备份</p><p>数据安全，人人有责！</p>",
    publishStatus: 1,
    type: 3,
    publisherName: "有来技术",
    level: "L",
    levelLabel: "低",
    publishTime: "2024-12-08 08:00:00",
    isRead: null,
    targetType: 1,
    targetUserIds: [],
    createTime: "2024-12-08 08:00:00",
    revokeTime: null,
  },
};
