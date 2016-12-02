const lodash = require('lodash')
import { start as createRepl } from 'repl'

export default (vars, {
  ignoreUndefined = true,
  prompt = '> ',
  waitForPromises = true
} = {}) => {
  const repl = createRepl({ ignoreUndefined, prompt })

  lodash.assign(repl.context, vars, lodash.omit(lodash, '_'))

  if (waitForPromises) {
    // Make the REPL waits for promise completion.
    repl.eval = (evaluate => (cmd, context, filename, cb) =>
      evaluate.call(repl, cmd, context, filename, (error, value) => {
        if (error) {
          return cb(error)
        }

        new Promise(resolve => resolve(value)).then(value => cb(null, value), cb)
      })
    )(repl.eval)
  }

  return new Promise(resolve => repl.once('exit', resolve))
}
