const path = require("node:path");
const fork = require("node:child_process").fork;
const assert = require("node:assert");

function jump(no) { return no % 2 ? no * 3 + 1 : no / 2; }
function new_number() { return Math.floor(Math.random() * 100) + 1; }

function child_proc(flag) {
	assert(process.send);

	process.on("message", no => {
		let next_no = jump(no);
		if (next_no % 2 == flag)
			process.send(next_no);
	});

	process.on("exit", msg => {
		console.log("End of", flag ? "ODD." : "EVEN.");
	});
}

function odd_child_proc() { child_proc(1); }
function even_child_proc() { child_proc(0); }

function parent_proc() {

	function send_to_children(no) {
		odd_child.send(no);
		even_child.send(no);
	}

	function start() {
		start_no = new_number();
		console.log(`New start from ${start_no}`);
		send_to_children(start_no);
	}

	async function end() {

		finished++;
		console.log(`Series of ${start_no} end, ${finished}/${N}.`);

		await new Promise(resolve => setTimeout(resolve, 1000));

		if (finished >= N) {
			return all_done();
		}

		start();
	}

	function all_done() {
		console.log("All done!");

		odd_child.disconnect();
		even_child.disconnect();
		return;
	}

	async function on_number_coming(no, from) {
		console.log(`${from}: ${no}`);

		if (no == 1)
			return end();

		send_to_children(no);
	}

	const N = 5;
	let finished = 0;

	const prog_file = path.resolve("all-in-one.js");
	const options = { stdio: ["pipe", "pipe", "pipe", "ipc"] };

	const odd_child = fork(prog_file, ["odd"], options);
	const even_child = fork(prog_file, ["even"], options);

	odd_child.on("message", no => { on_number_coming(no, " ODD"); });
	even_child.on("message", no => { on_number_coming(no, "EVEN"); });

	start();
}

let argv = process.argv.slice(2);

if (!argv.length) parent_proc();
if (argv[0] == "odd") odd_child_proc();
if (argv[0] == "even") even_child_proc();

