(function() {
    "use strict";
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
    describe("When opt.autoAlign", function() {
        describe("is true,", function() {
            it('integers are aligned to right', function() {
                var buffer = new listit.buffer({autoAlign:true});
                buffer
                    .d(1).d("2").d("3").nl()
                    .d("10").d(20).d("30").nl()
                    .d("997").d("998").d(999).nl()
                    .d(-1).d(-2).d(-333);
                assert.equal(buffer.toString(),
                        "  1 2   3   \n" +
                        "10   20 30  \n" +
                        "997 998  999\n" +
                        " -1  -2 -333");
            });
            it('taking of decimal point #1', function() {
                var buffer = new listit.buffer({autoAlign:true});
                buffer
                    .d(1.5).nl()
                    .d("10").nl()
                    .d("997").nl()
                    .d(-1.125);
                assert.equal(buffer.toString(),
                        " 1.5  \n" +
                        "10    \n" +
                        "997   \n" +
                        "-1.125");
            });
            it('taking of decimal point #2', function() {
                var buffer = new listit.buffer({autoAlign:true});
                buffer
                    .d("2").nl()
                    .d(20.125).nl()
                    .d("998").nl()
                    .d(-2.25);
                assert.equal(buffer.toString(),
                        "2     \n" +
                        "20.125\n" +
                        "998   \n" +
                        "-2.25 ");
            });
            it('taking of decimal point #3', function() {
                var buffer = new listit.buffer({autoAlign:true});
                buffer
                    .d("3").nl()
                    .d("30").nl()
                    .d(999.0625).nl()
                    .d(-333.5);
                assert.equal(buffer.toString(),
                        "3        \n" +
                        "30       \n" +
                        " 999.0625\n" +
                        "-333.5   ");
            });
            it('long string is mixed in', function() {
                var buffer = new listit.buffer({autoAlign:true});
                buffer
                    .d("3").nl()
                    .d("ABCDEFGHIJKLMN").nl()
                    .d(999.0625).nl()
                    .d(-333.5);
                assert.equal(buffer.toString(),
                        "3             \n" +
                        "ABCDEFGHIJKLMN\n" +
                        "      999.0625\n" +
                        "     -333.5   ");
            });
            it('representation of the number less than 1', function() {
                var buffer = new listit.buffer({autoAlign:true});
                buffer
                    .d(.5).nl()
                    .d(-.5).nl()
                    .d(-125.125);
                assert.equal(buffer.toString(),
                        "   0.5  \n" +
                        "  -0.5  \n" +
                        "-125.125");
            });
            it('fractional representation of an integer', function() {
                var buffer = new listit.buffer({autoAlign:true});
                buffer
                    .d(-987).nl()
                    .d(987).nl()
                    .d(-1250.125);
                assert.equal(buffer.toString(),
                        " -987.0  \n" +
                        "  987.0  \n" +
                        "-1250.125");
            });
        });
    });
}());
