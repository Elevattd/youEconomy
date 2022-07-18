import React from "react";
import Index from "../../pages/Index/Index";
import Login from "../../components/visual/Login/Login";
import useUser from "../../utils/hooks/useUser";
import Transactions from "../../components/visual/Transactions/Transactions";

const Home = () => {
  const { currentToken, currentUser, refreshList } = useUser();

  const content = !currentToken ? (
    <div>
      <Login />
    </div>
  ) : (
    <>
      <Index currentUser={currentUser} />
      <Transactions refreshList={refreshList} />
    </>
  );
  return (
    <div className="container">
      <div className=" m-5 ">{content}</div>
    </div>
  );
};

export default Home;
