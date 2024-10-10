import { Console } from "@woowacourse/mission-utils";
import { formatNumber } from "../utils/numberUtils.js";
import { OUTPUT_MESSAGES } from "../constants/messages.js";

const OutputView = {
  printWelcomeMessage() {
    Console.print(OUTPUT_MESSAGES.WELCOME);
  },

  printEventPreview(date) {
    Console.print(OUTPUT_MESSAGES.EVENT_PREVIEW(date));
  },

  printOrderMenu(order) {
    Console.print(OUTPUT_MESSAGES.ORDER_MENU);
    order.items.forEach((item) => {
      Console.print(`${item.menu} ${item.quantity}개`);
    });
  },

  printTotalAmountBeforeDiscount(amount) {
    Console.print(
      `${OUTPUT_MESSAGES.TOTAL_BEFORE_DISCOUNT}\n${formatNumber(amount)}원`
    );
  },

  printGiftMenu(gift) {
    Console.print(`${OUTPUT_MESSAGES.GIFT_MENU}\n${gift || "없음"}`);
  },

  printBenefitDetails(discounts, gift) {
    Console.print(OUTPUT_MESSAGES.BENEFIT_DETAILS);
    if (Object.keys(discounts).length === 0 && !gift) {
      Console.print("없음");
      return;
    }
    Object.entries(discounts).forEach(([name, amount]) => {
      Console.print(`${name}: -${formatNumber(amount)}원`);
    });

    if (gift) {
      Console.print(`증정 이벤트: -${formatNumber(25000)}원`);
    }
  },

  printTotalBenefitAmount(amount) {
    Console.print(
      `${OUTPUT_MESSAGES.TOTAL_BENEFIT_AMOUNT}\n${
        amount > 0 ? "-" : ""
      }${formatNumber(amount)}원`
    );
  },

  printFinalAmount(amount) {
    Console.print(`${OUTPUT_MESSAGES.FINAL_AMOUNT}\n${formatNumber(amount)}원`);
  },

  printEventBadge(badge) {
    Console.print(`${OUTPUT_MESSAGES.EVENT_BADGE}\n${badge}`);
  },
};

export default OutputView;
