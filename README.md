# nrepl [![Build Status](https://travis-ci.org/julien-f/nrepl.png?branch=master)](https://travis-ci.org/julien-f/nrepl)

> better Node repl (lodash functions, promises support)

## Install

Installation of the [npm package](https://npmjs.org/package/nrepl):

```
$ npm install --global nrepl
```

## Usage

### CLI

```
$ nrepl
> isPlainObject([])
false
>
```

### Library

```js
import nrepl from 'nrepl'

nrepl({
  foo: 'bar'
}).then(() => {
  console.log('bye')
})
```

## Development

```
# Install dependencies
> npm install

# Run the tests
> npm test

# Continuously compile
> npm run dev

# Continuously run the tests
> npm run dev-test

# Build for production (automatically called by npm install)
> npm run build
```

## Contributions

Contributions are *very* welcomed, either on the documentation or on
the code.

You may:

- report any [issue](${pkg.bugs})
  you've encountered;
- fork and create a pull request.

## License

ISC © [Julien Fontanet](https://github.com/julien-f)
