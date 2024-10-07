import { DECEMBER } from "./constants/index.js";

export const isVisitDateValidate = (visitDate) => {
  return DECEMBER.FIRST > visitDate || DECEMBER.LAST < visitDate;
};
