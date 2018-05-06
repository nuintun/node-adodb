/**
 * @module main
 * @license MIT
 * @version 2017/11/09
 */

import './json';
import { ADODB } from './adodb';
import { stderr } from './utils';

// Command
var command = WScript.Arguments(0);
// Wait stdin
var params = JSON.parse(WScript.StdIn.ReadAll());

// Main
try {
  // Call method
  ADODB[command](params);
} catch (e) {
  var code = e.number;
  var message = e.description;

  if (!message) {
    message = 'Unspecified error, SQL may contain reserved words and symbols, surround it with brackets []';
  }

  // Write error
  stderr({ code: code, message: message });
}
