import { useState, useEffect } from "react";
import { fetchLeaderboard } from "../pokeApi/services";

//import bgImage from "../img/leaderboard_bg.jpg";
import bgImage from "../img/bg.jpg";

// const initialLeaderboard = [
//   { _id: "1", username: "AshKetchum", score: 1500 },
//   { _id: "2", username: "Misty", score: 1400 },
//   { _id: "3", username: "Brock", score: 1300 },
//   { _id: "4", username: "TeamRocket", score: 800 },
// ];

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState(/*initialLeaderboard*/);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const data = await fetchLeaderboard();
      console.log("Received data:", data);
      if (Array.isArray(data)) {
        setLeaderboard(data);
      } else {
        console.error("Invalid data received:", data);
        setLeaderboard(initialLeaderboard);
      }
    };
    loadLeaderboard();
  }, []);

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center shadow-xl mt-16"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <h2
        className="text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg"
        style={{
          textShadow:
            "2px 2px 0 black, -2px -2px 0 black, -2px 2px 0 black, 2px -2px 0 black",
        }}
      >
        🏅 Pokémon Leaderboard 🏅
      </h2>
      <ul className="w-full max-w-xl backdrop-blur-md bg-white/30 p-4 rounded-lg">
        {Array.isArray(leaderboard) ? (
          leaderboard.map((player, index) => (
            <li
              key={player._id}
              className={`flex justify-between p-4 shadow-lg mb-3 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 ${
                index === 0
                  ? "bg-red-500"
                  : index === 1
                  ? "bg-blue-500"
                  : index === 2
                  ? "bg-green-500"
                  : "bg-gray-800"
              }`}
            >
              <span>
                #{index + 1} {player.username}
              </span>
              <span className="font-bold">{player.score} XP</span>
            </li>
          ))
        ) : (
          <li className="text-red-500">Error loading leaderboard</li>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
