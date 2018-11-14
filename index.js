'use strict'

const { spawn } = require('child_process')
const { Writable } = require('stream')
const argv = require('argv-formatter')

module.exports = Osacompile

function Osacompile (options) {
  let stderr = ''
  const osacompile = spawn('osacompile', argv.format(options))

  osacompile.stderr.on('data', data => { stderr += data })

  const stream = new Writable({
    write: osacompile.stdin.write.bind(osacompile.stdin),
    final: function (callback) {
      osacompile.stdin.end()
      osacompile.on('close', function (code) {
        if (!code) return callback()
        callback(new Error(stderr))
      })
    }
  })

  osacompile.on('error', stream.emit.bind(stream, 'error'))

  return stream
}
