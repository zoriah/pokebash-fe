import React, { useEffect, useState } from "react";
import { pokeAPI } from "../pokeApi/api";

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await pokeAPI.get("/pokemon?limit=60");
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

  // Toggle Pokémon in roster
  const toggleRoster = (pokemon) => {
    if (roster.some((p) => p.id === pokemon.id)) {
      setRoster(roster.filter((p) => p.id !== pokemon.id));
    } else {
      setRoster([...roster, pokemon]);
    }
  };

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
    <div className="container mx-auto px-4 mt-10">
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

/* 🟡 Pokémon Card Component */
const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div
      className="p-4 bg-white rounded-xl shadow-lg flex flex-col items-center relative cursor-pointer hover:scale-105 transition-transform"
      onClick={() => onClick(pokemon)}
    >
      <h1 className="text-lg font-bold text-gray-800 capitalize">
        {pokemon.name}
      </h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-24 h-24 object-contain"
      />
      <p className="text-sm font-semibold mt-2 bg-gray-200 px-2 py-1 rounded-md uppercase">
        {pokemon.types[0].type.name}
      </p>
    </div>
  );
};

/* 🔴 Pokémon Modal Component */
const PokemonModal = ({ pokemon, closeModal, toggleRoster, roster }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[400px] relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 text-2xl hover:text-gray-900"
          onClick={closeModal}
        >
          ✖
        </button>

        {/* Pokémon Details */}
        <div className="flex flex-col items-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 object-contain drop-shadow-md"
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-3 capitalize">
            {pokemon.name}
          </h1>

          {/* Type & Heart Icon */}
          <div className="flex items-center gap-4 mt-2">
            <p className="text-md font-semibold">
              Type:{" "}
              <span className="uppercase bg-gray-200 px-3 py-1 rounded-md">
                {pokemon.types[0].type.name}
              </span>
            </p>
            <div
              className="text-2xl cursor-pointer"
              onClick={() => toggleRoster(pokemon)}
            >
              {roster.some((p) => p.id === pokemon.id) ? (
                <div className="text-red-500">❤️</div>
              ) : (
                <span className="text-gray-400">🤍</span>
              )}
            </div>
          </div>
        </div>

        {/* Abilities */}
        <h3 className="text-lg font-semibold mt-4">Abilities</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {pokemon.abilities.map((ability, index) => (
            <li key={index} className="text-sm capitalize">
              {ability.ability.name}
            </li>
          ))}
        </ul>

        {/* Stats with Progress Bars */}
        <h3 className="text-lg font-semibold mt-4">Stats</h3>
        <ul className="w-full mt-2 space-y-3">
          {pokemon.stats.map((stat, index) => (
            <li key={index} className="flex flex-col">
              <p className="text-sm font-medium capitalize">
                {stat.stat.name.replace("-", " ")}: {stat.base_stat}
              </p>
              <div className="w-full bg-gray-300 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${getStatColor(
                    index
                  )}`}
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
