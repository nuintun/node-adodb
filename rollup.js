/**
 * @module rollup
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

const fs = require('fs-extra');
const rollup = require('rollup');
const terser = require('terser');
const pkg = require('./package.json');

/**
 * @function build
 * @param {Object} inputOptions
 * @param {Object} outputOptions
 */
async function build(inputOptions, outputOptions) {
  await fs.remove(outputOptions.file);

  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  const [result] = output;

  const file = outputOptions.file;
  const minify = terser.minify(result.code, { ie8: true });

  await fs.outputFile(file, banner + minify.code);

  console.log(`Build ${file} success!`);
}

const banner = `/**
 * @module ${pkg.name}
 * @author ${pkg.author.name}
 * @license ${pkg.license}
 * @version ${pkg.version}
 * @description ${pkg.description}
 * @see ${pkg.homepage}
 */
`;

const inputOptions = {
  input: 'lib/adodb/main.js'
};

const outputOptions = {
  format: 'iife',
  indent: true,
  strict: true,
  file: 'lib/adodb.js'
};

build(inputOptions, outputOptions);
