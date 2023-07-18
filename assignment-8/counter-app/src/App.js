import React, { useState } from "react";

import "./App.css";


function App() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };
  return (
    <>
      <div className="main-box">
        <div className="display">{count}</div>
        <div className="buttons">
          <button className="increase" onClick={increaseCount}>Increase</button>
          <button className="decrease" onClick={decreaseCount}>Decrease</button>
        </div>
      </div>
    </>
  );
}

export default App;