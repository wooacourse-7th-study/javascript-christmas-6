import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    OutputView.greetingMessage();
    const visitDate = await InputView.getVisitDateInput();
    OutputView.eventMessage();
  }
}

export default App;
