import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/HomePage";
import BattlePage from "./pages/BattlePage";
import MyRosterPage from "./pages/MyRosterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Home Page Ilona */}
        <Route index element={<HomePage />} />

        {/* Register Page Noa Bahman */}
        <Route path="battle" element={<BattlePage />} />

        {/* Dashboard oder Veranstaltungen Bahman Noa */}
        <Route path="roster" element={<MyRosterPage />} />

        {/* NOT FOUND */}
        <Route path="*" element={<h2>Not Found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;

/*UNWICHTIG UNWICHTIG UNWICHTIG KANNSTE LÖSCHEN ODER KOPIEREN, FALLS ES SCHNELL GEHEM SOLL.
-----------------------------------------------------------------------  */
/* <Route path="events/:id"
      element={
        isAuthenticated ? <EventDetails /> : <h2>Access Denied</h2>
      }
    /> */

/* <Route
      path="events/manage"
      element={
        isAuthenticated ? <EventManagement /> : <h2>Access Denied</h2>
      }
/> */
/*UNWICHTIG UNWICHTIG UNWICHTIG KANNSTE LÖSCHEN ODER KOPIEREN, FALLS ES SCHNELL GEHEM SOLL.
-----------------------------------------------------------------------  */
