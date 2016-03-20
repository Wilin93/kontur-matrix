'use strict';
describe('multMatrix', function() {
    it('Перемножает матрицы А и В', function() {
        expect(window.multMatrix([
            [1, 2],
            [4, 5]
        ], [
            [1, 2],
            [4, 5]
        ])).deep.equal([
            [9, 12],
            [24, 33]
        ]);
    });
});
