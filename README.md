# Sudoku solver
A sudoku game solver right in your browser. It solves _any_ Sudoku game. It implements an integer linear program to find a feasible solution given a set of initial constraints (_i.e._ starting numbers).

<img style="margin:0px auto;display:block" src="sketch.png" alt="Responsive image" width=450> 

Solving the integer linear program in your browser is possible thanks to the awesome library <a href="http://hgourvest.github.io/glpk.js">Glpk.js</a>, which was bundle for usage in the browser with <a href="http://browserify.org">Browserify</a>.
