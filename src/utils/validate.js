import { ERROR } from '../Constants/MESSAGE.js'
import MENULIST from '../Constants/MENULIST.js'
import { Console } from '@woowacourse/mission-utils'

class Validate {
	//방문 날짜 validate
	inputVisitDate(date) {
		this.#isVisitDateRange(date)
		this.#isNotNumber(date)
		return date
	}

	//주문 validate
	inputOrder(menuList) {
		for (const menu of menuList) {
			this.#isNotValue(menu)
			this.#isNotSameMenu(menu)
		}
		return menuList
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

	#isNotValue(menu) {
		if (isNaN(menu.count) || menu.count <= 0 || 20 < menu.count) {
			throw new Error(ERROR.ORDER_MENU)
		}
	}
	#isNotSameMenu(menu) {
		const isSameMenu = MENULIST.some(el => el.name === menu.name)
		if (!isSameMenu) {
			throw new Error(ERROR.ORDER_MENU)
		}
	}
}
export default Validate
