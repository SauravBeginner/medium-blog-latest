import { Quotes } from "../components/Quotes";
import { Signup as SignupComp } from "../components/Signup";
const Signup = () => {
  return (
    <>
      <div className="flex justify-center min-h-screen py-12 bg-white">
        <div className="flex items-center max-w-4xl space-x-24">
          <div className="w-full lg:w-1/2">
            <SignupComp />
          </div>
          <div className="w-1/2 hidden lg:block">
            <Quotes />
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Signup;
