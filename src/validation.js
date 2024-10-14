import { ERROR_MESSAGES } from "./constants/messages.js";
import { MENU } from "./constants/menu.js";

const Validation = {
  /**
   * 입력받은 날짜가 유효한지 검사합니다.
   * @param {string} input - 입력받은 날짜
   */
  date(input) {
    if (isNaN(input)) throw new Error(ERROR_MESSAGES.INVALID_DATE);
    if (input < 1 || input > 31) throw new Error(ERROR_MESSAGES.INVALID_DATE);
  },

  /**
   * 입력받은 주문 메뉴가 유효한지 검사합니다.
   * @param {string[]} input - 입력받은 주문 메뉴 목록
   */
  menus(input) {
    const menuSet = new Set();
    const baverages = MENU.BEVERAGE.map((item) => item.NAME);
    let menuCount = 0;

    for (const menu of input) {
      const [dish, count] = menu.split("-");
      this.menuValid(dish, count);
      menuSet.add(dish);
      menuCount += Number(count);
    }

    if (input.length !== menuSet.size) throw new Error(ERROR_MESSAGES.INVALID_MENU);

    if ([...menuSet].every((dish) => baverages.includes(dish)))
      throw new Error(ERROR_MESSAGES.INVALID_MENU);

    if (menuCount > 20) throw new Error(ERROR_MESSAGES.INVALID_MENU);
  },

  menuValid(dish, count) {
    if (!dish || !count) throw new Error(ERROR_MESSAGES.INVALID_MENU);
    if (count < 1) throw new Error(ERROR_MESSAGES.INVALID_MENU);

    const allDishes = Object.values(MENU).flatMap((category) => category.map((item) => item.NAME));
    if (!allDishes.includes(dish)) throw new Error(ERROR_MESSAGES.INVALID_MENU);
  },
};

export default Validation;
