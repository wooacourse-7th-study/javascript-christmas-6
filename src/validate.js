import { DECEMBER, MENUS, MAX_MENU_COUNT, DRINKS } from "./constants/index.js";

export const isVisitDateValidate = (visitDate) => {
  return DECEMBER.FIRST > visitDate || DECEMBER.LAST < visitDate;
};

const isLessThanOne = (number) => {
  return number < 1;
};

const isOverMaxCount = (number) => {
  return number > MAX_MENU_COUNT;
};

export const isOrderValidate = (orderMenus) => {
  const checkDuplicateMenu = {};

  for (const orderMenu of orderMenus) {
    const [menu, count] = orderMenu.split("-");
    // 주문 개수가 1보다 작은 경우
    if (isLessThanOne(count)) {
      return true;
    }

    // 중복된 메뉴가 있는 경우
    if (checkDuplicateMenu[menu]) {
      return true;
    }

    // 메뉴가 없는 경우
    if (!MENUS[menu]) {
      return true;
    }

    checkDuplicateMenu[menu] = count;
  }

  // 음료만 있는 경우
  const totalOrderMenus = Object.keys(checkDuplicateMenu);
  const isOnlyDrink = totalOrderMenus.every((menu) => DRINKS.includes(menu));
  if (isOnlyDrink) {
    return true;
  }

  // 주문 개수가 20개를 넘는 경우
  const totalOrderCount = Object.values(checkDuplicateMenu).reduce((acc, cur) => acc + Number(cur), 0);
  if (isOverMaxCount(totalOrderCount)) {
    return true;
  }

  return false;
};
