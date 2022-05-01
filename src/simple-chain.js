const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  result: [],
  getLength() {
    return this.result.length;
  },
  addLink(value) {
    if(typeof value === 'undefined') {
      this.result.push('( )~~');
      return this;
    } else {
      this.result.push(`( ${value} )~~`);
      return this;
    }
  },
  removeLink(position) {
    if (isNaN(+position) || !Number.isInteger(position) || position <= 0 || position > this.result.length) {
      this.result.length = 0;
      throw new Error('You can\'t remove incorrect link!');
    }

    this.result.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    this.result.reverse();
    return this;
  },
  finishChain() {
    const finished = this.result.join('').slice(0, -2);
    this.result.length = 0;
    return finished;
  }
};

module.exports = {
  chainMaker
};
