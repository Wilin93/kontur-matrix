(function() {
'use strict';

var ROW_TEMPLATE = '<div class="${rcls}">${data}</div>';
var COL_TEMPLATE = '<input class="${cls}" value="${val}">';
var ROW_CLASS_TEMPLATE = 'row_';
var COL_CLASS_TEMPLATE = 'matrix-item__num';
var DEAFULT_MATRIX = [[0,0,1], [0,2,0], [0,0,0], [0,0,0]];

function MatrixViewModel(matrixElement) {
    this.element = matrixElement;
};
var element = document.querySelector('.matrix--A');

MatrixViewModel.prototype.fill = function(matrix) {
    if (!matrix) {
        matrix = DEAFULT_MATRIX;
    }
    var colLen = matrixExample[0].length;
    var rowLen = matrixExample.length;
    var rowsList = [];
    for (var j = 0; j < rowLen; j++){
        var columns = [];
        for (var i = 0; i < colLen; i++){
            var eli = COL_TEMPLATE.replace(
                '${}' ,
                COL_CLASS_TEMPLATE + ' ' + 'el_' + j + '_' + i
            );
            var el = eli.replace('${val}' , matrixExample[j][i]);
            columns[i] = el;
        }
        var colString = columns.join('\n');
        var rowi = ROW_TEMPLATE.replace(
            '${rcls}', ROW_CLASS_TEMPLATE + j
        );
        var row = rowi.replace('${data}', colString);
        rowsList[j] = row;
    }
    var rowsListString = rowsList.join('\n');
    this.element.innerHTML = rowsListString;
};

MatrixViewModel.prototype.addCol = function() {
    var len_j = element.children.length;
    for (var j = 0; j < len_j; j++){
        var row = element.querySelector('.' + ROW_CLASS_TEMPLATE + j);
        var len_i = row.children.length;
        var eli = COL_TEMPLATE.replace(
            '${cls}' ,
            COL_CLASS_TEMPLATE + ' ' + 'el_' + j + '_' + len_i
        );
        var el = eli.replace('${val}' , ' ');
        row.insertAdjacentHTML('beforeend', el);
    }
};

MatrixViewModel.prototype.addRow = function() {
    var len_j = element.children.length;
    var columns = [];
    var row = element.querySelector('.row_0');
    var len_i = row.children.length;
    for (var i = 0; i < len_i; i++){
        var eli = COL_TEMPLATE.replace(
             '${cls}' ,
             COL_CLASS_TEMPLATE + ' ' + 'el_' + len_j + '_' + i
         );
        var el = eli.replace('${val}' , ' ');
        columns[i] = el;
    }
    var colString = columns.join('\n');
    var rowi = ROW_TEMPLATE.replace(
        '${rcls}', ROW_CLASS_TEMPLATE + len_j
    );
    var row = rowi.replace('${data}', colString);

    element.insertAdjacentHTML('beforeend', row);
};

MatrixViewModel.prototype.delCol = function(){
    var len_j = element.children.length;
    if (len_j !== 0){
        for (var j = 0; j < len_j; j++){
            var row = element.querySelector('.' + ROW_CLASS_TEMPLATE + j);
            var inputs = row.querySelectorAll('input');
            var len_i = inputs.length - 1;
            var className = '.' + 'el_' + j + '_' + len_i;
            console.log(className);
            row.querySelector(className).remove();
        }
    }
};

MatrixViewModel.prototype.delRow = function(){
    var len_j = element.children.length;
    if (len_j !== 0){
        element.querySelector(
            '.' + ROW_CLASS_TEMPLATE + (len_j - 1)
        ).remove();
    }
};


})();
