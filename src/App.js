import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import Validation from "./validation.js";
import OutputView from "./OutputView.js";
import { MENU } from "./constants/menu.js";

class App {
  #date;
  #menusMap;
  #totalAmount = 0;

  async run() {
    await this.#getDate();
    await this.#getMenus();
    OutputView.printDate(this.#date);
    OutputView.printMenu(this.#menusMap);
    this.#getTotalAmount();
    OutputView.printTotalAmount(this.#totalAmount);
    OutputView.printOffer(this.#getOffer());
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

  #getTotalAmount() {
    const allMenuPrice = {};
    Object.values(MENU).forEach((category) =>
      Object.entries(category).forEach(([_i, { name, price }]) => (allMenuPrice[name] = price))
    );

    this.#menusMap.forEach((count, dish) => {
      this.#totalAmount += allMenuPrice[dish] * count;
    });
  }

  #getOffer() {
    if (this.#totalAmount >= 120000) return true;
    return false;
  }
}

export default App;
