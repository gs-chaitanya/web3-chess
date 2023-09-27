import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import Web3 from 'web3';
import { ethers } from "ethers";

const Chess = require("chess.js");

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  const [fen, setFen] = useState(chess.fen());

  const ChessMovesContractAddress = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/"); // Hardhat local node URL
  const ChessMovesAbi = ["./artifacts/contracts/chess.sol/chess.json"]

  const chessMovesContract = new ethers.Contract(
    ChessMovesContractAddress,
    ChessMovesAbi,
    provider
  );

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();

        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);

      setFen(chess.fen());
    }
  };

  return (
    <div className="flex-center">
      <h1>Web3 Chess Dapp</h1>
      <h2>CPU</h2>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />
      <h2>You</h2>
      <h3>Drag and drop a piece to start the game. All the moves are recorded onto a local blockchain.</h3>
    </div>
  );
};

export default App;
