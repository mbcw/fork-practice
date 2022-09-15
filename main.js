
const path = require("node:path");
const fork = require("node:child_process").fork;

const odd_file = path.resolve("odd.js");
const even_file = path.resolve("even.js");

const argv = [];
const options = { stdio: ["pipe", "pipe", "pipe", "ipc"] };

const odd_child = fork(odd_file, argv, options);
const even_child = fork(even_file, argv, options);

function new_number() {
	return Math.floor(Math.random() * 100) + 1;
}

function send_to_children(no) {
	odd_child.send(no);
	even_child.send(no);
}

odd_child.on("message", no => { on_number_coming(no, " ODD"); });
even_child.on("message", no => { on_number_coming(no, "EVEN"); });

async function on_number_coming(no, from) {

	console.log(`${from}: ${no}`);

	if (no == 1) {
		return end();
	};

	send_to_children(no);
}

function all_done() {
	console.log("All done!");

	odd_child.disconnect();
	even_child.disconnect();
	return;
}

const N = 5;
let finished = 0;

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

start();
