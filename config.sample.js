module.exports = {
  path: "/",
  secret: "secret",
  hooks: [
    {
      repository: "test",
      shell: "echo \"Hello github-webhooks\"",
      lockBranch: "master",
      lockUser: ""
    }
  ]
}
