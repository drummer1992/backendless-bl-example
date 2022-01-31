'use strict'

const CodeRunner = require('backendless-coderunner/lib')
const getRunOptions = require('backendless-coderunner/lib/cli/options')

if (process.cwd().endsWith('scripts')) {
  process.chdir('../')
}

(async function run() {
  const options = await getRunOptions(false, true)

  options.backendless.msgBroker = {}

  await CodeRunner.pro(options).start()
})()