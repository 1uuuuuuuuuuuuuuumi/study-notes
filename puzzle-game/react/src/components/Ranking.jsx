import React, { useCallback, useEffect, useState } from "react";
import '../styles/Ranking.css'
import axios from "axios";

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
      alert('랭킹 데이터를 불러오는데 실패했습니다.');
    }
    setLoading(false);
  }, []); // 빈 의존성 배열

  // 탭 변경 시 데이터 다시 가져오기
  useEffect(() => {
    fetchRecords(activeTab);
  }, [activeTab, fetchRecords]);  // fetchRecords 추가

  // 시간 포맷팅 (초 → 분:초)
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
                  <tr key={record.id}>
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