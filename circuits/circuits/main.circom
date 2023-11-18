pragma circom 2.0.0;
include "../../node_modules/circomlib/circuits/comparators.circom";

template Transform(W, H) {
    signal input grid[W][H];
    // type(): 0 (do not transform, but perserve) | 1 | 2 | 3 | 4
    signal input inColor;
    // type(): 0 (do not transform, but perserve) | 1 | 2 | 3 | 4
    signal input outColor;
    signal margin[W][H];
    signal mask[W][H];
    component isOneTransform[W][H];

    signal output out[W][H];
    
    for (var i = 0; i < W; i++) {
        for (var j = 0; j < H; j++) {
            // checking for == 1
            // 1st step
            margin[i][j] <== outColor - grid[i][j];
            // 2nd step
            isOneTransform[i][j] = IsEqual();
            isOneTransform[i][j].in[0] <== grid[i][j];
            isOneTransform[i][j].in[1] <== inColor;
            // 3rd step
            mask[i][j] <== isOneTransform[i][j].out * margin[i][j];
            // 4th step
            out[i][j] <== grid[i][j] + mask[i][j];
        }
    }
}

template Stack(W, H) {
    signal input grid[W][H];
    signal input onOff;
    signal input color;
    signal stack[W][H];
    signal stackColoring <== onOff * color;
    signal output out[W][H];

    component isZeroStack[W][H];
    component gtZeroStack[W][H];

    for (var i = 0; i < W; i++) {
        stack[i][0] <== 0;
        for (var j = 1; j < H; j++) {
            var prevIndex = j - 1;

            // checking for == 0
            isZeroStack[i][j] = IsZero();
            isZeroStack[i][j].in <== grid[i][j];

            // checking for gt 0
            gtZeroStack[i][j] = GreaterThan(4);
            gtZeroStack[i][j].in[0] <== grid[i][prevIndex];
            gtZeroStack[i][j].in[1] <== 0;

            stack[i][j] <== isZeroStack[i][j].out * gtZeroStack[i][j].out;
            out[i][prevIndex] <== grid[i][prevIndex] + stack[i][prevIndex]  * stackColoring;
        }
    }
}

template ZKubes(W, H, F) {
    // public
    signal input initialGrid[W][H];
    signal input finalGrid[W][H];
    // TODO: include address to prevent frontrunning
    signal input account;
    // private
    // F rounds of F available functions with 3 args
    signal input selectedFunctions[F][F][3];

    signal finishingGrid[W][H];
    // F rounds for each of the Function
    component transform[F];
    component stack[F];

    // !!! TODO: add onOff check !!!
    // 1. check - if onOff == 0 then all other elements should be 0
    // 2. check - there could be only 1 element == 1 at the same index in all calls combined


    // having +1 because we are assigning current value to the next one
    // F intermediate grids, corresponding to possible Functions. Of width W and height H
    signal intermediateGrids[F+1][F+1][W][H];

    for (var i = 0; i < W; i++) {
        for (var j = 0; j < H; j++) {
            intermediateGrids[0][0][i][j] <== initialGrid[i][j];
        }
    }  

    for (var i = 0; i < F; i++) {
        // for (var j = 0; j < F; j++) {
            var indexPlusOne = i + 1;

            transform[i] = Transform(W, H);
            transform[i].grid <== intermediateGrids[i][0];
            transform[i].inColor <== selectedFunctions[i][0][1];
            transform[i].outColor <== selectedFunctions[i][0][2];
            intermediateGrids[i][indexPlusOne] <== transform[i].out;

            stack[i] = Stack(W, H);
            stack[i].grid <== intermediateGrids[i][indexPlusOne];
            stack[i].onOff <== selectedFunctions[i][1][0];
            stack[i].color <== selectedFunctions[i][1][1];

            intermediateGrids[indexPlusOne][0] <== stack[i].out;
    }

    finishingGrid <== intermediateGrids[F][0];

    var widthPlusOne = W + 1; 
    
    component isEqGrid[widthPlusOne];
    component isEqGridNested[W][H];

    signal finalMask[widthPlusOne][H];
    finalMask[0][7] <== 1;

    for (var i = 1; i < widthPlusOne; i++) {
        var prevIndex = i - 1;
        // hacky
        isEqGrid[i] = IsEqual();
        // checking for == 1
        isEqGrid[i].in[0] <== finalGrid[i - 1][0];
        isEqGrid[i].in[1] <== finishingGrid[i - 1][0];
        finalMask[i][0] <== finalMask[i-1][7] * isEqGrid[i].out;
        for (var j = 1; j < H; j++) {
            isEqGridNested[prevIndex][j] = IsEqual();
            // checking for == 1
            isEqGridNested[prevIndex][j].in[0] <== finalGrid[prevIndex][j];
            isEqGridNested[prevIndex][j].in[1] <== finishingGrid[prevIndex][j];
            finalMask[i][j] <==  isEqGridNested[prevIndex][j].out * finalMask[i][j - 1];
        }

    }

    component eqCheck;
    // compairng the final results
    eqCheck = ForceEqualIfEnabled();
    // if not equal no proof, sorry
    eqCheck.enabled <== 1;
    eqCheck.in[0] <== finalMask[8][7];
    eqCheck.in[1] <== 1;
}

component main { public [initialGrid, finalGrid, account] } = ZKubes(8, 8, 2);
