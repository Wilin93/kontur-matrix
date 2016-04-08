(function() {
'use strict';

var ROW_TEMPLATE = '<div class="${rcls}">${data}</div>';
var COL_TEMPLATE = '<input oninput="inp_change()"  class="${cls}" value="${val}" enabled>';
var ROW_CLASS_TEMPLATE = 'row row_';
var COL_CLASS_TEMPLATE = 'matrix-item__num';
var DEAFULT_MATRIX = [['',''], ['','']];
var bg = document.querySelector('.matrix-menu');

function MatrixViewModel(matrixElement) {
    this.element = matrixElement;
};

MatrixViewModel.prototype.getRows = function() {
    return this.element.querySelectorAll('.row');
};

MatrixViewModel.prototype.fill = function(dismtrx, matrix) {
    if (!matrix) {
        matrix = DEAFULT_MATRIX;
    }
    if (!dismtrx) {
        dismtrx = 'enabled';
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
            var elj =eli.replace('enabled', dismtrx);
            var value = matrix[j][i];
            if (value === null) {
                value = '';
            }
            var el = elj.replace('${val}', value);
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
    var row_i = this.element.querySelector('.row_0');
    var inputs_i = row_i.querySelectorAll('input').length;
    var er = document.querySelector('#error_1');
    if (er !== null){
        er.parentNode.removeChild(er);
    }
    bg.style.background = '#bcbcbc';
    if (inputs_i < 10){
        for (var j = 0; j < len_j; j++){
            var row = this.element.querySelector('.row_' + j);
            var inputs = row.querySelectorAll('input');
            var len_i = inputs.length;
            var eli = COL_TEMPLATE.replace(
                '${cls}' ,
                'matrix-item__num el_' + j + '_' + len_i
            );
            var el = eli.replace('${val}' , '');
            row.insertAdjacentHTML('beforeend', el);
        }
    }
};

MatrixViewModel.prototype.addRow = function() {
    var len_j = this.getRows().length;
    var columns = [];
    var row = this.element.querySelector('.row_0');
    var inputs = row.querySelectorAll('input');
    var len_i = inputs.length;
    var er = document.querySelector('#error_1');
    if (er !== null){
        er.parentNode.removeChild(er);
    }
    bg.style.background = '#bcbcbc';
    if (len_j < 10){
        for (var i = 0; i < len_i; i++){
            var eli = COL_TEMPLATE.replace(
                 '${cls}' ,
                 'matrix-item__num el_' + len_j + '_' + i
             );
            var el = eli.replace('${val}' , '');
            columns[i] = el;
        }
        var colString = columns.join('\n');
        var rowi = ROW_TEMPLATE.replace(
            '${rcls}', 'row row_' + len_j
        );
        var row = rowi.replace('${data}', colString);
        this.element.insertAdjacentHTML('beforeend', row);
    }
};

MatrixViewModel.prototype.delCol = function(){
    var len_j = this.getRows().length;
    var row = this.element.querySelector('.row');
    var inputs = row.querySelectorAll('input');
    var len_i = inputs.length;
    var er = document.querySelector('#error_1');
    if (er !== null){
        er.parentNode.removeChild(er);
    }
    bg.style.background = '#bcbcbc';
    if (len_i !== 2){
        for (var j = 0; j < len_j; j++){
            var row = this.element.querySelector('.row_' + j);
            var inputs = row.querySelectorAll('input');
            var len_i = inputs.length - 1;
            var className = '.' + 'el_' + j + '_' + len_i;
            var input_d = row.querySelector(className);
            input_d.parentNode.removeChild(input_d);
        }
    }
};

MatrixViewModel.prototype.delRow = function(){
    var len_j = this.getRows().length;
    var er = document.querySelector('#error_1');
    if (er !== null){
        er.parentNode.removeChild(er);
    }
    bg.style.background = '#bcbcbc';
    if (len_j !== 2){
        var row_d = this.element.querySelector('.row_' + (len_j - 1));
        row_d.parentNode.removeChild(row_d);
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
            else {
                item.value = '0';
                mx[j][i] = '';
            }
        }
    }
    return mx;
};

MatrixViewModel.multMatrix = function(A, B) {
    var matrix = [];
    var er = document.querySelector('#error_1');
    if (A[0].length !== B.length) {
        if (er === null){
            var BLOCK_TEMPLATE = '<div id="error_1" class="matrix-menu__block">Kоличество столбцов А должно быть равно кол-ву строк В</div>';
            bg.style.background = '#f6c1c0';
            bg.insertAdjacentHTML('beforeend', BLOCK_TEMPLATE);
        }
        return false;
    };
    for (var i = 0; i < A.length; i++) {
        matrix[i] = [];
    };
    for (var k = 0; k < B[0].length; k++) {
        for (var i = 0; i < A.length; i++) {
            var t = 0;
            for (var j = 0; j < B.length; j++) {
                if (A[i][j] === ''){
                    A[i][j] = 0;
                };
                if (B[j][k] === ''){
                    B[j][k] = 0;
                };
                t = t + A[i][j] * B[j][k];
                matrix[i][k] = t;
            }
        }
    };
    if (er !== null){
        er.parentNode.removeChild(er);
    }
    bg.style.background = '#bcbcbc';
    return matrix;
};

MatrixViewModel.prototype.cleanMatrix = function() {
    var len_j = this.getRows().length;
    var row = this.element.querySelector('.row');
    var inputs = row.querySelectorAll('input');
    var len_i = inputs.length;
    var er = document.querySelector('#error_1');
    if (er !== null){
        er.parentNode.removeChild(er);
    }
    bg.style.background = '#bcbcbc';
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

MatrixViewModel.change_Matrix = function() {
    var d1=document.getElementById("blck_mat_A");
    var d2=document.getElementById("blck_mat_B");
    var d11=d1.cloneNode(true);
    var d22=d2.cloneNode(true);
    d2.parentNode.insertBefore(d11,d2);
    d1.parentNode.insertBefore(d22,d1);
    d1.parentNode.removeChild(d1);
    d2.parentNode.removeChild(d2);
    var er = document.querySelector('#error_1');
    if (er !== null){
        er.parentNode.removeChild(er);
    }
    bg.style.background = '#bcbcbc';
};



window.MatrixViewModel = MatrixViewModel;

})();
