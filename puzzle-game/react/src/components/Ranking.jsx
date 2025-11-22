import React, { useCallback, useEffect, useState } from "react";
import '../styles/Ranking.css'
import axios from "axios";

// 랭킹 행 컴포넌트 분리 (React.memo로 최적화)
const RankingRow = React.memo(({ record, index, formatTime, formatDate }) => {
  return (
    <tr>
      <td className="rank">
        {index + 1}
        {index === 0 && <span className="medal">🥇</span>}
        {index === 1 && <span className="medal">🥈</span>}
        {index === 2 && <span className="medal">🥉</span>}
      </td>
      <td className="player-name">{record.playerName}</td>
      <td>{record.moves}</td>
      <td>{formatTime(record.timeSeconds)}</td>
      <td className="date">{formatDate(record.completedAt)}</td>
    </tr>
  );
});

function Ranking() {
  const [activeTab, setActiveTab] = useState('moves'); // 'moves', 'time', 'all'
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // 데이터 가져오기 (useCallback으로 함수 메모이제이션)
  const fetchRecords = useCallback(async (type) => {
    setLoading(true);
    try {
      let url = 'http://localhost:8080/api/records';
      
      if (type === 'moves') {
        url += '/top/moves';
      } else if (type === 'time') {
        url += '/top/time';
      }
      
      const response = await axios.get(url);
      setRecords(response.data);
    } catch (error) {
      console.error('데이터 조회 실패:', error);
      
      // 에러 타입별 처리
      if (error.response) {
        // 서버가 응답했지만 에러 상태 코드
        if(error.response.status === 404){
          alert('랭킹 데이터를 찾을 수 없습니다.')
        } else {
          alert('서버 오류가 발생했습니다. (상태:' + error.response.status + ')');
        }
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못함
        alert('서버와 연결할 수 없습니다. Spring Boot 서버가 실행 중인지 확인해주세요.');
      } else {
        // 요청 설정 중 에러 발생
        alert('랭킹 데이터를 불러오는 중 오류가 발생했습니다.');
      }

      // 에러 발생 시 빈 배열로 설정
      setRecords([]);
    }
    setLoading(false);
  }, []); // 빈 의존성 배열

  // 탭 변경 시 데이터 다시 가져오기
  useEffect(() => {
    fetchRecords(activeTab);
  }, [activeTab, fetchRecords]);  // fetchRecords 추가

  // 시간 포맷팅 (초 → 분:초)
  // useCallback으로 함수 메모이제이션
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR');
  };

  return (
    <div className="ranking-container">
      <h1>🏆 랭킹</h1>

      {/* 탭 메뉴 */}
      <div className="tab-menu">
        <button
          className={activeTab === 'moves' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('moves')}
        >
          이동 횟수 TOP 10
        </button>
        <button
          className={activeTab === 'time' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('time')}
        >
          시간 TOP 10
        </button>
        <button
          className={activeTab === 'all' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('all')}
        >
          전체 기록
        </button>
      </div>

      {/* 로딩 표시 */}
      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : (
        <div className="ranking-table">
          {records.length === 0 ? (
            <div className="no-records">아직 기록이 없습니다.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>순위</th>
                  <th>이름</th>
                  <th>이동 횟수</th>
                  <th>시간</th>
                  <th>완료 시간</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <RankingRow 
                    key={record.id}
                    record={record}
                    index={index}
                    formatTime={formatTime}
                    formatDate={formatDate}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Ranking;