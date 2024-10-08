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

}
export default Benefit
