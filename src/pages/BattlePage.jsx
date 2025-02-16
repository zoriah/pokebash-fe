import React, { useState, useEffect } from "react";
import { useRoster } from "../contexts/RosterContext";
import { pokeAPI } from "../pokeApi/api";
import {
  createScore,
  updateScore,
  fetchLeaderboard,
} from "../pokeApi/services";
import PokemonCardMini from "../components/PokemonCardMini";
import PokemonCardWithStats from "../components/PokemonCardWithStats";

const BattlePage = () => {
  const { roster } = useRoster();
  const [username, setUsername] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    const data = await fetchLeaderboard();
    setLeaderboard(data);
  };

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setBattleResult(null);
  };

  const generateEnemyPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      const response = await pokeAPI.get(`/pokemon/${randomId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching enemy Pokémon:", error);
      return null;
    }
  };

  const handleFightClick = async () => {
    if (!selectedPokemon) {
      alert("Please select a Pokémon!");
      return;
    }
    if (!username) {
      alert("Please enter a username");
      return;
    }

    const enemy = await generateEnemyPokemon();
    if (enemy) {
      setEnemyPokemon(enemy);
      setTimeout(handleBattle, 500);
    } else {
      alert("Failed to fetch opponent Pokémon. Try again!");
    }
  };

  const handleBattle = () => {
    if (!selectedPokemon || !enemyPokemon || !username) {
      return;
    }

    const playerPower = selectedPokemon.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );
    const enemyPower = enemyPokemon.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );

    let winner;
    let points = 0;

    if (playerPower > enemyPower) {
      winner = username;
      points = 10;
    } else if (playerPower < enemyPower) {
      winner = "Computer";
      points = 0;
    } else {
      winner = "Draw";
      points = 5;
    }

    setBattleResult({ winner, points });
    if (winner === username) {
      updateLeaderboard(username, points);
    }
  };

  const updateLeaderboard = async (username, points) => {
    const existingPlayer = leaderboard.find(
      (entry) => entry.username === username
    );

    if (existingPlayer) {
      const newScore = existingPlayer.score + points;
      await updateScore(existingPlayer._id, newScore);
    } else {
      await createScore(username, points);
    }

    fetchLeaderboardData();
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen flex flex-col items-center bg-opacity-50 backdrop-blur-sm mt-15">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 drop-shadow-lg">
        Pokémon Battle Arena
      </h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg text-lg w-80 shadow-md focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-center gap-8 mt-6 w-full">
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-center mb-2">
            Select Your Pokémon
          </h2>
          <div className="h-72 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              {roster.map((pokemon) => (
                <PokemonCardMini
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={handleSelectPokemon}
                  showHeart={false}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/4 bg-blue-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-bold mb-3">Your Pokémon</h2>
          {selectedPokemon && (
            <PokemonCardWithStats pokemon={selectedPokemon} showHeart={false} />
          )}
        </div>

        <div className="w-1/4 bg-red-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-bold mb-3">Opponent</h2>
          {enemyPokemon && (
            <PokemonCardWithStats pokemon={enemyPokemon} showHeart={false} />
          )}
        </div>
      </div>

      <button
        onClick={handleFightClick}
        className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg text-xl font-bold shadow-md hover:bg-yellow-600 transition-all"
      >
        Fight! ⚔️
      </button>

      {battleResult && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center w-80">
          <h2 className="text-2xl font-bold">Battle Result</h2>
          <p className="text-lg mt-2 text-gray-700">
            {battleResult.winner === "Draw"
              ? "It's a Draw! 🤝"
              : battleResult.winner === username
              ? `🏆 ${username} Wins! +${battleResult.points} Points`
              : "💀 Computer Wins!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BattlePage;
