import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { authState, myProfileDetailsAtom } from "../store/atoms/userAtoms";
import { authAxios } from "../utils/axiosClient";
import { getMyProfileDataSelector } from "../store/selectors/userSelector";

interface AuthHandleProps {
  children: React.ReactNode;
}

const AuthHandle = ({ children }: AuthHandleProps) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const setAuthStauts = useSetRecoilState(authState);
  const myProfileData = useRecoilValueLoadable(getMyProfileDataSelector);
  const setMyProfileAtom = useSetRecoilState(myProfileDetailsAtom);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      authAxios
        .get("/user/myprofile")
        .then((response) => {
          setAuthStauts({ status: true });
          setLoader(false);
          console.log(response?.data?.myDetails);
          setMyProfileAtom(response?.data?.myDetails);
          console.log(myProfileData);
          if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/signup"
          ) {
            navigate("/", { replace: true });
          }
        })
        .catch(() => {
          setAuthStauts({ status: false });
          setLoader(false);
          navigate("/login");
        });
    } else {
      setAuthStauts({ status: false });
      setLoader(false);
      navigate("/login");
    }
  }, [token]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthHandle;
