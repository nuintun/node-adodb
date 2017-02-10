const fs = require('fs');
const rollup = require('rollup');
const uglify = require('uglify-js');

rollup.rollup({
  legacy: true,
  entry: 'lib/adodb/main.js',
}).then(function(bundle) {
  let stat;
  const min = 'lib/adodb.js';

  let result = bundle.generate({
    format: 'iife',
    indent: true,
    useStrict: true,
    moduleId: 'adodb',
    moduleName: 'ADODB'
  });

  result = uglify.minify(result.code, {
    fromString: true,
    compress: { screw_ie8: false },
    mangle: { screw_ie8: false },
    output: { screw_ie8: false }
  });

  fs.writeFileSync(min, result.code);
  console.log(`  Build ${ min } success!`);
}).catch(function(error) {
  console.error(error);
});
