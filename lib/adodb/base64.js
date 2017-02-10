/**
 * Base64
 * http://blog.csdn.net/cuixiping/article/details/409468
 */
export var Base64 = {
  /**
   * Base64 encode
   * @param string
   * @returns {Base64}
   */
  encode: function(string) {
    var base64;
    var xmldom = new ActiveXObject('MSXML2.DOMDocument');
    var adostream = new ActiveXObject('ADODB.Stream');
    var stream = xmldom.createElement('stream');

    stream.dataType = 'bin.base64';
    adostream.Charset = 'utf-8';
    // 1=adTypeBinary 2=adTypeText
    adostream.Type = 2;

    adostream.Open();
    adostream.WriteText(string);

    adostream.Position = 0;
    // 1=adTypeBinary 2=adTypeText
    adostream.Type = 1;
    // -1=adReadAll
    stream.nodeTypedValue = adostream.Read(-1);
    base64 = stream.text;

    adostream.Close();

    // clean
    stream = null;
    adostream = null;
    xmldom = null;

    return base64;
  },
  /**
   * Base64 decode
   * @param base64
   * @returns {String}
   */
  decode: function(base64) {
    var string;
    var xmldom = new ActiveXObject('MSXML2.DOMDocument');
    var adostream = new ActiveXObject('ADODB.Stream');
    var stream = xmldom.createElement('stream');

    stream.dataType = 'bin.base64';
    stream.text = base64;
    adostream.Charset = 'utf-8';
    // 1=adTypeBinary 2=adTypeText
    adostream.Type = 1;

    adostream.Open();
    adostream.Write(stream.nodeTypedValue);

    adostream.Position = 0;
    // 1=adTypeBinary 2=adTypeText
    adostream.Type = 2;
    // -1=adReadAll
    string = adostream.ReadText(-1);

    adostream.Close();

    // clean
    stream = null;
    adostream = null;
    xmldom = null;

    return string;
  }
};
