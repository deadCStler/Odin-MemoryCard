/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function ApiCall(arr) {
  return Promise.all(
    arr.map(async (ele) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ele}`);
      const data = await response.json();
      const name = data.species.name;
      const url = data.sprites.front_shiny;
      const id = ele;
      return { id, name, url };
    })
  );
}

export function GetImages(props) {
  const [arrLink, setArrLink] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

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
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [props.arr]);

  function shuffle(e) {
    arrLink.forEach((obj) => {
      if (obj.id === e) {
        if (!obj.isClicked) {
          obj.isClicked = true;
          setCurrScore(currScore + 1);
        } else {
          bestScore < currScore ? setBestScore(currScore) : bestScore;
          console.log("Game Over");
        }
      }
    });
    const newArray = [...arrLink];
    newArray.sort(() => Math.random() - 0.5);
    setArrLink(newArray);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {arrLink.map((link) => (
        <div
          key={link.id}
          onClick={() => shuffle(link.id)}
          style={{ border: `solid 2px black` }}
        >
          <p>{link.name}</p>
          <img src={link.url} alt={`poke-${link.name}`} />
        </div>
      ))}
    </div>
  );
}
