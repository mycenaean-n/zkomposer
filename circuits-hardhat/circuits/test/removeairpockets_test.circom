pragma circom 2.0.0;

include "../removeairpockets.circom";

component main {public [column]} = RemoveAirPockets(8);
