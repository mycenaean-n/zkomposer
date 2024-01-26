pragma circom 2.0.0;
include "../../node_modules/circomlib/circuits/comparators.circom";
include "../../node_modules/circomlib/circuits/gates.circom";
include "./transform.circom";
include "./stack.circom";
include "./transformtwo.circom";

template XNOR() {
    signal input a;
    signal input b;
    signal output out;

    out <== 1 - a - b + 2*a*b;
}

function indexToArgs(index) {
    assert(index <= 15 && index>=0);
    // "TRANSFORM_YELLOW_RED",
    if (index == 1) {
        return [
            [1, 1, 2],
            [0, 0, 0],
            [0, 0, 0]
        ];
    // "TRANSFORM_YELLOW_BLUE",
    } else if (index == 2) {
        return [
            [1, 1, 3],
            [0, 0, 0],
            [0, 0, 0]
        ];
    // "TRANSFORM_RED_YELLOW",
    } else if (index == 3) {
        return [
            [1, 2, 1],
            [0, 0, 0],
            [0, 0, 0]
        ];
    // "TRANSFORM_RED_BLUE",
    } else if (index == 4) {
        return [
            [1, 2, 3],
            [0, 0, 0],
            [0, 0, 0]
        ];
    // "TRANSFORM_BLUE_YELLOW",
    } else if (index == 5) {
        return [
            [1, 3, 1],
            [0, 0, 0],
            [0, 0, 0]
        ];
    // "TRANSFORM_BLUE_RED",
    } else if (index == 6) {
        return [
            [1, 3, 2],
            [0, 0, 0],
            [0, 0, 0]
        ];
    // "STACK_YELLOW",
    } else if (index == 7) {
        return [
            [0, 0, 0],
            [1, 1, 0],
            [0, 0, 0]
        ];
    // "STACK_RED",
    } else if (index == 8) {
        return [
            [0, 0, 0],
            [1, 2, 0],
            [0, 0, 0]
        ];
    // "STACK_BLUE",
    } else if (index == 9) {
        return [
            [0, 0, 0],
            [1, 3, 0],
            [0, 0, 0]
        ];
    // "TRANSFORMTWO_YELLOW_RED",
    } else if (index == 10) {
        return [
            [0, 0, 0],
            [0, 0, 0],
            [1, 1, 2]
        ];
    // "TRANSFORMTWO_YELLOW_BLUE",
    } else if (index == 11) {
        return [
            [0, 0, 0],
            [0, 0, 0],
            [1, 1, 3]
        ];
    // "TRANSFORMTWO_RED_YELLOW",
    } else if (index == 12) {
        return [
            [0, 0, 0],
            [0, 0, 0],
            [1, 2, 1]
        ];
    // "TRANSFORMTWO_RED_BLUE",
    } else if (index == 13) {
        return [
            [0, 0, 0],
            [0, 0, 0],
            [1, 2, 3]
        ];
    // "TRANSFORMTWO_BLUE_YELLOW",
    } else if (index == 14) {
        return [
            [0, 0, 0],
            [0, 0, 0],
            [1, 3, 1]
        ];
    // "TRANSFORMTWO_BLUE_RED",
    } else if (index == 15) {
        return [
            [0, 0, 0],
            [0, 0, 0],
            [1, 3, 2]
        ];
    }
    // "EMPTY",
    return [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
    ];
}

template ZKubes(W, H, F) {
    // public
    signal input initialGrid[W][H];
    signal input finalGrid[W][H];
    // TODO: include address to prevent frontrunning
    signal input account;
    // private
    // F rounds of F available functions with 3 args
    signal input selectedFunctionsIndexes[F];
    signal finalGridForPlayer[W][H];
    // F rounds for each of the Function
    component transform[F];
    component stack[F];
    component transformTwo[F]; 

    // having +1 because we are assigning current value to the next one
    // F intermediate grids, corresponding to possible Functions. Of width W and height H
    signal intermediateGrids[F+1][F+1][W][H];

    for (var i = 0; i < W; i++) {
        for (var j = 0; j < H; j++) {
            intermediateGrids[0][0][i][j] <== initialGrid[i][j];
        }
    }  

    signal selectedFunctions[F][F][3];
    for (var i = 0; i < F; i++) {
        var indexPlusOne = i + 1;
        var indexPlusTwo = i + 2;
        
        selectedFunctions[i] <-- indexToArgs(selectedFunctionsIndexes[i]);
        selectedFunctions[i][i][0] === selectedFunctions[i][i][0] * selectedFunctions[i][i][0];
        selectedFunctions[i][i][1] === selectedFunctions[i][i][0] * selectedFunctions[i][i][1];
        selectedFunctions[i][i][2] === selectedFunctions[i][i][0] * selectedFunctions[i][i][2];

        transform[i] = Transform(W, H);
        transform[i].grid <== intermediateGrids[i][0];
        transform[i].onOff <== selectedFunctions[i][0][0];
        transform[i].inColor <== selectedFunctions[i][0][1];
        transform[i].outColor <== selectedFunctions[i][0][2];
        intermediateGrids[i][1] <== transform[i].out;

        stack[i] = Stack(W, H);
        stack[i].grid <== intermediateGrids[i][1];
        stack[i].onOff <== selectedFunctions[i][1][0];
        stack[i].color <== selectedFunctions[i][1][1];
        intermediateGrids[i][2] <== stack[i].out;

        transformTwo[i] = TransformTwo(W, H);
        transformTwo[i].grid <== intermediateGrids[i][2];
        transformTwo[i].onOff <== selectedFunctions[i][2][0];
        transformTwo[i].inColor <== selectedFunctions[i][2][1];
        transformTwo[i].outColor <== selectedFunctions[i][2][2];

        intermediateGrids[indexPlusOne][0] <== transformTwo[i].out;
    }

    finalGridForPlayer <== intermediateGrids[F][0];

    component xnorGate[W][H];
    var mask = 1;
    for (var i = 0; i < W; i++) {
        for (var j = 0; j < H; j++) {
            xnorGate[i][j] = XNOR();
            xnorGate[i][j].a <== finalGridForPlayer[i][j];
            xnorGate[i][j].b <== finalGrid[i][j] * mask;
            mask = xnorGate[i][j].out;
        }
    }

    component eqCheck;
    // compairng the final results
    eqCheck = ForceEqualIfEnabled();
    // if not equal no proof, sorry
    eqCheck.enabled <== 1;
    eqCheck.in[0] <== mask;
    eqCheck.in[1] <== 1;
}

component main { public [initialGrid, finalGrid, account] } = ZKubes(8, 8, 3);
