//"use strict"
var listit = require('../lib');
var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
var col = 0;
var logbuf = listit.buffer();
process.on("exit", function() {
    console.error(logbuf.toString());
});
var titles = [];
function describe(name, func) {
    titles.push(name);
    func();
    titles = titles.slice(0, titles.length - 1);
}
function it(name, test) {
    logbuf.d(titles.join(" ") + " " + name);
    try {
        test();
        logbuf.d("OK");
        logbuf.nl();
    } catch(ex) {
        logbuf.d("FAIL");
        logbuf.nl();
        test();
    }
}
describe("listit.buffer", function() {
    describe("#constructor", function() {
        it('should return a blank string', function() {
            var buffer = new listit.buffer();

            assert.equal(buffer.toString(), "");
        });
    });
    describe("#push", function() {
        it('should represent a data', function() {
            var buffer = new listit.buffer();
            buffer.d("A");
            assert.equal(buffer.toString(), "A");
        });
    });
    describe("#nl", function() {
        it('should represent a new line', function() {
            var buffer = new listit.buffer();
            buffer.nl();
            assert.equal(buffer.toString(), "");
        });
        it('should represent a new line twice', function() {
            var buffer = new listit.buffer();
            buffer.nl();
            buffer.nl();
            assert.equal(buffer.toString(), "\n");
        });
    });
    describe("#toString", function() {
        it('should represent multi column data', function() {
            var buffer = new listit.buffer();
            buffer.d("A").d("BB").d("CCC");
            assert.equal(buffer.toString(), "A BB CCC");
        });
        it('should represent multi row-column data', function() {
            var buffer = new listit.buffer();
            buffer.d("A").d("BB").d("CCC");
            buffer.nl();
            buffer.d("DDDD").d("EEEEE").d("FFFFFF");
            assert.equal(buffer.toString(),
                "A    BB    CCC   \n" + 
                "DDDD EEEEE FFFFFF");
        });
    });
});
