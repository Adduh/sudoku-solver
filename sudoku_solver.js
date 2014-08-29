#!/bin/node

'use strict';

var SudokuSolver = require('./lib/sudoku'),
    given = [
        [0, 0, 0, 0, 0, 6, 0, 0, 2],
        [7, 6 ,2, 8, 5, 0, 0, 0, 4],
        [5, 9, 4, 0, 0, 0, 0, 6, 0],
        [0, 0, 0, 2, 0, 0, 6, 1, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0],
        [0, 7, 0, 9, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 8, 9, 0, 5],
        [8, 5, 3, 6, 2, 0, 0, 4, 0],
        [2, 0, 0, 0, 0, 1, 8, 0, 0]],
    ambi = [
        [0, 0, 0, 0, 0, 6, 0, 0, 2],
        [0, 6 ,2, 8, 5, 0, 0, 0, 4],
        [5, 9, 4, 0, 0, 0, 0, 6, 0],
        [0, 0, 0, 2, 0, 0, 6, 1, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0],
        [0, 0, 0, 9, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 8, 9, 0, 5],
        [8, 5, 0, 6, 2, 0, 0, 4, 0],
        [2, 0, 0, 0, 0, 1, 8, 0, 0]],
    hard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 3, 4, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 5, 3],
        [6, 0, 0, 0, 0, 7, 0, 0, 0],
        [0, 0, 0, 0, 0, 8, 0, 2, 0]],
    reallyHard = [
         [0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 3, 0, 8, 5],
         [0, 0, 1, 0, 2, 0, 0, 0, 0],
         [0, 0, 0, 5, 0, 7, 0, 0, 0],
         [0, 0, 4, 0, 0, 0, 1, 0, 0],
         [0, 9, 0, 0, 0, 0, 0, 0, 0],
         [5, 0, 0, 0, 0, 0, 0, 7, 3],
         [0, 0, 2, 0, 1, 0, 0, 0, 0],
         [0, 0, 0, 0, 4, 0, 0, 0, 9]];
var sudoku = new SudokuSolver(reallyHard);
//sudoku.solveBacktrack(0, 0);
 sudoku.solveLogical();
sudoku.show();
