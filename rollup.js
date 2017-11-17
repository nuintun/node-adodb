'use strict';

const fs = require('fs');
const rollup = require('rollup');
const uglify = require('uglify-es');

rollup
  .rollup({
    legacy: true,
    input: 'lib/adodb/main.js'
  })
  .then(function(bundle) {
    const min = 'lib/adodb.js';

    bundle
      .generate({
        format: 'iife',
        indent: true,
        strict: true
      })
      .then(function(result) {
        result = uglify.minify(result.code, {
          ecma: 5,
          ie8: true,
          mangle: { eval: true }
        });

        fs.writeFileSync(min, result.code);
        console.log(`  Build ${min} success!`);
      })
      .catch(function(error) {
        console.error(error);
      });
  })
  .catch(function(error) {
    console.error(error);
  });
