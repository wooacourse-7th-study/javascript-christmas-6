import { MENUS, BENEFIT_PRICE } from "./constants/index.js";

export const getOriginalOrderPrice = (orderMenu) => {
  return orderMenu.reduce((acc, { menu, count }) => acc + MENUS[menu] * count, 0);
};

export const isGiftEventTarget = (originalPrice) => {
  return originalPrice >= BENEFIT_PRICE.GIFT;
};
