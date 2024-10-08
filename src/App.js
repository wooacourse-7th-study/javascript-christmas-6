import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import Validation from "./validation.js";
import OutputView from "./OutputView.js";
import { MENU } from "./constants/menu.js";
import { EVENT, EVENT_DAYS, OFFER_MENU } from "./constants/event.js";

class App {
  #date;
  #menusMap;
  #totalAmount = 0;
  #discount = { christmas: 0, weekdays: 0, weekends: 0, special: false };
  #totalDiscountAmount = 0;
  #finalAmount = 0;

  async run() {
    await this.#getDate();
    await this.#getMenus();
    OutputView.printDate(this.#date);
    OutputView.printMenu(this.#menusMap);
    this.#getTotalAmount();
    OutputView.printTotalAmount(this.#totalAmount);
    OutputView.printOffer(this.#getOffer());
    this.#getDiscount();
    OutputView.printDiscount(this.#discount, this.#getOffer());
    this.#totalDiscountAmount = this.#calculateTotalDiscountAmount();
    OutputView.printTotalDiscountAmount(this.#totalDiscountAmount);
    this.#finalAmount = this.#calculateFinalAmount();
    OutputView.printFinalAmount(this.#finalAmount);
    OutputView.printEventBadge(this.#totalDiscountAmount);
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

  #getDiscount() {
    if (this.#discount <= EVENT_DAYS.CHRISTMAS) {
      this.#discount.christmas = EVENT.CHRISTMAS.calculate(this.#date);
    }

    if (EVENT_DAYS.WEEKENDS.includes(this.#date)) {
      const mains = MENU.main.map((item) => item.name);
      const count = this.#calculateWeekDiscount(mains);
      this.#discount.weekends = EVENT.WEEKENDS.calculate(count);
    } else {
      const desserts = MENU.dessert.map((item) => item.name);
      const count = this.#calculateWeekDiscount(desserts);
      this.#discount.weekdays = EVENT.WEEKDAYS.calculate(count);
      if (EVENT_DAYS.SPECIAL.includes(this.#date)) this.#discount.special = true;
    }
  }

  #calculateWeekDiscount(targetMenus) {
    let count = 0;
    for (const [dish, num] of this.#menusMap.entries()) {
      if (targetMenus.includes(dish)) count += num;
    }
    return count;
  }

  #calculateTotalDiscountAmount() {
    let total = this.#discount.christmas + this.#discount.weekdays + this.#discount.weekends;
    if (this.#discount.special) total += EVENT.SPECIAL.calculate;
    if (this.#getOffer()) total += OFFER_MENU.price;
    return total;
  }

  #calculateFinalAmount() {
    return this.#totalAmount - this.#totalDiscountAmount;
  }
}

export default App;
