import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "./constants/messages.js";

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(INPUT_MESSAGES.VISIT_DATE);
    return input;
  },
  // ...
};
export default InputView;
