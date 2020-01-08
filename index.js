'use strict';
const ListItBuffer = require('./lib/list-it-buffer.js');

/**
 * ListIt constructor.
 *
 * ```javascript
 * const ListIt = require("list-it");
 *
 * const listit = new ListIt({ autoAlign: true });
 * ```
 *
 * OPTIONS:
 *
 * ```
 * autoAlign: Align number data to the right or its decimal point.
 *      type: boolean
 *      default: true
 * ```
 *
 * ```
 * maxLength: Maximum character lenght of a value.
 *      type: number
 *      default: 'none'
 * ```
 *
 * @constructor
 * @param {object} opt option
 */
function ListIt(opt) {
  ListItBuffer.call(this, opt);
}

ListIt.prototype = new ListItBuffer();

/**
 * Create the ListIt instance.
 * This method clear the autoAlign option, it it was not specified.
 *
 * @deprecated Use ListIt constructor instead.
 *
 * @param {object} opt option
 * @returns {ListIt} A ListIt instance
 */
ListIt.buffer = function(opt) {
  opt = opt || {};
  if (!('autoAlign' in opt)) {
    opt.autoAlign = false;
  }
  return new ListIt(opt);
};
module.exports = ListIt;
