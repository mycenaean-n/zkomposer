include "./transformarguments.circom";


// template ArgumentsTransformTwoYellowYellowRed() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 1, 1, 2];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 10;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }

//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoYellowYellowBlue() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 1, 1, 3];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 11;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }

//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoYellowRedYellow() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 1, 2, 1];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 12;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }

//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoYellowRedBlue() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 1, 2, 3];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 13;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }
    
//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }       

// template ArgumentsTransformTwoYellowBlueYellow() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 1, 3, 1];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 14;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }

//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoYellowBlueRed() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 1, 3, 2];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 15;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }

//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

//     template ArgumentsTransformTwoRedRedYellow() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 2, 2, 1];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 16;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }

//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoRedRedBlue() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 2, 2, 3];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 17;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }

//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoRedYellowRed() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 2, 1, 2];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 18;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }

//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoRedYellowBlue() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 2, 1, 3];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 19;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }

//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoRedBlueYellow() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 2, 3, 1];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 20;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }

//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoRedBlueRed() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 2, 3, 2];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 21;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }
    
//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoBlueBlueYellow() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 3, 3, 1];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 22;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }
    
//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }   

// template ArgumentsTransformTwoBlueBlueRed() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 3, 3, 2];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 23;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }
    
//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoBlueYellowBlue() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 3, 1, 3];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 24;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }
    
//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoBlueYellowRed() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 3, 1, 2];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 25;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }
    
//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }

// template ArgumentsTransformTwoBlueRedYellow() {  
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 3, 1, 3];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 26;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }
    
//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }   

// template ArgumentsTransformTwoBlueRedRed() {
//     signal input inputIndex;
//     signal output out[5][4];
//     signal instruction[4] <== [1, 3, 2, 2];
//     signal instructionOut[4]; 

//     component isEq;
//     isEq = IsEqual();
//     isEq.in[0] <== inputIndex;
//     isEq.in[1] <== 27;

//     // if eq 1, then multiply identity
//     for (var i = 0; i < 4; i++) {
//         instructionOut[i] <== instruction[i] * isEq.out;
//     }
    
//     out <== [
//         [0, 0, 0, 0],
//         [0, 0, 0, 0],
//         instructionOut,
//         [0, 0, 0, 0],
//         [0, 0, 0, 0]
//     ];
// }


template ArgumentsController(FUN_AVAILABLE) {
    signal input index;
    signal output arguments[FUN_AVAILABLE][5][4];

    // Transform
    component ArgumentOne = ArgumentsTransformYellowRed();
    argumentOne.inputIndex <== index;
    arguments[0] <== argumentOne.out;

    component ArgumentTwo = ArguTransformYellowBlue();
    ArgumentTwo.inputIndex <== index;
    arguments[1] <== ArgumentTwo.out;

    component ArgumentThree = ArguTransformRedYellow();
    ArgumentThree.inputIndex <== index;
    arguments[2] <== ArgumentThree.out;

    component ArgumentFour = ArguTransformRedBlue();
    ArgumentFour.inputIndex <== index;
    arguments[3] <== ArgumentFour.out;
    
    component ArgumentFive = ArgumentsTransformBlueRed();
    ArgumentFive.inputIndex <== index;
    arguments[4] <== ArgumentFive.out;

    // Stack
    component ArgumentSix = ArgumentsStackRed();
    ArgumentSix.inputIndex <== index;
    arguments[5] <== ArgumentSix.out;

    component ArgumentSeven = ArgumentsStackBlue();
    ArgumentSeven.inputIndex <== index;
    arguments[6] <== ArgumentSeven.out;

    component ArgumentEight = ArgumentStackYellow();
    ArgumentEight.inputIndex <== index;
    arguments[7] <== ArgumentEight.out;

    // TransformTwo
    component ArgumentNine = ArgumentsTransformTwoYellowYellowRed();
    ArgumentNine.inputIndex <== index;
    arguments[8] <== ArgumentNine.out;

    component ArgumentTen = ArgumentsTransformTwoYellowYellowBlue();
    ArgumentTen.inputIndex <== index;
    arguments[9] <== ArgumentTen.out;
    
    component ArgumentEleven = ArgumentsTransformTwoYellowRedYellow();
    ArgumentEleven.inputIndex <== index;
    arguments[10] <== ArgumentEleven.out;

    component ArgumentTwelve = ArgumentsTransformTwoYellowRedBlue();
    ArgumentTwelve.inputIndex <== index;
    arguments[11] <== ArgumentTwelve.out;
    
    
    
    out <== arguments;
}
