import { Outlet } from "react-router-dom";
import { RequireAuth } from "../../../services";

const Menu = () => {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
};

export default Menu;
