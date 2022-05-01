const {assert} = require("chai");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!")
  }

  let resArr = [];
  const controlSequences = ['--double-next', '--double-prev', '--discard-prev', '--discard-next'];

  for (let i = 0; i < arr.length; i++) {
    if (!controlSequences.includes(arr[i])) {
      resArr.push(arr[i]);
    }

    if (arr[i] === controlSequences[0]) {
      if (arr[i + 1] !== undefined) {
        resArr.push(arr[i + 1]);
      }
    }

    if (arr[i] === controlSequences[1]) {
      if (arr[i - 1] !== undefined && arr[i - 1] === resArr[i - 1]) {
        resArr.push(arr[i - 1]);
      }
    }

    if (arr[i] === controlSequences[2]) {
      if (arr[i - 1] !== undefined && arr[i - 1] === resArr[i - 1]) {
        resArr.pop();
      }
    }

    if (arr[i] === controlSequences[3]) {
      if (arr[i + 1] !== undefined) {
        i++;
      }
    }
  }

  return resArr;
}

module.exports = {
  transform
};
