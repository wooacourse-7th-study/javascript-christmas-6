import {
  getOriginalOrderPrice,
  getTotalPrice,
  isGiftEventTarget,
  isWeekend,
  isSpecialEventDay,
  getBadge,
  getCategoryMenuCount,
  benefitController,
} from "../src/utils/index.js";
import { BADGES, NOTHING_MESSAGE, MAIN_MENUS, DESSERTS, BENEFIT_MESSAGE, MENUS } from "../src/constants/index.js";

describe("금액", () => {
  // 티본스테이크: 55,000, 초코케이크: 15,000
  test("총 주문 금액1", () => {
    const orderMenus = [{ menu: "티본스테이크", count: 1 }];

    expect(getOriginalOrderPrice(orderMenus)).toBe(55000);
  });

  test("총 주문 금액2", () => {
    const orderMenus = [
      { menu: "티본스테이크", count: 5 }, // 275,000
      { menu: "초코케이크", count: 5 }, // 75,000
    ];

    expect(getOriginalOrderPrice(orderMenus)).toBe(350000);
  });

  test("최종 결제 금액1", () => {
    const originalPrice = 350000;
    const discountPrice = 0;

    expect(getTotalPrice(originalPrice, discountPrice)).toBe(350000);
  });

  test("최종 결제 금액2", () => {
    const originalPrice = 100000;
    const discountPrice = 100000;

    expect(getTotalPrice(originalPrice, discountPrice)).toBe(0);
  });
});

describe("증정 이벤트", () => {
  test("12만원 이하, false", () => {
    const originalPrice = 100000;
    expect(isGiftEventTarget(originalPrice)).toBeFalsy();
  });

  test("12만원 이상, true", () => {
    const originalPrice = 120000;
    expect(isGiftEventTarget(originalPrice)).toBeTruthy();
  });
});

describe("주말인지 체크", () => {
  test("평일, false", () => {
    const visitDate = 3;
    expect(isWeekend(visitDate)).toBeFalsy();
  });

  test("주말, true", () => {
    const visitDate = 1;
    expect(isWeekend(visitDate)).toBeTruthy();
  });
});

describe("특별 할인", () => {
  test("방문 날짜에 달력에 별표 표시 O", () => {
    const visitDate = 3;
    expect(isSpecialEventDay(visitDate)).toBeTruthy();
  });

  test("방문 날짜에 달력에 별표 표시 X", () => {
    const visitDate = 4;
    expect(isSpecialEventDay(visitDate)).toBeFalsy();
  });
});

describe("이벤트 뱃지", () => {
  test("2만원 이상 - 산타", () => {
    const discountPrice = 20000;
    expect(getBadge(discountPrice)).toBe(BADGES.SANTA);
  });

  test("1만원 이상 - 트리", () => {
    const discountPrice = 10000;
    expect(getBadge(discountPrice)).toBe(BADGES.TREE);
  });

  test("5천원 이상 - 별", () => {
    const discountPrice = 5000;
    expect(getBadge(discountPrice)).toBe(BADGES.STAR);
  });

  test("없음", () => {
    const discountPrice = 1000;
    expect(getBadge(discountPrice)).toBe(NOTHING_MESSAGE);
  });
});

describe("카테고리 메뉴 카운트", () => {
  test("디저트 5개", () => {
    const orderMenu = [
      { menu: "초코케이크", count: 5 },
      { menu: "티본스테이크", count: 3 },
    ];
    expect(getCategoryMenuCount(DESSERTS, orderMenu)).toBe(5);
  });

  test("메인메뉴 7개", () => {
    const orderMenu = [
      { menu: "초코케이크", count: 5 },
      { menu: "티본스테이크", count: 7 },
    ];
    expect(getCategoryMenuCount(MAIN_MENUS, orderMenu)).toBe(7);
  });
});

const {
  setInit,
  getBenefitDiscounts,
  setChristmasBenefit,
  setDayBenefit,
  setSpecialBenefit,
  setGiftBenefit,
  getTotalDiscount,
} = benefitController();

describe("크리스마스 디데이 할인", () => {
  test("11일 방문, 2000원", () => {
    const visitDate = 11;
    setInit();

    setChristmasBenefit(visitDate);
    const result = getBenefitDiscounts();

    expect(result[BENEFIT_MESSAGE.CHRISTMAS]).toBe(2000);
  });

  test("25일 방문, 3400원", () => {
    const visitDate = 25;
    setInit();

    setChristmasBenefit(visitDate);
    const result = getBenefitDiscounts();

    expect(result[BENEFIT_MESSAGE.CHRISTMAS]).toBe(3400);
  });

  test("31일 방문, 0원", () => {
    const visitDate = 31;
    setInit();

    setChristmasBenefit(visitDate);
    const result = getBenefitDiscounts();

    expect(result[BENEFIT_MESSAGE.CHRISTMAS]).toBe(0);
  });
});

describe("평일 할인", () => {
  test("디저트 메뉴 5개(2023 * 5)", () => {
    const isWeekend = false;
    const orderMenu = [
      { menu: "초코케이크", count: 5 },
      { menu: "티본스테이크", count: 7 },
    ];
    setInit();

    setDayBenefit(isWeekend, orderMenu);
    const result = getBenefitDiscounts();

    expect(result[BENEFIT_MESSAGE.WEEKDAYS]).toBe(10115);
  });
});

describe("주말 할인", () => {
  test("메인 메뉴 1개(2023 * 1)", () => {
    const isWeekend = true;
    const orderMenu = [
      { menu: "초코케이크", count: 5 },
      { menu: "티본스테이크", count: 1 },
    ];
    setInit();

    setDayBenefit(isWeekend, orderMenu);
    const result = getBenefitDiscounts();

    expect(result[BENEFIT_MESSAGE.WEEKEND]).toBe(2023);
  });
});

describe("특별 할인", () => {
  test("방문 날짜가 별표 쳐져있는 날", () => {
    const isSpecialDate = true;
    setInit();

    setSpecialBenefit(isSpecialDate);
    const result = getBenefitDiscounts();

    expect(result[BENEFIT_MESSAGE.SPECIAL]).toBe(1000);
  });

  test("방문 날짜가 별표 쳐져있지 않은 날", () => {
    const isSpecialDate = false;
    setInit();

    setSpecialBenefit(isSpecialDate);
    const result = getBenefitDiscounts();

    expect(result[BENEFIT_MESSAGE.SPECIAL]).toBe(0);
  });
});

describe("증정 할인", () => {
  test("12만원 이상 구매해서 증정 선물을 받은 경우", () => {
    const isGiftEvent = true;
    setInit();

    setGiftBenefit(isGiftEvent);
    const result = getBenefitDiscounts();

    expect(result[BENEFIT_MESSAGE.GIFT]).toBe(MENUS.샴페인);
  });

  test("12만원 이상 구매하지 않아서 증정 선물을 받지 않은 경우", () => {
    const isGiftEvent = false;
    setInit();

    setGiftBenefit(isGiftEvent);
    const result = getBenefitDiscounts();

    expect(result[BENEFIT_MESSAGE.GIFT]).toBe(0);
  });
});

describe("총 혜택 금액", () => {
  test("모든 할인 혜택 적용", () => {
    const visitDate = 25;
    const isWeekend = false;
    const orderMenu = [
      { menu: "초코케이크", count: 5 },
      { menu: "티본스테이크", count: 7 },
    ];
    const isSpecialDate = true;
    const isGiftEvent = true;
    const resultPrice = 3400 + 10115 + 1000 + 25000;
    setInit();

    setChristmasBenefit(visitDate); // 크리스마스 디데이 할인(25일 방문, 3,400원)
    setDayBenefit(isWeekend, orderMenu); // 평일 할인(디저트 메뉴 5개 * 2023, 10,115원)
    setSpecialBenefit(isSpecialDate); // 특별 할인(별표 쳐져있는 날, 1,000원)
    setGiftBenefit(isGiftEvent); // 증정 할인(12만원 이상 구매, 25,000원)

    const totalPrice = getTotalDiscount();
    expect(totalPrice).toBe(resultPrice);
  });
});
