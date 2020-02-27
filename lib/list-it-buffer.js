"use strict";
const DataCell = require("./data-cell.js");
const Row = require("./row.js");
const Column = require("./column.js");

/**
 * @typedef {object} ListItOption
 * @property {boolean} autoAlign - Align number vertical with its decimal point.
 * @property {Array<number>|number|null} columnWidth - Column width by character length.
 */

/**
 * ListItBuffer.
 *
 * @class
 * @param {ListItOption|null} opt An option to create.
 */
function ListItBuffer(opt) {
    this.opt = {
        "autoAlign" : true,
        "columnWidth": null,
    };
    if(opt) {
        Object.keys(this.opt).forEach(key => {
            if(key in opt) {
                this.opt[key] = opt[key];
            }
        });
    }
    this.lines = [];
    this.columns = [];
    this.columnWidth = this.opt.columnWidth;
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
            array.forEach(row => this.addRow(row));
        } else {
            array.forEach(data => this.d(data));
        }
        return this;
    }
    if(Array.isArray(data)) {
        if(ListItBuffer.isMultiDimensionalArray(data)) {
            data.forEach(row => this.addRow(row));
        } else if(ListItBuffer.isObjectArray(data)) {
            data = objectArrayToTable(data);
            data.forEach(row => this.addRow(row));
        } else {
            this.addRow(data);
        }
        return this;
    }
    const rowidx = this.lines.length - 1;
    if(rowidx < 0 || this.lines[rowidx].isFixed()) {
        this.pushNewRow();
    }

    const cell = new DataCell();
    cell.setData(data);

    const iRow = this.lines.length - 1;
    let iCol = this.lines[iRow].getCellLength();
    if(iCol >= this.columns.length) {
        const column = new Column();
        if(this.opt.autoAlign) {
            column.setAutoAlign(true);
        }
        this.columns.push(column);
    }
    this.columns[iCol].setCellAt(iRow, cell);
    this.lines[iRow].pushCell(cell);
    return this;
};

/**
 * Check if the parameter is a multi-dimensional array.
 *
 * @param {any} arr A value to be checked
 * @returns {boolean} A result of the check
 */
ListItBuffer.isMultiDimensionalArray = function(arr) {
    // Checking arr is an array.
    // if the type is a string, it will be accepted by
    // `for-of` statement.
    if(!Array.isArray(arr)) {
        throw Error("The parameter arr must be array");
    }
    for(let element of arr) {
        if(!Array.isArray(element)) {
            return false;
        }
    }
    return true;
};

/**
 * Check if the parameter is an array of one same class.
 *
 * @function
 * @param {Array} arr A value to be checked.
 * @returns {boolean} A result of the check.
 */
ListItBuffer.isObjectArray = function(arr) {
    // Checking arr is an array.
    // if the type is a string, it will be accepted by
    // `for-of` statement.
    if(!Array.isArray(arr)) {
        throw Error("The parameter arr must be array");
    }
    const ctor = arr[0].constructor;
    for(let element of arr) {
        if(typeof(element) != "object") {
            return false;
        } else {
            if(element.constructor.name != ctor.name)
            {
                return false;
            }
        }
    }
    return true;
};

ListItBuffer.prototype.addRow = function(row) {
    row.forEach(col => {
        switch(typeof(col)) {
        case "string":
        case "number":
            this.d(col);
            break;
        default:
            this.d((col != null) ? col.toString() : "(null)");
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
    this.columns.forEach((column, iCol)=>{
        column.setTextWidth(this.getColumnWidth(iCol));
        column.updateWidth();
    });
    this.lines.forEach(line => {
        if(line.isFixed() || !line.isEmpty()) {
            if(line.isEmpty()) {
                rows.push("\n");
            } else {
                rows.push(this.columns.map((column, iCol)=>{
                    const cell = line.getCell(iCol);
                    const data = cell.getData();
                    return column.formatCell(data);
                }).join(" "));
            }
        }
    });
    return rows.join("\n");
};

/**
 * Convert an array of object to a table data.
 *
 * @function
 * @param {Array<object>} objects - an array of objects.
 * @returns {Array<Array<any>>} A Bi-dimensional array as a table data.
 */
function objectArrayToTable(objects) {
    const keys = Object.keys(objects[0]);
    const body = objects.map(item => keys.map(key => {
        if(item[key] != null && typeof(item[key]) == "object"
            && item[key].constructor.name == "Date")
        {
            return item[key].toISOString();
        }
        return item[key];
    }));
    return [ keys, ...body ];
}

/**
 * Set the column width by text length.
 * 
 * The actual width is calculated by traversing all data in a column.
 * A number data never be affected, because it should not be truncated.
 * So it may be longer than the specified length when some number data
 * exist in a column.
 *
 * @param {number} indexOfColumns a column index to set
 * @param {number} width a character length of the column
 * @returns {ListItBuffer} Returns this to be able to chain.
 */
ListItBuffer.prototype.setColumnWidth = function(indexOfColumns, width) {
    this.columnWidth = this.columnWidth || [];
    if(typeof indexOfColumns !== "number") {
        throw new Error("indexOfColumns must be a number");
    }
    if(!width) {
        delete this.columnWidth[indexOfColumns];
    } else {
        if(typeof width !== "number") {
            throw new Error("width must be a number");
        }
        this.columnWidth[indexOfColumns] = width;
    }
    return this;
};

/**
 * Set width for all columns.
 *
 * @param {Array<number>|number|null} widthForAll a character length of the column
 * @returns {ListItBuffer} Returns this to be able to chain.
 */
ListItBuffer.prototype.setColumnWidthAll = function(widthForAll) {
    if(widthForAll != null
        && !Array.isArray(widthForAll)
        && typeof widthForAll !== "number")
    {
        throw new Error(
            "widthForAll must be one of a null, an Array or a number");
    }
    if(Array.isArray(widthForAll)) {
        for(let i = 0; i < widthForAll.length; i++) {
            const width = widthForAll[i];
            if(width != undefined && typeof width !== "number") {
                throw new Error(
                    `widthForAll[${i}] must be an undefined or a number`);
            }
        }
    }
    this.columnWidth = widthForAll;
    return this;
};

/**
 * Get the column width.
 *
 * @param {number} indexOfColumns a column index to set
 * @returns {number} a column width.
 */
ListItBuffer.prototype.getColumnWidth = function(indexOfColumns) {
    if(Array.isArray(this.columnWidth)) {
        return this.columnWidth[indexOfColumns];
    }
    return this.columnWidth;
};
