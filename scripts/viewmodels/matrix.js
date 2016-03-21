(function() {
'use strict';

var ROW_TEMPLATE = '<div class="${rcls}">${data}</div>';
var COL_TEMPLATE = '<input class="${cls}" value="${val}">';
var ROW_CLASS_TEMPLATE = 'row row_';
var COL_CLASS_TEMPLATE = 'matrix-item__num';
var DEAFULT_MATRIX = [[null,null,null], [null,null,null], [null,null,null]];

function MatrixViewModel(matrixElement) {
    this.element = matrixElement;
};

MatrixViewModel.prototype.getRows = function() {
    return this.element.querySelectorAll('.row');
};

MatrixViewModel.prototype.fill = function(matrix) {
    if (!matrix) {
        matrix = DEAFULT_MATRIX;
    }
    var colLen = matrix[0].length;
    var rowLen = matrix.length;
    var rowsList = [];
    for (var j = 0; j < rowLen; j++){
        var columns = [];
        for (var i = 0; i < colLen; i++){
            var eli = COL_TEMPLATE.replace(
                '${cls}' ,
                'matrix-item__num el_' + j + '_' + i
            );
            var value = matrix[j][i];
            if (value === null) {
                value = '';
            }
            var el = eli.replace('${val}', value);
            columns[i] = el;
        }
        var colString = columns.join('\n');
        var rowi = ROW_TEMPLATE.replace(
            '${rcls}', 'row row_' + j
        );
        var row = rowi.replace('${data}', colString);
        rowsList[j] = row;
    }
    var rowsListString = rowsList.join('\n');
    this.element.innerHTML = rowsListString;
};

MatrixViewModel.prototype.addCol = function() {
    var len_j = this.getRows().length;
    for (var j = 0; j < len_j; j++){
        var row = this.element.querySelector('.row_' + j);
        var inputs = row.querySelectorAll('input');
        var len_i = inputs.length;
        var eli = COL_TEMPLATE.replace(
            '${cls}' ,
            'matrix-item__num el_' + j + '_' + len_i
        );
        var el = eli.replace('${val}' , ' ');
        row.insertAdjacentHTML('beforeend', el);
    }
};

MatrixViewModel.prototype.addRow = function() {
    var len_j = this.getRows().length;
    var columns = [];
    var row = this.element.querySelector('.row_0');
    var inputs = row.querySelectorAll('input');
    var len_i = inputs.length;
    for (var i = 0; i < len_i; i++){
        var eli = COL_TEMPLATE.replace(
             '${cls}' ,
             'matrix-item__num el_' + len_j + '_' + i
         );
        var el = eli.replace('${val}' , ' ');
        columns[i] = el;
    }
    var colString = columns.join('\n');
    var rowi = ROW_TEMPLATE.replace(
        '${rcls}', 'row row_' + len_j
    );
    var row = rowi.replace('${data}', colString);

    this.element.insertAdjacentHTML('beforeend', row);
};

MatrixViewModel.prototype.delCol = function(){
    var len_j = this.getRows().length;
    var row = this.element.querySelector('.row');
    var inputs = row.querySelectorAll('input');
    var len_i = inputs.length;
    if (len_i - 1 !== 0){
        for (var j = 0; j < len_j; j++){
            var row = this.element.querySelector('.row_' + j);
            var inputs = row.querySelectorAll('input');
            var len_i = inputs.length - 1;
            var className = '.' + 'el_' + j + '_' + len_i;
            row.querySelector(className).remove();
        }
    }
};

MatrixViewModel.prototype.delRow = function(){
    var len_j = this.getRows().length;
    if (len_j - 1 !== 0){
        this.element.querySelector(
            '.row_' + (len_j - 1)
        ).remove();
    }
};

MatrixViewModel.prototype.read = function() {
    var mx = [];
    var len_j = this.getRows().length;
    var row = this.element.querySelector('.row');
    var inputs = row.querySelectorAll('input');
    var len_i = inputs.length;
    for (var j = 0; j < len_j; j++) {
        mx[ j ] = [];
        for (var i = 0; i < len_i; i++) {
            var className = '.' + 'el_' + j + '_' + i;
            var row = this.element.querySelector('.row_' + j);
            var item = row.querySelector(className);
            if (item.value !== '') {
                mx[j][i] = parseInt(item.value);
            }
        }
    }
    console.table(mx);
    return mx;

};

MatrixViewModel.prototype.multMatrix = function(A, B) {
    var matrix = [];
    if (A.length === 0) {
        alert ('Заполните матрицу A');
    };
    if (B.length === 0) {
        alert ('Заполните матрицу B');
    };
    if (A[0].length !== B.length) {
        alert ('количество столбцов А должно быть равно кол-ву строк В');
    };
    for (var i = 0; i < A.length; i++) {
        matrix[i] = [];
    };
    for (var k = 0; k < B[0].length; k++) {
        for (var i = 0; i < A.length; i++) {
            var t = 0;
            for (var j = 0; j < B.length; j++) {
                t = t + A[i][j] * B[j][k];
                matrix[i][k] = t;
            }
        }
    };
    return matrix;
};

MatrixViewModel.prototype.cleanMatrix = function() {
    var len_j = this.getRows().length;
    var row = this.element.querySelector('.row');
    var inputs = row.querySelectorAll('input');
    var len_i = inputs.length;
    for (var j = 0; j < len_j; j++) {
        for (var i = 0; i < len_i; i++) {
            var className = '.' + 'el_' + j + '_' + i;
            var row = this.element.querySelector('.row_' + j);
            var item = row.querySelector(className);
            if (item.value !== '') {
                item.value = '';
            }
        }
    }
}

window.MatrixViewModel = MatrixViewModel;

})();
