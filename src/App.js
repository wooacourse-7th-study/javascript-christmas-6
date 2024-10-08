import OutputView from './views/OutputView.js'
class App {
  async run() {}
	async run() {
		OutputView.printStartHello()
		let visitDate = await this.controller.visitDateInputProcess()
	}
}
const app = new App()
app.run()

export default App;
export default App
