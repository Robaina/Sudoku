### Some thoughts
First, to be able to use node.js libraries in the browser, one has to bundle all the files into a single script. I did this with [browserify.js](browserify.org) using the command in bash:

```bash
browserify main.js -o bundle.js
```

1. Found out that you can include constraints in some of the variables only, for instance to fix its value.
2. Interestingly, I believe that all it takes to solve _any_ Sudoky game is an ordinary LP. This is because I think the constraint's matrix $A$ in the Sudoku game is [totally unimodular](https://en.wikipedia.org/wiki/Unimodular_matrix#Total_unimodularity) and in these cases, the LP is guaranteed to render integer solutions. Therefore, solving the LP relaxation with the simplex method is sufficient to solve the Sudoku.
3. Currently, I'm stuck in generating the row entry sequences:
<br> 0, 1, 4, 5
<br> 2, 3, 6, 7
<br> 8, 9 ,12, 15
<br> ...
<br> How do we do that in the loop?
4. So I fixed all the previous errors. The problem now is that jsLPSolver is very inefficient, and cannot solve the regular Sudoku in a reasonable time. I'm going to try the JavaScript version of GKLP [glpk.js](https://github.com/hgourvest/glpk.js), in the hope that it will be able to solve. The LP is rather small, with 300 something constraints and 729 variables...

#### Using glpk.js
I have managed to make glpk work. But, unfortunately, binary variables are required since the solution is not integral. Hence, the constraint matrix is clearly not totally unimodular, as I suspected when I realized that a permutation of rows/columns that render 1's consecutive is not possible. Glpk can solve a 3x3 Sudoku with binary variables in under two seconds, though, which is very impressive!
<p style="text-align:right; color:rgb(194, 107, 242)"> Semidan Robaina Estevez </p>

### Input numbers
The idea is that the user inputs an initial condition for the Sudoku game. First by clicking/touching squares then by selecting a number between 1 and 9. Would be cool if the touch event triggered a touch keyboard to select the number. Then, the user clicks on "Go!" and the Sudoku is solved.
