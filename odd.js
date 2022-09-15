const jump = require("./jump.js");

process.on("message", no => {
	let next_no = jump(no);
	if (next_no % 2 == 1)
		process.send(next_no);
});

process.on("exit", msg => {
	console.log("End of ODD.");
});
