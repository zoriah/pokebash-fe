import React from "react";

const PokemonCardWithStats = ({ pokemon }) => {
  // Type Colors for Border and Background
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
      className={`rounded-xl shadow-md flex flex-col items-center p-4 border-4 ${typeStyle} w-60`}
    >
      {/* Pokémon Image */}
      <div className="bg-white rounded-full shadow-md p-2">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-24 h-24 object-contain"
        />
      </div>

      {/* Pokémon Name */}
      <h1 className="text-md font-extrabold text-gray-800 capitalize mt-2">
        {pokemon.name}
      </h1>

      {/* Abilities */}
      <h3 className="text-sm font-semibold mt-2">Abilities</h3>
      <div className="h-12">
      <ul className="text-gray-700 text-xs flex flex-wrap justify-center gap-1">
        {pokemon.abilities.map((ability, index) => (
          <li
            key={index}
            className="capitalize bg-gray-200 px-2 py-1 rounded-md shadow-sm"
          >
            {ability.ability.name}
          </li>
        ))}
      </ul>
      </div>
      {/* Stats in Grid Layout */}
      <h3 className="text-sm font-semibold mt-2">Stats</h3>
      <div className="grid grid-cols-2 gap-2 w-full mt-2">
        {pokemon.stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-xs font-medium capitalize">
              {stat.stat.name.replace("-", " ")}
            </p>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getStatColor(index)}`}
                style={{ width: `${(stat.base_stat / 255) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Renkli İstatistik Çubukları için */
const getStatColor = (index) => {
  const colors = [
    "bg-green-500", // HP
    "bg-red-500", // Attack
    "bg-blue-500", // Defense
    "bg-yellow-500", // Special Attack
    "bg-purple-500", // Special Defense
    "bg-pink-500", // Speed
  ];
  return colors[index % colors.length];
};

export default PokemonCardWithStats;
