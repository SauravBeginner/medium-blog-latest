import { Outlet, useNavigate } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";

const AuthLayout = () => {
  return (
    <main>
      <div className="min-h-screen bg-[#121212]">
        <div className="pt-[65px] grid grid-cols-12 gap-4 pb-8  sm:px-4 sm:pt-8 md:pt-[83px] lg:px-10">
          <LeftBar />
          <Outlet />
          <RightBar />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
