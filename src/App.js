import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import Validation from "./validation.js";
import OutputView from "./OutputView.js";
import { MENU } from "./constants/menu.js";
import { EVENT, EVENT_DAYS, OFFER_MENU } from "./constants/event.js";

class App {
  /** 방문 예정 날짜 @type {number} */
  #date;
  /** 주문 메뉴 @type {Map<string, string>} */
  #menusMap;

  #totalAmount = 0;
  #discount = { christmas: 0, weekdays: 0, weekends: 0, special: false, isOffer: false };
  #totalDiscountAmount = 0;
  #finalAmount = 0;

  async run() {
    this.#date = await this.#getDate();
    this.#menusMap = new Map(await this.#getMenus());
    OutputView.printDate(this.#date);
    OutputView.printMenu(this.#menusMap);
    this.#totalAmount = this.#calculateTotalAmount();
    OutputView.printTotalAmount(this.#totalAmount);
    this.#discount.isOffer = this.#isOffer();
    OutputView.printOffer(this.#discount.isOffer);
    this.#getDiscount();
    OutputView.printDiscount(this.#discount);
    this.#totalDiscountAmount = this.#calculateTotalDiscountAmount();
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

  /** 주문 받은 메뉴를 기반으로 할인 전 총 주문금액을 구합니다. */
  #calculateTotalAmount() {
    const allMenuPrice = {};
    Object.values(MENU).forEach((category) =>
      Object.entries(category).forEach(([_i, { name, price }]) => (allMenuPrice[name] = price))
    );

    let totalAmount = 0;
    this.#menusMap.forEach((count, dish) => {
      totalAmount += allMenuPrice[dish] * count;
    });
    return totalAmount;
  }

  /**
   * 증정 이벤트 여부를 구합니다.
   * @returns {boolean}
   */
  #isOffer() {
    if (this.#totalAmount >= OFFER_MENU.applyPoint) return true;
    return false;
  }

  /** 적용될 할인 혜택을 구하고 this.#discount 객체에 담습니다. */
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

  /**
   * 평일/주말 이벤트의 경우, 몇개의 메뉴가 할인 적용에 해당하는지 구합니다.
   * @returns {number}
   */
  #calculateWeekDiscount(targetMenus) {
    let count = 0;
    for (const [dish, num] of this.#menusMap.entries()) {
      if (targetMenus.includes(dish)) count += num;
    }
    return count;
  }

  /**
   * 최종 할인 혜택 금액을 구합니다.
   * @returns {number}
   */
  #calculateTotalDiscountAmount() {
    let total = this.#discount.christmas + this.#discount.weekdays + this.#discount.weekends;
    if (this.#discount.special) total += EVENT.SPECIAL.calculate;
    if (this.#discount.isOffer) total += OFFER_MENU.price;
    return total;
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
