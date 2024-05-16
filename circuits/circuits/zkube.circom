pragma circom 2.0.0;
include "../../node_modules/circomlib/circuits/comparators.circom";
include "./transform.circom";
include "./stack.circom";
include "./transformtwo.circom";
include "./reject.circom";
include "./filter.circom";

function indexToArgs(index) {
    assert(index >= 0 && index <= 33);
    // "EMPTY"
        if(index == 0) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // "TRANSFORM_YELLOW_RED",
        else if (index == 1) {
            return [
                [1, 1, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // "TRANSFORM_YELLOW_BLUE",
        else if (index == 2) {
            return [
                [1, 1, 3, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        }
        // "TRANSFORM_RED_YELLOW",
        else if (index == 3) {
            return [
                [1, 2, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // "TRANSFORM_RED_BLUE",
        else if (index == 4) {
            return [
                [1, 2, 3, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // "TRANSFORM_BLUE_YELLOW",
        else if (index == 5) {
            return [
                [1, 3, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // "TRANSFORM_BLUE_RED",
        else if (index == 6) {
            return [
                [1, 3, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // "STACK_YELLOW",
        else if (index == 7) {
            return [
                [0, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // "STACK_RED",
        else if (index == 8) {
            return [
                [0, 0, 0, 0],
                [1, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // "STACK_BLUE",
        else if (index == 9) {
            return [
                [0, 0, 0, 0],
                [1, 3, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_YELLOW_YELLOW_RED',
        else if (index == 10) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_YELLOW_YELLOW_BLUE',
        else if (index == 11) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 3],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_YELLOW_RED_YELLOW',
        else if (index == 12) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 2, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_YELLOW_RED_BLUE',
        else if (index == 13) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 2, 3],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_YELLOW_BLUE_YELLOW',
        else if (index == 14) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 3, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_YELLOW_BLUE_RED',
        else if (index == 15) {  
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 3, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_RED_RED_YELLOW',
        else if (index == 16) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 2, 2, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
         } 
        // 'TRANSFORMTWO_RED_RED_BLUE',
         else if (index == 17) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 2, 2, 3],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_RED_YELLOW_RED',  
        else if (index == 18) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 2, 1, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_RED_YELLOW_BLUE', 
        else if (index == 19) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 2, 1, 3],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_RED_BLUE_YELLOW', 
        else if (index == 20) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 2, 3, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_RED_BLUE_RED',  
        else if (index == 21) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 2, 3, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_BLUE_BLUE_YELLOW',  
        else if (index == 22) {
            return [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 3, 3, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_BLUE_BLUE_RED',
        else if (index == 23) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 3, 3, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_BLUE_YELLOW_BLUE',
        else if (index == 24) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 3, 1, 3],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_BLUE_YELLOW_RED',
        else if (index == 25) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 3, 1, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_BLUE_RED_YELLOW',
        else if (index == 26) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 3, 2, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'TRANSFORMTWO_BLUE_RED_BLUE',
        else if (index == 27) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 3, 2, 3],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'REJECT_YELLOW',
        else if (index == 28) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'REJECT_RED',
        else if (index == 29) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 2, 0, 0],
                [0, 0, 0, 0]
            ];
        }
        // 'REJECT_BLUE',
        else if (index == 30) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 3, 0, 0],
                [0, 0, 0, 0]
            ];
        } 
        // 'FILTER_YELLOW',
        else if (index == 31) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 0, 0]
            ];
        } 
        // 'FILTER_RED',
        else if (index == 32) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 2, 0, 0]
            ];
        }
        // 'FILTER_BLUE',
        else if (index == 33) {
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 3, 0, 0]
            ];
        } 

        return [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
}

template Contains(L) {
    signal input element;
    signal input inArray[L];
    signal output outArray[L];
    signal output out;
    signal counter[L];
    component isEq[L];
    component isZero;

    isEq[0] = IsEqual();
    isEq[0].in[0] <== element;
    isEq[0].in[1] <== inArray[0];
    counter[0] <== isEq[0].out;
    outArray[0] <== inArray[0] * (1 - isEq[0].out);
    for (var i = 1; i < L; i++) {
        isEq[i] = IsEqual();
        isEq[i].in[0] <== element;
        isEq[i].in[1] <== inArray[i];
        counter[i] <== counter[i-1] + isEq[i].out;
        outArray[i] <== inArray[i] * (1 - isEq[i].out);
    }
    isZero = IsZero();
    isZero.in <== counter[L-1];
    out <== 1 - isZero.out;
}

template ZKube(W, H, F, NO_AVAIL_FUNC) {
    // public
    signal input initialGrid[W][H];
    signal input finalGrid[W][H];
    // F possible functions is arbitrary
    signal input selectedFunctionsIndexes[F];
    signal input availableFunctionsIndexes[NO_AVAIL_FUNC];
    signal input account;

    signal finalGridForPlayer[W][H];
    
    component transform[F];
    component stack[F];
    component transformTwo[F];
    component reject[F];
    component filter[F];

    component contains[F];
    signal intermediateAvailableFunctionsIndexes[F+1][8];
    // having +1 because we are assigning current value to the next one
    intermediateAvailableFunctionsIndexes[0] <== availableFunctionsIndexes;
    
    // F intermediate grids, corresponding to possible Functions. Of width W and height H
    signal intermediateGrids[F+1][W][H];
    intermediateGrids[0] <== initialGrid;
    signal selectedFunctions[F][F][4];
    for (var i = 0; i < F; i++) {
        contains[i] = Contains(NO_AVAIL_FUNC);
        contains[i].element <== selectedFunctionsIndexes[i];
        contains[i].inArray <== intermediateAvailableFunctionsIndexes[i];
        intermediateAvailableFunctionsIndexes[i+1] <== contains[i].outArray;
        assert(contains[i].out > 0);

        selectedFunctions[i] <-- indexToArgs(selectedFunctionsIndexes[i]);

        transform[i] = Transform(W, H);
        transform[i].grid <== intermediateGrids[i];
        transform[i].onOff <== selectedFunctions[i][0][0];
        transform[i].inColor <== selectedFunctions[i][0][1];
        transform[i].outColor <== selectedFunctions[i][0][2];

        stack[i] = Stack(W, H);
        stack[i].grid <== transform[i].out;
        stack[i].onOff <== selectedFunctions[i][1][0];
        stack[i].color <== selectedFunctions[i][1][1];

        transformTwo[i] = TransformTwo(W, H);
        transformTwo[i].grid <== stack[i].out;
        transformTwo[i].onOff <== selectedFunctions[i][2][0];
        transformTwo[i].inColor <== selectedFunctions[i][2][1];
        transformTwo[i].outColorBot <== selectedFunctions[i][2][2];
        transformTwo[i].outColorTop <== selectedFunctions[i][2][3];
        
        reject[i] = Reject(W, H);
        reject[i].grid <== transformTwo[i].out;
        reject[i].onOff <== selectedFunctions[i][3][0];
        reject[i].color <== selectedFunctions[i][3][1];

        filter[i] = Filter(W, H);
        filter[i].grid <== reject[i].out;
        filter[i].onOff <== selectedFunctions[i][4][0];
        filter[i].color <== selectedFunctions[i][4][1];

        intermediateGrids[i + 1] <== filter[i].out;
    }

    finalGridForPlayer <== intermediateGrids[F];

    component isEq[W][H];
    var counter = 0;
    for (var i = 0; i < W; i++) {
        for (var j = 0; j < H; j++) {
            isEq[i][j] = IsEqual();
            isEq[i][j].in[0] <== finalGridForPlayer[i][j];
            isEq[i][j].in[1] <== finalGrid[i][j];
            counter += isEq[i][j].out;
        }
    }

    component eqCheck;
    // compairng the final results
    eqCheck = ForceEqualIfEnabled();
    // if not equal no proof, sorry
    eqCheck.enabled <== 1;
    eqCheck.in[0] <== counter;
    eqCheck.in[1] <== W*H;
}

component main { public [initialGrid, finalGrid, availableFunctionsIndexes, account] } = ZKube(8, 8, 5, 8);
