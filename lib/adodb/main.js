/**
 * @module main
 * @license MIT
 * @version 2017/11/09
 */

import { JSON } from './json';
import { ADODB } from './adodb';
import { stdout } from './utils';

// main
try {
  // call method
  ADODB[WScript.Arguments(0)](JSON.parse(decodeURI(WScript.Arguments(1))));
} catch (e) {
  // write data
  stdout({
    valid: false,
    message: e.message
  });
}
