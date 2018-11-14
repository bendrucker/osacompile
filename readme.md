# osacompile [![Build Status](https://travis-ci.org/bendrucker/osacompile.svg?branch=master)](https://travis-ci.org/bendrucker/osacompile) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/osacompile.svg)](https://greenkeeper.io/)

> Writable stream to compile OSA language scripts


## Install

```
$ npm install --save osacompile
```


## Usage

```js
const osacompile = require('osacompile')
const fs = require('fs')

fs.createReadStream('my/app.js')
  .pipe(osacompile({
    l: 'JavaScript',
    o: '/path/to/bundle.app'  
  }))
```

## API

#### `osacompile(options)` -> `stream.Writable`

##### options

*Required*  
Type: `object`

Options flags to pass to `osacompile`. See [Apple's `osacompile` docs](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/osacompile.1.html) for all available options.


## License

MIT © [Ben Drucker](http://bendrucker.me)
