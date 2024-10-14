import { ERROR_MESSAGES } from "../src/constants/messages";
import Validation from "../src/validation";

describe("유효성 검사", () => {
  const INVALID_DATE = ["0", "-1", "32", "가나다"];
  test.each(INVALID_DATE)("날짜 예외 테스트", (date) => {
    expect(() => Validation.date(date)).toThrow(ERROR_MESSAGES.INVALID_DATE);
  });

  const INVALID_MENU = [
    ["해산물-2", "초코케이크-3"],
    ["아이스크림-1", "바비큐립-3", "콜라-2", "아이스크림-3"],
    [" -2", "레드와인-1"],
    ["레드와인-2", "콜라-1"],
    ["티본스테이크-0", "콜라-2", "아이스크림-1"],
    ["타파스-10", "크리스마스파스타-5", "바비큐립-3", "초코케이크-2", "아이스크림-3"],
  ];
  test.each(INVALID_MENU)("메뉴 예외 테스트", (menus) => {
    expect(() => Validation.menus(menus)).toThrow(ERROR_MESSAGES.INVALID_MENU);
  });
});
