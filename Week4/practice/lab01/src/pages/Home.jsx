import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=40"
        );
        setPokemonList(res.data.results);
      } catch (err) {
        console.log("에러: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>포켓몬 도감</h1>
      <div>
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
};

export default Home;
