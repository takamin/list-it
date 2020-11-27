"use strict";
const assert = require('chai').assert;
const NumberExpressionInfo = require('../lib/number-expression-info.js');
const NumberExpressionLength = require('../lib/number-expression-length.js');
describe("NumberExpressionInfo", ()=>{
    describe("constructor", ()=>{
        it("should recognize no exponential notation", ()=> {
            const nuexinfo = new NumberExpressionInfo(12.345);
            assert.equal(nuexinfo.pointPos, 2);
            assert.equal(nuexinfo.intStr, "12");
            assert.equal(nuexinfo.fracStr, "345");
            assert.equal(nuexinfo.expStr, "");
        });
        it("should recognize no fractional part", ()=> {
            const nuexinfo = new NumberExpressionInfo(3e-7);
            assert.equal(nuexinfo.pointPos, 1);
            assert.equal(nuexinfo.intStr, "3");
            assert.equal(nuexinfo.fracStr, "0");
            assert.equal(nuexinfo.expStr, "-7");
        });
        it("should recognize exponential notation", ()=> {
            const nuexinfo = new NumberExpressionInfo(12.34e-8);
            assert.equal(nuexinfo.pointPos, 1);
            assert.equal(nuexinfo.intStr, "1");
            assert.equal(nuexinfo.fracStr, "234");
            assert.equal(nuexinfo.expStr, "-7");
        });
        it("should recognize negative value", ()=> {
            const nuexinfo = new NumberExpressionInfo(-12.34e-8);
            assert.equal(nuexinfo.pointPos, 2);
            assert.equal(nuexinfo.intStr, "-1");
            assert.equal(nuexinfo.fracStr, "234");
            assert.equal(nuexinfo.expStr, "-7");
        });
    });
    describe("#format", ()=>{
        it("should render numbers", ()=>{
            const nel = new NumberExpressionLength(3,2,2);
            const td = [
                3e-7,
                -3e-7,
                1.2e-7,
                -1.25e-7,
                125.9,
            ];
            const neis = td.map(n => new NumberExpressionInfo(n));
            assert.equal(neis[0].format(nel), "  3.00e-7");
            assert.equal(neis[1].format(nel), " -3.00e-7");
            assert.equal(neis[2].format(nel), "  1.20e-7");
            assert.equal(neis[3].format(nel), " -1.25e-7");
            assert.equal(neis[4].format(nel), "125.9    ");
        });
        it("should render exponential numbers that the real part is integer", ()=>{
            const nel = new NumberExpressionLength(2,1,2);
            const td = [
                3e-7,
                -3e-7,
                1e-7,
            ];
            const neis = td.map(n => new NumberExpressionInfo(n));
            assert.equal(neis[0].format(nel), " 3.0e-7");
            assert.equal(neis[1].format(nel), "-3.0e-7");
            assert.equal(neis[2].format(nel), " 1.0e-7");
        });
        it("should render integer", ()=>{
            const nel = new NumberExpressionLength(3,1,2);
            const td = [
                3e-7,
                123,
                1e-7,
            ];
            const neis = td.map(n => new NumberExpressionInfo(n));
            assert.equal(neis[0].format(nel), "  3.0e-7");
            assert.equal(neis[1].format(nel), "123.0   ");
            assert.equal(neis[2].format(nel), "  1.0e-7");
        });
    });
});
