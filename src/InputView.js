import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGE, ERROR_MESSAGE } from "./constants/index.js";
import { isVisitDateValidate, isOrderValidate } from "./validate.js";

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

  async getOrderInput() {
    while (true) {
      try {
        const input = await Console.readLineAsync(INPUT_MESSAGE.MENU);
        const orderMenus = input.split(",");

        if (isOrderValidate(orderMenus)) {
          throw new Error(ERROR_MESSAGE.INVALID_ORDER);
        }

        const totalMenus = orderMenus.map((orderMenu) => {
          const [menu, count] = orderMenu.split("-");
          return { menu, count: Number(count) };
        });
        return totalMenus;
      } catch (error) {
        Console.print(error.message);
      }
    }
  },
});

export default InputView;
