const lodash = require('lodash')
import { getBoundpropertyDescriptor } from 'bind-property-descriptor'
import { start as createRepl } from 'repl'

export default (vars, {
  ignoreUndefined = true,
  prompt = '> ',
  waitForPromises = true
} = {}) => {
  const repl = createRepl({ ignoreUndefined, prompt })

  const { context } = repl
  vars && lodash.forEach(Object.getOwnPropertyNames(vars), name => {
    Object.defineProperty(context, name, getBoundpropertyDescriptor(vars, name))
  })
  lodash.forEach(lodash, (fn, name) => {
    if (name !== '_') {
      context[name] = fn
    }
  })

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
