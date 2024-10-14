import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "./constants/messages.js";

const InputView = {
  /**
   * 방문 예정 날짜를 구합니다.
   * @returns {string}
   */
  async readDate() {
    return await Console.readLineAsync(INPUT_MESSAGES.VISIT_DATE);
  },

  /**
   * 주문할 메뉴를 입력받습니다.
   * @returns {string[]}
   */
  async readMenus() {
    const input = await Console.readLineAsync(INPUT_MESSAGES.MENU);
    return input.split(",");
  },
};
export default InputView;
