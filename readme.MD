This is a nodejs fork practice.
I use it to familar with the communications between children process.

To run just type command below in the terminal:	
	node main.js

Modules:
0. jump number cacluator.
	x = x / 2 when x is even
	x = x * 3 + 1 when x is odd
	stop when x = 1

1. main

	0. create two children: odd_child, even_child
	1. send number to children
	2. get back number from children
	3. goto 1 when number is not 1
	4. generate new number, goto 1 when not finish

2. odd child
	loop:
		get number from main
		calculate next number
		send next number when next number is odd

3. even child
	loop:
		get number from main
		calculate next number
		send next number when next number is even

That's all.
