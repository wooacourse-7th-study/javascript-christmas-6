export const INFORMATION_MESSAGE = Object.freeze({
  GREETING: "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
  EVENT: "12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n",
});

export const INPUT_MESSAGE = Object.freeze({
  DATE: "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
  MENU: "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n",
});

export const TITLE_MESSAGE = Object.freeze({
  MENU: "\n<주문 메뉴>\n",
  ORIGINAL_PRICE: "\n<할인 전 총주문 금액>\n",
  GIFT: "\n<증정 메뉴>\n",
  BENEFIT: "\n<혜택 내역>\n",
  BENEFIT_PRICE: "\n<총혜택 내역>\n",
  FINAL_PRICE: "\n<할인 후 예상 결제 금액>\n",
  EVENT_BADGE: "\n<12월 이벤트 배지>\n",
});

export const ERROR_MESSAGE = Object.freeze({
  INVALID_DATE: "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.\n",
  INVALID_ORDER: "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.\n",
});

export const BENEFIT_PRICE = Object.freeze({
  HUNDRED: 100,
  THOUSAND: 1000,
  FIVE_THOUSAND: 5000,
  TEN_THOUSAND: 10000,
  TWENTY_THOUSAND: 20000,
  YEAR: 2023,
  GIFT: 120000,
});

export const DECEMBER = Object.freeze({
  FIRST: 1,
  CHRISTMAS: 25,
  LAST: 31,
});

export const MAX_COUNT = 20;
export const NOTHING_MESSAGE = "없음";

export const MENUS = Object.freeze({
  양송이수프: 6000,
  타파스: 5500,
  시저샐러드: 8000,
  티본스테이크: 55000,
  바베큐립: 54000,
  해산물파스타: 35000,
  크리스마스파스타: 25000,
  초코케이크: 15000,
  아이스크림: 5000,
  제로콜라: 3000,
  레드와인: 60000,
  샴페인: 25000,
});

export const DRINKS = ["제로콜라", "레드와인", "샴페인"];
