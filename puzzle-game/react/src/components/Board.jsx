import React, { useEffect, useState } from "react";
import '../styles/Board.css';
import axios from "axios";


/**
 * Tile 컴포넌트
 * React.memo로 최적화하여 불필요한 리렌더링 방지
 * @param {number|null} tile - 타일 숫자 (null이면 빈 칸)
 * @param {number} index - 타일 위치 인덱스
 * @param {function} onClick - 타일 클릭 핸들러
 */
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


/**
 * Board 컴포넌트
 * 15 퍼즐 게임의 메인 컴포넌트
 * - 타일 섞기 및 이동 로직
 * - 이동 횟수 및 타이머 기능
 * - 게임 완료 시 서버에 기록 저장
 */
function Board(){
  // ========== State 관리 ==========
  const [tiles, setTiles] = useState([
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, null
  ]);

  const [isWin, setIsWin] = useState(false);  // 승리 여부
  const [isShuffled, setIsShuffled] = useState(false); // 섞기 완료 여부
  const [moveCount, setMoveCount] = useState(0); // 이동 횟수
  const [seconds, setSeconds] = useState(0); // 경과 시간 (초)
  const [isPlaying, setIsPlaying] = useState(false); // 게임 진행 중 여부
  const [playerName, setPlayerName] = useState(''); // 플레이어 이름
  const [showNameInput, setShowNameInput] = useState(false);  // 이름 입력창 표시 여부


  // ========== 타이머 ==========
    /**
   * 1초마다 시간 증가
   * isPlaying이 true이고 게임이 끝나지 않았을 때만 작동
   */
  useEffect(() => {
    let interval = null;
    if(isPlaying && !isWin){
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval); // cleanup: 메모리 누수 방지
  }, [isPlaying, isWin]);


  // ========== 타일 섞기 함수 ==========
  /**
   * Fisher-Yates 알고리즘 변형
   * 빈 칸과 인접한 타일만 이동하여 풀 수 있는 상태 보장
   */
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

      // 빈 칸과 선택된 타일 위치 교환
      [shuffled[emptyIndex], shuffled[randomMove]] = [shuffled[randomMove], shuffled[emptyIndex]];
    }

    setTiles(shuffled);
    setIsWin(false);
    setIsShuffled(true);
    setMoveCount(0);
    setSeconds(0);
    setIsPlaying(true);
  };

  
  // ========== 이동 가능한 타일 찾기 ==========
  /**
   * 빈 칸(null)에 인접한 타일의 인덱스 반환
   * @param {number} emptyIndex - 빈 칸의 인덱스
   * @returns {array} 이동 가능한 타일들의 인덱스 배열
   */
  const getPossibleMoves = (emptyIndex) => {
    const moves = [];
    const row = Math.floor(emptyIndex / 4); // 행 (0-3)
    const col = emptyIndex % 4;             // 열 (0-3)

    if(row > 0) moves.push(emptyIndex - 4); // 위
    if(row < 3) moves.push(emptyIndex + 4); // 아래
    if(col > 0) moves.push(emptyIndex - 1); // 왼쪽
    if(col < 3) moves.push(emptyIndex + 1); // 오른쪽

    return moves;
  };


  // ========== 컴포넌트 마운트 시 타일 섞기 ==========
  useEffect(() => {
    shuffleTiles();
  }, []);


  // ========== 승리 조건 체크 ==========
  /**
   * 타일이 1-15 순서대로 배열되었는지 확인
   * @param {array} currentTiles - 현재 타일 배열
   * @returns {boolean} 승리 여부
   */
  const checkWin = (currentTiles) => {
    const winningOrder = [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, null
    ];

    return currentTiles.every((tile, index) => tile === winningOrder[index]);
  };


  // ========== 타일 변경 시 승리 체크 ==========
  useEffect(() => {
    if(isShuffled && checkWin(tiles)){
      setIsPlaying(false);      // 타이머 중지
      setTimeout(() => {
        setIsWin(true);
        setShowNameInput(true); // 이름 입력창 표시
      }, 300);
    }
  }, [tiles, isShuffled]);

  // ========== 타일 클릭 핸들러 ==========
  /**
   * 클릭한 타일이 빈 칸에 인접하면 이동
   * @param {number} index - 클릭한 타일의 인덱스
   */
  const handleTileClick = (index) => {
    if(isWin) return; // 게임이 끝나면 클릭 무시

    const emptyIndex = tiles.indexOf(null);

    // 클릭한 타일이 빈 칸과 인접한지 확인
    if(isAdjacent(index, emptyIndex)){
      const newTiles = [...tiles];
      // 타일과 빈 칸 위치 교환
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoveCount(moveCount + 1);  // 이동 횟수 증가
    }
  };


  // ========== 인접 타일 확인 ==========
  /**
   * 두 타일이 상하좌우로 인접했는지 확인
   * @param {number} index1 - 첫 번째 타일 인덱스
   * @param {number} index2 - 두 번째 타일 인덱스
   * @returns {boolean} 인접 여부
   */
  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 4);
    const col1 = index1 % 4;
    const row2 = Math.floor(index2 / 4);
    const col2 = index2 % 4;

    // 같은 행에서 좌우 인접 또는 같은 열에서 상하 인접
    return (
      (row1 === row2 && Math.abs(col1 - col2) === 1) || // 같은 행, 열 차이 1
      (col1 === col2 && Math.abs(row1 - row2) === 1)    // 같은 열, 행 차이 1
    );
  };

  
  // ========== 게임 기록 저장 ==========
  /**
   * 게임 완료 시 서버에 기록 전송
   * - 이름 유효성 검사
   * - axios POST 요청
   * - 에러 타입별 처리
   */
  const saveGameRecord = async () => {
    // 이름 유효성 검사
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
      console.error('기록 저장 실패: ', error);
      
      // 에러 타입별 처리
      if (error.response) {
        // 서버 응답 에러 (4xx, 5xx)
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요. (상태:' + error.response.status + ')');
      } else if (error.request) {
        // 요청은 보냈지만 응답 없음 (네트워크 문제)
        alert('서버와 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
      } else {
        // 요청 설정 중 에러
        alert('기록 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };


  // ========== 게임 리셋 ==========
  /**
   * 게임을 처음 상태로 초기화
   */
  const resetGame = () => {
    setIsShuffled(false);
    setShowNameInput(false);
    setPlayerName('');
    setTimeout(() => {
      shuffleTiles();
    }, 100);
  };

  
  // ========== 렌더링 ==========
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