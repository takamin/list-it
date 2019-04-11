"use strict";
const assert = require('chai').assert;
const ListIt = require("../index.js");
describe("ListIt", () => {
    describe("constructor", () => {
        it("should set the autoAlign option", () => {
            const listit = new ListIt();
            assert.equal(listit.d([
                [0,1.1,222],
                [12,12.3,111],
                [123,1.23,0],
            ]).toString(),
                "  0  1.1  222\n" +
                " 12 12.3  111\n" +
                "123  1.23   0");
        });
    });
    describe(".buffer", () => {
        it("should not set the autoAlign option", () => {
            const listit = ListIt.buffer();
            assert.equal(listit.d([
                [0,1.1,222],
                [12,12.3,111],
                [123,1.23,0],
            ]).toString(),
                "0   1.1  222\n" +
                "12  12.3 111\n" +
                "123 1.23 0  ");
        });
    });
});
