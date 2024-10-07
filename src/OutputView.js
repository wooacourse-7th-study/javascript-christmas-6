import { Console } from "@woowacourse/mission-utils";
import { INFORMATION_MESSAGE } from "./constants/index.js";

const OutputView = Object.freeze({
  // 기본 안내 메시지
  greetingMessage() {
    Console.print(INFORMATION_MESSAGE.GREETING);
  },

  eventMessage() {
    Console.print(INFORMATION_MESSAGE.EVENT);
  },
});

export default OutputView;
