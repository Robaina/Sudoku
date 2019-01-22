let ncols = nrows = 3;
let selectedCell;
// let selectedCells = ["x012", "x053", "x084",
//                      "x108", "x137", "x163",
//                      "x179", "x227", "x276",
//                      "x281", "x323", "x347",
//                      "x388", "x426", "x452",
//                      "x461", "x473", "x505",
//                      "x614", "x638", "x686",
//                      "x728", "x741", "x772",
//                      "x815", "x859"];
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
      if (smallCell.innerHTML === "-") {
        smallCell.style.color = "rgb(240, 239, 239)";
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
      let smallcell = document.createElement("div");
      smallcell.setAttribute("class", "small-cell");

      let smallcoor = get2DCoordinates(j, ncols);
      let xcoor = (nrows*bigcoor.x + smallcoor.x);
      let ycoor = (ncols*bigcoor.y + smallcoor.y);

      smallcell.setAttribute("id", "x" + xcoor + ycoor);
      smallcell.setAttribute("contenteditable", "true");

      smallcell.addEventListener("click", selectCell);
      smallcell.addEventListener("touch", selectCell);
      smallcell.innerHTML = "-";
      bigcell.appendChild(smallcell);
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
  selectedCell.classList.add("selected-cell");
  selectedCell.style.color = "rgb(240, 239, 239)";
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

      if (initialCondition !== "-") {
        smallCell.style.color = "rgb(0, 0, 0)";
        selectedCells.push(smallCell.id + initialCondition);
      }
    }
  }
}

function removeSelected() {
  let cells = document.getElementsByClassName("small-cell");
  for (let i=0; i<cells.length; i++) {
    cells[i].classList.remove("selected-cell");
  }
}

function reset() {
  selectedCells = [];
  let cells = document.getElementsByClassName("small-cell");
  for (let i=0; i<cells.length; i++) {
    cells[i].innerHTML = "-";
    cells[i].style.color = "rgba(240, 239, 239, 0)";
    // cells[i].style.color = "rgb(240, 239, 239)";
  }
}
