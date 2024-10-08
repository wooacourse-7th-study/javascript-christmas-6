import { Console } from '@woowacourse/mission-utils'
import Validate from '../utils/validate.js'
import InputView from '../Views/inputView.js'
class Controller {
	constructor() {
		this.validation = new Validate()
	}

	//방문 날짜 받기
	async visitDateInputProcess() {
		try {
			const inputDate = await InputView.visitDate()
			return this.validation.inputVisitDate(inputDate)
		} catch (error) {
			Console.print(error.message)
			return await this.visitDateInputProcess()
		}
	}

}
export default Controller
