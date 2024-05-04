import { Outlet } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import Topbar from "../components/Topbar";

const WrapperLayout = () => {
  // const { id } = useParams();
  // console.log("WrapperId", id);
  return (
    <main>
      <div className="min-h-screen bg-[#121212]">
        <div className="pt-[65px] grid grid-cols-12 gap-4 pb-8  sm:px-4 sm:pt-8 md:pt-[83px] lg:px-10">
          {/* <LeftBar /> */}
          <section className="col-span-12 md:col-span-12 lg:col-span-9">
            <Topbar />
            <Outlet />
          </section>
          {/* <RightBar /> */}
          <LeftBar />
        </div>
      </div>
    </main>
  );
};

export default WrapperLayout;
