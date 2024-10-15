import { Console } from '@woowacourse/mission-utils'
import { ASK } from '../Constants/MESSAGE.js'

const InputView = {
	async visitDate() {
		const input = await Console.readLineAsync(ASK.VISIT_DAY)
		return input
	},
	async menuAndCount() {
		const input = await Console.readLineAsync(ASK.MENU_COUNT)
		return input.split(',')
	},
}

export default InputView
