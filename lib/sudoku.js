'use strict';

var a1to9 = [1, 2, 3, 4 , 5 , 6, 7, 8, 9];

var SudokuSolver = function(given) {
    this.sudoku = given;
};
SudokuSolver.prototype.solve = function(row, col) {
    var that = this;
    if (col === 9) {
        col = 0;
        row++;
    }

    if (row === 9) {
        return true;
    } else if (this.sudoku[row][col] === 0) {
        var result = false,
            possibleValues = this.possibleValues(row, col);

        for(var i = 0, len = possibleValues.length; i < len; ++i) {
            that.sudoku[row][col] = possibleValues[i];
            if (that.solve(row, col + 1)) {
                result = true;
                break;
            }
        };
        if (!result) {
            that.sudoku[row][col] = 0;
        }
        return result;
    } else {
        return that.solve(row, col + 1);
    }
};

SudokuSolver.prototype.solveNakedSingle = function(row, col) {
    var possibleValues = this.possibleValues(row, col);
    if (Array.isArray(possibleValues) && possibleValues.length > 1) {
        return false;
    } else {
        if (Array.isArray(possibleValues)) {
            this.sudoku[row][col] = possibleValues[0];
        }
        return true;
    }
};

SudokuSolver.prototype.possibleValues = function(row, col) {
    var that = this, result;
    if (this.sudoku[row][col] !== 0) {
        result = that.sudoku[row][col];
    } else {
        var unavailableValues = this.knownValuesForRow(row).concat(
            this.knownValuesForCol(col)).concat(
            this.knownValuesForBlock(Math.floor(row/3), Math.floor(col/3))),
            foo = [], foundAvailableValue;
        for(var j = 1; j <= 9; j++) {
            foundAvailableValue = false;
            for(var i = 0, len = unavailableValues.length; i < len; i++) {
                if (unavailableValues[i] === j) {
                    foundAvailableValue = true;
                    break;
                }
            }
            if (!foundAvailableValue) {
                foo.push(j);
            }
        }
        result = foo;
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
    return result;
};

SudokuSolver.prototype.knownValuesForCol = function(col) {
    var result = [];
    for (var row = 0; row < 9; row++) {
        if (this.sudoku[row][col] !== 0) {
            result.push(this.sudoku[row][col]);
        }
    };
    return result;
};

SudokuSolver.prototype.knownValuesForBlock = function(blockRow, blockCol) {
    var result = [];
    for (var row = blockRow * 3; row < (blockRow + 1) * 3; row++) {
        for (var col = blockCol * 3; col < (blockCol + 1) * 3; col++) {
            if (this.sudoku[row][col] !== 0) {
                result.push(this.sudoku[row][col]);
            }
        };
    };
    return result;
};

module.exports = SudokuSolver;
