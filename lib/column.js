"use strict";
const DataCell = require("./data-cell.js");
const NumberExpressionInfo = require("./number-expression-info.js");
const NumberExpressionLength = require("./number-expression-length.js");

/**
 * Column of ListIt.
 *
 * @class
 */
class Column {
    constructor() {
        this.opt = {
            "autoAlign": false
        };
        this.width = 0;
        this.textWidth = null;
        this.numLenMax = new NumberExpressionLength();
        this.cellAtRow = {};
        this.header = null;
    }
    getWidth() {
        return this.width;
    }
    setTextWidth(textWidth) {
        this.textWidth = textWidth;
    }
    setCellAt(row, cell) {
        this.cellAtRow[row] = cell;
    }
    setHeader(header) {
        this.header = header;
    }
    hasHeader() {
        return this.header != null;
    }
    updateWidth() {
        const headerWidth = (!this.hasHeader() ? 0
            : DataCell.visibleLength("" + this.header));
        let width = headerWidth;

        //Update column width with data in the cells
        Object.values(this.cellAtRow).forEach(cell => {
            const data = cell.getData();
            let cellDataWidth = cell.visibleLength();
            if (typeof (data) == "number") {
                if (this.opt.autoAlign) {
                    this.updateNumLenMax(data);
                    cellDataWidth = this.numLenMax.getTotalLength();
                }
            }
            if (cellDataWidth > width) {
                width = cellDataWidth;
            }
            if (typeof (data) == "string") {
                if (this.textWidth && this.textWidth > headerWidth) {
                    if (width > this.textWidth) {
                        width = this.textWidth;
                    }
                }
            }
        });
        this.width = width;
    }
    formatColumnHeader() {
        if (!this.hasHeader()) {
            return null;
        }
        const width = this.getWidth();
        const header = this.header;
        const headerWidth = DataCell.visibleLength("" + header);
        if (header.length == headerWidth && width - headerWidth <= 0) {
            return ("" + header).substring(0, width);
        }
        return "" + header + " ".repeat(width - headerWidth);
    }
    formatCell(data) {
        const width = this.getWidth();
        if (this.opt.autoAlign) {
            if (typeof (data) == "number") {
                return this.formatAutoAlignNumber(data).padStart(width, " ");
            }
        }
        const dataWidth = DataCell.visibleLength("" + data);
        if (data.length == dataWidth && width - dataWidth <= 0) {
            return ("" + data).substring(0, width);
        }
        return "" + data + " ".repeat(width - dataWidth);
    }
    setAutoAlign(autoAlign) {
        this.opt.autoAlign = autoAlign;
    }
    updateNumLenMax(num) {
        const numInfo = new NumberExpressionInfo(num);
        const numLenInfo = numInfo.getLengthInfo();
        this.numLenMax.update(numLenInfo);
    }
    formatAutoAlignNumber(num) {
        return NumberExpressionInfo.format(num, this.numLenMax);
    }
}
module.exports = Column;
