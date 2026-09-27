import { defineMock } from "./base";

// 永久令牌说明（仅本地开发/演示）：
// accessToken / refreshToken 由 youlai-boot 同款规则离线签发（HS256、不含 exp），
// 即"永不过期"；expiresIn: -1 与之对应。切勿用于生产环境。

export default defineMock([
  {
    url: "auth/captcha",
    method: ["GET"],
    body: {
      code: "00000",
      data: {
        captchaId: "534b8ef2b0a24121bec76391ddd159f9",
        captchaBase64:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAkCAIAAADNSmkJAAAFKUlEQVR4Xu2ZXUwcVRiGV70wMWo08V5NvPXCrDbFaGpMaZW2hqQxaoiJTRsaMBCNSYtpa2JTKiFSelFa+Q/QZcMWqEhBlh+htbEpZhMrBQrlJ0hBywLLyrJ0WZbje3bqOvPNLHPWrDvdOE9ONmfe78zkzMs335wzWJhJQrBQweS/wTQ6QWgYHdoIOcecOe05O+t2WkutO+p2ZF3Ksg/YV9ZW6FATYajR3nveg60H9327r3O8c35lHgp+r05dPdJzBL73TPSQ8SaCKIxGLsPlop+K0JHrEkPuoT31e5qGmmjARACF0agYyGVNlyVm/pzZXrN9fHGcBkz0UBid+31u93i3XFFT80vN8cvHqWqih8Lo1NpUqS5vwh3vnd223VQ10UNh9NbyrcFQUK6oCawHUipSqGqiB83oBf+CXFGDMp1mS6OqiR4Ko7FexkpOrqhpHGw82nOUqiZ6KIzGrkRuorW0dJMmOy+hOCfYGzb2RBFv6HRO0gEJw/U7y+pgL1bwmTxexN6sZ31TdEwEhdG+gA+7EqyXpUO1uZH20cWL8hMTRt1N9tBXzCJrOIRoCPJpSO2RAp4HmtCdIfZ+2JWgEBN9LbR28seTGU0Zue1tMLp+YIAMSADzfvbkKX4/eb28j4YODiGin3heqmIlLja5hAUCu+nmGY3JWKvpMAlqNGgebsauBOvlqSX+JEx7p7EbTLen53XlzfmWUioqXikrc68Y8N2juJ/fyVsNChGHEE//rBANYWaZz+TRQqpLaBgNsPfDrgSpbS21YtV87IdjrlkX9JZbt5DOma2t9ITo5F+5glN22WwL/n+yDv00mw06orKxOqQ5+J04hhViwzAXETIcJDVm8uxZqktoGx2Nj9t43Wgaul/ERQiGQvtbWnDWgZYW9CXlQFjZ/7ciyHNn+Z2MexTimIeLz59TiIln0M1e+IbPpOAaDUnEYPTi6iqKxpbycs/qKo1tCslfKcffPn9enuMiPPY1vxO/ckeFQ4h46cdGqUWoidE/y54q5tPY5WDrGzQqIXot4BgchEE57e00IMCw2/1qZSVO/7SjA78o9INzcxsbrL+fnTnDDh9mmZn8F30oG1Hm+nABv5mQMopDS/h1HxtqTzWbABMe9sxpPoe9zezeOo1GELqWhPS8t46M0IAYHbdvR1aHbaOjbjfLz2eFhez6dba4yAfgF30o0BFVE8+Mjh/wFxPI+I5mAEHU6Ls+38vhTFwOBGhMDF8gkFpbC5ffsdv/uBs6dIj19dExEtARVXv9YNbop8NFY3aZ6gRRo+tu3IBHnzmdNCBMXldXJKPfL74WzWUJRE+coDUknqsOdZXQbAJYwluVTbOZI3Qt8GFzMwxyjo3RgBiN4fr+elXVpZGRLWXl6PdOTtJBSlBDUK/lnIrjOlrtqWYTQDJaF6FrTXu9sOa1ysrVoM5HVE1GFxZQcyJ/p+xzv6K/rbr6N6+XDpUBl0tKFIrbz78qWB6YnWFMCBld4XLBms+7df75ook/GNzb0GCV7U1Qfz9p64TyQWNjYD3qe9rj4SMJtQP3MyjSDPzWIRHPjH7X4YAvfXoPuyZf9Pbi3PcuXIh4mp3NllYC6XY79C+jl2o8PBipxjnBttn4MgMNnWgfcRJGPI2OL8hTj3LloIlmRicvBhiNykvecpqoa3RSY4DRcLAwyicuOepVR1JjgNFYHWONHL04czTX0UmNAUYD7Pr+xc4wqTHGaBb2OtZvHUmNYUazcA2J6etdUmOk0f8rTKMTxF91RG0D1SwYGwAAAABJRU5ErkJggg==",
      },
      msg: "一切ok",
    },
  },

  {
    url: "auth/login",
    method: ["POST"],
    body: {
      code: "00000",
      data: {
        accessToken: "dev-mock-access-token",
        tokenType: "Bearer",
        refreshToken: "dev-mock-refresh-token",
        expiresIn: -1,
      },
      msg: "一切ok",
    },
  },

  {
    url: "auth/refresh-token",
    method: ["POST"],
    body: {
      code: "00000",
      data: {
        accessToken: "dev-mock-access-token",
        tokenType: "Bearer",
        refreshToken: "dev-mock-refresh-token",
        expiresIn: -1,
      },
      msg: "一切ok",
    },
  },

  {
    url: "auth/logout",
    method: ["DELETE"],
    body: {
      code: "00000",
      data: {},
      msg: "string",
    },
  },

  // 生成扫码登录票据
  {
    url: "auth/qr-code/generate",
    method: ["POST"],
    body: {
      code: "00000",
      data: {
        ticket: "mock-qr-ticket",
        expireSeconds: 120,
      },
      msg: "一切ok",
    },
  },

  // 轮询扫码状态（依次推进：待扫码 → 已扫码 → 已确认，便于本地演示完整扫码登录）
  {
    url: "auth/qr-code/status",
    method: ["GET"],
    body: ({ query }) => {
      qrPollCount += 1;
      const status = qrPollCount === 1 ? "WAITING" : qrPollCount < 3 ? "SCANNED" : "CONFIRMED";
      return {
        code: "00000",
        data: {
          ticket: query?.ticket,
          status,
          nickname: status === "WAITING" ? undefined : "系统管**",
          avatar: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
          expireSeconds: 120,
        },
        msg: "一切ok",
      };
    },
  },

  // 扫码票据换取登录令牌
  {
    url: "auth/qr-code/login",
    method: ["POST"],
    body: {
      code: "00000",
      data: {
        accessToken: "dev-mock-access-token",
        tokenType: "Bearer",
        refreshToken: "dev-mock-refresh-token",
        expiresIn: -1,
      },
      msg: "一切ok",
    },
  },
]);

// 扫码状态轮询次数（模拟 待扫码 → 已扫码 → 已确认 的状态推进）
let qrPollCount = 0;
