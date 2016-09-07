(function(_describe, _it) {
    "use strict";
    var msysMochaAlt = {};
    var listit = require('./index.js');
    var ansi = require('ansi-escape-sequences');
    var style = {};
    var fg = {};
    var bg = {};
    Object.keys(ansi.style).forEach(function(key) {
        var value = ansi.style[key];
        if(/^bg-/.test(key)) {
            bg[key.substr(3)] = value;
        } else {
            fg[key] = value;
        }
    });
    Object.keys(fg).forEach(function(key) {
        if( !(key in bg) ) {
            style[key] = fg[key];
            delete fg[key];
        }
    });
    function styled(message, styles) {
        var args = Array.apply(null, arguments);
        styles = args.slice(1);
        styles.push(message, ansi.style.reset);
        return styles.join('');
    }

    // Alternate Mocha
    var logbuf = listit.buffer();
    var titles = [];
    var pass = styled(" \u2713 ", fg.green);
    var fail = styled(" \u2717 ", bg.red, fg.white, style.bold);
    if(!String.prototype.repeat) {
        String.prototype.repeat = function(n) {
            var a = new Array(n);
            var s = this.toString();
            for(var i = 0; i < n; i++) {
                a[i] = s;
            }
            return a.join('');
        };
    }
    var indent = function() {
        return "  " + "  ".repeat(titles.length);
    };
    var result = function(result, name) {
        return indent() + result + " " + name;
    };
    msysMochaAlt.get_describe = function() {
        return (_describe) ? _describe : function(name, func) {
                console.log(indent() + styled(name, style.bold));
                titles.push(name);
                func();
                titles = titles.slice(0, titles.length - 1);
            };
    };
    msysMochaAlt.get_it = function() {
        return (_it) ? _it : function(name, test) {
            logbuf.d(titles.join(" ") + " " + name);
            try {
                test();
                logbuf.d(pass);
                logbuf.nl();
                console.log(result(pass, name));
            } catch(ex) {
                logbuf.d(fail);
                logbuf.nl();
                console.log(result(fail, styled(name, fg.red, style.bold)));
                test();
                console.error(ex);
            }
        };
    };
    module.exports = msysMochaAlt;
}(
(typeof(describe) == "function") ? describe : false,
(typeof(it) == "function") ? it : false));

