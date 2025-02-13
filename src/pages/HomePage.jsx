import React, { useEffect, useState } from "react";
import { pokeAPI } from "../pokeApi/api";

export default () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        // Fetch the list of Pokémon (first 10 Pokémon for example)
        const response = await pokeAPI.get("/pokemon?limit=60");
        const pokemons = response.data.results;

        // Fetch detailed data for each Pokémon
        const detailedPokemons = await Promise.all(
          pokemons.map(async (pokemon) => {
            const pokemonData = await pokeAPI.get(pokemon.url);
            return pokemonData.data;
          })
        );

        setPokemonList(detailedPokemons);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Tailwind spinner animation */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-wrap justify-center mt-10 gap-6">
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon.id}
          className="w-72 p-6 bg-white rounded-lg shadow-lg flex flex-col items-center"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            {pokemon.name}
          </h1>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-36 h-36 mx-auto mb-4 object-contain"
          />
          <p className="text-center text-gray-700">
            Height: {pokemon.height} decimeters
          </p>
          <p className="text-center text-gray-700">
            Weight: {pokemon.weight} hectograms
          </p>
          <p className="text-center text-gray-700 mt-2">Abilities:</p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            {pokemon.abilities.map((ability, index) => (
              <li key={index} className="text-sm">
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

