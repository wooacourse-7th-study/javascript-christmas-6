class Benefit {
	getBenefit(visitDate, menu, beforeDiscountPrice) {
		if (beforeDiscountPrice < 10000)
			return {
				DdayMoney: 0,
				weekdayOrweekendMoney: 0,
				starMoney: 0,
				totalBenefit: 0,
				dateIndex: 0,
			}
		const dateIndex = this.#getDayOfWeek(visitDate)
		const DdayMoney = this.#getD_Day(visitDate)

		const weekdayOrweekendMoney =
			dateIndex <= 4
				? this.#getWeekdayBenefit(menu)
				: this.#getWeekendBenefit(menu) //4이상이면 주말

		const starMoney = this.#getStarBenefit(dateIndex, visitDate)

		const totalBenefit = this.#getTotalBenefit(
			DdayMoney,
			weekdayOrweekendMoney,
			starMoney,
		)
		return {
			DdayMoney,
			weekdayOrweekendMoney,
			starMoney,
			totalBenefit,
			dateIndex,
		}
	}

	getPresent(beforeDisCountPrice) {
		return beforeDisCountPrice >= 120000 ? true : false
	}

	#getDayOfWeek(visitDate) {
		return new Date('2023-12-' + visitDate).getDay()
	}

	#getD_Day(visitDate) {
		let DdayBenefitMoney = 1000
		return (DdayBenefitMoney += (visitDate - 1) * 100)
	}

	#getWeekdayBenefit(menu) {
		let weekdayTotal = 0
		let weekdayBenefit = 2023
		menu.forEach(menu => {
			if (menu.category === 'dessert') {
				weekdayTotal += menu.count * weekdayBenefit
			}
		})

		return weekdayTotal
	}
	#getWeekendBenefit(menu) {
		let weekendTotal = 0
		let weekendBenefit = 2023
		menu.forEach(menu => {
			if (menu.category === 'main') {
				weekendTotal += menu.count * weekendBenefit
			}
		})
		return weekendTotal
	}

	#getStarBenefit(dateIndex, visitDate) {
		if (dateIndex === 0) return 1000
		if (visitDate === 25) return 1000
		return 0
	}
	#getTotalBenefit(DdayBenefitMoney, weekdayOrweekendMoney, starMoney) {
		return DdayBenefitMoney + weekdayOrweekendMoney + starMoney
	}
}
export default Benefit
