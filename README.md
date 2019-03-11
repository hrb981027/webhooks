# github-webhooks

GitHub允许您为您的存储库注册Webhooks。每次在您的存储库上发生事件时，无论是推送代码，填写问题还是创建拉取请求，您注册的webhook都将可以被触发。

这个库是Node.js Web服务器的小型处理程序（或者说是“中间件”），它处理接收和验证来自GitHub的webhook请求的所有逻辑。

默认监听端口：7777。

# Config

```js
cat config.sample.js

module.exports = {
  //您的webhook服务URL地址
  path: "/",
  //对应github储存库中的secret
  secret: "secret",
  hooks: [
    //一个库对应一个对象，可多个
    {
      //对应github储存库的库名
      repository: "test",
      //webhook触发后执行的shell
      shell: "echo \"Hello github-webhooks\"",
      //锁定分支
      lockBranch: "master",
      //锁定推送用户
      lockUser: ""
    }
  ]
}
```

# Start

```bash
cp config.sample.js config.js
npm install
node start.js
```