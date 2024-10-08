import MENULIST from '../Constants/MENULIST.js'

class Menu {
	getMenu(inputMenu) {
		let getMenu = []

		inputMenu.forEach(element => {
			let splitMenu = element.split('-')
			let name = splitMenu[0]
			let count = Number(splitMenu[1])
			this.#getFindMenu(name, count, getMenu)
		})

		return getMenu
	}

	getBeforeDiscountPrice(menu) {
		let beforeDisCountPrice = 0
		menu.forEach(menu => {
			beforeDisCountPrice += menu.price * menu.count
		})
		return beforeDisCountPrice
	}

}
export default Menu
