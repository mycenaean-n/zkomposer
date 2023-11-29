pragma circom 2.0.0;
include "../../node_modules/circomlib/circuits/comparators.circom";

template RemoveAirPockets(N) {
    signal input column[N];
    // signal output out;
    signal isGtZero[N];
    signal indexedColumn[N][2];
    component isZero[N];

    var counter = 0;
    signal conunterPlusOne[N];

    for (var i = 0; i < N; i++) {
        // if < 0, then set index to -1, otherwise to counter
        isZero[i] = IsZero();
        isZero[i].in <== column[i];
        isGtZero[i] <== 1 - isZero[i].out;
        indexedColumn[i][0] <== column[i];
        conunterPlusOne[i] <== (counter + 1);
        indexedColumn[i][1] <== conunterPlusOne[i] * isGtZero[i];
        counter =  counter + isGtZero[i];
    }

    component isEq[N][N+1];
    signal sortingColumn[N][N + 1];
    signal output out[N];
    for (var i = 0; i < N; i++) {
        sortingColumn[i][0] <== 0;
        for (var j = 1; j < N+1; j++) {
            isEq[i][j] = IsEqual();
            isEq[i][j].in[0] <== indexedColumn[j-1][1];
            isEq[i][j].in[1] <== i + 1;
            sortingColumn[i][j] <== (isEq[i][j].out * (indexedColumn[j-1][0] )) + sortingColumn[i][j-1];
        }
        out[i] <== sortingColumn[i][N];
    }
}
