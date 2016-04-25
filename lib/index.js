(function() {
    "use strict";
    var exports = {};
    var privates = {};

    exports.buffer = function(opt) {
        return new privates.ListItBuffer(opt);
    };

    privates.ListItBuffer = function(opt) {
        this.opt = {
            "autoAlign" : false
        };
        if(opt) {
            Object.keys(this.opt).forEach(function(key) {
                if(key in opt) {
                    this.opt[key] = opt[key];
                }
            }, this);
        }
        this.lines = [];
        this.colmaxlen = [];
    };
    privates.ListItBuffer.prototype.nl = function() {
        var lastRowIndex = this.lines.length - 1;
        if(lastRowIndex >= 0 && !this.lines[lastRowIndex].isFixed()) {
            this.lines[lastRowIndex].fix();
        }
        this.pushNewRow();
        return this;
    };
    privates.ListItBuffer.prototype.d = function(data) {
        if(arguments.length > 1) {
            var array = Array.apply(null, arguments);
            if(privates.ListItBuffer.isMultiDimensionalArray(array)) {
                array.forEach(function(row) {
                    this.addRow(row);
                }, this);
            } else {
                array.forEach(function(data) {
                    this.d(data);
                }, this);
            }
            return this;
        } else if(Array.isArray(data)) {
            if(privates.ListItBuffer.isMultiDimensionalArray(data)) {
                data.forEach(function(row) {
                    this.addRow(row);
                }, this);
            } else {
                this.addRow(data);
            }
            return this;
        }
        var rowidx = this.lines.length - 1;
        if(rowidx < 0 || this.lines[rowidx].isFixed()) {
            this.pushNewRow();
        }
        var row = this.lines.length - 1;
        var col = this.lines[row].getCellLength();
        if(col >= this.colmaxlen.length) {
            var column = new Column();
            if(this.opt.autoAlign) {
                column.setAutoAlign(true);
            }
            this.colmaxlen.push(column);
            col = this.colmaxlen.length - 1;
        }
        var cell = new DataCell();
        cell.setData(data);
        this.lines[row].pushCell(cell);
        this.colmaxlen[col].setCellAt(row, cell);
        return this;
    };
    privates.ListItBuffer.isMultiDimensionalArray = function(arr) {
        var allElementIsArray = true;
        arr.forEach(function(element) {
            if(!Array.isArray(element)) {
                allElementIsArray = false;
            }
        });
        return allElementIsArray;
    };
    privates.ListItBuffer.prototype.addRow = function(row) {
        row.forEach(function(col) {
            switch(typeof(col)) {
            case 'string':
            case 'number':
                this.d(col);
                break;
            default:
                this.d(col.toString());
                break;
            }
        }, this);
        this.nl();
    };
    privates.ListItBuffer.prototype.pushNewRow = function() {
        this.lines.push(new Row());
    };
    privates.ListItBuffer.prototype.toString = function() {
        var rows = [];
        this.lines.forEach(function(line) {
            if(line.isFixed() || !line.isEmpty()) {
                if(line.isEmpty()) {
                    rows.push('\n');
                } else {
                    var cols = [];
                    for(var col = 0; col < line.getCellLength(); col++) {
                        var s = this.colmaxlen[col].formatCell(line.getCell(col));
                        cols.push(s);
                    }
                    rows.push(cols.join(' '));
                }
            }
        }, this);
        return rows.join("\n");
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
    DataCell.prototype.visibleLength = function() {
        if(typeof(this.data) != "string") {
            return ("" + this.data).length;
        }
        // Remove escape sequences for text style from the string
        var s = this.data.replace(/\x1b[^m]*m/g, '');
        return s.length;
    };

    //
    // Column class
    //
    var Column = function() {
        this.opt = {
            "autoAlign" : false
        };
        this.width = 0;
        this.intLen = 0;
        this.fracLen = 0;
        this.cellAtRow = {};
    };
    Column.prototype.getWidth = function() {
        return this.width;
    };
    Column.prototype.setCellAt = function(row, cell) {
        var width = cell.visibleLength();
        this.cellAtRow[row] = cell;
        if(this.opt.autoAlign) {
            var data = cell.getData();
            if(typeof(data) == "number") {
                this.updateNumWidth(data);
                width = this.getNumMaxWidth();
            }
        }
        if(width > this.width) {
            this.width = width;
        }
    };
    Column.prototype.formatCell = function(cell) {
        var m = this.getWidth();
        var data = cell.getData();
        if(this.opt.autoAlign) {
            if(typeof(data) == "number") {
                var s = this.makeAutoAlignNum(data);
                while(s.length < m) {
                    s = ' ' + s;
                }
                return s;
            }
        }
        var s = "" + data;
        while(s.length < m) {
            s += ' ';
        }
        return s;
    };
    Column.prototype.setAutoAlign = function(autoAlign) {
        this.opt.autoAlign = autoAlign;
    };
    Column.prototype.updateNumWidth = function(num) {
        var numInfo = this.analyzeNumber(num);
        var intLen = numInfo.intStr.length;
        var fracLen = numInfo.fracStr.length;
        if(intLen > this.intLen) {
            this.intLen = intLen;
        }
        if(fracLen > this.fracLen) {
            this.fracLen = fracLen;
        }
    };
    Column.prototype.getNumMaxWidth = function() {
        var width = this.intLen + this.fracLen;
        if(this.fracLen > 0) {
            width++;
        }
        return width;
    };
    Column.prototype.makeAutoAlignNum = function(num) {
        var s = "";
        var numInfo = this.analyzeNumber(num);
        var intStr = numInfo.intStr;
        var fracStr = numInfo.fracStr;
        var pointPos = numInfo.pointPos;
        while(intStr.length < this.intLen) {
            intStr = " " + intStr;
        }
        while(fracStr.length < this.fracLen) {
            fracStr = fracStr + " ";
        }
        if(pointPos >= 0) {
            s = intStr + "." + fracStr;
        } else if(this.fracLen == 0) {
            s = intStr;
        } else {
            s = intStr + ".0" + fracStr.substr(1);
        }
        return s;
    };
    Column.prototype.analyzeNumber = function(num) {
        var s = "" + num;
        var intStr = "";
        var fracStr = "";
        var pointPos = s.indexOf('.');
        if(pointPos < 0) {
            intStr = s;
        } else {
            intStr = s.substr(0, pointPos);
            fracStr = s.substr(pointPos + 1);
        }
        return { "pointPos" : pointPos, "intStr" : intStr, "fracStr" : fracStr };
    };

    //
    // Row class
    //
    var Row = function() {
        this.cells = [];
        this.empty = true;
        this.fixed = false;
    };
    Row.prototype.getCellLength = function() {
        return this.cells.length;
    };
    Row.prototype.getCell= function(idx) {
        return this.cells[idx];
    };
    Row.prototype.pushCell = function(cell) {
        if(this.isFixed()) {
            throw "pushCell Fail, The row was already fixed.";
        }
        this.empty = false;
        return this.cells.push(cell);
    };
    Row.prototype.fix = function() {
        this.fixed = true;
    };
    Row.prototype.isEmpty = function() {
        return this.empty;
    };
    Row.prototype.isFixed = function() {
        return this.fixed;
    };
}());
