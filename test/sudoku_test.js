'use strict';

var assert = require('chai').assert,
    _ = require('underscore'),
    u = 0,
    SudokuSolver = require('../lib/sudoku');

describe('sudoko.js', function() {
    var sudokuSolver, given, solved;

    beforeEach(function() {
        given = [
            [u, u, u, u, u, 6, u, u, 2],
            [7, 6 ,2, 8, 5, u, u, u, 4],
            [5, 9, 4, u, u, u, u, 6, u],
            [u, u, u, 2, u, u, 6, 1, u],
            [u, u, u, u, 8, u, u, u, u],
            [u, 7, u, 9, u, u, u, u, u],
            [u, u, u, u, u, 8, 9, u, 5],
            [8, 5, 3, 6, 2, u, u, 4, u],
            [2, u, u, u, u, 1, 8, u, u]];
        solved = [
            [1, 3, 8, 4, 9, 6, 5, 7, 2],
            [7, 6 ,2, 8, 5, 3, 1, 9, 4],
            [5, 9, 4, 7, 1, 2, 3, 6, 8],
            [9, 8, 5, 2, 3, 4, 6, 1, 7],
            [3, 2, 6, 1, 8, 7, 4, 5, 9],
            [4, 7, 1, 9, 6, 5, 2, 8, 3],
            [6, 1, 7, 3, 4, 8, 9, 2, 5],
            [8, 5, 3, 6, 2, 9, 7, 4, 1],
            [2, 4, 9, 5, 7, 1, 8, 3, 6]];
        sudokuSolver = new SudokuSolver(given);
    });

    it('solves the test sudoku', function() {
        assert.ok(sudokuSolver.solve(0, 0), sudokuSolver.sudoku);
        console.log(sudokuSolver.solution);
        assert.deepEqual(sudokuSolver.solution, solved);
    });

    describe('amibguous sudoku', function() {
        it('terminates on ambiguous sudoku', function() {
            var givenAmbiguous = [
                    [u, u, u, u, u, 6, u, u, 2],
                    [u, 6 ,2, 8, 5, u, u, u, 4],
                    [5, 9, 4, u, u, u, u, 6, u],
                    [u, u, u, 2, u, u, 6, 1, u],
                    [u, u, u, u, 8, u, u, u, u],
                    [u, u, u, 9, u, u, u, u, u],
                    [u, u, u, u, u, 8, 9, u, 5],
                    [8, 5, u, 6, 2, u, u, 4, u],
                    [2, u, u, u, u, 1, 8, u, u]];
            sudokuSolver = new SudokuSolver(givenAmbiguous);
            assert.ok(sudokuSolver.solve(0, 0));
            assert.notInclude(_.flatten(sudokuSolver.solution), 0);
        });
    });

    describe('knownValuesForRow()', function() {
        it('returns all known values of row', function() {
            var result = sudokuSolver.knownValuesForRow(0, []);
            assert.sameMembers(result, [2, 6]);
        });
    });

    describe('knownValuesForCol()', function() {
        it('returns all known values of column', function() {
            var result = sudokuSolver.knownValuesForCol(0, []);
            assert.sameMembers(result, [2, 5, 7, 8]);
        });
    });

    describe('knownValuesForBlock()', function() {
        it('returns all known values of block', function() {
            var result = sudokuSolver.knownValuesForBlock(0, 0, []);
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

    describe('solveNakedSingle()', function() {
        it('returns true if it is already known', function() {
            var solved = sudokuSolver.solveNakedSingle(0, 8);
            assert.equal(solved, true);
        });

        it('returns false if it cannot be solved yet', function() {
            var solved = sudokuSolver.solveNakedSingle(0, 0);
            assert.equal(solved, false);
        });

        it('solves the cell if only one possibility', function() {
            var solved = sudokuSolver.solveNakedSingle(1, 8);
            assert.equal(solved, true);
            assert.equal(sudokuSolver.getCell(1, 8), 4);
        });
    });
});




