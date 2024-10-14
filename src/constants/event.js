/** 증정 메뉴의 출력 문자열, 가격, 기준값 */
export const OFFER_MENU = Object.freeze({ string: "샴페인 1개", price: 25000, applyPoint: 120000 });

/** 이벤트 종류와 그에 대한 출력 문자열, 할인 금액 */
export const DISCOUNT = {
  CHRISTMAS: {
    STRING: (amount) => `크리스마스 디데이 할인: -${amount.toLocaleString()}원`,
    BASIC_DISCOUNT: 1000,
    ADD: 100,
  },
  WEEKDAYS: {
    STRING: (amount) => `평일 할인: -${amount.toLocaleString()}원`,
    AMOUNT: 2023,
  },
  WEEKENDS: {
    STRING: (amount) => `주말 할인: -${amount.toLocaleString()}원`,
    AMOUNT: 2023,
  },
  SPECIAL: { STRING: `특별 할인: -1,000원`, AMOUNT: 1000 },
  OFFER: {
    STRING: `증정 이벤트: -${OFFER_MENU.price.toLocaleString()}원`,
    AMOUNT: OFFER_MENU.price,
  },
};

/** 이벤트 뱃지 종류와 기준값 */
export const EVENT_BADGE = Object.freeze({
  star: { name: "별", amount: 5000 },
  tree: { name: "트리", amount: 10000 },
  santa: { name: "산타", amount: 20000 },
});

/** 이벤트가 적용되는 날짜 배열 모음 */
export const EVENT_DAYS = Object.freeze({
  CHRISTMAS: 25,
  WEEKENDS: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
  SPECIAL: [3, 10, 17, 24, 25, 31],
});
