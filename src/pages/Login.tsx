import { Quotes } from "../components/Quotes";
import { Login as LoginComp } from "../components/Login";
const Login = () => {
  return (
    <>
      <div className="flex justify-center min-h-screen py-12 bg-white">
        <div className="flex items-center max-w-4xl space-x-24">
          <div className="w-full lg:w-1/2">
            <LoginComp />
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

export default Login;
