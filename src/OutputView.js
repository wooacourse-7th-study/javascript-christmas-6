import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "./constants/messages.js";

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
};

export default OutputView;
