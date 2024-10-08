export const INPUT_MESSAGES = Object.freeze({
  VISIT_DATE: "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
  MENU: "주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n",
});

export const OUTPUT_MESSAGES = Object.freeze({
  DATE: (date) => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  MENU: "\n<주문 메뉴>",
  TOTAL_BEFORE_EVENT: "\n<할인 전 총주문 금액>",
  EVENT_OFFER: "\n<증정 메뉴>",
  BENEFIT: "\n<혜택 내역>",
  TOTAL_BENEFIT: "\n<총혜택 금액>",
  TOTAL_AFTER_EVENT: "\n<할인 후 예상 결제 금액>",
  EVENT_BADGE: "\n<12월 이벤트 배지>",
});

export const ERROR_MESSAGES = Object.freeze({
  INVALID_DATE: "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.",
  INVALID_MENU: "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.",
});
