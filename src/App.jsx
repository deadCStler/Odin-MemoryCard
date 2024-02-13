import { GetImages } from "./components/getImages.jsx";

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
  return (
    <>
      <GetImages arr={getArray()} />
    </>
  );
}

export default App;
