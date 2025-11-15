import React from "react";
import '../styles/Board.css';

function Board(){

  return (
    <div className="game-container">
      <h1>15 Puzzle Game</h1>
      <div className="board">
        {/* 여기에 타일들이 들어갈 예정 */}
        <div className="title">1</div>
        <div className="title">2</div>
        <div className="title">3</div>
        <div className="title">4</div>
        <div className="title">5</div>
        <div className="title">6</div>
        <div className="title">7</div>
        <div className="title">8</div>
        <div className="title">9</div>
        <div className="title">10</div>
        <div className="title">11</div>
        <div className="title">12</div>
        <div className="title">13</div>
        <div className="title">14</div>
        <div className="title">15</div>
        <div className="title empty"></div>
      </div>
    </div>
  );
}

export default Board;