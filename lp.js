// construct model string
function get2DCoordinates(n, width) {
  let j = n % width;
  let i = Math.floor(n / width);
  return {"x": i, "y": j}
}

function addSquareConstraints() {
    let c_str = "";
    for (let i=1; i<=nrows**2; i++) {
        for (let n=0; n<nrows*ncols; n++) {
            let bigcoor = get2DCoordinates(n, ncols);
                for (let m=0; m<nrows*ncols; m++) {
                    let smallcoor = get2DCoordinates(m, ncols);

                    c_str += "+x" + (nrows*bigcoor.x + smallcoor.x) + (ncols*bigcoor.y + smallcoor.y) + i + " ";
                }
                c_str += "= 1\n";
        }
    }
    return c_str
}

function addRowAndColumnConstraints() {
    let row_str, col_str;
    let c_str = "";
    for (let i=1; i<=nrows**2; i++) {
        for (let n=0; n<nrows**2; n++) {
            row_str = col_str = "";
            for(let m=0; m<ncols**2; m++) {
                row_str += "+x" + n + m + i + " ";
                col_str += "+x" + m + n + i + " ";
            }
            row_str += "= 1\n";
            col_str += "= 1\n";
            c_str += row_str + col_str;
        }
    }
    return c_str
}

function addUniquenessConstraints() {
    let c_str = "";
    for (let n=0; n<nrows**2; n++) {
        for(let m=0; m<ncols**2; m++) {
            for (let i=1; i<=nrows**2; i++) {
                c_str += "+x" + n + m + i + " ";
            }
            c_str += "= 1\n";
        }
    }
    return c_str
}

function writeConstraints() {
    let constraints_str = "\nSubject To\n";
    constraints_str += addSquareConstraints() + addRowAndColumnConstraints()
        + addUniquenessConstraints();
    return constraints_str
}

function writeBinaryVariables() {
  let b_str = "\nGeneral\n";
  for (let n=0; n<nrows**2; n++) {
      for(let m=0; m<ncols**2; m++) {
          for (let i=1; i<=nrows**2; i++) {
              b_str += "x" + n + m + i + " ";
          }
      }
  }
  return b_str
}

function addInitialCondition() {
  // Allows to specify a number for a given square. This can be used to solve
  // a Sudoku problem.
  let c_str = "";
  for (selectedCell of selectedCells) {
    c_str += selectedCell + " = 1\n";
  }
  return c_str
}

let solution;
let value;

function solveMILP() {

  let model_str = "";
  solution = {};

  removeSelected();
  getCellNumbers();

  // Reformat programs to glpk.js
  model_str += "Minimize\n+x001\n" + writeConstraints() + addInitialCondition() + writeBinaryVariables() + "\nEnd";

  // Call glpk solver and solve model
  let lp = glp_create_prob();
  glp_read_lp_from_string(lp, null, model_str);

  glp_scale_prob(lp, GLP_SF_AUTO);

  let smcp = new SMCP({presolve: GLP_ON});
  glp_simplex(lp, smcp);

  let iocp = new IOCP({presolve: GLP_ON});
  glp_intopt(lp, iocp);

  for (let i=1; i<=glp_get_num_cols(lp); i++){
    value = Math.round(glp_mip_col_val(lp, i));
    if (value === 1) {
      solution[glp_get_col_name(lp, i)] = value;
    }
  }
  if (Object.keys(solution).length > 0) {
    fillGrid();
  } else {
    alert("Invalid input!");
  }
  
  return solution
}
