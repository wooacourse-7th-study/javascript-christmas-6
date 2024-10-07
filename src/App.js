import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

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
  }
}

export default App;
