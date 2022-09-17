const jump = require("./jump.js");

if (process.send) console.log("In child");

process.on("message", no => {
	let next_no = jump(no);
	if (next_no % 2 == 0)
		process.send(next_no);
});

process.on("exit", msg => {
	// msg;
	console.log("End of EVEN.");
});
