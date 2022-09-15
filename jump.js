
function jump(no) {
	if (no % 2 == 0)
		return no / 2;

	return no * 3 + 1;
}

module.exports = jump;
