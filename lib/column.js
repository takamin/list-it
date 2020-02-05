"use strict";
const DataCell = require("./data-cell.js");

function Column() {
    this.opt = {
        "autoAlign" : false
    };
    this.width = 0;
    this.intLen = 0;
    this.fracLen = 0;
    this.cellAtRow = {};
}

module.exports = Column;

Column.prototype.getWidth = function() {
    return this.width;
};

Column.prototype.setCellAt = function(row, cell) {
    let width = cell.visibleLength();
    this.cellAtRow[row] = cell;
    if(this.opt.autoAlign) {
        const data = cell.getData();
        if(typeof(data) == "number") {
            this.updateNumWidth(data);
            width = this.getNumMaxWidth();
        }
    }
    if(width > this.width) {
        this.width = width;
    }
};

function spc(n) {
    return (Array(n)).fill(" ").join("");
}

function padLeft(str,columns) {
    const n = columns - str.length;
    return (n <= 0) ? str : (spc(n) + str);
}

function padRight(str,columns) {
    const n = columns - str.length;
    return (n <= 0) ? str : str + spc(n);
}

function padRightForVisibleLength(str,columns) {
    const n = columns - DataCell.visibleLength(str);
    return (n <= 0) ? str : str + spc(n);
}

Column.prototype.formatCell = function(cell) {
    const m = this.getWidth();
    const data = cell.getData();
    if(this.opt.autoAlign) {
        if(typeof(data) == "number") {
            return padLeft(this.makeAutoAlignNum(data), m);
        }
    }
    return padRightForVisibleLength("" + data, m);
};

Column.prototype.setAutoAlign = function(autoAlign) {
    this.opt.autoAlign = autoAlign;
};

Column.prototype.updateNumWidth = function(num) {
    const numInfo = this.analyzeNumber(num);
    const intLen = numInfo.intStr.length;
    const fracLen = numInfo.fracStr.length;
    if(intLen > this.intLen) {
        this.intLen = intLen;
    }
    if(fracLen > this.fracLen) {
        this.fracLen = fracLen;
    }
};

Column.prototype.getNumMaxWidth = function() {
    return this.intLen + this.fracLen + (this.fracLen > 0 ? 1 : 0);
};

Column.prototype.makeAutoAlignNum = function(num) {
    const numInfo = this.analyzeNumber(num);
    const intStr = padLeft(numInfo.intStr, this.intLen);
    const fracStr = padRight(numInfo.fracStr, this.fracLen);
    if(numInfo.pointPos >= 0) {
        return [intStr, ".", fracStr].join("");
    } else if(this.fracLen == 0) {
        return intStr;
    }
    return [intStr, ".0", fracStr.substr(1)].join("");
};

Column.prototype.analyzeNumber = function(num) {
    const s = "" + num;
    let intStr = "";
    let fracStr = "";
    const pointPos = s.indexOf(".");
    if(pointPos < 0) {
        intStr = s;
    } else {
        intStr = s.substr(0, pointPos);
        fracStr = s.substr(pointPos + 1);
    }
    return { "pointPos" : pointPos, "intStr" : intStr, "fracStr" : fracStr };
};
