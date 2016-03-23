(function() {
    'use strict';

function AppViewModel() {
    this.matrixA = null;
    this.matrixB = null;
    this.matrixC = null;

    this.currentActiveMatrix = null;


}

AppViewModel.prototype.init = function() {
    var elementA = document.querySelector('.matrix--A');
    this.matrixA = new MatrixViewModel(elementA);
    this.matrixA.fill([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    var elementB = document.querySelector('.matrix--B');
    this.matrixB = new MatrixViewModel(elementB);
    this.matrixB.fill([[1, 1, 5], [4, 1, 6], [1, 8, 9]]);

    var elementC = document.querySelector('.matrix--C');
    this.matrixC = new MatrixViewModel(elementC);
    this.matrixC.fill();

    this.changeCurrentActiveMatrix('matrixA');
};

AppViewModel.prototype.changeCurrentActiveMatrix = function(matrixName) {
    var radio = document.querySelector('input[type="radio"][value=' + matrixName + ']');
    radio.checked = true;
    this.currentActiveMatrix = this[matrixName];
}

AppViewModel.prototype.changeCurrentActiveMatrixHandler = function(radio) {
    this.currentActiveMatrix = this[radio.value];
};
AppViewModel.prototype.btnMultMatrixHandler = function() {
    this.matrixA.read();
    var A = this.matrixA.read();
    this.matrixB.read();
    var B = this.matrixB.read();
    //MatrixViewModel.multMatrix(A,B);
    var C = MatrixViewModel.multMatrix(A,B);
    this.matrixC.fill(C);
};

AppViewModel.prototype.btnClearMatrix = function() {
    this.matrixA.cleanMatrix();
    this.matrixB.cleanMatrix();
    this.matrixC.cleanMatrix();
}

MatrixViewModel.btn_change_Matrix = function() {
    MatrixViewModel.change_Matrix();
};

window.AppViewModel = AppViewModel;

})();
