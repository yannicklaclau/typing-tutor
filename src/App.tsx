import { GameCanvas } from './components/GameCanvas';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 style={{ 
        textAlign: 'center', 
        color: '#fff', 
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif' 
      }}>
        🎯 Typing Defender
      </h1>
      <GameCanvas />
      <div style={{ 
        textAlign: 'center', 
        color: '#ccc', 
        marginTop: '20px',
        fontSize: '14px' 
      }}>
        Type the falling words to defend your cities! • Press R to restart when game over
      </div>
    </div>
  );
}

export default App
