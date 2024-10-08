import { MENUS } from "./constants/index.js";

export const getOriginalOrderPrice = (orderMenu) => {
  return orderMenu.reduce((acc, { menu, count }) => acc + MENUS[menu] * count, 0);
};
