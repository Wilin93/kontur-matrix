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
    this.matrixA.fill();

    var elementB = document.querySelector('.matrix--B');
    this.matrixB = new MatrixViewModel(elementB);
    this.matrixB.fill();

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

window.AppViewModel = AppViewModel;

})();
