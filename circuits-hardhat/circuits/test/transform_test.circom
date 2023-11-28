pragma circom 2.0.0;

include "../transform.circom";

/*component main = NftMint();*/
component main {public [grid, inColor, outColor]} = Transform(8, 8);
