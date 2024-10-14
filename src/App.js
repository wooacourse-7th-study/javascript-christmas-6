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
  async run() {
    OutputView.printWelcome();
    const date = await this.#getDate();
    const menusMap = new Map(await this.#getMenus());
    OutputView.printDate(date);
    OutputView.printMenu(menusMap);

    const totalAmount = calculateMenuTotalAmount(menusMap);
    OutputView.printTotalAmount(totalAmount);

    const discount = {};
    discount.isOffer = isOffer(totalAmount);
    OutputView.printOffer(discount.isOffer);

    discount.christmas = calculateChrismasDiscount(date);
    discount.week = calculateWeekDiscount(date, menusMap);
    discount.special = isSpecial(date);
    OutputView.printDiscount(discount);

    const totalDiscountAmount = calculateTotalDiscountAmount(discount);
    OutputView.printTotalDiscountAmount(totalDiscountAmount);

    const finalAmount = this.#calculateFinalAmount(totalAmount, totalDiscountAmount);
    OutputView.printFinalAmount(finalAmount);
    OutputView.printEventBadge(totalDiscountAmount);
  }

  /** 날짜를 입력받고 date에 날짜를 number형으로 저장합니다. */
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

  /** 주문할 메뉴를 입력받고 menusMap에 메뉴를 Map<메뉴, 개수> 형식으로 저장합니다. */
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
  #calculateFinalAmount(totalAmount, totalDiscountAmount) {
    return totalAmount - totalDiscountAmount;
  }
}

export default App;
