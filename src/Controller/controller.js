import { Console } from '@woowacourse/mission-utils'
import Validate from '../utils/validate.js'
import InputView from '../Views/inputView.js'
import Menu from '../Model/menu.js'
import OutputView from '../views/OutputView.js'
import getMoneyComma from '../utils/getMoneyComma.js'
import Benefit from '../Model/benefit.js'

class Controller {
	constructor() {
		this.validation = new Validate()
		this.menu = new Menu()
		this.benefit = new Benefit()
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

	//메뉴 및 수량 받기
	async menuInputProcess() {
		try {
			const inputMenu = await InputView.menuAndCount()
			const menuList = this.menu.getMenu(inputMenu)
			return this.validation.inputOrder(menuList)
		} catch (error) {
			Console.print(error.message)
			return await this.menuInputProcess()
		}
	}

	#getBeforeDiscount(menu) {
		const beforeDiscountPrice = this.menu.getBeforeDiscountPrice(menu)
		OutputView.printBeforeDiscount(getMoneyComma(beforeDiscountPrice))
		return beforeDiscountPrice
	}
	#getPresent(beforeDiscountPrice) {
		const isGiftPresent = this.benefit.getPresent(beforeDiscountPrice)
		OutputView.printGiftPresent(isGiftPresent)
		return isGiftPresent
	}

	//주문에 대한 로직
	orderProcess(menu, visitDate) {
		const beforeDiscountPrice = this.#getBeforeDiscount(menu)
		const isGiftPresent = this.#getPresent(beforeDiscountPrice)

		const getBenefits = this.benefit.getBenefit(
			visitDate,
			menu,
			beforeDiscountPrice,
		)
		const { totalBenefit } = getBenefits

		OutputView.printBenefit(getBenefits)
		OutputView.printTotalBenefit(totalBenefit, isGiftPresent)
		OutputView.printAtferDiscount(beforeDiscountPrice, totalBenefit)
		OutputView.printBadge(totalBenefit, isGiftPresent)
	}
}
export default Controller
