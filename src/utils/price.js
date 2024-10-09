import { MENUS } from "../constants/index.js";

// 할인 전 가격 금액
export const getOriginalOrderPrice = (orderMenus) => {
  return orderMenus.reduce((acc, { menu, count }) => acc + MENUS[menu] * count, 0);
};

// 최종 결제 금액
export const getTotalPrice = (originalPrice, discountPrice) => {
  return originalPrice - discountPrice;
};
