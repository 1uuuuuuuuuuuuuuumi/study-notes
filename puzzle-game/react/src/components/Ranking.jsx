import React, { useCallback, useEffect, useState } from "react";
import '../styles/Ranking.css'
import axios from "axios";


/**
 * RankingRow 컴포넌트
 * React.memo로 최적화하여 개별 행의 불필요한 리렌더링 방지
 * @param {object} record - 게임 기록 데이터
 * @param {number} index - 순위 (0부터 시작)
 * @param {function} formatTime - 시간 포맷팅 함수
 * @param {function} formatDate - 날짜 포맷팅 함수
 */
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


/**
 * Ranking 컴포넌트
 * 게임 기록 랭킹을 표시하는 컴포넌트
 * - 이동 횟수 TOP 10
 * - 시간 TOP 10
 * - 전체 기록
 * 탭 전환을 통해 다양한 기준으로 랭킹 확인 가능
 */
function Ranking() {
  // ========== State 관리 ==========
  const [activeTab, setActiveTab] = useState('moves');  // 현재 활성 탭 ('moves', 'time', 'all')
  const [records, setRecords] = useState([]);           // 랭킹 데이터
  const [loading, setLoading] = useState(false);        // 로딩 상태

  
  // ========== 데이터 가져오기 ==========
  /**
   * 선택된 탭에 따라 서버에서 랭킹 데이터 조회
   * useCallback으로 메모이제이션하여 불필요한 함수 재생성 방지
   * @param {string} type - 조회 타입 ('moves', 'time', 'all')
   */
  const fetchRecords = useCallback(async (type) => {
    setLoading(true);
    try {
      let url = 'http://localhost:8080/api/records';
      
      // 탭에 따라 엔드포인트 변경
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
        // 서버 응답 에러 (4xx, 5xx)
        if(error.response.status === 404){
          alert('랭킹 데이터를 찾을 수 없습니다.')
        } else {
          alert('서버 오류가 발생했습니다. (상태:' + error.response.status + ')');
        }
      } else if (error.request) {
        // 요청은 보냈지만 응답 없음 (네트워크 문제)
        alert('서버와 연결할 수 없습니다. Spring Boot 서버가 실행 중인지 확인해주세요.');
      } else {
        // 요청 설정 중 에러
        alert('랭킹 데이터를 불러오는 중 오류가 발생했습니다.');
      }

      // 에러 발생 시 빈 배열로 초기화
      setRecords([]);
    }
    setLoading(false);
  }, []); // 빈 의존성 배열


  // ========== 탭 변경 시 데이터 갱신 ==========
  /**
   * activeTab이 변경될 때마다 자동으로 데이터 재조회
   */
  useEffect(() => {
    fetchRecords(activeTab);
  }, [activeTab, fetchRecords]);


  // ========== 시간 포맷팅 ==========
  /**
   * 초 단위 시간을 "분:초" 형식으로 변환
   * useCallback으로 메모이제이션
   * @param {number} seconds - 초 단위 시간
   * @returns {string} "M:SS" 형식 (예: "2:05")
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  
  // ========== 날짜 포맷팅 ==========
  /**
   * ISO 날짜 문자열을 한국 날짜 형식으로 변환
   * useCallback으로 메모이제이션
   * @param {string} dateString - ISO 8601 형식 날짜 문자열
   * @returns {string} 한국어 날짜 형식 (예: "2025. 11. 21. 오전 1:46:57")
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR');
  };

  
  // ========== 렌더링 ==========
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