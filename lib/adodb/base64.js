/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 */

import { UTF8 } from './utf8';

// Base64 meta chars
var BASE64_META = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export var Base64 = {
  /**
   * Base64 encode
   *
   * @param {String} input
   * @returns {String}
   */
  encode: function(input) {
    var i = 0;
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;

    input = UTF8.encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output
        + BASE64_META.charAt(enc1) + BASE64_META.charAt(enc2)
        + BASE64_META.charAt(enc3) + BASE64_META.charAt(enc4);
    }

    return output;
  },
  /**
   * Base64 encode
   *
   * @param {String} input
   * @returns {String}
   */
  decode: function(input) {
    var i = 0;
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    while (i < input.length) {
      enc1 = BASE64_META.indexOf(input.charAt(i++));
      enc2 = BASE64_META.indexOf(input.charAt(i++));
      enc3 = BASE64_META.indexOf(input.charAt(i++));
      enc4 = BASE64_META.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }

      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = UTF8.decode(output);

    return output;
  }
};
