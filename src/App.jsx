import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [mode, setMode] = useState(null);
  const [autoMode, setAutoMode] = useState(null); // For sub-modes in automatic
  const [color, setColor] = useState('#FFFFFF');

  useEffect(() => {
    let interval;
    if (autoMode === 'fully-automatic') {
      interval = setInterval(() => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setColor(randomColor);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoMode]);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: color }}
      onClick={autoMode === 'click-to-change' ? handleRandomColor : null}
    >
      {!mode && (
        <div className="button-container">
          <button onClick={() => setMode('auto')}>Automatic Color Change</button>
          <button onClick={() => setMode('manual')}>Manual Color Change</button>
        </div>
      )}
      {mode === 'auto' && !autoMode && (
        <div className="button-container">
          <button onClick={() => setAutoMode('click-to-change')}>Click to Change</button>
          <button onClick={() => setAutoMode('fully-automatic')}>Fully Automatic</button>
          <button className="back-button" onClick={() => setMode(null)}>Back</button>
        </div>
      )}
      {autoMode && (
        <button className="back-button" onClick={() => { setMode(null); setAutoMode(null); }}>Back</button>
      )}
      {mode === 'manual' && (
        <div className="manual-container">
          <input type="color" onChange={handleColorChange} />
          <button className="back-button" onClick={() => setMode(null)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default App;
