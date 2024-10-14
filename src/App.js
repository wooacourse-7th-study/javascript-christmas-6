import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import {
  getOriginalOrderPrice,
  isGiftEventTarget,
  isWeekend,
  isSpecialEventDay,
  getTotalPrice,
  getBadge,
  benefitController,
} from "./utils/index.js";
import { TITLE_MESSAGE } from "./constants/index.js";

class App {
  async run() {
    // 인사 메세지
    OutputView.greetingMessage();

    // 날짜 입력 받기
    const visitDate = await InputView.getVisitDateInput();

    // 메뉴 입력 받기
    const orderMenus = await InputView.getOrderInput();

    // 이벤트 메세지
    OutputView.eventMessage();

    // 주문 메뉴 출력
    OutputView.printMenus(orderMenus);

    //할인 전 가격 출력
    const originalPrice = getOriginalOrderPrice(orderMenus);
    OutputView.printPrice(TITLE_MESSAGE.ORIGINAL_PRICE, originalPrice);

    // 증정 메뉴 출력
    const isGiftEvent = isGiftEventTarget(originalPrice);
    OutputView.printGiftEvent(isGiftEvent);

    // 혜택 할인 적용, 출력
    const {
      getBenefitDiscounts,
      setChristmasBenefit,
      setDayBenefit,
      setSpecialBenefit,
      setGiftBenefit,
      getTotalDiscount,
    } = benefitController();

    if (originalPrice > 10000) {
      setChristmasBenefit(visitDate); // 크리스마스 디데이 이벤트
      setDayBenefit(isWeekend(visitDate), orderMenus); // 주말, 평일 이벤트
      setSpecialBenefit(isSpecialEventDay(visitDate)); // 특별 이벤트
      setGiftBenefit(isGiftEvent); // 증정 이벤트
      OutputView.printBenefit(getBenefitDiscounts());
    }

    // 총 혜택 금액 출력
    const totalDiscount = getTotalDiscount();
    OutputView.printPrice(TITLE_MESSAGE.BENEFIT_PRICE, totalDiscount === 0 ? 0 : -totalDiscount);

    // 할인 후 예샹 결제 금액 출력
    const totalPrice = getTotalPrice(originalPrice, totalDiscount);
    OutputView.printPrice(TITLE_MESSAGE.FINAL_PRICE, totalPrice);

    // 12월 이벤트 배지 출력
    const badge = getBadge(totalDiscount);
    OutputView.printBadge(badge);
  }
}

export default App;
