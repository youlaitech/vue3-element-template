import { defineMock } from "./base";

export default defineMock([
  // 上传文件
  {
    url: "files",
    method: ["POST"],
    body() {
      const name = `mock-upload-${Date.now()}.png`;
      return {
        code: "00000",
        data: {
          name,
          url: "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
        },
        msg: "上传成功",
      };
    },
  },

  // 删除文件
  {
    url: "files",
    method: ["DELETE"],
    body({ query }) {
      return {
        code: "00000",
        data: null,
        msg: query.filePath ? `删除文件 ${query.filePath} 成功` : "删除成功",
      };
    },
  },
]);
