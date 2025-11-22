import React, { useEffect, useState } from "react";
import '../styles/Board.css';
import axios from "axios";

// 타일 컴포넌트 분리 (React.memo로 최적화)
const Tile = React.memo(({ tile, index, onClick }) => {
  return (
    <div
      className={tile === null ? 'tile empty' : 'tile'}
      onClick={() => onClick(index)}
    >
      {tile}
    </div>
  );
});

function Board(){
  // 초기 타일 배치: 1~15 숫자와 빈 칸(null)
  const [tiles, setTiles] = useState([
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, null
  ]);

  const [isWin, setIsWin] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false); // 섞였는지 추적
  const [moveCount, setMoveCount] = useState(0); // 이동 횟수
  const [seconds, setSeconds] = useState(0); // 경과 시간
  const [isPlaying, setIsPlaying] = useState(false); // 게임 진행 중
  const [playerName, setPlayerName] = useState(''); // 플레이어 이름
  const [showNameInput, setShowNameInput] = useState(false);  // 이름 입력창 표시

  // 타이머
  useEffect(() => {
    let interval = null;
    if(isPlaying && !isWin){
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWin]);

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
    setMoveCount(0);
    setSeconds(0);
    setIsPlaying(true);
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
      setIsPlaying(false);
      setTimeout(() => {
        setIsWin(true);
        setShowNameInput(true);
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
      setMoveCount(moveCount + 1);  // 이동 횟수 증가
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

  // 게임 기록 저장
  const saveGameRecord = async () => {
    if(!playerName.trim()){
      alert('이름을 입력해주세요!');
      return;
    }

    try{
      const response = await axios.post('http://localhost:8080/api/records', {
        playerName: playerName,
        moves: moveCount,
        timeSeconds: seconds
      });

      console.log('기록 저장 성공: ', response.data);
      alert('🎉 축하합니다' + playerName + '님! 기록이 저장되었습니다!');
      setShowNameInput(false);
    } catch (error) {
      console.log('기록 저장 실패: ', error);
      alert('기록 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 게임 리셋 함수
  const resetGame = () => {
    setIsShuffled(false);
    setShowNameInput(false);
    setPlayerName('');
    setTimeout(() => {
      shuffleTiles();
    }, 100);
  };

  return (
    <div className="game-container">
      <h1>15 Puzzle Game</h1>

      {/* 게임 통계 */}
      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">이동 횟수:</span>
          <span className="stat-value">{moveCount}</span>
        </div>
        <div className="stat">
          <span className="stat-label">시간:</span>
          <span className="stat-value">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</span>
        </div>
      </div>

      {/* 승리 메시지 */}
      {isWin && <div className="win-message">🎉 승리!</div>}

      {/* 이름 입력 */}
      {showNameInput && (
        <div className="name-input-container">
          <input 
            type="text"
            placeholder="이름을 입력하세요"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="name-input"
            maxLength={20}
          />
          <button onClick={saveGameRecord} className="save-button">
            기록 저장
          </button>
        </div>
      )}

      {/* 게임판 */}
      <div className="board">
        {tiles.map((tile, index) => (
          <Tile 
            key={index}
            tile={tile}
            index={index}
            onClick={handleTileClick}
          />
        ))}
      </div>
      
      <button className="reset-button" onClick={resetGame}>
        다시 시작
      </button>
    </div>
  );
}

export default Board;