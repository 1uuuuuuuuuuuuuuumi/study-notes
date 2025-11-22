import React, { useState } from 'react';
import Board from './components/Board';
import Ranking from './components/Ranking';
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('game')  // 'game' or 'ranking'

  return (
    <div className='app'>
      {/* 네비게이션 */}
      <nav className='navigation'>
        <button 
          className={currentView === 'game' ? 'nav-button active' : 'nav-button'}
          onClick={() => setCurrentView('game')}
        >🎮 게임</button>
        <button
          className={currentView === 'ranking' ? 'nav-button active' : 'nav-button'}
          onClick={() => setCurrentView('ranking')}
        >
          🏆 랭킹
        </button>
      </nav>

      {/* 화면 전환 */}
      {currentView === 'game' ? <Board /> : <Ranking />}
    </div>
  );
}

export default App
