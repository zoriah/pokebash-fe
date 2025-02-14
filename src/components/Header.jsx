import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-yellow-500 via-red-500 to-blue-500 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Left Side - Title */}
        <h1 className="text-2xl font-bold flex items-center">
          🛠️ Pokémon: Battle Game
        </h1>

        {/* Right Side - Navigation Links */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/battle" className="hover:underline">
              Battle
            </Link>
          </li>
          <li>
            <Link to="/roster" className="hover:underline">
              Roster
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:underline">
              Leaderboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
