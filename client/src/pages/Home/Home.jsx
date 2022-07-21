import React from "react";
import Index from "../../pages/Index/Index";
import Login from "../../components/visual/Login/Login";
import useUser from "../../utils/hooks/useUser";

const Home = () => {
  const { currentToken, currentUser } = useUser();

  const content = !currentToken ? (
    <div>
      <Login />
    </div>
  ) : (
    <div>
      <Index currentUser={currentUser} />
    </div>
  );
  return content;
};

export default Home;
