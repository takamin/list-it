"use strict";
const NumberExpressionLength = require("./number-expression-length.js");

/**
 * Information of number expression
 */
class NumberExpressionInfo {
    /**
     * @param {number} num 数値
     */
    constructor(num) {
        const s = "" + num;
        let intStr = "";
        let fracStr = "";
        const pointPos = s.indexOf(".");
        const expIndex = s.indexOf("e");
        if(expIndex >= 0) {
            if(pointPos < 0) {
                this.pointPos = expIndex;
                this.intStr = s.substr(0, expIndex);
                this.fracStr = "0";
                this.expStr = s.substr(expIndex + 1);
                return;
            }
            this.pointPos = pointPos;
            this.intStr = s.substr(0, pointPos);
            this.fracStr = s.substring(pointPos + 1, expIndex);
            this.expStr = s.substr(expIndex + 1);
            return;
        }
        if(pointPos < 0) {
            intStr = s;
        } else {
            intStr = s.substr(0, pointPos);
            fracStr = s.substr(pointPos + 1);
        }
        this.pointPos = pointPos;
        this.intStr = intStr;
        this.fracStr = fracStr;
        this.expStr =  "";
    }
    /**
     * @returns {NumberExpressionLength} A number expression length info.
     */
    getLengthInfo() {
        return new NumberExpressionLength(
            this.intStr.length,
            this.fracStr.length,
            this.expStr.length);
    }
    /**
     * Format a number with the length info.
     * 
     * @param {number} num A number to be formatted.
     * @param {NumberExpressionLength} numLenMax A max number expression length info.
     * @returns {string} A formatted string.
     */
    static format(num, numLenMax) {
        const numInfo = new NumberExpressionInfo(num);
        return numInfo.format(numLenMax);
    }
    /**
     * Format a number with the length info.
     * 
     * @param {NumberExpressionLength} numLenMax A max number expression length info.
     * @returns {string} A formatted string.
     */
    format(numLenMax) {
        const intStr = this.intStr.padStart(numLenMax.intLen, " ");
        const fracStr = this.expStr != "" ?
            this.fracStr.padEnd(numLenMax.fracLen, "0") :
            this.fracStr.padEnd(numLenMax.fracLen, " ");
        const expStr = this.expStr.padEnd(numLenMax.expLen, " ");
        if(this.expStr != "") {
            return [intStr, ".", fracStr, "e", expStr].join("");
        }
        if(this.pointPos >= 0) {
            if(numLenMax.expLen > 0) {
                return [intStr, ".", fracStr, " ", expStr].join("");
            }
            return [intStr, ".", fracStr].join("");
        } else if(numLenMax.fracLen == 0) {
            return intStr;
        }
        if(numLenMax.expLen > 0) {
            return [intStr, ".0", fracStr.substr(1), " ", expStr].join("");
        }
        return [intStr, ".0", fracStr.substr(1)].join("");
    }
}
module.exports = NumberExpressionInfo;
