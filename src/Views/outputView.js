import { Console } from '@woowacourse/mission-utils'
import { MESSAGE } from '../Constants/MESSAGE.js'
const OutputView = {
	printStartHello() {
		Console.print(MESSAGE.HELLO_START)
	},

	printResultHello(visitDate) {
		Console.print(MESSAGE.HELLO_RESULT(visitDate))
	},
}
export default OutputView
