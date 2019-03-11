// custom scripts

module.exports = {
  path: "/",
  secret: "159357",
  events: ["push"],
  hooks: [
    {
      repository: "docs",
      shell: "ratRedUpdate",
      lockBranch: "master"
    },
    {
      repository: "private_docs",
      shell: "docsRatRedUpdate",
      lockBranch: "master"
    }
  ]
}
