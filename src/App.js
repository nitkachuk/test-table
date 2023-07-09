import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push({ value: '', selected: 0 });
      }
      newData.push(row);
    }
    setData(newData);
  }, []);

  const handleCellClick = (row, col) => {
    const newData = [...data];
    newData[row][col].selected = 1;
    setData(newData);
  
    // Add "cell_focus" style to the clicked cell
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      if (i === row * 10 + col) {
        //cells[i].classList.add('cell_focus');
      } else {
        cells[i].classList.remove('cell_focus');
        cells[i].classList.add('cell_not_focus');
      }
    }
  };

  const handleCellChange = (event, row, col) => {
    const { value } = event.target;
    const newData = [...data];
    newData[row][col].value = value;
    setData(newData);
  };

  const handleCellBlur = (row, col) => {
    const newData = [...data];
    newData[row][col].selected = 0;
    setData(newData);
    
    // Имитация сохранения в бэкенд
    console.log('Сохранено в бэкенд:', data);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const cells = document.getElementsByClassName('cell');
      if (event.key === 'Enter' || event.key === 'Escape') {
        for (let i = 0; i < cells.length; i++) {
          cells[i].classList.remove('cell_not_focus');
        }
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        event.target.blur();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="table">
      {data.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              className={`cell ${cell.selected === 1 ? 'selected' : ''}`}
              key={colIndex}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell.selected === 1 ? (
                <input
                  type="text"
                  value={cell.value}
                  onChange={(event) => handleCellChange(event, rowIndex, colIndex)}
                  onBlur={() => handleCellBlur(rowIndex, colIndex)}
                  autoFocus
                />
              ) : (
                <span>{cell.value}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;