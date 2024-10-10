export const EVENT_RULES = Object.freeze({
  MINIMUM_ORDER_AMOUNT: 10000,
  GIFT_THRESHOLD: 120000,
  GIFT_MENU: "샴페인",
  MAX_MENU_COUNT: 20,
});

export const DISCOUNT_RULES = Object.freeze({
  CHRISTMAS_D_DAY: {
    START_DATE: 1,
    END_DATE: 25,
    INITIAL_DISCOUNT: 1000,
    DAILY_INCREASE: 100,
  },
  WEEKDAY: {
    DISCOUNT_AMOUNT: 2023,
    APPLICABLE_CATEGORY: "dessert",
  },
  WEEKEND: {
    DISCOUNT_AMOUNT: 2023,
    APPLICABLE_CATEGORY: "main",
  },
  SPECIAL: {
    DISCOUNT_AMOUNT: 1000,
    DATES: [3, 10, 17, 24, 25, 31],
  },
});

export const BADGE_RULES = Object.freeze({
  STAR: 5000,
  TREE: 10000,
  SANTA: 20000,
});

export const BADGE = Object.freeze({
  ZERO: "없음",
  SANTA: "산타",
  TREE: "트리",
  STAR: "별",
});

export const DISCOUNT = Object.freeze({
  CHRISTMAS: "크리스마스 디데이 할인",
  WEEKDAY: "평일 할인",
  WEEKEND: "주말 할인",
  SPECIAL: "특별 할인",
});
