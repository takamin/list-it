"use strict";
const eaw = require("eastasianwidth");

/**
 * DataCell of ListIt rows.
 *
 * @class
 */
class DataCell {
    constructor() {
        this.data = "";
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
    }
    visibleLength() {
        if (typeof (this.data) != "string") {
            return ("" + this.data).length;
        }
        return DataCell.visibleLength(this.data);
    }
    static visibleLength(data) {
        // Remove escape sequences for text style from the string
        // eslint-disable-next-line no-control-regex
        const s = data.replace(/\x1b[^m]*m/g, "");
        return eaw.length(s);
    }
}
module.exports = DataCell;
