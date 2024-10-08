import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "./constants/messages.js";
import { BENEFIT_MENU } from "./constants/menu.js";

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
    if (isOffer) Console.print(BENEFIT_MENU.string);
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
      Console.print(`크리스마스 디데이 할인: -${discount.christmas.toLocaleString()}원`);
      isNoBenefit = false;
    }
    if (discount.weekdays !== 0) {
      Console.print(`평일 할인: -${discount.weekdays.toLocaleString()}원`);
      isNoBenefit = false;
    }
    if (discount.weekends !== 0) {
      Console.print(`주말 할인: -${discount.weekends.toLocaleString()}원`);
      isNoBenefit = false;
    }
    if (discount.special) {
      Console.print(`특별 할인: -1,000원`);
      isNoBenefit = false;
    }
    if (isOffer) {
      Console.print(`증정 이벤트: -${BENEFIT_MENU.price.toLocaleString()}원`);
      isNoBenefit = false;
    }
    if (isNoBenefit) Console.print("없음");
  },
};

export default OutputView;
