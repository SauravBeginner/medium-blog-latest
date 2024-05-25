import { Outlet } from "react-router-dom";
// import RightBar from "../components/RightBar";
import Navbar from "../components/Navbar";
import RightBar from "./RightBar";

const AuthLayout = () => {
  return (
    <main>
      <div className="min-h-scareen bg-[#121212]">
        <div
          className="pt-[65px] grid grid-cols-12 gap-4 pb-8 sm:px-4 sm:pt-8 md:pt-[83px] lg:px-10
        "
        >
          <RightBar />
          {/* <LeftBar /> */}
          <section className="col-span-12 md:col-span-12 lg:col-span-9">
            <Navbar />
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
