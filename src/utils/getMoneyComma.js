const getMoneyComma = beforeDiscountPrice => {
	return (
		beforeDiscountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
	)
}
export default getMoneyComma
