import { Console } from '@woowacourse/mission-utils'
import { MESSAGE } from '../Constants/MESSAGE.js'
import getMoneyComma from '../utils/getMoneyComma.js'

const OutputView = {
	printStartHello() {
		Console.print(MESSAGE.HELLO_START)
	},

	printResultHello(visitDate) {
		Console.print(MESSAGE.HELLO_RESULT(visitDate))
	},
	printMenu(menuList) {
		Console.print(MESSAGE.HEAD_MENU)
		for (const menu of menuList) {
			Console.print(MESSAGE.ORDERED_MENULIST(menu))
		}
	},
	printBeforeDiscount(beforeDiscountPrice) {
		Console.print(MESSAGE.HEAD_BEFORE_DISCOUNT)
		Console.print(`${beforeDiscountPrice}\n`)
	},
	printGiftPresent(isGiftPresent) {
		Console.print(MESSAGE.HEAD_GIFT_PRESENT + MESSAGE.PRINT_GIFT(isGiftPresent))
	},
	printBenefit(getBenefits) {
		const {
			DdayMoney,
			weekdayOrWeekendMoney,
			starMoney,
			isGiftPresent,
			totalBenefit,
			dateIndex,
		} = getBenefits

		const isWeekdayOrWeekend =
			dateIndex > 4 ? MESSAGE.PRINT_WEEKDAY : MESSAGE.PRINT_WEEKEND
		Console.print(MESSAGE.HEAD_BENEFIT)

		DdayMoney > 0 &&
			Console.print(MESSAGE.PRINT_D_DAY + getMoneyComma(DdayMoney))

		weekdayOrWeekendMoney > 0 &&
			Console.print(isWeekdayOrWeekend + getMoneyComma(weekdayOrWeekendMoney))
		starMoney > 0 &&
			Console.print(MESSAGE.PRINT_SPECIAL + getMoneyComma(starMoney))
		isGiftPresent &&
			Console.print(MESSAGE.PRINT_GIFT_EVENT + getMoneyComma(25000))
		totalBenefit === 0 && Console.print(MESSAGE.DATA_ZERO)
	},

	printTotalBenefit(totalBenefit, isGiftPresent) {
		const totalPrice = isGiftPresent ? totalBenefit + 25000 : totalBenefit
		Console.print(
			MESSAGE.HEAD_PRICE +
				getMoneyComma(totalPrice === 0 ? totalPrice : -totalPrice),
		)
	},
	printAfterDiscount(beforeDiscountPrice, totalBenefit) {
		Console.print(
			MESSAGE.HEAD_AFTER_DISCOUNT +
				getMoneyComma(beforeDiscountPrice - totalBenefit),
		)
	},
	printBadge(totalBenefit, isGiftPresent) {
		const totalPrice = isGiftPresent ? totalBenefit + 25000 : totalBenefit

		Console.print(MESSAGE.HEAD_EVENT_BADGE)

		if (totalPrice >= 20000) return Console.print(MESSAGE.SANTA)
		if (totalPrice >= 10000) return Console.print(MESSAGE.TREE)
		if (totalPrice >= 5000) return Console.print(MESSAGE.STAR)

		Console.print(MESSAGE.DATA_ZERO)
	},
}
export default OutputView
