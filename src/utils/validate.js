import { ERROR } from '../Constants/MESSAGE.js'
class Validate {
	//방문 날짜 validate
	inputVisitDate(date) {
		this.#isVisitDateRange(date)
		this.#isNotNumber(date)
		return date
	}


	#isVisitDateRange(date) {
		if (date < 1 || 31 < date) {
			throw new Error(ERROR.VISIT_DATE)
		}
	}
	#isNotNumber(date) {
		if (isNaN(date)) {
			throw new Error(ERROR.VISIT_DATE)
		}
	}

}
export default Validate
