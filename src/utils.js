import {
  MENUS,
  BENEFIT_PRICE,
  DECEMBER,
  WEEKENDS,
  SPECIAL_DAYS,
  DESSERTS,
  MAIN_MENUS,
  BADGES,
  NOTHING_MESSAGE,
} from "./constants/index.js";

export const getOriginalOrderPrice = (orderMenus) => {
  return orderMenus.reduce((acc, { menu, count }) => acc + MENUS[menu] * count, 0);
};

export const isGiftEventTarget = (originalPrice) => {
  return originalPrice >= BENEFIT_PRICE.GIFT;
};

export const getChristmasEventDiscount = (visitDate) => {
  if (visitDate > DECEMBER.CHRISTMAS) {
    return 0;
  }

  return (visitDate - 1) * BENEFIT_PRICE.HUNDRED + BENEFIT_PRICE.THOUSAND;
};

export const isWeekend = (visitDate) => {
  return WEEKENDS.includes(visitDate);
};

export const getCategoryMenuCount = (categoryMenu, orderMenu) => {
  return orderMenu.reduce((acc, { menu, count }) => {
    if (categoryMenu.includes(menu)) {
      return acc + count;
    }

    return acc;
  }, 0);
};

export const isSpecialEventDay = (visitDate) => {
  return SPECIAL_DAYS.includes(visitDate);
};

export const getDayEventDiscount = (isWeekend, orderMenus) => {
  if (isWeekend) {
    const mainMenuCount = getCategoryMenuCount(MAIN_MENUS, orderMenus);
    return mainMenuCount * BENEFIT_PRICE.YEAR;
  }

  const dessertMenuCount = getCategoryMenuCount(DESSERTS, orderMenus);
  return dessertMenuCount * BENEFIT_PRICE.YEAR;
};

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

export const getTotalPrice = (originalPrice, discountPrice) => {
  return originalPrice - discountPrice;
};

export const getBadge = (discountPrice) => {
  if (discountPrice >= BENEFIT_PRICE.TWENTY_THOUSAND) {
    return BADGES.SANTA;
  }

  if (discountPrice >= BENEFIT_PRICE.TEN_THOUSAND) {
    return BADGES.TREE;
  }

  if (discountPrice >= BENEFIT_PRICE.FIVE_THOUSAND) {
    return BADGES.STAR;
  }

  return NOTHING_MESSAGE;
};
