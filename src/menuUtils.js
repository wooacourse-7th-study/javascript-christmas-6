import { MENU } from "./constants/menu.js";
import { OFFER_MENU, EVENT_DAYS, DISCOUNT } from "./constants/event.js";

// 모든 메뉴의 이름과 금액
const allMenuPrice = {};
Object.values(MENU).forEach((category) =>
  Object.entries(category).forEach(([_i, { NAME, PRICE }]) => (allMenuPrice[NAME] = PRICE))
);

/**
 * 주문 받은 메뉴를 기반으로 할인 전 총 주문금액을 구합니다.
 * @param {Map<string, string>} menusMap<dish, count>
 * @return {number}
 */
export function calculateMenuTotalAmount(menusMap) {
  let totalAmount = 0;
  menusMap.forEach((count, dish) => {
    totalAmount += allMenuPrice[dish] * count;
  });
  return totalAmount;
}

/**
 * 할인 전 총 주문금액을 바탕으로 증정 이벤트 여부를 구합니다.
 * @param {number} totalAmount
 * @returns {boolean}
 */
export function isOffer(totalAmount) {
  if (totalAmount >= OFFER_MENU.APPLY_POINT) return true;
  return false;
}

/**
 * 크리스마스 디데이 할인금액을 구합니다.
 * @param {number} date - 방문 날짜
 * @returns {number}
 */
export function calculateChrismasDiscount(date) {
  if (date <= EVENT_DAYS.CHRISTMAS) {
    return DISCOUNT.CHRISTMAS.BASIC_DISCOUNT + (date - 1) * DISCOUNT.CHRISTMAS.ADD;
  }
}

/**
 * 평일/주말 이벤트의 경우, 몇개의 메뉴가 할인 적용에 해당하는지 구합니다.
 * @param {number} date - 방문 날짜
 * @param {Map<string, string>} orderMenus - 주문 메뉴
 * @returns {number}
 */
export function calculateWeekDiscount(date, orderMenus) {
  if (EVENT_DAYS.WEEKENDS.includes(date)) {
    const mains = MENU.MAIN.map((item) => item.NAME);
    let count = 0;
    for (const [dish, num] of orderMenus.entries()) {
      if (mains.includes(dish)) count += num;
    }
    return { weekends: count * DISCOUNT.WEEKENDS.AMOUNT };
  }

  const desserts = MENU.DESSERT.map((item) => item.NAME);
  let count = 0;
  for (const [dish, num] of orderMenus.entries()) {
    if (desserts.includes(dish)) count += num;
  }
  return { weekdays: count * DISCOUNT.WEEKDAYS.AMOUNT };
}

/**
 * 방문 날짜를 바탕으로 스페셜 할인 대상인지 구합니다.
 * @param {number} date - 방문 날짜
 * @returns {boolean}
 */
export function isSpecial(date) {
  if (EVENT_DAYS.SPECIAL.includes(date)) return true;
  return false;
}

/**
 * 최종 할인 혜택 금액을 구합니다.
 * @param {Object{christmas : number, week: {weekdays: number, weekends: number}, special: boolean, isOffer: boolean}}
 * @returns {number}
 */
export function calculateTotalDiscountAmount(discount) {
  let total = 0;
  if (discount.christmas) total += discount.christmas;
  if (discount.week.weekends) total += discount.week.weekends;
  if (discount.week.weekdays) total += discount.week.weekdays;
  if (discount.special) total += DISCOUNT.SPECIAL.AMOUNT;
  if (discount.isOffer) total += OFFER_MENU.PRICE;
  return total;
}
