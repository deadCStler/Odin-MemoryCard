export function ApiCall(arr) {
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

export function Display(arr, shuffle) {
  return (
    <>
      {arr.map((link) => (
        <div key={link.id} onClick={() => shuffle(link.id)}>
          <img src={link.url} alt={`poke-${link.name}`} />
          <p>{link.name}</p>
        </div>
      ))}
    </>
  );
}
