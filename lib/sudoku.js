'use strict';

var _ = require('underscore'),
    a1to9 = [1, 2, 3, 4 , 5 , 6, 7, 8, 9];

var SudokuSolver = function(given) {
    this.given = _.flatten(given);
    this.sudoku = _.flatten(given);
};
SudokuSolver.prototype.solve = function(row, col) {
    if (col === 9) {
        col = 0;
        row++;
    }

    if (row === 9) {
        this.createSolution();
        return true;
    } else if (this.getCell(row, col) === 0) {
        var result = false,
            possibleValues = this.possibleValues(row, col);

        for(var i = 0, len = possibleValues.length; i < len; ++i) {
            this.setCell(row, col, possibleValues[i]);
            // console.log('\x1B['+ (1+row*2) + ';' + (2+col*4) + 'H' + possibleValues[i]);
            if (this.solve(row, col + 1)) {
                result = true;
                break;
            }
        };
        if (!result) {
            this.setCell(row, col, 0);
            // console.log('\x1B['+ (1+row*2) + ';' + (2+col*4) + 'H ' );
        }
        return result;
    } else {
        return this.solve(row, col + 1);
    }
};

SudokuSolver.prototype.createSolution = function() {
    this.solution = new Array();
    for (var i = 0; i < 9; i++) {
        this.solution.push(this.sudoku.slice(i * 9, i * 9 + 9));
    };
};

SudokuSolver.prototype.getCell = function(row, col) {
    return this.sudoku[row * 9 + col];
};

SudokuSolver.prototype.setCell = function(row, col, value) {
    this.sudoku[row * 9 + col] = value;
};

SudokuSolver.prototype.show = function() {
    var that = this, str = '\x1B[1J\x1B[1;1H', index, len, cell;
    for (index = 0, len = this.sudoku.length; index < len; ++index) {
        cell = this.sudoku[index];
        if (that.given[index] !== 0) {
            cell = '\x1B[31m' + cell + '\x1B[0m';
        }
        if (cell === 0) {
            cell = ' ';
        }
        if (((index + 1) % 9) === 0 && index > 0) {
            str += ' ' + cell + ' \n';
            if (index / 9 < 8) {
                str += '---+---+---+---+---+---+---+---+---\n'
            }
        } else {
            str += ' ' + cell + ' |'
        }
    };
    console.log(str);
};

SudokuSolver.prototype.solveNakedSingle = function(row, col) {
    var possibleValues = this.possibleValues(row, col);
    if (Array.isArray(possibleValues) && possibleValues.length > 1) {
        return false;
    } else {
        if (Array.isArray(possibleValues)) {
            this.getCell(row, col) = possibleValues[0];
        }
        return true;
    }
};

SudokuSolver.prototype.possibleValues = function(row, col) {
    var result = [], known = [], foundAvailableValue;
    if (this.getCell(row, col) !== 0) {
        result = this.getCell(row, col);
    } else {
        this.knownValuesForRow(row, known);
        this.knownValuesForCol(col, known);
        this.knownValuesForBlock(Math.floor(row/3), Math.floor(col/3), known);
        for(var number = 1, len = known.length; number <= 9; number++) {
            foundAvailableValue = false;
            for(var i = 0; i < len; i++) {
                if (known[i] === number) {
                    foundAvailableValue = true;
                    break;
                }
            }
            if (!foundAvailableValue) {
                result.push(number);
            }
        }
    }
    return result;
};

SudokuSolver.prototype.knownValuesForRow = function(row, result) {
    var cell;
    for (var col = 0; col < 9; col++) {
        cell = this.getCell(row, col);
        if (cell !== 0) {
            result.push(cell);
        }
    };
    return result;
};

SudokuSolver.prototype.knownValuesForCol = function(col, result) {
    var cell;
    for (var row = 0; row < 9; row++) {
        cell = this.getCell(row, col);
        if (cell !== 0) {
            result.push(cell);
        }
    };
    return result;
};

SudokuSolver.prototype.knownValuesForBlock = function(blockRow, blockCol, result) {
    var cell;

    for (var row = blockRow * 3; row < (blockRow + 1) * 3; row++) {
        for (var col = blockCol * 3; col < (blockCol + 1) * 3; col++) {
            cell = this.getCell(row, col);
            if (cell !== 0) {
                result.push(cell);
            }
        };
    };
    return result;
};

module.exports = SudokuSolver;
