/**
 * @module rollup
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

const fs = require('fs');
const rollup = require('rollup');
const uglify = require('uglify-es');
const pkg = require('./package.json');

const banner = `/**
 * @module ${pkg.name}
 * @author ${pkg.author.name}
 * @license ${pkg.license}
 * @version ${pkg.version}
 * @description ${pkg.description}
 * @see ${pkg.homepage}
 */
`;

rollup
  .rollup({
    input: 'lib/adodb/main.js'
  })
  .then(function(bundle) {
    const min = 'lib/adodb.js';

    bundle
      .generate({
        format: 'iife',
        indent: true,
        strict: true,
        legacy: true,
        banner: banner
      })
      .then(function(result) {
        result = uglify.minify(result.code, {
          ecma: 5,
          ie8: true,
          mangle: { eval: true }
        });

        fs.writeFileSync(min, banner + result.code);
        console.log(`  Build ${min} success!`);
      })
      .catch(function(error) {
        console.error(error);
      });
  })
  .catch(function(error) {
    console.error(error);
  });
