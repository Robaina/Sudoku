let ncols = nrows = 3;
let selectedCell;
let initialCellValues = {"x01": 2, "x05": 3, "x08": 4,
                         "x10": 8, "x13": 7, "x16": 3,
                         "x17": 9, "x22": 7, "x27": 6,
                         "x28": 1, "x32": 3, "x34": 7,
                         "x38": 8, "x42": 6, "x45": 2,
                         "x46": 1, "x47": 3, "x50": 5,
                         "x61": 4, "x63": 8, "x68": 6,
                         "x72": 8, "x74": 1, "x77": 2,
                         "x81": 5, "x85": 9};
let selectedCells = [];
let selectedCellsNumbers = [];

function fillGrid() {
  let grid_numbers = getGridNumbers(solution);

  for (let n=0; n<nrows*ncols; n++) {

    let bigcoor = get2DCoordinates(n, ncols);
    for (let j=0; j<nrows*ncols; j++) {

      let smallcoor = get2DCoordinates(j, ncols);
      let xcoor = (nrows*bigcoor.x + smallcoor.x);
      let ycoor = (ncols*bigcoor.y + smallcoor.y);
      let smallCell = document.getElementById("x" + xcoor + ycoor);

      if (smallCell.innerHTML === "0") {
        smallCell.classList.remove("empty-cell");
        smallCell.classList.add("unselected-cell");
        smallCell.innerHTML = grid_numbers["" + xcoor + ycoor];
      }

    }
  }
}

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
      let smallCell = document.createElement("div");
      smallCell.setAttribute("class", "small-cell");

      let smallcoor = get2DCoordinates(j, ncols);
      let xcoor = (nrows*bigcoor.x + smallcoor.x);
      let ycoor = (ncols*bigcoor.y + smallcoor.y);

      smallCell.setAttribute("id", "x" + xcoor + ycoor);
      smallCell.setAttribute("contenteditable", "true");
      smallCell.addEventListener("click", selectCell);
      smallCell.addEventListener("touch", selectCell);

      if (Object.keys(initialCellValues).includes(smallCell.id)) {
        smallCell.innerHTML = initialCellValues[smallCell.id];
        smallCell.classList.add("unselected-cell");
      } else {
        smallCell.classList.add("empty-cell");
        smallCell.innerHTML = "0";
      }

      bigcell.appendChild(smallCell);
    }

    gameGrid.appendChild(bigcell);
  }

}

function getGridNumbers(solution) {
  let grid_numbers = {};
  let entries = Object.entries(solution);

  for (entry of entries) {

    if (entry[1] === 1) {
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

function selectCell(event) {
  selectedCell = event.target;
  removeSelected();
  selectedCell.classList.remove("empty-cell");
  selectedCell.classList.add("selected-cell");
  if (selectedCell.innerHTML === "0") {
    selectedCell.innerHTML = "";
  }
}

function removeSelected() {
  let cells = document.getElementsByClassName("small-cell");
  for (let i=0; i<cells.length; i++) {
    if (cells[i].classList.contains("selected-cell") & cells[i].innerHTML.length === 0) {
      cells[i].classList.remove("selected-cell");
      cells[i].classList.add("empty-cell");
      cells[i].innerHTML = "0";
    }
    if (cells[i].classList.contains("selected-cell")) {
      cells[i].classList.remove("selected-cell");
      cells[i].classList.add("unselected-cell");
    }
  }
}

function reset() {
  selectedCells = [];
  removeSelected();
  let cells = document.getElementsByClassName("small-cell");
  for (let i=0; i<cells.length; i++) {
    cells[i].innerHTML = "0";
    cells[i].classList.remove("unselected-cell", "initial-cell");
    cells[i].classList.add("empty-cell");
  }
}

function getCellNumbers() {
  for (let n=0; n<nrows*ncols; n++) {

    let bigcoor = get2DCoordinates(n, ncols);
    for (let j=0; j<nrows*ncols; j++) {

      let smallcoor = get2DCoordinates(j, ncols);
      let xcoor = (nrows*bigcoor.x + smallcoor.x);
      let ycoor = (ncols*bigcoor.y + smallcoor.y);
      let smallCell = document.getElementById("x" + xcoor + ycoor);
      let initialCondition = smallCell.innerHTML;
      smallCell.classList.add("unselected-cell");

      if (initialCondition !== "0") {
        smallCell.classList.remove("unselected-cell");
        smallCell.classList.add("initial-cell");
        selectedCells.push(smallCell.id + initialCondition);
      }
    }
  }
}
