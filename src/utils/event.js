import { BENEFIT_PRICE, WEEKENDS, SPECIAL_DAYS, BADGES, NOTHING_MESSAGE } from "../constants/index.js";

// 증정 이벤트 대상 여부
export const isGiftEventTarget = (originalPrice) => {
  return originalPrice >= BENEFIT_PRICE.GIFT;
};

// 주말 여부
export const isWeekend = (visitDate) => {
  return WEEKENDS.includes(visitDate);
};

// 카테고리 메뉴 카운트
export const getCategoryMenuCount = (categoryMenu, orderMenu) => {
  return orderMenu.reduce((acc, { menu, count }) => {
    if (categoryMenu.includes(menu)) {
      return acc + count;
    }

    return acc;
  }, 0);
};

// 특별 할인 대상 여부
export const isSpecialEventDay = (visitDate) => {
  return SPECIAL_DAYS.includes(visitDate);
};

// 이벤트 배지
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
