import { MENU, MENU_CATEGORIES } from "../constants/menu.js";
import { EVENT_RULES } from "../constants/eventRules.js";
import { ERROR_MESSAGES } from "../constants/messages.js";
import { getMenuCategory } from "../utils/menuUtils.js";

export default class Order {
  constructor(orderItems) {
    this.items = this.#parseOrderItems(orderItems);
    this.#validate();
  }

  #parseOrderItems(orderItems) {
    return orderItems.split(",").map((item) => {
      const [menu, quantity] = item.split("-");
      return { menu: menu.trim(), quantity: parseInt(quantity) };
    });
  }

  #validate() {
    this.#validateMenuExistence();
    this.#validateQuantity();
    this.#validateTotalItems();
    this.#validateDrinkOnlyOrder();
  }

  #validateMenuExistence() {
    const invalidMenu = this.items.find((item) => !getMenuCategory(item.menu));
    if (invalidMenu) {
      throw new Error(ERROR_MESSAGES.INVALID_ORDER);
    }
  }

  #validateQuantity() {
    const invalidQuantity = this.items.find(
      (item) => isNaN(item.quantity) || item.quantity < 1
    );
    if (invalidQuantity) {
      throw new Error(ERROR_MESSAGES.INVALID_ORDER);
    }
  }

  #validateTotalItems() {
    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > EVENT_RULES.MAX_MENU_COUNT) {
      throw new Error(ERROR_MESSAGES.EXCEED_MAX_QUANTITY);
    }
  }

  #validateDrinkOnlyOrder() {
    const hasOnlyDrinks = this.items.every(
      (item) => getMenuCategory(item.menu) === MENU_CATEGORIES.DRINK
    );
    if (hasOnlyDrinks) {
      throw new Error(ERROR_MESSAGES.ONLY_DRINKS);
    }
  }

  getTotalAmount() {
    return this.items.reduce((total, item) => {
      const price = MENU[getMenuCategory(item.menu)][item.menu];
      return total + price * item.quantity;
    }, 0);
  }

  getItemCountByCategory(category) {
    return this.items.reduce((count, item) => {
      if (getMenuCategory(item.menu) === category) {
        return count + item.quantity;
      }
      return count;
    }, 0);
  }
}
