import MENULIST from '../Constants/MENULIST.js'

class Menu {
	getMenu(inputMenu) {
		let getMenu = []

		inputMenu.forEach(element => {
			const splitMenu = element.split('-')
			const name = splitMenu[0]
			const count = Number(splitMenu[1])
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

	#getFindMenu(name, count, getMenu) {
		const matchedMenu = MENULIST.find(list => list.name === name)

		if (matchedMenu) {
			getMenu.push({
				...matchedMenu,
				count: count,
			})
		}
	}
}
export default Menu
