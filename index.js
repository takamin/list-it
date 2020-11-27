"use strict";
const ListItBuffer = require("./lib/list-it-buffer.js");

/**
 * @typedef {object} ListItOption
 * @property {boolean} autoAlign - Align number vertical with its decimal point.
 * @property {Array<number>|number|null} columnWidth - Column width by character length.
 */

/**
 * ListIt constructor.
 *
 * @example <caption>Create instace</caption>
 * const ListIt = require("list-it");
 * const listit = new ListIt({ autoAlign: true });
 * @description
 * In default, the `autoAlign` of option is true.
 */
class ListIt  extends ListItBuffer {
    /**
     * @param {ListItOption|null} opt An option to create.
     */
    constructor(opt) {
        super(opt);
    }
}

/**
 * Create the ListIt instance.
 * This method clear the autoAlign option, it it was not specified.
 *
 * @deprecated Use ListIt constructor instead.
 *
 * @param {object} opt option
 * @returns {ListIt} A ListIt instance
 */
ListIt.buffer = function (opt) {
    opt = opt || {};
    if(!("autoAlign" in opt)) {
        opt.autoAlign = false;
    }
    return new ListIt(opt);
};
module.exports = ListIt;
