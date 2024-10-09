import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGE, ERROR_MESSAGE } from "./constants/index.js";
import { isVisitDateValidate, isOrderValidate, isNumberValidate } from "./utils/index.js";

const InputView = Object.freeze({
  async getVisitDateInput() {
    while (true) {
      try {
        const input = await Console.readLineAsync(INPUT_MESSAGE.DATE);
        const visitDate = Number(input);

        if (isNumberValidate(visitDate)) {
          throw new Error(ERROR_MESSAGE.INVALID_DATE);
        }

        if (isVisitDateValidate(visitDate)) {
          throw new Error(ERROR_MESSAGE.INVALID_DATE);
        }

        return visitDate;
      } catch (error) {
        Console.print(error.message);
      }
    }
  },

  async getOrderInput() {
    while (true) {
      try {
        const input = await Console.readLineAsync(INPUT_MESSAGE.MENU);
        const orderMenus = input.split(",");

        if (isOrderValidate(orderMenus)) {
          throw new Error(ERROR_MESSAGE.INVALID_ORDER);
        }

        return orderMenus.map((orderMenu) => {
          const [menu, count] = orderMenu.split("-");
          return { menu, count: Number(count) };
        });
      } catch (error) {
        Console.print(error.message);
      }
    }
  },
});

export default InputView;
