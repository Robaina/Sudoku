// Build LP model
// let ncols = nrows = 2;
// let model;
//
// function addSquareConstraints(constraint_array, n=2) {
//
//     for (let i=0; i<n**4 - 1; i+=n**2) {
//         for (let j=1; j<=n**2; j++) {
//             constraint_str = "";
//             for (let k=0; k<n**2; k++) {
//                 constraint_str += "x" + (i + k) + j + " ";
//             }
//             constraint_str += "= 1";
//             constraint_array.push(constraint_str);
//         }
//     }
//     return constraint_array
// }
//
//
// model = [
//           "max: 1200 table 1600 dresser",
//           "30 table 20 dresser <= 300",
//           "5 table 10 dresser <= 110",
//           "30 table 50 dresser <= 400",
//           "int table",
//           "int dresser",
//         ];
//
//
// // Reformat to JSON model
// model = solver.ReformatLP(model);
// let result = solver.Solve(model);
