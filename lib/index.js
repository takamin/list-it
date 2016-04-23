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
        this.lines.push(new Row());
        return this;
    };
    privates.ListItBuffer.prototype.d = function(s) {
        if(this.lines.length <= 0) {
            this.nl();
        }
        var row = this.lines.length - 1;
        var col = this.lines[row].getCellLength();
        if(col >= this.colmaxlen.length) {
            var column = new Column();
            this.colmaxlen.push(column);
            col = this.colmaxlen.length - 1;
        }
        this.colmaxlen[col].expandWidth(s.length);
        var cell = new DataCell();
        cell.setData(s);
        this.lines[row].pushCell(cell);
        return this;
    };
    privates.ListItBuffer.prototype.toString = function() {
        if(this.lines.length <= 0) {
            return "";
        }
        var rows = [];
        this.lines.forEach(function(line) {
            var cols = [];
            for(var col = 0; col < line.getCellLength(); col++) {
                var s = this.colmaxlen[col].formatCell(line.getCell(col));
                cols.push(s);
            }
            rows.push(cols.join(' '));
        }, this);
        return rows.join("\n");;
    };
    module.exports = exports;

    //
    // DataCell class
    //
    var DataCell = function() {
        this.data = "";
    };
    DataCell.prototype.getData = function() {
        return this.data;
    };
    DataCell.prototype.setData = function(data) {
        this.data = data;
    };

    //
    // Column class
    //
    var Column = function() {
        this.width = 0;
    };
    Column.prototype.getWidth = function() {
        return this.width;
    };
    Column.prototype.expandWidth = function(width) {
        if(width > this.width) {
            this.width = width;
        }
    };
    Column.prototype.formatCell = function(cell) {
        var m = this.getWidth();
        var s = cell.getData();
        while(s.length < m) {
            s += ' ';
        }
        return s;
    };

    //
    // Row class
    //
    var Row = function() {
        this.cells = [];
    };
    Row.prototype.getCellLength = function() {
        return this.cells.length;
    };
    Row.prototype.getCell= function(idx) {
        return this.cells[idx];
    };
    Row.prototype.pushCell = function(cell) {
        return this.cells.push(cell);
    };
}());
