'use strict';

const fs = require('fs');
const rollup = require('rollup');
const uglify = require('uglify-js');

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
    compress: { ie8: true },
    mangle: { ie8: true, eval: true },
    output: { ie8: true }
  });

  fs.writeFileSync(min, result.code);
  console.log(`  Build ${ min } success!`);
}).catch(function(error) {
  console.error(error);
});
