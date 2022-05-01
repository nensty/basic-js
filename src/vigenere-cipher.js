/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect) {
    this.isDirect = (typeof isDirect === 'undefined') ? true : isDirect;
    this.alphabetic = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.result = [];
  }

  encrypt(message, key) {
    this.validateIncomingArguments(message, key);
    const upperMessage = message.toUpperCase();
    let encryptedResult = [];
    let extendedKey = this.createNewExtendedKey(upperMessage, key);

    for (let i = 0; i < upperMessage.length; i++) {
      if (this.alphabetic.includes(upperMessage[i])) {
        const alphabeticIndex = (this.alphabetic.indexOf(upperMessage[i]) + this.alphabetic.indexOf(extendedKey[i])) % this.alphabetic.length;

        this.result.push(this.alphabetic[alphabeticIndex]);
      } else {
        const splittedKey = extendedKey.split('');
        splittedKey.splice(i, 0, upperMessage[i]);
        extendedKey = splittedKey.join('');
        this.result.push(upperMessage[i]);
      }
    }

    encryptedResult = this.isDirect ? this.returnDirectChangedMessage() : this.returnReverseChangedMessage();
    this.result.length = 0;

    return encryptedResult;
  }

  decrypt(encryptedMessage, key) {
    this.validateIncomingArguments(encryptedMessage, key);

    const upperMessage = encryptedMessage.toUpperCase();
    let encryptedResult = [];
    let extendedKey = this.createNewExtendedKey(upperMessage, key);

    for (let i = 0; i < upperMessage.length; i++) {
      if (this.alphabetic.includes(upperMessage[i])) {
        const alphabeticIndex = (this.alphabetic.indexOf(upperMessage[i]) - this.alphabetic.indexOf(extendedKey[i])) % this.alphabetic.length;
        const indexForPush = (alphabeticIndex < 0) ? (this.alphabetic.length - Math.abs(alphabeticIndex)) : alphabeticIndex;

        this.result.push(this.alphabetic[indexForPush]);
      } else {
        const splittedKey = extendedKey.split('');
        splittedKey.splice(i, 0, upperMessage[i]);
        extendedKey = splittedKey.join('');
        this.result.push(upperMessage[i]);
      }
    }

    encryptedResult = this.isDirect ? this.returnDirectChangedMessage() : this.returnReverseChangedMessage();
    this.result.length = 0;

    return encryptedResult;
  }

  validateIncomingArguments(message, key) {
    if (typeof message === 'undefined' || typeof key === 'undefined') {
      throw new Error('Incorrect arguments!');
    }
  }

  createNewExtendedKey(message, key) {
    const numberOfKeyRepetition = Math.ceil(message.length / key.length);

    return key.repeat(numberOfKeyRepetition).slice(0, message.length).toUpperCase();
  }

  returnDirectChangedMessage() {
    return this.result.join('');
  }

  returnReverseChangedMessage() {
    return this.result.reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
