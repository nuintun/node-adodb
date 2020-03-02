/**
 * @module main
 * @license MIT
 * @version 2017/11/09
 */

import './json';
import { ADODB } from './adodb';

// Command
var command = WScript.Arguments(0);
// Wait stdin
var params = JSON.parse(WScript.StdIn.ReadAll());

// Main
ADODB[command](params);
