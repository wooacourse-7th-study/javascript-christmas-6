import { MENUS, MAIN_MENUS, DESSERTS, BENEFIT_PRICE, DECEMBER } from "../constants/index.js";
import { getCategoryMenuCount } from "./event.js";

// 할인 전 가격 금액
export const getOriginalOrderPrice = (orderMenus) => {
  return orderMenus.reduce((acc, { menu, count }) => acc + MENUS[menu] * count, 0);
};

// 크리스마스 디데이 할인 금액
export const getChristmasEventDiscount = (visitDate) => {
  if (visitDate > DECEMBER.CHRISTMAS) {
    return 0;
  }

  return (visitDate - 1) * BENEFIT_PRICE.HUNDRED + BENEFIT_PRICE.THOUSAND;
};

// 평일, 주말 할인 금액
export const getDayEventDiscount = (isWeekend, orderMenus) => {
  if (isWeekend) {
    const mainMenuCount = getCategoryMenuCount(MAIN_MENUS, orderMenus);
    return mainMenuCount * BENEFIT_PRICE.YEAR;
  }

  const dessertMenuCount = getCategoryMenuCount(DESSERTS, orderMenus);
  return dessertMenuCount * BENEFIT_PRICE.YEAR;
};

// 총 할인 금액
export const getDiscountPrice = (christmasDiscount, dayDiscount, isGiftEvent, isSpecialDate) => {
  let discountPrice = 0;
  discountPrice += christmasDiscount;
  discountPrice += dayDiscount;

  if (isGiftEvent) {
    discountPrice += BENEFIT_PRICE.GIFT;
  }

  if (isSpecialDate) {
    discountPrice += BENEFIT_PRICE.THOUSAND;
  }

  return discountPrice;
};

// 최종 결제 금액
export const getTotalPrice = (originalPrice, discountPrice) => {
  return originalPrice - discountPrice;
};
