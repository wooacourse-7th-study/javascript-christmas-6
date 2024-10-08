import Controller from './Controller/controller.js'
import OutputView from './views/OutputView.js'

class App {
	constructor() {
		this.controller = new Controller()
	}

	async run() {
		OutputView.printStartHello()
		let visitDate = await this.controller.visitDateInputProcess()
		const menu = await this.controller.menuInputProcess()
		OutputView.printResultHello(visitDate)
		OutputView.printMenu(menu)
		this.controller.orderProcess(menu, visitDate)
	}
}
const app = new App()
app.run()

export default App
