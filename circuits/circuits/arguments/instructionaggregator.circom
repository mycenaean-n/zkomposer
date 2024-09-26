template ArgumentsAggregator(NO_AVAIL_ARGS) {
    // 5 instructions, 5 functions, 4 parameters per function    
    signal input index;
    signal output out[5][4];
    signal instructions[NO_AVAIL_ARGS][5][4];
    signal tempArguments[NO_AVAIL_ARGS][5][4];

    component arguementController = ArgumentsController(NO_AVAIL_ARGS);
    arguementController.index <== index;
    arguements <== arguementController.arguements;

    tempArguments[0] <== arguements[0];
    for (var i = 1; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            for (var k = 0; k < 4; k++) {
                tempArguments[i][j][k] <== arguements[i][j][k] + tempArguments[i-1][j][k];
            }
        }
    }

    out <== tempArguments[4];
}
