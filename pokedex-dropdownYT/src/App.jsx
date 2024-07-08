import { useEffect, useState } from "react";
import "./App.css";
import {
  getPokemonDescription,
  getPokemonList,
  getPokemonSpriteUrl,
} from "../public/utils/utils";
import Select from "./components/Select";

function App() {
  const [list, setList] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(1);
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function getList() {
      try {
        const res = await getPokemonList();
        setList(res);
      } catch (e) {
        console.log("api error");
      }
    }
    getList();
  }, []);

  useEffect(() => {
    async function fetchPokemonDescription() {
      try {
        const resDescription = await getPokemonDescription(selectedIdx);
        setDescription(resDescription);
      } catch (error) {
        console.error("Error fetching Pokémon description:", error);
      }
    }

    async function fetchPokemonImage() {
      try {
        const imgUrl = await getPokemonSpriteUrl(selectedIdx);
        setImgUrl(imgUrl);
      } catch (error) {
        console.error("Error fetching Pokémon image:", error);
      }
    }

    fetchPokemonDescription();
    fetchPokemonImage();
  }, [selectedIdx]);

  function handleSelectId(e) {
    const idx = e.target.value;
    console.log(idx);
    setSelectedIdx((setSelectedIdx) => idx);
    /*     setImgUrl(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${idx}.png`
    );
    handelDescription(idx); */
  }
  /* 
  const handelDescription = async (idx) => {
    try {
      const res = await getPokemonDescription(idx);
      setDescription(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 */
  return (
    <>
      {list.length > 0 && (
        <Select value={selectedIdx} onChange={handleSelectId}>
          {list.map((content, idx) => (
            <option key={idx} value={idx + 1}>
              {content.name}
            </option>
          ))}
        </Select>
      )}
      <p>You selected: {selectedIdx}</p>
      <div>
        <img src={imgUrl} alt="" />
        <p>{description}</p>
        <div>
          <button
            disabled={selectedIdx <= 1}
            onClick={() => setSelectedIdx(selectedIdx - 1)}
          >
            Anterior
          </button>
          <button
            disabled={selectedIdx >= 150}
            onClick={() => setSelectedIdx(selectedIdx + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
