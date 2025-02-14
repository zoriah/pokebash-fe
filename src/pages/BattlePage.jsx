import { useState } from "react";

const BattlePage = () => {
  const [pokemon1, setPokemon1] = useState({
    name: "Pikachu",
    hp: 100,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  });

  const [pokemon2, setPokemon2] = useState({
    name: "Charmander",
    hp: 100,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  });

  const attack = (attacker, defender, setDefender) => {
    const damage = Math.floor(Math.random() * 20) + 1;
    setDefender((prev) => ({
      ...prev,
      hp: Math.max(prev.hp - damage, 0),
    }));
  };

  return (
    <>
      <div className="flex justify-around items-center p-6 bg-gray-100 border-2 border-gray-300 rounded-lg w-3/4 mx-auto mt-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{pokemon1.name}</h2>
          <img
            src={pokemon1.image}
            alt={pokemon1.name}
            className="w-24 h-24 mx-auto"
          />
          <p className="text-xl">HP: {pokemon1.hp}</p>
          <button
            onClick={() => attack(pokemon1, pokemon2, setPokemon2)}
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded hover:bg-green-600"
          >
            Attack
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{pokemon2.name}</h2>
          <img
            src={pokemon2.image}
            alt={pokemon2.name}
            className="w-24 h-24 mx-auto"
          />
          <p className="text-xl">HP: {pokemon2.hp}</p>
          <button
            onClick={() => attack(pokemon2, pokemon1, setPokemon1)}
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded hover:bg-green-600"
          >
            Attack
          </button>
        </div>
      </div>
    </>
  );
};

export default BattlePage;
