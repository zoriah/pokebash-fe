import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import TestServiceApi from "./test/TestServiceApi";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Home Page Ilona */}
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        <Route path="/test" element={<TestServiceApi />} />
        {/* Register Page Noa Bahman */}
        {/* <Route path="registrationform" element={<RegistrationForm />} /> */}

        {/* Dashboard oder Veranstaltungen Bahman Noa */}
        {/* <Route path="eventlist" element={<EventList />} /> */}

        {/* Event Details Page Marcel Noa Bahman */}
        {/* <Route path="events/:id"
            element={
              isAuthenticated ? <EventDetails /> : <h2>Access Denied</h2>
            }
          /> */}

        {/* Event Management Page Marcel Noa Bahman */}
        {/* <Route
            path="events/manage"
            element={
              isAuthenticated ? <EventManagement /> : <h2>Access Denied</h2>
            }
          /> */}

        {/* NOT FOUND */}
        <Route path="*" element={<h2>Not Found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
