import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "./constants/messages.js";

const OutputView = {
  printMenu() {
    Console.print("<주문 메뉴>");
    // ...
  },

  /**
   * 방문 예정 날짜와 혜택 미리보기! 문구를 출력합니다.
   * @param {number} date
   */
  printDate(date) {
    Console.print(OUTPUT_MESSAGES.DATE(date));
  },
};

export default OutputView;
