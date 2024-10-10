import { DISCOUNT_RULES } from "../constants/eventRules.js";

//주말인지 확인하는 함수
export const isWeekend = (date) => {
  const day = new Date(2023, 11, date).getDay();
  return day === 5 || day === 6;
};

export const isSpecialDay = (date) => {
  return DISCOUNT_RULES.SPECIAL.DATES.includes(date);
};
