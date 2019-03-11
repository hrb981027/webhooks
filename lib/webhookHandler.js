'use strict'

const _             = require('lodash')
const createHandler = require('github-webhook-handler')
const childProcess  = require('./childProcess')

module.exports = {
  create: (config) => {
    return {
      work: createHandler({ path: config.path, secret: config.secret}),
      hooks: config.hooks
    }
  },
  server: (handler, req, res) => {
    handler.work(req, res, () => {
      res.statusCode = 404
      res.end("Please request in the right way")
    })
  },
  loadPushEvent: (handler) =>  {
    handler.work.on('push', (event) => {
      let pusherName = event.payload.pusher.name
      let repositoryName = event.payload.repository.name
      let branchName = _.split(event.payload.ref, '/').pop()

      let project = _.find(handler.hooks, { repository: repositoryName })

      if(project.lockBranch && project.lockBranch != branchName) {
        return console.info('Rejected %s a push event for %s to %s, INFO: branch not match', pusherName, repositoryName, branchName)
      }

      if(project.lockUser && project.lockUser != pusherName) {
        return console.info('Rejected %s a push event for %s to %s, INFO: pusher not match', pusherName, repositoryName, branchName)
      }

      console.info('Received %s a push event for %s to %s', pusherName, repositoryName, branchName)

      if(project.shell) {
        childProcess.runExecCommand(project.shell)
      }
    })
  },
  loadErrorEvent: (handler) => {
    handler.work.on('error', (err) => { console.error('Error:', err.message) })
  }
}