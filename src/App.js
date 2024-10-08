import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import Validation from "./validation.js";
import OutputView from "./OutputView.js";

class App {
  #date;
  #menusMap;

  async run() {
    await this.#getDate();
    await this.#getMenus();
    OutputView.printDate(this.#date);
    OutputView.printMenu(this.#menusMap);
  }

  async #getDate() {
    try {
      const date = await InputView.readDate();
      Validation.date(date);
      this.#date = Number(date);
    } catch (error) {
      Console.print(error.message);
      await this.#getDate();
    }
  }

  async #getMenus() {
    try {
      const menus = await InputView.readMenus();
      Validation.menus(menus);
      this.#menusMap = new Map(menus.map((menu) => menu.split("-")));
    } catch (error) {
      Console.print(error.message);
      await this.#getMenus();
    }
  }
}

export default App;
