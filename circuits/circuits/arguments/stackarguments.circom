pragma circom 2.0.0;
include "../../node_modules/circomlib/circuits/comparators.circom";

// "STACK_YELLOW",
template ArgumentsStackYellow() {
    signal input inputIndex;
    signal output out[5][4];
    signal instruction[4] <== [1, 1, 0, 0];
    signal instructionOut[4]; 

    component isEq;
    isEq = IsEqual();
    isEq.in[0] <== inputIndex;
    isEq.in[1] <== 7;

     for (var i = 0; i < 4; i++) {
        instructionOut[i] <== instruction[i] * isEq.out;
    }

    out <== [
        [0, 0, 0, 0],
        instructionOut,
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

// "STACK_RED"
template ArgumentsStackRed() {
    signal input inputIndex;
    signal output out[5][4];
    signal instruction[4] <== [1, 2, 0, 0];
    signal instructionOut[4];

    component isEq;
    isEq = IsEqual();
    isEq.in[0] <== inputIndex;
    isEq.in[1] <== 8;

     for (var i = 0; i < 4; i++) {
        instructionOut[i] <== instruction[i] * isEq.out;
    }

    out <== [
        [0, 0, 0, 0],
        instructionOut,
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

// "STACK_BLUE",
template ArgumentsStackBlue() {
    signal input inputIndex;
    signal output out[5][4];
    signal instruction[4] <== [1, 3, 0, 0];
    signal instructionOut[4];

    component isEq;
    isEq = IsEqual();
    isEq.in[0] <== inputIndex;
    isEq.in[1] <== 9;

     for (var i = 0; i < 4; i++) {
        instructionOut[i] <== instruction[i] * isEq.out;
    }

    out <== [
        [0, 0, 0, 0],
        instructionOut,
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}
