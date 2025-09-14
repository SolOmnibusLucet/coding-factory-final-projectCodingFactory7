import React from 'react';

function FontSelector({ font, setFont, fontSize, setFontSize }) {
  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <label style={{ marginRight: '10px' }}>Font:</label>
      <select value={font} onChange={(e) => setFont(e.target.value)}>
        <option value="Helvetica Neue">Helvetica Neue</option>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
      </select>

      <label style={{ margin: '0 10px' }}>Size:</label>
      <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
        <option value="16px">Small</option>
        <option value="20px">Medium</option>
        <option value="24px">Large</option>
      </select>
    </div>
  );
}

export default FontSelector;
