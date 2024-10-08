import { ERROR_MESSAGES } from "./constants/messages.js";

const Validation = {
  /**
   * 입력받은 날짜가 유효한지 검사합니다.
   * @param {string} input - 입력받은 날짜
   */
  date(input) {
    if (isNaN(input)) throw new Error(ERROR_MESSAGES.INVALID_DATE);
    if (input < 1 || input > 31) throw new Error(ERROR_MESSAGES.INVALID_DATE);
  },
};

export default Validation;
