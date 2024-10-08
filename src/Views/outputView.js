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
		for (let menu of menuList) {
			Console.print(MESSAGE.ORDERED_MEUELIST(menu))
		}
	},
	printBeforDiscount(beforeDiscountPrice) {
		Console.print(MESSAGE.HEAD_BEFORE_DISCOUNT)
		Console.print(`${beforeDiscountPrice}\n`)
	},
	printGiftPresent(isGiftPresent) {
		Console.print(MESSAGE.HEAD_GIFT_PRESENT + MESSAGE.PRINT_GIFT(isGiftPresent))
	},
	printBenefit(getBenefits) {
		const {
			DdayMoney,
			weekdayOrweekendMoney,
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

		weekdayOrweekendMoney > 0 &&
			Console.print(isWeekdayOrWeekend + getMoneyComma(weekdayOrweekendMoney))
		starMoney > 0 &&
			Console.print(MESSAGE.PRINT_SPECIAL + getMoneyComma(starMoney))
		isGiftPresent &&
			Console.print(MESSAGE.PRINT_GIFT_EVENT + getMoneyComma(25000))
		totalBenefit === 0 && Console.print(MESSAGE.DATA_ZERO)
	},
	},

}
export default OutputView
