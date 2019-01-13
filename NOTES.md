### Some thoughts
1. Found out that you can include constraints in some of the variables only, for instance to fix its value.
2. Interestingly, I believe that all it takes to solve _any_ Sudoky game is an ordinary LP. This is because I think the constraint's matrix $A$ in the Sudoku game is <a href="https://en.wikipedia.org/wiki/Unimodular_matrix#Total_unimodularity">totally unimodular</a> and in these cases, the LP is guaranteed to render integer solutions. Therefore, solving the LP relaxation with the simplex method is sufficient to solve the Sudoku.
3. Currently, I'm stuck in generating the row entry sequences:
<br> 0, 1, 4, 5
<br> 2, 3, 6, 7
<br> 8, 9 ,12, 15
<br> ...
<br> How do we do that in the loop?

<p style="text-align:right; color:rgb(194, 107, 242)"> Semidan Robaina Estevez </p>
