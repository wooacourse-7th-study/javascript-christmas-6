import {
  calculateChrismasDiscount,
  calculateMenuTotalAmount,
  calculateTotalDiscountAmount,
  calculateWeekDiscount,
  isOffer,
  isSpecial,
} from "../src/menuUtils";

describe("단위 테스트", () => {
  const TOTAL_AMOUNT_TEST = [
    [
      [
        ["양송이수프", 2],
        ["티본스테이크", 1],
        ["초코케이크", 1],
      ],
      82000,
    ],
    [
      [
        ["해산물파스타", 3],
        ["레드와인", 3],
      ],
      285000,
    ],
  ];
  test.each(TOTAL_AMOUNT_TEST)("할인 전 총 금액 계산", (menus, result) => {
    expect(calculateMenuTotalAmount(new Map(menus))).toBe(result);
  });

  test.each([
    [150000, true],
    [3000, false],
  ])("증정 이벤트 여부", (amount, result) => {
    expect(isOffer(amount)).toBe(result);
  });

  test.each([
    [5, 1400],
    [25, 3400],
    [26, 0],
  ])("크리스마스 디데이 할인 금액 계산", (date, result) => {
    expect(calculateChrismasDiscount(date)).toBe(result);
  });

  const WEEK_DISCOUNT_TEST = [
    [
      8,
      [
        ["티본스테이크", 1],
        ["해산물파스타", 2],
        ["초코케이크", 4],
      ],
      { weekends: 6069 },
    ],
    [
      10,
      [
        ["티본스테이크", 1],
        ["해산물파스타", 2],
        ["초코케이크", 4],
      ],
      { weekdays: 8092 },
    ],
  ];
  test.each(WEEK_DISCOUNT_TEST)("주말/평일 할인 금액 계산", (date, menus, result) => {
    expect(calculateWeekDiscount(date, new Map(menus))).toEqual(result);
  });

  test.each([
    [17, true],
    [18, false],
  ])("특별 할인 여부", (date, result) => {
    expect(isSpecial(date)).toBe(result);
  });

  const TOTAL_DISCOUNT_TEST = [
    [{ christmas: 3400, week: { weekdays: 2023 }, special: true, isOffer: true }, 31423],
    [{ christmas: 2100, week: { weekdays: 4046 }, special: false, isOffer: true }, 31146],
  ];
  test.each(TOTAL_DISCOUNT_TEST)("총 할인 금액 계산", (discount, result) => {
    expect(calculateTotalDiscountAmount(discount)).toBe(result);
  });
});
