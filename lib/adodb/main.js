import { ADODB } from './adodb';
import { Base64 } from './base64';
import { stdout } from './utils';

// main
try {
  // call method
  ADODB[WScript.Arguments(0)](JSON.parse(Base64.decode(WScript.Arguments(1))));
} catch (e) {
  // write data
  stdout({
    valid: false,
    message: e.message
  });
}
