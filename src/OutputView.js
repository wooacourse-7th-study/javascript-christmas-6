import { Console } from "@woowacourse/mission-utils";
import {
  INFORMATION_MESSAGE,
  NOTHING_MESSAGE,
  TITLE_MESSAGE,
  ONE_CHAMPAGNE,
  BENEFIT_MESSAGE,
  BENEFIT_PRICE,
  MENUS,
} from "./constants/index.js";

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
  printBenefit(christmasDiscount, isWeekend, dayDiscount, isGiftEvent, isSpecialDate) {
    Console.print(TITLE_MESSAGE.BENEFIT);
    const isNothing = !christmasDiscount && !dayDiscount && !isGiftEvent && !isSpecialDate;

    if (isNothing) {
      Console.print(NOTHING_MESSAGE);
      return;
    }

    if (christmasDiscount) {
      Console.print(`${BENEFIT_MESSAGE.CHRISTMAS} -${christmasDiscount.toLocaleString()}원`);
    }

    if (dayDiscount) {
      Console.print(
        `${isWeekend ? BENEFIT_MESSAGE.WEEKEND : BENEFIT_MESSAGE.WEEKDAYS} -${dayDiscount.toLocaleString()}원`
      );
    }

    if (isGiftEvent) {
      Console.print(`${BENEFIT_MESSAGE.GIFT} -${BENEFIT_PRICE.GIFT.toLocaleString()}원`);
    }

    if (isSpecialDate) {
      Console.print(`${BENEFIT_MESSAGE.SPECIAL} -${BENEFIT_PRICE.THOUSAND.toLocaleString()}원`);
    }
  },
  printBadge(badge) {
    Console.print(TITLE_MESSAGE.EVENT_BADGE);
    Console.print(badge);
  },
});

export default OutputView;
