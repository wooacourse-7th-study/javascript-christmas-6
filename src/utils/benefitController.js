import { DECEMBER, BENEFIT_PRICE, MAIN_MENUS, DESSERTS, BENEFIT_MESSAGE } from "../constants/index.js";
import { getCategoryMenuCount } from "./event.js";

const benefitController = () => {
  const benefitDiscounts = {
    [BENEFIT_MESSAGE.CHRISTMAS]: 0,
    [BENEFIT_MESSAGE.WEEKDAYS]: 0,
    [BENEFIT_MESSAGE.WEEKEND]: 0,
    [BENEFIT_MESSAGE.SPECIAL]: 0,
    [BENEFIT_MESSAGE.GIFT]: 0,
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
    if (isWeekend) {
      const mainMenuCount = getCategoryMenuCount(MAIN_MENUS, orderMenus);
      benefitDiscounts[BENEFIT_MESSAGE.WEEKEND] = mainMenuCount * BENEFIT_PRICE.YEAR;
      return;
    }

    const dessertMenuCount = getCategoryMenuCount(DESSERTS, orderMenus);
    benefitDiscounts[BENEFIT_MESSAGE.WEEKDAYS] = dessertMenuCount * BENEFIT_PRICE.YEAR;
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
      benefitDiscounts[BENEFIT_MESSAGE.GIFT] = BENEFIT_PRICE.GIFT;
    }
  };

  // 총 혜택 금액
  const getTotalDiscount = () => {
    return Object.values(benefitDiscounts).reduce((acc, discount) => acc + discount, 0);
  };

  return {
    getBenefitDiscounts,
    setChristmasBenefit,
    setDayBenefit,
    setSpecialBenefit,
    setGiftBenefit,
    getTotalDiscount,
  };
};

export default benefitController;
