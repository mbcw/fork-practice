# Fork Practice.

I use it to familar with the communications between children process.

Type commands below to run:
###	node main.js
- children/parent spread in 3 files.
###	node all-in-one.js     
- all in one file.

## Modules:

### 0. jump number cacluator.
	x = x / 2 when x is even
	x = x * 3 + 1 when x is odd
	stop when x = 1

### 1. main
	1. create two children: odd_child, even_child
	2. send number to children
	3. get back number from children
	4. goto 2 when number is not 1
	5. generate new number, goto 2 when not finish

### 2. odd child
	loop:
		get number from main
		calculate next number
		send next number when next number is odd

### 3. even child
	loop:
		get number from main
		calculate next number
		send next number when next number is even

### 4. all-in-one 
	parent/odd-child/even-child are all in this module.
	using argument "odd"/"even" to run distince child.

## That's all.
