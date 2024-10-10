import { MENU } from "../constants/menu.js";

/**
 * 주어진 메뉴 이름에 해당하는 카테고리를 반환
 *
 * @param {string} menuName - 찾고자 하는 메뉴의 이름
 * @returns {string|null} 메뉴가 속한 카테고리명 반환./존재하지 않는 메뉴인 경우 null
 *
 * @example
 * getMenuCategory('티본스테이크'); // 'main' 반환
 */
export const getMenuCategory = (menuName) => {
  for (const [category, items] of Object.entries(MENU)) {
    if (menuName in items) return category;
  }
  return null;
};
