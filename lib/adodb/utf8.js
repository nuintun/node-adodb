export var UTF8 = {
  /**
   * utf-8 encode
   *
   * @param {String} input
   * @returns {String}
   */
  encode: function(input) {
    return unescape(encodeURIComponent(input));
  },
  /**
   * utf-8 decode
   *
   * @param {String} input
   * @returns {String}
   */
  decode: function(input) {
    return decodeURIComponent(escape(input));
  }
};
