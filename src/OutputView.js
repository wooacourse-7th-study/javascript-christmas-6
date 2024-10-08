import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "./constants/messages.js";
import { OFFER_MENU, EVENT } from "./constants/event.js";

const OutputView = {
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
    if (isOffer) Console.print(OFFER_MENU.string);
    else Console.print("없음");
  },

  /**
   * 할인 내역을 출력합니다.
   * @param {Object} discount
   * @param {boolean} isOffer
   */
  printDiscount(discount, isOffer) {
    let isNoBenefit = true;
    Console.print(OUTPUT_MESSAGES.BENEFIT);
    if (discount.christmas !== 0) {
      Console.print(EVENT.CHRISTMAS.string(discount.christmas));
      isNoBenefit = false;
    }
    if (discount.weekdays !== 0) {
      Console.print(EVENT.WEEKDAYS.string(discount.weekdays));
      isNoBenefit = false;
    }
    if (discount.weekends !== 0) {
      Console.print(EVENT.WEEKENDS.string(discount.weekends));
      isNoBenefit = false;
    }
    if (discount.special) {
      Console.print(EVENT.SPECIAL.string);
      isNoBenefit = false;
    }
    if (isOffer) {
      Console.print(EVENT.OFFER.string);
      isNoBenefit = false;
    }
    if (isNoBenefit) Console.print("없음");
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
    if (totalDiscountAmount < 5000) Console.print("없음");
    else if (totalDiscountAmount < 10000) Console.print("별");
    else if (totalDiscountAmount < 20000) Console.print("산타");
  },
};

export default OutputView;
