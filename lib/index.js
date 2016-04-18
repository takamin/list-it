(function() {
    var exports = {};
    var privates = {};

    exports.buffer = function() {
        return new privates.ListItBuffer();
    };

    privates.ListItBuffer = function() {
        this.lines = [];
        this.colmaxlen = [];
    };
    privates.ListItBuffer.prototype.nl = function() {
        this.lines.push([]);
        return this;
    };
    privates.ListItBuffer.prototype.d = function(s) {
        if(this.lines.length <= 0) {
            this.nl();
        }
        var row = this.lines.length - 1;
        var col = this.lines[row].length;
        if(col >= this.colmaxlen.length) {
            this.colmaxlen.push(s.length);
        } else if(this.colmaxlen[col] < s.length) {
            this.colmaxlen[col] = s.length;
        }
        this.lines[row].push(s);
        return this;
    };
    privates.ListItBuffer.prototype.toString = function() {
        if(this.lines.length <= 0) {
            return "";
        }
        var rows = [];
        this.lines.forEach(function(line) {
            var cols = [];
            for(var col = 0; col < line.length; col++) {
                var m = this.colmaxlen[col];
                var s = line[col];
                while(s.length < m) {
                    s += ' ';
                }
                cols.push(s);
            }
            rows.push(cols.join(' '));
        }, this);
        return rows.join("\n");;
    };
    module.exports = exports;
}());
