import {
  DISCOUNT_RULES,
  EVENT_RULES,
  DISCOUNT,
} from "../constants/eventRules.js";
import { isWeekend, isSpecialDay } from "../utils/dateUtils.js";

export default class DiscountService {
  constructor(date, order) {
    this.date = date;
    this.order = order;
  }

  calculateDiscounts() {
    const discounts = {};
    const totalAmount = this.order.getTotalAmount();

    if (totalAmount < EVENT_RULES.MINIMUM_ORDER_AMOUNT) {
      return discounts;
    }

    this.applyChristmasDiscount(discounts);
    this.applyWeekdayOrWeekendDiscount(discounts);
    this.applySpecialDiscount(discounts);

    return discounts;
  }

  applyChristmasDiscount(discounts) {
    const { START_DATE, END_DATE, INITIAL_DISCOUNT, DAILY_INCREASE } =
      DISCOUNT_RULES.CHRISTMAS_D_DAY;

    if (this.date >= START_DATE && this.date <= END_DATE) {
      const discount = INITIAL_DISCOUNT + (this.date - 1) * DAILY_INCREASE;
      discounts[DISCOUNT.CHRISTMAS] = discount;
    }
  }

  applyWeekdayOrWeekendDiscount(discounts) {
    const rule = isWeekend(this.date)
      ? DISCOUNT_RULES.WEEKEND
      : DISCOUNT_RULES.WEEKDAY;

    const count = this.order.getItemCountByCategory(rule.APPLICABLE_CATEGORY);

    if (count > 0) {
      const discount = count * rule.DISCOUNT_AMOUNT;
      discounts[isWeekend(this.date) ? DISCOUNT.WEEKDAY : DISCOUNT.WEEKDAY] =
        discount;
    }
  }

  applySpecialDiscount(discounts) {
    if (isSpecialDay(this.date)) {
      discounts[DISCOUNT.SPECIAL] = DISCOUNT_RULES.SPECIAL.DISCOUNT_AMOUNT;
    }
  }
}
