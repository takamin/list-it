"use strict";

/**
 * Length information of number expression.
 */
class NumberExpressionLength {
    /**
     * @param {number|null} intLen A length of the integer part.
     * @param {number|null} fracLen A length of the fractional part.
     * @param {number|null} expLen A length of the exponential part.
     */
    constructor(intLen, fracLen, expLen) {
        this.intLen = intLen || 0;
        this.fracLen = fracLen || 0;
        this.expLen = expLen || 0;
    }
    /**
     * Update length if the specified length is longer than this.
     * 
     * @param {NumberExpressionLength} numLen Another length info.
     */
    update(numLen) {
        if(numLen.intLen > this.intLen) {
            this.intLen = numLen.intLen;
        }
        if(numLen.fracLen > this.fracLen) {
            this.fracLen = numLen.fracLen;
        }
        if(numLen.expLen > this.expLen) {
            this.expLen = numLen.expLen;
        }
    }
    /**
     * Get total string length of the number.
     * 
     * @returns {number} A length of number.
     */
    getTotalLength() {
        return this.intLen +
            this.fracLen + (this.fracLen > 0 ? 1 : 0) +
            this.expLen + (this.expLen > 0 ? 1 : 0);
    }
}
module.exports = NumberExpressionLength;
