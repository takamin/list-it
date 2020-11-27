"use strict";
const assert = require('chai').assert;
const NumberExpressionLength = require("../lib/number-expression-length.js");
describe("NumberExpressionLenght", ()=>{
    describe("constructor", ()=>{
        it("should initialize the all members zero", ()=>{
            const numLen = new NumberExpressionLength();
            assert.equal(numLen.intLen, 0);
            assert.equal(numLen.fracLen, 0);
            assert.equal(numLen.expLen, 0);
        });
        it("should initialize the all members by the parameters", ()=>{
            const numLen = new NumberExpressionLength(1,2,3);
            assert.equal(numLen.intLen, 1);
            assert.equal(numLen.fracLen, 2);
            assert.equal(numLen.expLen, 3);
        });
    });
    describe("#update", ()=>{
        it("should update the int part length", ()=>{
            const numLen = new NumberExpressionLength(1,2,3);
            numLen.update(new NumberExpressionLength(2,1,2));
            assert.equal(numLen.intLen, 2);
            assert.equal(numLen.fracLen, 2);
            assert.equal(numLen.expLen, 3);
        });
        it("should update the fractional part length", ()=>{
            const numLen = new NumberExpressionLength(1,2,3);
            numLen.update(new NumberExpressionLength(1,3,2));
            assert.equal(numLen.intLen, 1);
            assert.equal(numLen.fracLen, 3);
            assert.equal(numLen.expLen, 3);
        });
        it("should update the exponential part length", ()=>{
            const numLen = new NumberExpressionLength(1,2,3);
            numLen.update(new NumberExpressionLength(1,2,4));
            assert.equal(numLen.intLen, 1);
            assert.equal(numLen.fracLen, 2);
            assert.equal(numLen.expLen, 4);
        });
    });
    describe("#getTotalLength", ()=>{
        it("should be 8 for 1.23e456", ()=>{
            const numLen = new NumberExpressionLength(1,2,3);
            assert.equal(numLen.getTotalLength(), 8);
        });
        it("should be 5 for 1e234", ()=>{
            const numLen = new NumberExpressionLength(1,0,3);
            assert.equal(numLen.getTotalLength(), 5);
        });
        it("should be 5 for 1.234", ()=>{
            const numLen = new NumberExpressionLength(1,3,0);
            assert.equal(numLen.getTotalLength(), 5);
        });
        it("should be 3 for 123", ()=>{
            const numLen = new NumberExpressionLength(3,0,0);
            assert.equal(numLen.getTotalLength(), 3);
        });
    });
});