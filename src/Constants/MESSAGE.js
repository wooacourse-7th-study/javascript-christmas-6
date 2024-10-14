export const MESSAGE = {
	HELLO_START: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
	HELLO_RESULT: visitDate =>
		`12월 ${visitDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,

	HEAD_MENU: '<주문 메뉴>',
	HEAD_BEFORE_DISCOUNT: '\n<할인 전 총주문 금액>',
	HEAD_PRICE: '\n<총혜택 금액>\n',
	HEAD_AFTER_DISCOUNT: '\n<할인 후 예상 결제 금액>\n',
	HEAD_EVENT_BADGE: '\n<12월 이벤트 배지>',
	HEAD_BENEFIT: '<혜택 내역>',
	HEAD_GIFT_PRESENT: '<증정 메뉴>\n',

	PRINT_WEEKDAY: '평일 할인: -',
	PRINT_WEEKEND: '주말 할인: -',
	PRINT_D_DAY: '크리스마스 디데이 할인: -',
	PRINT_SPECIAL: '특별 할인: -',
	PRINT_GIFT_EVENT: '증정 이벤트: -',
	PRINT_GIFT: isGiftPresent => (isGiftPresent ? '샴페인 1개' : '없음') + '\n',

	DATA_ZERO: '없음',
	SANTA: '산타',
	TREE: '트리',
	STAR: '별',

	ORDERED_MENULIST: menu => `${menu.name} ${menu.count}개`,
}

export const ASK = {
	MENU_COUNT:
		'주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
	VISIT_DAY:
		'12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
}

export const ERROR = {
	VISIT_DATE: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
	ORDER_MENU: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
}
