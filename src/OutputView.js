import { Console } from "@woowacourse/mission-utils";
import { INFORMATION_MESSAGE, NOTHING_MESSAGE, TITLE_MESSAGE, ONE_CHAMPAGNE } from "./constants/index.js";

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

  printGiftEvent(isGiftEvent) {
    Console.print(TITLE_MESSAGE.GIFT);

    if (isGiftEvent) {
      Console.print(ONE_CHAMPAGNE);
      return;
    }

    Console.print(NOTHING_MESSAGE);
  },
  printBenefit(benefitDiscounts) {
    Console.print(TITLE_MESSAGE.BENEFIT);

    const benefits = Object.entries(benefitDiscounts).filter(([, discount]) => discount !== 0);
    if (benefits.length === 0) {
      Console.print(NOTHING_MESSAGE);
      return;
    }

    benefits.forEach(([benefit, discount]) => {
      Console.print(`${benefit} -${discount.toLocaleString()}원`);
    });
  },
  printBadge(badge) {
    Console.print(TITLE_MESSAGE.EVENT_BADGE);
    Console.print(badge);
  },
});

export default OutputView;
