let stringCutting = (value, length) => {
	if (value) {
		if (value.length > length) {
			return `${value.substring(0, length)}...`;
		} else {
			return value;
		}
	}
}
let activityState = val => {
	if (val == 0) {
		return "预告";
	} else if (val == 1) {
		return "进行中";
	} else if (val == 2) {
		return "已结束";
	}
}
export { stringCutting, activityState }