import { BADGE_RULES, EVENT_RULES, BADGE } from "../constants/eventRules.js";
import { MENU } from "../constants/menu.js";
import DiscountService from "../services/DiscountService.js";

export default class EventPlanner {
  constructor(date, order) {
    this.date = date;
    this.order = order;
    this.discountService = new DiscountService(date, order);
    this.discounts = this.discountService.calculateDiscounts();
    this.gift = this.#determineGift();
  }

  #determineGift() {
    return this.order.getTotalAmount() >= EVENT_RULES.GIFT_THRESHOLD
      ? EVENT_RULES.GIFT_MENU
      : null;
  }

  getTotalBenefitAmount() {
    const discountSum = Object.values(this.discounts).reduce(
      (sum, discount) => sum + discount,
      0
    );
    const giftAmount = this.gift ? MENU.drink[this.gift] : 0;
    return discountSum + giftAmount;
  }

  getFinalAmount() {
    const discountSum = Object.values(this.discounts).reduce(
      (sum, discount) => sum + discount,
      0
    );
    return this.order.getTotalAmount() - discountSum;
  }

  getBadge() {
    const totalBenefit = this.getTotalBenefitAmount();
    if (totalBenefit >= BADGE_RULES.SANTA) return BADGE.SANTA;
    if (totalBenefit >= BADGE_RULES.TREE) return BADGE.TREE;
    if (totalBenefit >= BADGE_RULES.STAR) return BADGE.STAR;
    return BADGE.ZERO;
  }
}
