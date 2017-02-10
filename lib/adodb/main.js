import { ADODB } from './adodb.js';
import { Base64 } from './base64.js';
import { stdout } from './utils.js';

// Main
try {
  // Call method
  ADODB[WScript.Arguments(0)](JSON.parse(Base64.decode(WScript.Arguments(1))));
} catch (e) {
  // Write data
  stdout({
    valid: false,
    message: e.message
  });
}
