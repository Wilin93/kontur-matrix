'use strict';
describe('multMatrix', function() {
    it('Перемножает матрицы А и В', function() {
        expect(multMatrix([
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
    it('Работает с пустыми матрицами', function() {
        expect(multMatrix([
            ['', ''],
            ['', '']
        ], [
            ['', ''],
            ['', '']
        ])).deep.equal([
            [0, 0],
            [0, 0]
        ]);
    });
    it('Возвращает false при неправильных размерностях матриц', function() {
        expect(multMatrix([
            ['', '', ''],
            ['', '', '']
        ], [
            ['', ''],
            ['', '']
        ])).deep.equal(false);
    });
});
