import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import Validation from "./validation.js";
import OutputView from "./OutputView.js";
import {
  calculateMenuTotalAmount,
  calculateChrismasDiscount,
  isOffer,
  calculateWeekDiscount,
  isSpecial,
  calculateTotalDiscountAmount,
} from "./menuUtils.js";

class App {
  /** 방문 예정 날짜 @type {number} */
  #date;
  /** 주문 메뉴 @type {Map<string, string>} */
  #menusMap;

  #totalAmount = 0;
  #discount = { christmas: 0, week: { weekends: 0, weekdays: 0 }, special: false, isOffer: false };
  #totalDiscountAmount = 0;
  #finalAmount = 0;

  async run() {
    OutputView.printWelcome();
    this.#date = await this.#getDate();
    this.#menusMap = new Map(await this.#getMenus());
    OutputView.printDate(this.#date);
    OutputView.printMenu(this.#menusMap);

    this.#totalAmount = calculateMenuTotalAmount(this.#menusMap);
    OutputView.printTotalAmount(this.#totalAmount);

    this.#discount.isOffer = isOffer(this.#totalAmount);
    OutputView.printOffer(this.#discount.isOffer);

    this.#discount.christmas = calculateChrismasDiscount(this.#date);
    this.#discount.week = calculateWeekDiscount(this.#date, this.#menusMap);
    this.#discount.special = isSpecial(this.#date);
    OutputView.printDiscount(this.#discount);

    this.#totalDiscountAmount = calculateTotalDiscountAmount(this.#discount);
    OutputView.printTotalDiscountAmount(this.#totalDiscountAmount);

    this.#finalAmount = this.#calculateFinalAmount();
    OutputView.printFinalAmount(this.#finalAmount);
    OutputView.printEventBadge(this.#totalDiscountAmount);
  }

  /** 날짜를 입력받고 this.#date에 날짜를 number형으로 저장합니다. */
  async #getDate() {
    try {
      const date = await InputView.readDate();
      Validation.date(date);
      return Number(date);
    } catch (error) {
      Console.print(error.message);
      await this.#getDate();
    }
  }

  /** 주문할 메뉴를 입력받고 this.#menusMap에 메뉴를 Map<메뉴, 개수> 형식으로 저장합니다. */
  async #getMenus() {
    try {
      const menus = await InputView.readMenus();
      Validation.menus(menus);
      return menus.map((menu) => menu.split("-"));
    } catch (error) {
      Console.print(error.message);
      await this.#getMenus();
    }
  }

  /**
   * 할인 혜택이 적용되었을 때 최종 금액을 구합니다.
   * @returns {number}
   */
  #calculateFinalAmount() {
    return this.#totalAmount - this.#totalDiscountAmount;
  }
}

export default App;
