/** 증정 메뉴의 출력 문자열, 가격, 기준값 */
export const OFFER_MENU = Object.freeze({
  STRING: "샴페인 1개",
  PRICE: 25000,
  APPLY_POINT: 120000,
});

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
    STRING: `증정 이벤트: -${OFFER_MENU.PRICE.toLocaleString()}원`,
    AMOUNT: OFFER_MENU.PRICE,
  },
};

/** 이벤트 뱃지 종류와 기준값 */
export const EVENT_BADGE = Object.freeze({
  STAR: { NAME: "별", AMOUNT: 5000 },
  TREE: { NAME: "트리", AMOUNT: 10000 },
  SANTA: { NAME: "산타", AMOUNT: 20000 },
});

/** 이벤트가 적용되는 날짜 배열 모음 */
export const EVENT_DAYS = Object.freeze({
  CHRISTMAS: 25,
  WEEKENDS: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
  SPECIAL: [3, 10, 17, 24, 25, 31],
});
