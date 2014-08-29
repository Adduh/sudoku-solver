'use strict';

var SudokuSolver = require('./lib/sudoku'),
    u = 0,
    given = [
        [u, u, u,  u, u, 6,  u, u, 2],
        [7, 6 ,2,  8, 5, u,  u, u, 4],
        [5, 9, 4,  u, u, u,  u, 6, u],

        [u, u, u,  2, u, u,  6, 1, u],
        [u, u, u,  u, 8, u,  u, u, u],
        [u, 7, u,  9, u, u,  u, u, u],

        [u, u, u,  u, u, 8,  9, u, 5],
        [8, 5, 3,  6, 2, u,  u, 4, u],
        [2, u, u,  u, u, 1,  8, u, u]],
    ambi = [
        [u, u, u,  u, u, 6,  u, u, 2],
        [u, 6 ,2,  8, 5, u,  u, u, 4],
        [5, 9, 4,  u, u, u,  u, 6, u],

        [u, u, u,  2, u, u,  6, 1, u],
        [u, u, u,  u, 8, u,  u, u, u],
        [u, u, u,  9, u, u,  u, u, u],

        [u, u, u,  u, u, 8,  9, u, 5],
        [8, 5, u,  6, 2, u,  u, 4, u],
        [2, u, u,  u, u, 1,  8, u, u]],
    hard = [
        [u, u, u,  7, u, 4,  u, u, 5],
        [u, 2, u,  u, 1, u,  u, 7, u],
        [u, u, u,  u, 8, u,  u, u, 2],

        [u, 9, u,  u, u, 6,  2, 5, u],
        [6, u, u,  u, 7, u,  u, u, 8],
        [u, 5, 3,  2, u, u,  u, 1, u],

        [4, u, u,  u, 9, u,  u, u, u],
        [u, 3, u,  u, 6, u,  u, 9, u],
        [2, u, u,  4, u, 7,  u, u, u]],
    hardToBruteforce = [
         [u, u, u,  u, u, u,  u, u, u],
         [u, u, u,  u, u, 3,  u, 8, 5],
         [u, u, 1,  u, 2, u,  u, u, u],

         [u, u, u,  5, u, 7,  u, u, u],
         [u, u, 4,  u, u, u,  1, u, u],
         [u, 9, u,  u, u, u,  u, u, u],

         [5, u, u,  u, u, u,  u, 7, 3],
         [u, u, 2,  u, 1, u,  u, u, u],
         [u, u, u,  u, 4, u,  u, u, 9]];
[given, ambi, hard, hardToBruteforce].forEach(function(a) {
    var sudoku = new SudokuSolver(a);
    sudoku.solve();
    sudoku.show();
});
