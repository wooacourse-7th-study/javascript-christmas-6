import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";
import Order from "./models/Order.js";
import EventPlanner from "./models/EventPlanner.js";
import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    OutputView.printWelcomeMessage();
    const date = await this.readDate();
    const order = await this.readOrder();
    const eventPlanner = new EventPlanner(date, order);
    this.printEventDetails(eventPlanner);
  }

  async readDate() {
    while (true) {
      try {
        return await InputView.readDate();
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async readOrder() {
    while (true) {
      try {
        const orderInput = await InputView.readOrder();
        return new Order(orderInput);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
  // 수정 필요
  printEventDetails(eventPlanner) {
    OutputView.printEventPreview(eventPlanner.date);
    OutputView.printOrderMenu(eventPlanner.order);
    OutputView.printTotalAmountBeforeDiscount(
      eventPlanner.order.getTotalAmount()
    );
    OutputView.printGiftMenu(eventPlanner.gift);
    OutputView.printBenefitDetails(eventPlanner.discounts, eventPlanner.gift);
    OutputView.printTotalBenefitAmount(eventPlanner.getTotalBenefitAmount());
    OutputView.printFinalAmount(eventPlanner.getFinalAmount());
    OutputView.printEventBadge(eventPlanner.getBadge());
  }
}

export default App;
