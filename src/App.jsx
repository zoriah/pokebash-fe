import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import TestServiceApi from "./test/TestServiceApi";
import MyRosterPage from "./pages/MyRosterPage";
import BattlePage from "./pages/BattlePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Home Page Ilona */}
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/roster" element={<MyRosterPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/test" element={<TestServiceApi />} />

        {/* NOT FOUND */}
        <Route path="*" element={<h2>Not Found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
