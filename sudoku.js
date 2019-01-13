let selectedCell;
let sudoku = solver.Solve(model);
console.log(sudoku);

// let keys = Object.keys(sudoku).slice(3);
// let values = Object.values(sudoku).slice(3);
// keys = keys.map((key) => key.replace("x", ""));

// let dictionary = {
//   "11": 0,
//   "12": 1,
//   "13": 4,
//   "14": 5,
//   "21": 2,
//   "22": 3,
//   "23": 6,
//   "24": 7,
//   "31": 8,
//   "32": 9,
//   "33": 12,
//   "34": 13,
//   "41": 10,
//   "42": 11,
//   "43": 14,
//   "44": 15
// };

function getGridNumbers() {
  let grid_numbers = {};
  let entries = Object.entries(sudoku).slice(3);

  for (entry of entries) {
    if (entry[1] === 1) {
      let id = entry[0].slice(1, entry[0].length - 1);
      let value = parseInt(entry[0].slice(entry[0].length - 1));
      grid_numbers[id] = value;
    }
  }
  return grid_numbers
}

let grid_numbers = getGridNumbers();

function get2DCoordinates(n, width) {
  let i = n % width;
  let j = Math.floor(n / width);
  return {"i": i, "j": j}
}

function displayGrid() {

  let ncols = nrows = 2;
  let number = 0;
  let gameGrid = document.getElementById("game_grid");
  gameGrid.style.setProperty("grid-template-columns",
    "repeat(" + ncols + ", auto)");
  // gameGrid.style.setProperty("grid-template-rows",
  //   "repeat(" + nrows + ", auto)");

  for (let i=0; i<nrows*ncols; i++) {

    let bigcell = document.createElement("div");
    bigcell.style.setProperty("grid-template-columns",
      "repeat(" + ncols + ", auto)");
    bigcell.style.setProperty("grid-template-rows",
      "repeat(" + nrows + ", auto)");
    bigcell.setAttribute("class", "big-cell");

    for (let j=0; j<nrows*ncols; j++) {
      let smallcell = document.createElement("div");
      smallcell.setAttribute("class", "small-cell");

      let coor = get2DCoordinates(number, nrows**2);
      smallcell.setAttribute("id", "n" + coor.i + coor.j);

      smallcell.addEventListener("click", selectCell);
      smallcell.addEventListener("touch", selectCell);
      // smallcell.innerHTML = grid_numbers[number];
      bigcell.appendChild(smallcell);
      number++;
    }

    gameGrid.appendChild(bigcell);
  }

}


function selectNumber() {
  let input = document.getElementById("input-number");
  let number = input.value;
  selectedCell.innerHTML = number.toString();
  selectedCell.classList.remove("selected-cell");
}

function selectCell(event) {
  selectedCell = event.target;
  console.log(selectedCell.id);
  selectedCell.classList.add("selected-cell");
}
