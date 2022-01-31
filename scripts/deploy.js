'use strict'

const CodeRunner = require('backendless-coderunner/lib')
const codeRunnerLogger = require('backendless-coderunner/lib/util/logger')

const options = require('../coderunner.json')

codeRunnerLogger.verbose = options.verbose

CodeRunner.deploy(options).start().catch(console.error)