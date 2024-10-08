import { Console } from "@woowacourse/mission-utils";
import { INFORMATION_MESSAGE, TITLE_MESSAGE } from "./constants/index.js";

const OutputView = Object.freeze({
  // 기본 안내 메시지
  greetingMessage() {
    Console.print(INFORMATION_MESSAGE.GREETING);
  },

  eventMessage() {
    Console.print(INFORMATION_MESSAGE.EVENT);
  },

  printMenus(orderMenu) {
    Console.print(TITLE_MESSAGE.MENU);
    Console.print(orderMenu.map(({ menu, count }) => `${menu} ${count}개`).join("\n"));
  },

  printPrice(title, price) {
    Console.print(title);
    Console.print(`${price.toLocaleString()}원`);
  },
});

export default OutputView;
