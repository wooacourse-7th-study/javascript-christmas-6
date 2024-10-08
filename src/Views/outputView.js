import { Console } from '@woowacourse/mission-utils'
import { MESSAGE } from '../Constants/MESSAGE.js'
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
}
export default OutputView
