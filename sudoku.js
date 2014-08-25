'use strict';

var _ = require('underscore');
var a1to9 = [1, 2, 3, 4 , 5 , 6, 7, 8, 9];

var SudokuSolver = function(unsolvedSudoku) {
    var that = this;
    this.sudoku = unsolvedSudoku;
    this.initiatePossibleValues();
};

SudokuSolver.prototype.initiatePossibleValues = function() {
    var that = this;
    this.possibleValues = [];
    this.sudoku.forEach(function(row, rowId) {
        that.possibleValues[rowId] = [];
        row.forEach(function(col, colId) {
            that.possibleValues[rowId][colId] = col === 0 ? a1to9 : col;
        });
    });
};

SudokuSolver.prototype.solve = function() {};

SudokuSolver.prototype.solveCell = function(row, col) {
    var possibilities = this.possibleValuesOfCell(row, col);
    if (Array.isArray(possibilities) && possibilities.length > 1) {
        return false;
    } else {
        if (Array.isArray(possibilities)) {
            this.sudoku[row][col] = possibilities[0];
        }
        return true;
    }
};

SudokuSolver.prototype.possibleValuesOfCell = function(row, col) {
    var that = this, result,
        type = typeof that.possibleValues[row][col];
    if (type !== 'object') {
        result = that.possibleValues[row][col];
    } else {
        var unavailableValues = _.union(
            this.knownValuesForRow(row),
            this.knownValuesForCol(col),
            this.knownValuesForBlock(Math.floor(row/3), Math.floor(col/3)));
        result = _.difference(a1to9, unavailableValues);
    }
    return result;
};

SudokuSolver.prototype.knownValuesForRow = function(row) {
    var result = [];
    for (var col = 0; col < 9; col++) {
        if (this.sudoku[row][col] !== 0) {
            result.push(this.sudoku[row][col]);
        }
    };
    return result.sort();
};

SudokuSolver.prototype.knownValuesForCol = function(col) {
    var result = [];
    for (var row = 0; row < 9; row++) {
        if (this.sudoku[row][col] !== 0) {
            result.push(this.sudoku[row][col]);
        }
    };
    return result.sort();
};

SudokuSolver.prototype.knownValuesForBlock = function(blockRow, blockCol) {
    var result = [];
    for (var row = blockRow*3; row < (blockRow + 1) *3; row++) {
        for (var col = blockCol*3; col < (blockCol + 1) *3; col++) {
            if (this.sudoku[row][col] !== 0) {
                result.push(this.sudoku[row][col]);
            }
        };
    };
    return result.sort();
};

module.exports = SudokuSolver;
