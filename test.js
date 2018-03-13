'use strict'

const test = require('blue-tape')

const {createReadStream, readFile} = require('fs')
const {resolve} = require('path')
const temp = require('tempy')
const eos = require('end-of-stream')
const pify = require('pify')

const osacompile = require('./')

test('js', async function (t) {
  const app = resolve(__dirname, 'fixtures', 'app.js')
  const destination = temp.file({
    extension: 'app'
  })

  const stream = createReadStream(app)
    .pipe(osacompile({
      l: 'JavaScript',
      o: destination
    }))

  await pify(eos)(stream)

  const source = await pify(readFile)(app)
  const script = await pify(readFile)(resolve(destination, 'Contents/Resources/Scripts/main.scpt'))

  t.notEqual(script.toString(), source, 'source is wrapped')
  t.ok(script.toString().includes(source), 'source is inside wrapper')
})
