import { Console } from "@woowacourse/mission-utils";
import { PROMPT_MESSAGES, ERROR_MESSAGES } from "../constants/messages.js";

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(PROMPT_MESSAGES.ASK_DATE);
    const date = parseInt(input);
    if (isNaN(date) || date < 1 || date > 31) {
      throw new Error(ERROR_MESSAGES.INVALID_DATE);
    }
    return date;
  },

  async readOrder() {
    return await Console.readLineAsync(PROMPT_MESSAGES.ASK_MENU);
  },
};

export default InputView;
