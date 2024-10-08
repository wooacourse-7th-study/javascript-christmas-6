import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import Validation from "./validation.js";

class App {
  async run() {
    await this.#getDate();
  }

  async #getDate() {
    try {
      const date = await InputView.readDate();
      Validation.date(date);
      this.date = Number(date);
    } catch (error) {
      Console.print(error.message);
      await this.#getDate();
    }
  }
}

export default App;
