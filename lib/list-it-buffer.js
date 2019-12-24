"use strict";
const DataCell = require("./data-cell.js");
const Row = require("./row.js");
const Column = require("./column.js");

function ListItBuffer(opt) {
    this.opt = {
        "autoAlign" : true,
    };
    if(opt) {
        Object.keys(this.opt).forEach(key => {
            if(key in opt) {
                this.opt[key] = opt[key];
            }
        });
    }
    this.lines = [];
    this.colmaxlen = [];
}

module.exports = ListItBuffer;

ListItBuffer.prototype.nl = function() {
    const lastRowIndex = this.lines.length - 1;
    if(lastRowIndex >= 0 && !this.lines[lastRowIndex].isFixed()) {
        this.lines[lastRowIndex].fix();
    }
    this.pushNewRow();
    return this;
};

ListItBuffer.prototype.d = function(data) {
    if(arguments.length > 1) {
        const array = Array.apply(null, arguments);
        if(ListItBuffer.isMultiDimensionalArray(array)) {
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
        if(ListItBuffer.isMultiDimensionalArray(data)) {
            data.forEach(function(row) {
                this.addRow(row);
            }, this);
        } else if(ListItBuffer.isObjectArray(data)) {
            data = objectArrayToTable(data);
            data.forEach(function(row) {
                this.addRow(row);
            }, this);
        } else {
            this.addRow(data);
        }
        return this;
    }
    const rowidx = this.lines.length - 1;
    if(rowidx < 0 || this.lines[rowidx].isFixed()) {
        this.pushNewRow();
    }
    const row = this.lines.length - 1;
    let col = this.lines[row].getCellLength();
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

ListItBuffer.isMultiDimensionalArray = function(arr) {
    let allElementIsArray = true;
    arr.forEach(element => {
        if(!Array.isArray(element)) {
            allElementIsArray = false;
        }
    });
    return allElementIsArray;
};

ListItBuffer.isObjectArray = function(arr) {
    let allElementIsObject = true;
    const ctor = arr[0].constructor;
    arr.forEach(element => {
        if(typeof(element) != "object") {
            allElementIsObject = false;
        } else {
            if(ctor == null) {
                if(element.constructor != null) {
                    allElementIsObject = false;
                }
            } else {
                if(element.constructor == null ||
                    element.constructor.name != ctor.name)
                {
                    allElementIsObject = false;
                }
            }
        }
    });
    return allElementIsObject;
};

ListItBuffer.prototype.addRow = function(row) {
    row.forEach(col => {
        switch(typeof(col)) {
        case 'string':
        case 'number':
            this.d(col);
            break;
        default:
            this.d((col != null) ? col.toString() : '(null)');
            break;
        }
    });
    this.nl();
};

ListItBuffer.prototype.pushNewRow = function() {
    this.lines.push(new Row());
};

ListItBuffer.prototype.toString = function() {
    const rows = [];
    this.lines.forEach(line => {
        if(line.isFixed() || !line.isEmpty()) {
            if(line.isEmpty()) {
                rows.push('\n');
            } else {
                const cols = [];
                for(let col = 0; col < line.getCellLength(); col++) {
                    const s = this.colmaxlen[col].formatCell(line.getCell(col));
                    cols.push(s);
                }
                rows.push(cols.join(' '));
            }
        }
    });
    return rows.join("\n");
};

function objectArrayToTable(objects) {
    const keys = Object.keys(objects[0]);
    const table = [keys];
    objects.forEach(function(item) {
        table.push(keys.map(function(key) {
            if(item[key] != null && typeof(item[key]) == 'object'
                && item[key].constructor.name == 'Date')
            {
                return item[key].toISOString();
            }
            return item[key];
        }));
    });
    return table;
}
