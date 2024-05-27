import { Quotes } from "../components/Quotes";
import { LoginForm } from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900 ">
      <div className="w-2/3 md:w-1/2  bg-white h-full lg:h-screen flex items-center py-10">
        <div className="max-w-xl mx-auto px-6 ">
          {/* <LoginComp /> */}
          <LoginForm />
        </div>
      </div>
      <div className="w-1/2 hidden lg:flex  h-screen items-center">
        <div className="max-w-xl mx-auto px-6">
          <Quotes />
        </div>
      </div>
    </div>
  );
};

export default Login;
