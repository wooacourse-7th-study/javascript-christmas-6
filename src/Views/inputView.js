import { Console } from '@woowacourse/mission-utils'
import { ASK } from '../Constants/MESSAGE.js'

const InputView = {
	async visitDate() {
		const input = await Console.readLineAsync(ASK.VISIT_DAY)
		return input
	},
}

export default InputView
