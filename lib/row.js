"use strict";

/**
 * Row of ListIt.
 *
 * @class
 */
class Row {
    constructor() {
        this.cells = [];
        this.empty = true;
        this.fixed = false;
    }
    getCellLength() {
        return this.cells.length;
    }
    getCell(idx) {
        return this.cells[idx];
    }
    pushCell(cell) {
        if (this.isFixed()) {
            throw "pushCell Fail, The row was already fixed.";
        }
        this.empty = false;
        return this.cells.push(cell);
    }
    fix() {
        this.fixed = true;
    }
    isEmpty() {
        return this.empty;
    }
    isFixed() {
        return this.fixed;
    }
}
module.exports = Row;
