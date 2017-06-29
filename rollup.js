'use strict';

const fs = require('fs');
const rollup = require('rollup');
const uglify = require('uglify-es');

rollup.rollup({
  legacy: true,
  entry: 'lib/adodb/main.js',
}).then(function(bundle) {
  const min = 'lib/adodb.js';

  let result = bundle.generate({
    format: 'iife',
    indent: true,
    useStrict: true
  });

  result = uglify.minify(result.code, {
    ecma: 5,
    ie8: true,
    mangle: { eval: true }
  });

  fs.writeFileSync(min, result.code);
  console.log(`  Build ${ min } success!`);
}).catch(function(error) {
  console.error(error);
});
