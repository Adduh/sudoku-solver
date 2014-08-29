'use strict';

var _ = require('underscore');

var SudokuSolver = function(given) {
    this.given = _.flatten(given);
    this.sudoku = _.flatten(given);
};

SudokuSolver.prototype.solve = function() {
    if (!this.solveLogical()) { this.solveBacktrack(0, 0); }
};


SudokuSolver.prototype.solveBacktrack = function(row, col) {
    if (col === 9) {
        col = 0;
        row++;
    }

    if (row === 9) {
        this.getField();
        return true;
    } else if (this.getCell(row, col) === 0) {
        var result = false,
            possibleValues = this.possibleValues(row, col);

        for (var i = 0, len = possibleValues.length; i < len; ++i) {
            this.setCell(row, col, possibleValues[i]);
            if (this.solveBacktrack(row, col + 1)) {
                result = true;
                break;
            }
        }
        if (!result) { this.setCell(row, col, 0); }
        return result;
    } else {
        return this.solveBacktrack(row, col + 1);
    }
};
SudokuSolver.prototype.solveLogical = function() {
    while (true) {
        if (!this.solveNakedSingles() && !this.solveHiddenSingles()) { break; }
    }
};

SudokuSolver.prototype.solveNakedSingles = function() {
    var solved = false;
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (this.solveNakedSingle(row, col)) { solved = true; }
        }
    }
    return solved;
};

SudokuSolver.prototype.solveNakedSingle = function(row, col) {
    var possibleValues = this.possibleValues(row, col);
    if (Array.isArray(possibleValues) && possibleValues.length > 1) {
        return false;
    } else {
        if (Array.isArray(possibleValues)) {
            this.setCell(row, col, possibleValues[0]);
            return true;
        }
        return false;
    }
};

SudokuSolver.prototype.solveHiddenSingles = function() {
    var solved = false;
    for(var row = 0; row < 9; row++) {
        if (this.solveHiddenSinglesForRow(row)) { solved = true; }
    }

    for(var col = 0; col < 9; col++) {
        if (this.solveHiddenSinglesForCol(col)) { solved = true; }
    }

    for(var blockRow = 0; blockRow < 3; blockRow++) {
        for(var blockCol = 0; blockCol < 3; blockCol++) {
            if (this.solveHiddenSinglesForBlock(blockRow, blockCol)) {
                solved = true;
            }
        }
    }
    return solved;
};

SudokuSolver.prototype.solveHiddenSinglesForRow = function(row) {
    var solved = false, a = [[], [], [], [], [], [], [], [], []];
    for (var col = 0; col < 9; col++) {
        var poss = this.possibleValues(row, col);
        if (!Array.isArray(poss)) { continue; }
        for (var i = 0; i < poss.length; i++) {
            a[poss[i]-1].push(col);
        }
    }
    for (var j = 0; j < 9; j++) {
        if (a[j].length === 1) {
            this.setCell(row, a[j][0], j + 1);
            solved = true;
        }
    }
    return solved;
};

SudokuSolver.prototype.solveHiddenSinglesForCol = function(col) {
    var solved = false, a = [[], [], [], [], [], [], [], [], []];
    for (var row = 0; row < 9; row++) {
        var poss = this.possibleValues(row, col);
        if (!Array.isArray(poss)) { continue; }
        for (var i = 0; i < poss.length; i++) {
            a[poss[i]-1].push(row);
        }
    }
    for(var j = 0; j < 9; j++) {
        if (a[j].length === 1) {
            this.setCell(a[j][0], col, j + 1);
            solved = true;
        }
    }
    return solved;
};

SudokuSolver.prototype.solveHiddenSinglesForBlock = function(blockRow, blockCol) {
    var solved = false, a = [[], [], [], [], [], [], [], [], []];
    for(var row = blockRow * 3; row < blockRow * 3 + 3; row++) {
        for (var col = blockCol *3; col < blockCol * 3 + 3; col++) {
            var poss = this.possibleValues(row, col);
            if (!Array.isArray(poss)) { continue; }
            for(var i = 0; i < poss.length; i++) {
                a[poss[i]-1].push([row,col]);
            }
        }
    }
    for(var j = 0; j < 9; j++) {
        if (a[j].length === 1) {
            this.setCell(a[j][0][0], a[j][0][1], j + 1);
            solved = true;
        }
    }
    return solved;
};

function indexOfFor(array, value) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) { return i; }
    }
    return -1;
}

SudokuSolver.prototype.possibleValues = function(row, col) {
    var result = [], possibleValues = [];
    if (this.getCell(row, col) !== 0) {
        result = this.getCell(row, col);
    } else {
        this.knownValuesForRow(row, possibleValues);
        this.knownValuesForCol(col, possibleValues);
        this.knownValuesForBlock(Math.floor(row/3), Math.floor(col/3), possibleValues);
        for(var number = 1; number <= 9; number++) {
            if (indexOfFor(possibleValues, number) === -1) {
                result.push(number);
            }
        }
    }
    return result;
};

SudokuSolver.prototype.knownValuesForRow = function(row, result) {
    for (var col = 0; col < 9; col++) {
        var cell = this.getCell(row, col);
        if (cell !== 0) {
            result.push(cell);
        }
    }
};

SudokuSolver.prototype.knownValuesForCol = function(col, result) {
    for (var row = 0; row < 9; row++) {
        var cell = this.getCell(row, col);
        if (cell !== 0) {
            result.push(cell);
        }
    }
};

SudokuSolver.prototype.knownValuesForBlock = function(blockRow, blockCol, result) {
    for (var row = blockRow * 3; row < (blockRow + 1) * 3; row++) {
        for (var col = blockCol * 3; col < (blockCol + 1) * 3; col++) {
            var cell = this.getCell(row, col);
            if (cell !== 0) {
                result.push(cell);
            }
        }
    }
};

SudokuSolver.prototype.getField = function() {
    this.field = [];
    for (var row = 0; row < 9; row++) {
        this.field.push(this.sudoku.slice(row * 9, row * 9 + 9));
    }
    return this.field;
};

SudokuSolver.prototype.getCell = function(row, col) {
    return this.sudoku[row * 9 + col];
};

SudokuSolver.prototype.setCell = function(row, col, value) {
    this.sudoku[row * 9 + col] = value;
};

SudokuSolver.prototype.getRow = function(row) {
    return this.sudoku.slice(row * 9, row * 9 + 9);
};

SudokuSolver.prototype.getCol = function(col) {
    var a = [];
    for (var row = 0; row < 9; row++) {
        a.push(this.getCell(row, col));
    }
    return a;
};

SudokuSolver.prototype.getBlock = function(blockRow, blockCol) {
    var a = [];
    for (var row = blockRow * 3; row < blockRow * 3 + 3; row++) {
        for (var col = blockCol *3; col < blockCol * 3 + 3; col++) {
            a.push(this.getCell(row, col));
        }
    }
    return a;
};

SudokuSolver.prototype.show = function() {
    var str = '';
    for (var index = 0, len = this.sudoku.length; index < len; ++index) {
        var cell = this.sudoku[index];
        if (this.given[index] !== 0) {
            cell = '\x1B[31m' + cell + '\x1B[0m';
        }
        if (cell === 0) {
            cell = ' ';
        }
        if (((index + 1) % 9) === 0 && index > 0) {
            str += ' ' + cell + ' \n';
            if (index / 9 < 8) {
                str += '---+---+---+---+---+---+---+---+---\n';
            }
        } else {
            str += ' ' + cell + ' |';
        }
    }
    console.log(str);
};

module.exports = SudokuSolver;
