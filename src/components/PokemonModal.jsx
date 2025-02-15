import React from "react";

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

          {/* Type and Heart Button */}
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

        {/* Stats */}
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

/* Assigning Colors */
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

export default PokemonModal;
