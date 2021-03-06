'use strict';

var assert = require('chai').assert,
    _ = require('underscore'),
    u = 0,
    SudokuSolver = require('../lib/sudoku');

describe('sudoko.js', function() {
    var sudokuSolver,
        ambiguous = [
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
            [u, u, u,  u, 4, u,  u, u, 9]],
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
        solved = [
            [1, 3, 8,  4, 9, 6,  5, 7, 2],
            [7, 6 ,2,  8, 5, 3,  1, 9, 4],
            [5, 9, 4,  7, 1, 2,  3, 6, 8],

            [9, 8, 5,  2, 3, 4,  6, 1, 7],
            [3, 2, 6,  1, 8, 7,  4, 5, 9],
            [4, 7, 1,  9, 6, 5,  2, 8, 3],

            [6, 1, 7,  3, 4, 8,  9, 2, 5],
            [8, 5, 3,  6, 2, 9,  7, 4, 1],
            [2, 4, 9,  5, 7, 1,  8, 3, 6]],
        solvedHardToBruteforce = [
            [9, 8, 7,  6, 5, 4,  3, 2, 1],
            [2, 4, 6,  1, 7, 3,  9, 8, 5],
            [3, 5, 1,  9, 2, 8,  7, 4, 6],

            [1, 2, 8,  5, 3, 7,  6, 9, 4],
            [6, 3, 4,  8, 9, 2,  1, 5, 7],
            [7, 9, 5,  4, 6, 1,  8, 3, 2],

            [5, 1, 9,  2, 8, 6,  4, 7, 3],
            [4, 7, 2,  3, 1, 9,  5, 6, 8],
            [8, 6, 3,  7, 4, 5,  2, 1, 9]];

    beforeEach(function() {
        sudokuSolver = new SudokuSolver(given);
    });

    it('solves the test sudoku', function() {
        assert.ok(sudokuSolver.solveBacktrack(0, 0));
        assert.deepEqual(sudokuSolver.field, solved);
    });

    describe('amibguous sudoku', function() {
        it('terminates on ambiguous sudoku', function() {
            sudokuSolver = new SudokuSolver(ambiguous);
            assert.ok(sudokuSolver.solveBacktrack(0, 0));
            assert.notInclude(_.flatten(sudokuSolver.field), 0);
        });
    });

    describe('knownValuesForRow()', function() {
        it('returns all known values of row', function() {
            var result = [];
            sudokuSolver.knownValuesForRow(0, result);
            assert.sameMembers(result, [2, 6]);
        });
    });

    describe('knownValuesForCol()', function() {
        it('returns all known values of column', function() {
            var result = [];
            sudokuSolver.knownValuesForCol(0, result);
            assert.sameMembers(result, [2, 5, 7, 8]);
        });
    });

    describe('knownValuesForBlock()', function() {
        it('returns all known values of block', function() {
            var result = [];
            sudokuSolver.knownValuesForBlock(0, 0, result);
            assert.sameMembers(result, [2, 4, 5, 6, 7, 9]);
        });
    });

    describe('possibleValues()', function() {
        it('returns the value for a solved field', function() {
            var possibleValues = sudokuSolver.possibleValues(0, 8);
            assert.equal(possibleValues, 2);
        });

        it('returns only possible values from row and line', function() {
            var possibleValues = sudokuSolver.possibleValues(0, 0);
            assert.sameMembers(possibleValues, [1, 3]);
        });
    });

    describe('solveNakedSingles()', function() {
        it('returns false if nothing was solved', function() {
            // create a field where no more naked singles exist
            sudokuSolver.solveNakedSingles();
            sudokuSolver.solveNakedSingles();
            sudokuSolver.solveNakedSingles();
            assert.equal(sudokuSolver.solveNakedSingles(), false);
        });

        it('solves the cell if only one possibility', function() {
            assert(sudokuSolver.solveNakedSingles());
            assert.equal(sudokuSolver.getCell(8, 1), 4);
        });
    });

    describe('solveNakedSingle()', function() {
        it('returns false the cell was not solved', function() {
            var solved = sudokuSolver.solveNakedSingle(0, 0);
            assert.equal(solved, false);
        });

        it('solves the cell if only one possibility', function() {
            assert(sudokuSolver.solveNakedSingle(8, 1));
            assert.equal(sudokuSolver.getCell(8, 1), 4);
        });
    });

    describe('getRow()', function() {
        it('returns an array with the row', function() {
            assert.deepEqual(sudokuSolver.getRow(0), [u, u, u, u, u, 6, u, u, 2]);
        });
    });

    describe('getCol()', function() {
        it('returns an array with the col', function() {
            assert.deepEqual(sudokuSolver.getCol(0), [u, 7, 5, u, u, u, u, 8, 2]);
        });
    });

    describe('getBlock()', function() {
        it('returns an array with the block values', function() {
            assert.deepEqual(sudokuSolver.getBlock(2, 2), [9, u, 5, u, 4, u, 8, u, u]);
        });
    });

    describe('solveHiddenSingles', function() {
        beforeEach(function() {
            sudokuSolver = new SudokuSolver(hardToBruteforce);
        });

        describe('solveHiddenSinglesForRow()', function() {
            it('return false if nothing was solved', function() {
                assert.ok(!sudokuSolver.solveHiddenSinglesForRow(0));
            });

            it('return true if something was solved', function() {
                assert.ok(sudokuSolver.solveHiddenSinglesForRow(1));
            });

            it('solves hidden singles in first line', function() {
                sudokuSolver.solveHiddenSinglesForRow(1);
                var row = sudokuSolver.getRow(1);
                assert.deepEqual([u, u, u, 1, u, 3, u, 8, 5], row);
            });
        });

        describe('solveHiddenSinglesForCol()', function() {
            it('return false if nothing was solved', function() {
                assert.ok(!sudokuSolver.solveHiddenSinglesForCol(0));
            });

            it('return true if something was solved', function() {
                assert.ok(sudokuSolver.solveHiddenSinglesForCol(4));
            });

            it('solves hidden singles in first line', function() {
                sudokuSolver.solveHiddenSinglesForCol(4);
                var col = sudokuSolver.getCol(4);
                assert.deepEqual([5, u, 2, u, u, u, u, 1, 4], col);
            });
        });

        describe('solveHiddenSinglesForBlock()', function() {
            it('return false if nothing was solved', function() {
                assert.ok(!sudokuSolver.solveHiddenSinglesForBlock(0, 0));
            });

            it('return true if something was solved', function() {
                assert.ok(sudokuSolver.solveHiddenSinglesForBlock(2, 2));
            });

            it('solves hidden singles in first line', function() {
                sudokuSolver.solveHiddenSinglesForBlock(2, 2);
                var block = sudokuSolver.getBlock(2, 2);
                assert.deepEqual([u, 7, 3, u, u, u, u, 1, 9], block);
            });
        });

        describe('solveHiddenSingles()', function() {
            it('return false if nothing was solved', function() {
                // create a field where no more hidden singles exist
                sudokuSolver.solveHiddenSingles();
                sudokuSolver.solveHiddenSingles();
                sudokuSolver.solveHiddenSingles();
                sudokuSolver.solveHiddenSingles();

                assert.ok(!sudokuSolver.solveHiddenSingles());
            });

            it('return true if something was solved', function() {
                assert.ok(sudokuSolver.solveHiddenSingles());
            });

            it('solves some hidden singles', function() {
                sudokuSolver.solveHiddenSingles();
                assert.deepEqual(sudokuSolver.getField(), [
                    [u, u, u,  u, 5, u,  u, u, 1],
                    [u, u, u,  1, u, 3,  u, 8, 5],
                    [u, 5, 1,  u, 2, u,  u, u, u],

                    [1, u, u,  5, u, 7,  u, u, u],
                    [u, u, 4,  u, u, u,  1, 5, u],
                    [u, 9, 5,  4, u, 1,  u, u, u],

                    [5, 1, u,  u, u, u,  u, 7, 3],
                    [u, u, 2,  u, 1, u,  u, u, u],
                    [u, u, u,  u, 4, u,  u, 1, 9]]);
            });
        });
    });

    describe('solveLogical', function() {
        it('solves the hard to bruteforce sudoku', function() {
            sudokuSolver = new SudokuSolver(hardToBruteforce);
            sudokuSolver.solveLogical();
            assert.deepEqual(sudokuSolver.getField(), solvedHardToBruteforce);
        });

        it('returns false if not solved completely', function() {
            sudokuSolver = new SudokuSolver(hard);
            assert(!sudokuSolver.solveLogical());
            assert.deepEqual(sudokuSolver.getField(), [
                [u, u, u,  7, 2, 4,  u, u, 5],
                [u, 2, u,  u, 1, u,  u, 7, u],
                [u, u, u,  u, 8, u,  u, u, 2],

                [u, 9, u,  u, 3, 6,  2, 5, u],
                [6, u, 2,  u, 7, u,  u, u, 8],
                [u, 5, 3,  2, 4, u,  u, 1, u],

                [4, u, u,  u, 9, u,  u, 2, u],
                [u, 3, u,  u, 6, 2,  u, 9, u],
                [2, u, 9,  4, 5, 7,  u, u, u]]);
        });
    });

    describe('solve()', function() {
        it('solves a hard sudoku', function() {
            sudokuSolver = new SudokuSolver(hard);
            sudokuSolver.solve();
            assert.deepEqual(sudokuSolver.getField(),  [
                [ 9, 8, 1,  7, 2, 4,  3, 6, 5 ],
                [ 3, 2, 4,  6, 1, 5,  8, 7, 9 ],
                [ 7, 6, 5,  9, 8, 3,  1, 4, 2 ],

                [ 1, 9, 7,  8, 3, 6,  2, 5, 4 ],
                [ 6, 4, 2,  5, 7, 1,  9, 3, 8 ],
                [ 8, 5, 3,  2, 4, 9,  7, 1, 6 ],

                [ 4, 7, 6,  3, 9, 8,  5, 2, 1 ],
                [ 5, 3, 8,  1, 6, 2,  4, 9, 7 ],
                [ 2, 1, 9,  4, 5, 7,  6, 8, 3 ]]);
        });
    });
});
