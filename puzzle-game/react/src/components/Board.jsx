import React, { useEffect, useState } from "react";
import '../styles/Board.css';

function Board(){
  // 초기 타일 배치: 1~15 숫자와 빈 칸(null)
  const [tiles, setTiles] = useState([
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, null
  ]);

  const [isWin, setIsWin] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false) // 섞였는지 추적

  // 타일 섞기 함수
  const shuffleTiles = () => {
    const shuffled = [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, null
    ];

    // 100번 랜덤하게 이동 (풀 수 있는 상태 보장)
    for(let i = 0; i < 100; i++){
      const emptyIndex = shuffled.indexOf(null);
      const possibleMoves = getPossibleMoves(emptyIndex, shuffled);
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      const randomMove = possibleMoves[randomIndex];

      [shuffled[emptyIndex], shuffled[randomMove]] = [shuffled[randomMove], shuffled[emptyIndex]];
    }

    setTiles(shuffled);
    setIsWin(false);
    setIsShuffled(true);
  };

  // 이동 가능한 타일 찾기
  const getPossibleMoves = (emptyIndex) => {
    const moves = [];
    const row = Math.floor(emptyIndex / 4);
    const col = emptyIndex % 4;

    // 위
    if(row > 0) moves.push(emptyIndex - 4);
    // 아래
    if(row < 3) moves.push(emptyIndex + 4);
    // 왼쪽
    if(col > 0) moves.push(emptyIndex - 1);
    // 오른쪽
    if(col < 3) moves.push(emptyIndex + 1);

    return moves;
  };

  // 컴포넌트 마운트 시 타일 섞기
  useEffect(() => {
    shuffleTiles();
  }, []);

  // 승리 조건 체크
  const checkWin = (currentTiles) => {
    const winningOrder = [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, null
    ];

    return currentTiles.every((tile, index) => tile === winningOrder[index]);
  };

  // 타일이 변경될 때마다 승리 체크 (섞인후에만)
  useEffect(() => {
    if(isShuffled && checkWin(tiles)){
      setTimeout(() => {
        setIsWin(true);
        alert('🎉 축하합니다! 퍼즐을 완성했어요 ☆٩(｡•ω<｡)و !');
      }, 300);
    }
  }, [tiles, isShuffled]);

  // 타일 클릭 핸들러
  const handleTileClick = (index) => {
    if(isWin) return; // 게임이 끝나면 클릭 무시

    const emptyIndex = tiles.indexOf(null);

    // 클릭한 타일이 빈 칸과 인접한지 확인
    if(isAdjacent(index, emptyIndex)){
      // 타일 교환
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  // 두 타일이 인접한지 확인하는 함수
  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 4);
    const col1 = index1 % 4;
    const row2 = Math.floor(index2 / 4);
    const col2 = index2 % 4;

    // 같은 행에서 좌우 인접 또는 같은 열에서 상하 인접
    return (
      (row1 === row2 && Math.abs(col1 - col2) === 1) ||
      (col1 === col2 && Math.abs(row1 - row2) === 1)
    );
  };

  // 게임 리셋 함수
  const resetGame = () => {
    setIsShuffled(false);
    setTimeout(() => {
      shuffleTiles();
    }, 100);
  };

  return (
    <div className="game-container">
      <h1>15 Puzzle Game</h1>
      {isWin && <div className="win-message">🎉 승리!</div>}
      <div className="board">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={tile === null ? 'tile empty' : 'tile'}
            onClick={() => handleTileClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        다시 시작
      </button>
    </div>
  );
}

export default Board;