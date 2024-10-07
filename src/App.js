import InputView from "./InputView.js";

class App {
  async run() {
    const visitDate = await InputView.getVisitDateInput();
  }
}

export default App;
