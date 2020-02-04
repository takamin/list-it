"use strict";
const assert = require('chai').assert;
const ListItBuffer = require("../lib/list-it-buffer.js");
describe("ListItBuffer", () => {
    describe(".isMultiDimensionalArray", () => {
        it("should throw error if the paramenter is not an array", () => {
            assert.throw(()=>{
                ListItBuffer.isMultiDimensionalArray(0);
            });
            assert.throw(()=>{
                ListItBuffer.isMultiDimensionalArray({});
            });
            assert.throw(()=>{
                ListItBuffer.isMultiDimensionalArray("a");
            });
        });
        it("should be false if it includes an no-array element", () => {
            assert.isFalse(ListItBuffer.isMultiDimensionalArray([0]));
            assert.isFalse(ListItBuffer.isMultiDimensionalArray([{}]));
            assert.isFalse(ListItBuffer.isMultiDimensionalArray(["a"]));
            assert.isFalse(ListItBuffer.isMultiDimensionalArray([[],0]));
            assert.isFalse(ListItBuffer.isMultiDimensionalArray([0,[]]));
            assert.isFalse(ListItBuffer.isMultiDimensionalArray([[],0,[]]));
        });
        it("should be true if all the elements are array", () => {
            assert.isTrue(ListItBuffer.isMultiDimensionalArray([[]]));
            assert.isTrue(ListItBuffer.isMultiDimensionalArray([[],[]]));
            assert.isTrue(ListItBuffer.isMultiDimensionalArray([[1,"a"],[2,"b"]]));
        });
    });
    describe(".isObjectArray", () => {
        it("should throw error if the paramenter is not an array", () => {
            assert.throw(()=>{
                ListItBuffer.isObjectArray(0);
            });
            assert.throw(()=>{
                ListItBuffer.isObjectArray({});
            });
            assert.throw(()=>{
                ListItBuffer.isObjectArray("a");
            });
        });
        it("should throw error if the element is undefined", () => {
            assert.throw(()=>{
                ListItBuffer.isObjectArray([]);
            });
        });
        it("should throw error if the element is null", () => {
            assert.throw(()=>{
                ListItBuffer.isObjectArray([null]);
            });
        });
        it("should throw error if any element is null", () => {
            assert.throw(()=>{
                ListItBuffer.isObjectArray([{}, null]);
            });
        });
        it("should be false if it includes an no-object element", () => {
            assert.isFalse(ListItBuffer.isObjectArray([0]));
            assert.isFalse(ListItBuffer.isObjectArray(["a"]));
            assert.isFalse(ListItBuffer.isObjectArray([[],0]));
            assert.isFalse(ListItBuffer.isObjectArray([0,[]]));
            assert.isFalse(ListItBuffer.isObjectArray([[],0,[]]));
            assert.isFalse(ListItBuffer.isObjectArray([{},0]));
            assert.isFalse(ListItBuffer.isObjectArray([0,{}]));
            assert.isFalse(ListItBuffer.isObjectArray([{},0,{}]));
        });
        it("should be false if it includes instances of different classes", () => {
            function A(){this.a=0;}
            function B(){this.b=1;}
            assert.isFalse(ListItBuffer.isObjectArray([new A(), new B()]));
        });
        it("should be true if all the elements are object", () => {
            function A(){this.a=0;}
            function B(){this.b=1;}
            assert.isTrue(ListItBuffer.isObjectArray([{}]));
            assert.isTrue(ListItBuffer.isObjectArray([{},{}]));
            assert.isTrue(ListItBuffer.isObjectArray([[1,"a"],[2,"b"]]));
            assert.isTrue(ListItBuffer.isObjectArray([new A(), new A()]));
            assert.isTrue(ListItBuffer.isObjectArray([new B(), new B()]));
        });
        it("should be true if all the elements are array", () => {
            assert.isTrue(ListItBuffer.isObjectArray([[]]));
            assert.isTrue(ListItBuffer.isObjectArray([[],[]]));
        });
    });
});
