pragma solidity ^0.8.0;

contract Chesscontract{
    struct Move{
        string move_value;
        address player_address;
    }
    // list of moves
    Move[] moves_list;
    // who is the current player - user of cpu
    string player = "user";

    event MoveRecorded(address player_add, string move);

    function recordMove(string memory move) public {
        moves_list.push(move);
        emit MoveRecorded(msg.sender, move);
    }
}