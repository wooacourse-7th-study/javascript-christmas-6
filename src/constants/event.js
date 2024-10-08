export const OFFER_MENU = Object.freeze({ string: "샴페인 1개", price: 25000 });

export const EVENT = Object.freeze({
  CHRISTMAS: {
    string: (amount) => `크리스마스 디데이 할인: -${amount.toLocaleString()}원`,
    calculate: (day) => 1000 + (day - 1) * 100,
  },
  WEEKDAYS: {
    string: (amount) => `평일 할인: -${amount.toLocaleString()}원`,
    calculate: (count) => 2023 * count,
  },
  WEEKENDS: {
    string: (amount) => `주말 할인: -${amount.toLocaleString()}원`,
    calculate: (count) => 2023 * count,
  },
  SPECIAL: { string: `특별 할인: -1,000원`, calculate: 1000 },
  OFFER: {
    string: `증정 이벤트: -${OFFER_MENU.price.toLocaleString()}원`,
    calculate: OFFER_MENU.price,
  },
});

export const EVENT_BADGE = Object.freeze({
  star: { name: "별", amount: 5000 },
  tree: { name: "트리", amount: 10000 },
  santa: { name: "산타", amount: 20000 },
});

export const EVENT_DAYS = Object.freeze({
  CHRISTMAS: 25,
  WEEKENDS: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
  SPECIAL: [3, 10, 17, 24, 25, 31],
});
