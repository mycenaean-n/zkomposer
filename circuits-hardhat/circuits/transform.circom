
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
