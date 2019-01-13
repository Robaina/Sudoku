# Sudoku game
What are the rules for a starting condition that guarantee a solvable Sudoku game?

1. Must satisfy Sudoku constraints: (i) each of the nine 3x3 squares must contain all numbers from 1 to 9, (ii) each row and column in the board must contain all numbers from 1 to 9.
2. Must contain a number of revealed numbers such that the game is uniquely determined.

But, how to do this? One way to go is the following:

Fist devise an algorithm to solve a Sudoku game. Then from a filled board, one could go backwards and cover numbers such that the game is still solvable by the algorithm.

Of course, one fist has to guarantee that the two constraints of the Sudoku game, above stated, are always satisfied.

Then, now, how would this solving algorithm look like?

So, for a 2x2 case, It seems that I can easily generate a filled board by paying with permutations of the sequence $s = 1,2,3,4$. If all rows contain a single permutation of the sequence then I think rows and columns contain all numbers. Then one has to check for the inner squares and adjust the permutation accordingly.
