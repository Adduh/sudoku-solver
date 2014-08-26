'use strict';

var _ = require('underscore');
var a1to9 = [1, 2, 3, 4 , 5 , 6, 7, 8, 9];

var SudokuSolver = function(given) {
    this.sudoku = given;
};

SudokuSolver.prototype.solve = function(x, y, callback) {
    var that = this;
    if (x === 9) {
        x = 0;
        y++;
    }

    if (y === 9) {
        var result = callback(this.sudoku);
        callback = function() {};
        return result;
    } else if (this.sudoku[x][y] === 0) {
        this.possibleValues(x, y).forEach(function(value) {
            that.sudoku[x][y] = value;
            if (that.solve(x + 1, y, callback)) {
                return true;
            }
            that.sudoku[x][y] = 0;
            return false;

        });
    } else {
        that.solve(x + 1, y, callback);
    }
};

SudokuSolver.prototype.solveNakedSingle = function(x, y) {
    var possibleValues = this.possibleValues(x, y);
    if (Array.isArray(possibleValues) && possibleValues.length > 1) {
        return false;
    } else {
        if (Array.isArray(possibleValues)) {
            this.sudoku[x][y] = possibleValues[0];
        }
        return true;
    }
};

SudokuSolver.prototype.possibleValues = function(x, y) {
    var that = this, result;
    if (this.sudoku[x][y] !== 0) {
        result = that.sudoku[x][y];
    } else {
        var unavailableValues = _.union(
            this.knownValuesForRow(x),
            this.knownValuesForCol(y),
            this.knownValuesForBlock(Math.floor(x/3), Math.floor(y/3)));
        result = _.difference(a1to9, unavailableValues);
    }
    return result;
};

SudokuSolver.prototype.knownValuesForRow = function(x) {
    var result = [];
    for (var y = 0; y < 9; y++) {
        if (this.sudoku[x][y] !== 0) {
            result.push(this.sudoku[x][y]);
        }
    };
    return result.sort();
};

SudokuSolver.prototype.knownValuesForCol = function(y) {
    var result = [];
    for (var x = 0; x < 9; x++) {
        if (this.sudoku[x][y] !== 0) {
            result.push(this.sudoku[x][y]);
        }
    };
    return result.sort();
};

SudokuSolver.prototype.knownValuesForBlock = function(blockX, blockY) {
    var result = [];
    for (var x = blockX * 3; x < (blockX + 1) * 3; x++) {
        for (var y = blockY * 3; y < (blockY + 1) * 3; y++) {
            if (this.sudoku[x][y] !== 0) {
                result.push(this.sudoku[x][y]);
            }
        };
    };
    return result.sort();
};

module.exports = SudokuSolver;
