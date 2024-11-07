import { Outlet } from "react-router-dom";
import Home from "../Home";

const RootLayout = () => {
  return (
    <div className="bg-wh_gray">
      <Home />
      <Outlet />
    </div>
  );
};

export default RootLayout;
