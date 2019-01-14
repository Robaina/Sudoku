let ncols = nrows = 2;
let constraint_array = [];
let selectedCell;

// Build array LP model
constraint_array.push("max: ");
constraint_array = addSquareConstraints(constraint_array);
constraint_array = addRowAndColumnConstraints(constraint_array);
constraint_array = addUniquenessConstraints(constraint_array);

// Reformat to JSON model
model = solver.ReformatLP(constraint_array);

// Solve the model
let sudoku = solver.Solve(model);
let grid_numbers = getGridNumbers();

function displayGrid() {

  let gameGrid = document.getElementById("game_grid");
  gameGrid.style.setProperty("grid-template-columns",
    "repeat(" + ncols + ", auto)");

  for (let n=0; n<nrows*ncols; n++) {

    let bigcell = document.createElement("div");
    bigcell.style.setProperty("grid-template-columns",
      "repeat(" + ncols + ", auto)");
    bigcell.style.setProperty("grid-template-rows",
      "repeat(" + nrows + ", auto)");
    bigcell.setAttribute("class", "big-cell");

    let bigcoor = get2DCoordinates(n, ncols);
    for (let j=0; j<nrows*ncols; j++) {
      let smallcell = document.createElement("div");
      smallcell.setAttribute("class", "small-cell");

      let smallcoor = get2DCoordinates(j, ncols);
      let xcoor = (nrows*bigcoor.x + smallcoor.x);
      let ycoor = (ncols*bigcoor.y + smallcoor.y);

      smallcell.setAttribute("id", "n" + xcoor + ycoor);

      smallcell.addEventListener("click", selectCell);
      smallcell.addEventListener("touch", selectCell);
      smallcell.innerHTML = grid_numbers["" + xcoor + ycoor];
      bigcell.appendChild(smallcell);
    }

    gameGrid.appendChild(bigcell);
  }

}

function getGridNumbers() {
  let grid_numbers = {};
  let entries = Object.entries(sudoku).slice(3);

  for (entry of entries) {

    if (Math.round(entry[1]) === 1) {
      let id = entry[0].slice(1, 3);
      let value = parseInt(entry[0].slice(3));
      grid_numbers[id] = value;
    }
  }
  return grid_numbers
}

function get2DCoordinates(n, width) {
  let j = n % width;
  let i = Math.floor(n / width);
  return {"x": i, "y": j}
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

function get2DCoordinates(n, width) {
  let j = n % width;
  let i = Math.floor(n / width);
  return {"x": i, "y": j}
}

function addSquareConstraints(constraint_array) {
    let constraint_str;
    for (let i=1; i<=nrows**2; i++) {
        for (let n=0; n<nrows*ncols; n++) {
            let bigcoor = get2DCoordinates(n, ncols);
                constraint_str = "";
                for (let m=0; m<nrows*ncols; m++) {
                    let smallcoor = get2DCoordinates(m, ncols);

                    constraint_str += "x" + (nrows*bigcoor.x + smallcoor.x) + (ncols*bigcoor.y + smallcoor.y) + i + " ";
                }
                constraint_str += "= 1";
                constraint_array.push(constraint_str);
        }
    }
    return constraint_array
}

function addRowAndColumnConstraints(constraint_array) {
    let row_str, col_str;
    for (let i=1; i<=nrows**2; i++) {
        for (let n=0; n<nrows**2; n++) {
            row_str = col_str = "";
            for(let m=0; m<ncols**2; m++) {
                row_str += "x" + n + m + i + " ";
                col_str += "x" + m + n + i + " ";
            }
            row_str += "= 1";
            col_str += "= 1";
            constraint_array.push(row_str, col_str);
        }
    }
    return constraint_array
}

function addUniquenessConstraints(constraint_array) {
    let constraint_str;
    for (let n=0; n<nrows**2; n++) {
        for(let m=0; m<ncols**2; m++) {
            constraint_str = "";
            for (let i=1; i<=nrows**2; i++) {
                constraint_str += "x" + n + m + i + " ";
            }
            constraint_str += "= 1";
            constraint_array.push(constraint_str);
        }
    }
    return constraint_array
}
