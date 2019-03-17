"use strict";
const ListIt = require("./lib/list-it-buffer.js");
ListIt.buffer = function (opt) {
    return new ListIt(opt);
};
module.exports = ListIt;
