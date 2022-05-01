/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  const additionArr = new Array(options.additionRepeatTimes).fill((typeof options.addition !== 'undefined') ? String(options.addition) : '');
  const additionStr = additionArr.join(options.additionSeparator?.toString() || '|');
  const arrOfStr = new Array(options.repeatTimes).fill(String(str) + additionStr);

  return arrOfStr.join(options.separator?.toString() || '+');
}

module.exports = {
  repeater
};
