import React from "react";

import Loader from "../../components/visual/Loader/Loader";
import Login from "../../components/visual/Login/Login";
import useUser from "../../utils/hooks/useUser";

const Home = () => {
  const { currentToken } = useUser();

  const content = !currentToken ? (
    <div>
      <Login />
    </div>
  ) : (
    <>
      <div>{/* Index, Tables with transactions or button for switch */}</div>
    </>
  );
  return (
    <div className="container">
      <div className=" m-5 ">{content}</div>
    </div>
  );
};

export default Home;
