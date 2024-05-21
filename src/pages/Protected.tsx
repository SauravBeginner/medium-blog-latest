import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../store";

export default function Protected({ children, authentication = true }: any) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const isAuthenticated = useRecoilValue(isLoggedIn);

  useEffect(() => {
    //TODO: make it more easy to understand

    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }

    //let authValue = authStatus === true ? true : false

    if (authentication && isAuthenticated !== authentication) {
      navigate("/login");
    } else if (!authentication && isAuthenticated !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [isAuthenticated, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
