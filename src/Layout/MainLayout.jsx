import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const MainLayout = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const btn = e.target.childNodes[0].data;

    switch (btn) {
      case "HOME":
        navigate("/");
        break;
      case "BATTLE":
        navigate("/battle");
        break;
      case "ROSTER":
        navigate("/roster");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <nav className="flex w-full h-20 bg-amber-800">
        <div className="text-2xl px-16 py-4" onClick={handleClick}>
          Logo
        </div>
        <div className="flex flex-wrap justify-around w-full text-2xl px-16 py-4 hover:pointer-events-auto">
          <div onClick={handleClick}>HOME</div>
          <div onClick={handleClick}>BATTLE</div>
          <div onClick={handleClick}>ROSTER</div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default MainLayout;
