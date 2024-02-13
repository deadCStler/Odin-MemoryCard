/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Display, ApiCall } from "./helperMethods.jsx";
import "./images.css";

export function GetImages(props) {
  const [arrLink, setArrLink] = useState([]);
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  //function for game over or reset;
  const game = (input) => {
    if (input === "over") {
      bestScore < currScore ? setBestScore(currScore) : bestScore;
      setGameOver(true);
    } else if (input === "won") {
      setBestScore(12);
    } else {
      setGameOver(false);
    }
    arrLink.forEach((obj) => {
      obj.isClicked = false;
    });
    const newArray = [...arrLink];
    setArrLink(newArray);
    setCurrScore(0);
  };

  //fetching data and updating
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await ApiCall(props.arr);
        const links = results.map((obj) => {
          return {
            id: obj.id,
            name: obj.name,
            url: obj.url,
            isClicked: false,
          };
        });
        setArrLink(links);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [props.arr]);

  //shuffle function for the array
  function shuffle(e) {
    arrLink.forEach((obj) => {
      if (obj.id === e) {
        if (!obj.isClicked) {
          obj.isClicked = true;
          setCurrScore(currScore + 1);
        } else {
          game("over");
        }
      }
    });
    const newArray = [...arrLink];
    newArray.sort(() => Math.random() - 0.5);
    setArrLink(newArray);
  }

  //returning the output
  if (arrLink.length < 1) {
    return <div className="load">Loading...</div>;
  } else if (gameOver) {
    return (
      <>
        <div className="load">GameOver</div>
        <div>
          <button onClick={() => game("reset")}>Restart</button>
        </div>
      </>
    );
  } else if (currScore === 12) {
    return (
      <>
        <div className="load">Congrats! You won. Play Again?</div>
        <div>
          <button onClick={() => game("won")}>Restart</button>
        </div>
      </>
    );
  }
  return (
    <div className="img_page">
      <div className="scores">
        <div>Current Score: {currScore}</div>
        <div>Best Score: {bestScore}</div>
      </div>
      <div className="imagesContainer">{Display(arrLink, shuffle)}</div>
      <div>
        <button onClick={() => game("reset")}>Reset</button>
      </div>
    </div>
  );
}
