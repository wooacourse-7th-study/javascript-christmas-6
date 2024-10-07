import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    OutputView.greetingMessage();
    const visitDate = await InputView.getVisitDateInput();
    const orderMenus = await InputView.getOrderInput();
    OutputView.eventMessage();
  }
}

export default App;
