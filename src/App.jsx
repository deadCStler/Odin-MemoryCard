import { useState } from "react";
import { GetImages } from "./components/getImages.jsx";
import "./App.css";

function getArray() {
  let arr = [];
  while (arr.length < 12) {
    const randomNumber = Math.floor(Math.random() * 500);
    if (!arr.includes(randomNumber)) {
      arr.push(randomNumber);
    }
  }
  return arr;
}

function App() {
  const [start, setStart] = useState(false);

  const startClick = () => {
    setStart(true);
  };

  if (start) {
    return (
      <>
        <GetImages arr={getArray()} />
      </>
    );
  }
  return (
    <div className="main_page">
      <div className="heading">Welcome to the Memory Game </div>
      <div className="info">
        Rules: Don&apos;t click on the same pokemon twice.
      </div>
      <div>
        <div className="info">Click the Below Button to Start the Game!</div>
        <button onClick={() => startClick()}> Start </button>
      </div>
    </div>
  );
}

export default App;
