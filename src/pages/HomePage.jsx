import React, { useEffect, useState } from "react";
import { pokeAPI } from "../pokeApi/api";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";
import { useRoster } from "../contexts/RosterContext";

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const { roster, setRoster, toggleRoster } = useRoster();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await pokeAPI.get("/pokemon?limit=150");
        const pokemons = response.data.results;

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

  // Open & Close Modal
  const openModal = (pokemon) => setSelectedPokemon(pokemon);
  const closeModal = () => setSelectedPokemon(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500 border-solid"></div>
      </div>
    );
  }

  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 mt-25 mb-25">
      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={openModal} />
        ))}
      </div>

      {/* Modal */}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          closeModal={closeModal}
          toggleRoster={toggleRoster}
          roster={roster}
        />
      )}
    </div>
  );
};

/* 🟢 Function to assign colors for stats */
const getStatColor = (index) => {
  const colors = [
    "bg-green-500",
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  return colors[index % colors.length];
};

export default HomePage;
