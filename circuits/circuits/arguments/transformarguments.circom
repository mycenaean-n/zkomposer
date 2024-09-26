pragma circom 2.0.0;
include "../../node_modules/circomlib/circuits/comparators.circom";

// TRANSFORM_YELLOW_RED
template ArgumentsTransformYellowRed() {
    signal input inputIndex;
    signal output out[5][4];
    signal instruction[4] <== [1, 3, 1, 0];
    signal instructionOut[4]; 

    component isEq;
    isEq = IsEqual();
    isEq.in[0] <== inputIndex;
    isEq.in[1] <== 1;

    // if eq 1, then multiply identity
    for (var i = 0; i < 4; i++) {
        instructionOut[i] <== instruction[i] * isEq.out;
    }

    out <== [
        instructionOut,
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

// TRANSFORM_YELLOW_BLUE
template ArgumentsTransformYellowBlue() {
    signal input inputIndex;
    signal output out[5][4];
    signal instruction[4] <== [1, 1, 3, 0];
    signal instructionOut[4]; 

    component isEq;
    isEq = IsEqual();
    isEq.in[0] <== inputIndex;
    isEq.in[1] <== 2;

    for (var i = 0; i < 4; i++) {
        instructionOut[i] <== instruction[i] * isEq.out;
    }

    out <== [
        instructionOut,
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

// TRANSFORM_RED_YELLOW
template ArgumentsTransformRedYellow() {
    signal input inputIndex;
    signal output out[5][4];
    signal instruction[4] <== [1, 2, 1, 0];
    signal instructionOut[4]; 

    component isEq;
    isEq = IsEqual();
    isEq.in[0] <== inputIndex;
    isEq.in[1] <== 2;

    for (var i = 0; i < 4; i++) {
        instructionOut[i] <== instruction[i] * isEq.out;
    }

    out <== [
        instructionOut,
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

// TRANSFORM_RED_BLUE
template ArgumentsTransformRedBlue() {
    signal input inputIndex;
    signal output out[5][4];
    signal instruction[4] <== [1, 2, 3, 0];
    signal instructionOut[4]; 

    component isEq;
    isEq = IsEqual();
    isEq.in[0] <== inputIndex;
    isEq.in[1] <== 4;

    for (var i = 0; i < 4; i++) {
        instructionOut[i] <== instruction[i] * isEq.out;
    }

    out <== [
        instructionOut,
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

// TRANSFORM_BLUE_YELLOW
template ArgumentsTransformBlueYellow() {
    signal input inputIndex;
    signal output out[5][4];
    signal instruction[4] <== [1, 3, 1, 0];
    signal instructionOut[4]; 

    component isEq;
    isEq = IsEqual();
    isEq.in[0] <== inputIndex;
    isEq.in[1] <== 5;

    for (var i = 0; i < 4; i++) {
        instructionOut[i] <== instruction[i] * isEq.out;
    }

    out <== [
        instructionOut,
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

// TRANSFORM_BLUE_RED
template ArgumentsTransformBlueRed() {
    signal input inputIndex;
    signal output out[5][4];
    signal instruction[4] <== [1, 3, 2, 0];
    signal instructionOut[4]; 

    component isEq;
    isEq = IsEqual();
    isEq.in[0] <== inputIndex;
    isEq.in[1] <== 6;

    for (var i = 0; i < 4; i++) {
        instructionOut[i] <== instruction[i] * isEq.out;
    }

    out <== [
        instructionOut,
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}
