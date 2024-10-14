import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "./constants/messages.js";
import { OFFER_MENU, EVENT_BADGE, DISCOUNT } from "./constants/event.js";

const OutputView = {
  /** 이벤트 시작 문구를 출력합니다. */
  printWelcome() {
    Console.print(OUTPUT_MESSAGES.WELCOME);
  },
  /**
   * 주문한 메뉴를 출력합니다.
   * @param {Map([string, string])} menuMap
   */
  printMenu(menuMap) {
    Console.print(OUTPUT_MESSAGES.MENU);
    menuMap.forEach((count, dish) => {
      Console.print(`${dish} ${count}개`);
    });
  },

  /**
   * 방문 예정 날짜와 혜택 미리보기! 문구를 출력합니다.
   * @param {number} date
   */
  printDate(date) {
    Console.print(OUTPUT_MESSAGES.DATE(date));
  },

  /**
   * 총 주문 금액을 출력합니다.
   * @param {number} amount
   */
  printTotalAmount(amount) {
    Console.print(OUTPUT_MESSAGES.TOTAL_BEFORE_EVENT);
    Console.print(`${amount.toLocaleString()}원`);
  },

  /**
   * 증정 메뉴 제공 여부에 따라 결과를 출력합니다.
   * @param {boolean} isOffer
   */
  printOffer(isOffer) {
    Console.print(OUTPUT_MESSAGES.EVENT_OFFER);
    if (isOffer) Console.print(OFFER_MENU.STRING);
    else Console.print("없음");
  },

  /**
   * 할인 내역을 출력합니다.
   * @param {Object} discount
   */
  printDiscount(discount) {
    Console.print(OUTPUT_MESSAGES.BENEFIT);

    if (
      (!discount.christmas || discount.christmas === 0) &&
      (!discount.week.weekdays || discount.week.weekdays === 0) &&
      (!discount.week.weekends || discount.week.weekends === 0) &&
      !discount.special &&
      !discount.isOffer
    ) {
      Console.print("없음");
      return;
    }

    if (discount.christmas && discount.christmas !== 0)
      Console.print(DISCOUNT.CHRISTMAS.STRING(discount.christmas));

    if (discount.week.weekdays && discount.week.weekdays !== 0)
      Console.print(DISCOUNT.WEEKDAYS.STRING(discount.week.weekdays));

    if (discount.week.weekends && discount.week.weekends !== 0)
      Console.print(DISCOUNT.WEEKENDS.STRING(discount.week.weekends));

    if (discount.special) Console.print(DISCOUNT.SPECIAL.STRING);

    if (discount.isOffer) Console.print(DISCOUNT.OFFER.STRING);
  },

  /**
   * 총 할인 금액을 출력합니다.
   * @param {number} amount
   */
  printTotalDiscountAmount(amount) {
    Console.print(OUTPUT_MESSAGES.TOTAL_BENEFIT);
    Console.print(`${amount.toLocaleString()}원`);
  },

  /**
   * 할인 후 예상 금액을 출력합니다.
   * @param {number} amount
   */
  printFinalAmount(amount) {
    Console.print(OUTPUT_MESSAGES.TOTAL_AFTER_EVENT);
    Console.print(`${amount.toLocaleString()}원`);
  },

  printEventBadge(totalDiscountAmount) {
    Console.print(OUTPUT_MESSAGES.EVENT_BADGE);
    if (totalDiscountAmount >= EVENT_BADGE.SANTA.AMOUNT) Console.print(EVENT_BADGE.SANTA.NAME);
    else if (totalDiscountAmount >= EVENT_BADGE.TREE.AMOUNT) Console.print(EVENT_BADGE.TREE.NAME);
    else if (totalDiscountAmount >= EVENT_BADGE.STAR.AMOUNT) Console.print(EVENT_BADGE.STAR.NAME);
    else Console.print("없음");
  },
};

export default OutputView;
