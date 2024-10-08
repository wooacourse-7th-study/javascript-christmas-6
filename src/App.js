import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import { getOriginalOrderPrice, isGiftEventTarget } from "./utils.js";
import { TITLE_MESSAGE } from "./constants/index.js";

class App {
  async run() {
    // 인사 메세지
    OutputView.greetingMessage();

    // 날짜 입력 받기
    const visitDate = await InputView.getVisitDateInput();

    // 메뉴 입력 받기
    const orderMenus = await InputView.getOrderInput();

    // 이벤트 메세지
    OutputView.eventMessage();

    // 주문 메뉴 출력
    OutputView.printMenus(orderMenus);

    //할인 전 가격 출력
    const originalPrice = getOriginalOrderPrice(orderMenus);
    OutputView.printPrice(TITLE_MESSAGE.ORIGINAL_PRICE, originalPrice);

    // 증정 메뉴 출력
    const isGiftEvent = isGiftEventTarget(originalPrice);
    OutputView.printGiftEvent(isGiftEvent);
  }
}

export default App;
