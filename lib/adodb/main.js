/**
 * @module main
 * @license MIT
 * @version 2017/11/09
 */

import './json';
import { ADODB } from './adodb';
import { stderr } from './utils';

// Main
try {
  // Call method
  ADODB[WScript.Arguments(0)](JSON.parse(decodeURI(WScript.Arguments(1))));
} catch (e) {
  // Write error
  stderr(e.description);
}
