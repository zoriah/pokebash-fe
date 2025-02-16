import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[url('img/forest.jpg')] bg-cover bg-center bg-fixed flex flex-col">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
