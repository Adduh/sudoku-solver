var _ = require('underscore');
var One2Nine = [1, 2, 3, 4 , 5 , 6, 7, 8, 9];

var SudokuSolver = function(unsolvedSudoku) {
    var that = this;
    this.sudoku = unsolvedSudoku;
};

SudokuSolver.prototype.solve = function() {

};

SudokuSolver.prototype.knownValuesForRow = function(row) {
    var result = [];
    for (col = 0; col < 9; col++) {
        if (this.sudoku[row][col] !== 0) {
            result.push(this.sudoku[row][col]);
        }
    };
    return result.sort();
};

SudokuSolver.prototype.knownValuesForCol = function(col) {
    var result = [];
    for (row = 0; row < 9; row++) {
        if (this.sudoku[row][col] !== 0) {
            result.push(this.sudoku[row][col]);
        }
    };
    return result.sort();
};

SudokuSolver.prototype.knownValuesForBlock = function(blockRow, blockCol) {
    var result = [];
    for (row = blockRow*3; row < (blockRow + 1) *3; row++) {
        for (col = blockCol*3; col < (blockCol + 1) *3; col++) {
            if (this.sudoku[row][col] !== 0) {
                result.push(this.sudoku[row][col]);
            }
        };
    };
    return result.sort();
};

SudokuSolver.prototype.possibleValues = function(row, col) {
    var that = this, result,
        type;
        this.basePossibleValues = _.clone(this.sudoku);
    this.basePossibleValues.forEach(function(row, rowIndex) {
        row.forEach(function(col, colIndex) {
            if (col === 0) {
                that.basePossibleValues[rowIndex][colIndex] = One2Nine;
            }
        });
    });
    type = typeof that.basePossibleValues[row][col];
    if (type !== 'object') {
        result = that.basePossibleValues[row][col];
    } else {
        possibilitiesFromRow = this.knownValuesForRow(row);
        possibilitiesFromCol = this.knownValuesForCol(col);
        console.log(possibilitiesFromRow);
        console.log(possibilitiesFromCol);
        result = _.difference(One2Nine,
                    _.uniq(_.union(possibilitiesFromRow,
                                    possibilitiesFromCol)
                    ));
    }
    return result;
};






module.exports = SudokuSolver;
