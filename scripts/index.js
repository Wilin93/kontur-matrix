'use strict';
function main() {
    var app = new AppViewModel();
    window.app = app;
    app.init();

};

function btn_change() {
    var app = new AppViewModel();
    window.app = app;
    MatrixViewModel.change_Matrix();
    app.init_chng();
}

function inp_change() {
    var bg = document.querySelector('.matrix-menu');
    bg.style.background = '#5199db';
}

main();
