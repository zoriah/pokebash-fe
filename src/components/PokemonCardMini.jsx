import React from "react";
import { useRoster } from "../contexts/RosterContext";

const PokemonCardMini = ({ pokemon, onClick }) => {
  const { roster, toggleRoster } = useRoster();
  const isFavorite = roster.some((p) => p.id === pokemon.id);

  // Type Colors for Border and Background (Adjust as needed)
  const typeColors = {
    fire: "border-red-500 bg-red-100",
    water: "border-blue-500 bg-blue-100",
    grass: "border-green-500 bg-green-100",
    electric: "border-yellow-500 bg-yellow-100",
    psychic: "border-purple-500 bg-purple-100",
    ice: "border-blue-300 bg-blue-50",
    dragon: "border-indigo-600 bg-indigo-100",
    dark: "border-gray-800 bg-gray-300",
    fairy: "border-pink-500 bg-pink-100",
    fighting: "border-orange-600 bg-orange-200",
    normal: "border-gray-500 bg-gray-100",
    poison: "border-purple-700 bg-purple-200",
    ground: "border-yellow-700 bg-yellow-200",
    flying: "border-indigo-400 bg-indigo-200",
    bug: "border-green-600 bg-green-200",
    rock: "border-gray-700 bg-gray-400",
    ghost: "border-indigo-700 bg-indigo-300",
    steel: "border-gray-400 bg-gray-200",
  };

  const pokemonType = pokemon.types[0].type.name;
  const typeStyle = typeColors[pokemonType] || "border-gray-500 bg-gray-100";

  return (
    <div
      className={`rounded-2xl shadow-lg flex flex-col items-center relative cursor-pointer hover:scale-95 transition-transform border-4 ${typeStyle}`}
      onClick={() => onClick(pokemon)}
    >
      {/* Pokémon Image */}
      <div className="relative w-32 h-32 flex justify-center items-center bg-white rounded-full shadow-md">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-28 h-28 object-contain drop-shadow-lg"
        />
      </div>

      {/* Pokémon Name & Type */}
      <h1 className="text-xl font-extrabold text-gray-800 capitalize drop-shadow-md">
        {pokemon.name}
      </h1>
      <p
        className={`text-sm px-3 py-1 rounded-md uppercase shadow-md ${typeStyle}`}
      >
        {pokemonType}
      </p>

      {/* Heart Button (Favorite) */}
      <button
        className="absolute top-3 right-3 text-3xl"
        onClick={(e) => {
          e.stopPropagation();
          toggleRoster(pokemon);
        }}
      ></button>
    </div>
  );
};

export default PokemonCardMini;
