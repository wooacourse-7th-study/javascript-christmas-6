import { DECEMBER, BENEFIT_PRICE, MAIN_MENUS, DESSERTS, BENEFIT_MESSAGE, MENUS } from "../constants/index.js";
import { getCategoryMenuCount } from "./event.js";

const benefitController = () => {
  const benefitDiscounts = {
    [BENEFIT_MESSAGE.CHRISTMAS]: 0,
    [BENEFIT_MESSAGE.WEEKDAYS]: 0,
    [BENEFIT_MESSAGE.WEEKEND]: 0,
    [BENEFIT_MESSAGE.SPECIAL]: 0,
    [BENEFIT_MESSAGE.GIFT]: 0,
  };

  const setInit = () => {
    Object.keys(benefitDiscounts).forEach((key) => {
      benefitDiscounts[key] = 0;
    });
  };

  const getBenefitDiscounts = () => {
    return { ...benefitDiscounts };
  };

  // 크리스마스 디데이 할인
  const setChristmasBenefit = (visitDate) => {
    if (visitDate > DECEMBER.CHRISTMAS) {
      return;
    }

    benefitDiscounts[BENEFIT_MESSAGE.CHRISTMAS] = (visitDate - 1) * BENEFIT_PRICE.HUNDRED + BENEFIT_PRICE.THOUSAND;
  };

  // 평일, 주말 할인
  const setDayBenefit = (isWeekend, orderMenus) => {
    const category = isWeekend ? MAIN_MENUS : DESSERTS;
    const categoryMenuCount = getCategoryMenuCount(category, orderMenus);
    const benefitMessage = isWeekend ? BENEFIT_MESSAGE.WEEKEND : BENEFIT_MESSAGE.WEEKDAYS;
    benefitDiscounts[benefitMessage] = categoryMenuCount * BENEFIT_PRICE.YEAR;
  };

  // 특별 할인
  const setSpecialBenefit = (isSpecialDate) => {
    if (isSpecialDate) {
      benefitDiscounts[BENEFIT_MESSAGE.SPECIAL] = BENEFIT_PRICE.THOUSAND;
    }
  };

  // 증정 할인
  const setGiftBenefit = (isGiftEvent) => {
    if (isGiftEvent) {
      benefitDiscounts[BENEFIT_MESSAGE.GIFT] = MENUS.샴페인;
    }
  };

  // 총 혜택 금액
  const getTotalDiscount = () => {
    return Object.values(benefitDiscounts).reduce((acc, discount) => acc + discount, 0);
  };

  return {
    setInit,
    getBenefitDiscounts,
    setChristmasBenefit,
    setDayBenefit,
    setSpecialBenefit,
    setGiftBenefit,
    getTotalDiscount,
  };
};

export default benefitController;
