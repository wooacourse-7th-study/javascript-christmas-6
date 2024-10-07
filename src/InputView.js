import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGE, ERROR_MESSAGE } from "./constants/index.js";
import { isVisitDateValidate } from "./validate.js";

const InputView = Object.freeze({
  async getVisitDateInput() {
    while (true) {
      try {
        const input = await Console.readLineAsync(INPUT_MESSAGE.DATE);
        const visitDate = Number(input);

        if (isVisitDateValidate(visitDate)) {
          throw new Error(ERROR_MESSAGE.INVALID_DATE);
        }

        return visitDate;
      } catch (error) {
        Console.print(error.message);
      }
    }
  },
});

export default InputView;
