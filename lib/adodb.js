/**
 * JSON2
 * @private
 * 参考 https://github.com/douglascrockford/JSON-js
 */
var JSON = (function (){
    var JSON = {},
        gap, indent, rep,
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };

    // String quote
    function quote(string){
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a){
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    // Object toString
    function str(key, holder){
        var i, k, v, length,
            mind = gap, partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null';
                }

                gap += indent;
                partial = [];

                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    // Stringify method
    JSON.stringify = function (value, replacer, space){
        var i;
        gap = '';
        indent = '';

        if (typeof space === 'number') {
            for (i = 0; i < space; i += 1) {
                indent += ' ';
            }
        } else if (typeof space === 'string') {
            indent = space;
        }

        rep = replacer;
        if (replacer && typeof replacer !== 'function' &&
            (typeof replacer !== 'object' ||
            typeof replacer.length !== 'number')) {
            throw new Error('JSON.stringify');
        }

        return str('', { '': value });
    };

    // Parse method
    JSON.parse = function (text, reviver){
        var j;

        function walk(holder, key){

            var k, v, value = holder[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = walk(value, k);
                        if (v !== undefined) {
                            value[k] = v;
                        } else {
                            delete value[k];
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }

        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
            text = text.replace(cx, function (a){
                return '\\u' +
                    ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }

        if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

            j = eval('(' + text + ')');

            return typeof reviver === 'function'
                ? walk({ '': j }, '')
                : j;
        }

        throw new SyntaxError('JSON.parse');
    };

    return JSON;
}());

/**
 * 64位字符解码
 * http://blog.csdn.net/cuixiping/article/details/409468
 * @private
 * @param base64
 * @returns {*}
 */
function base64Decode(base64){
    var result,
        xmldom = new ActiveXObject('MSXML2.DOMDocument'),
        adostream = new ActiveXObject('ADODB.Stream'),
        stream = xmldom.createElement('stream');

    stream.dataType = 'bin.base64';
    stream.text = base64;

    adostream.Charset = 'utf-8';
    adostream.Type = 1; // 1=adTypeBinary 2=adTypeText
    adostream.Open();
    adostream.Write(stream.nodeTypedValue);
    adostream.Position = 0;
    adostream.Type = 2; // 1=adTypeBinary 2=adTypeText
    result = adostream.ReadText(-1); // -1=adReadAll
    adostream.Close();
    stream = null;
    adostream = null;
    xmldom = null;

    return result;
}

/**
 * 输出结果
 * @param data
 */
function stdout(data){
    WScript.stdout.write(JSON.stringify(data));
}

/**
 * ADODB
 */
var ADODB = {
    execute: function (params){
        var valid = true,
            message = 'Execute SQL: ' + params.query + ' Success !',
            connection = new ActiveXObject('ADODB.Connection');

        try {
            connection.Open(params.connection);
            connection.Execute(params.query);
        } catch (e) {
            valid = false;
            message = e.message;
        } finally {
            // 关闭数据库链接，不管有没有操作成功
            connection.Close();
            connection = null;
        }

        stdout({
            valid: valid,
            message: message
        });
    },
    query: function (params){
        var enumer, fields = [],
            valid = true, records = [],
            message = 'Execute SQL: ' + params.query + ' Success !',
            connection = new ActiveXObject('ADODB.Connection'),
            recordset = new ActiveXObject('ADODB.Recordset');

        try {
            connection.Open(params.connection);
            recordset.Open(params.query, connection);
            enumer = new Enumerator(recordset.Fields);

            if (recordset.BOF && recordset.EOF) {
                message = 'The recordset is empty !';
            } else {
                for (; !enumer.atEnd(); enumer.moveNext()) {
                    fields.push(enumer.item().name);
                }

                recordset.MoveFirst();

                while (!recordset.EOF) {
                    var item = {};
                    for (var i = 0; i < fields.length; i++) {
                        var fieldname = fields[i];
                        item[fieldname] = recordset(fieldname).value;
                    }
                    records.push(item);
                    recordset.MoveNext();
                }
            }
        } catch (e) {
            valid = false;
            message = e.message;
        } finally {
            // 关闭数据库链接，不管有没有操作成功
            recordset.Close();
            connection.Close();
            enumer = null;
            recordset = null;
            connection = null;
        }

        stdout({
            valid: valid,
            message: message,
            records: records
        });
    }
};

// 程序入口
ADODB[WScript.Arguments(0)](JSON.parse(base64Decode(WScript.Arguments(1))));