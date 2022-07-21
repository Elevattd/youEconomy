import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import Tables from "../../components/visual/Tables/Tables";
import ScrollToTop from "react-scroll-to-top";

const Index = ({ currentUser }) => {
  const navigate = useNavigate();
  useEffect(() => {}, [currentUser?.all_transactions]);
  const content = (
    <div className="container">
      {/* <h4 className="danger"> Balance: $ {currentUser.balance},00 </h4> */}
      {currentUser?.balance > 0 ? (
        <div className="row">
          {" "}
          <h4>Balance: $</h4>
          <h4 className="text-success row">{currentUser?.balance},00</h4>
        </div>
      ) : (
        <div className="row">
          <h4>Balance: $</h4>
          <h4 className="text-danger row">{currentUser?.balance},00</h4>
        </div>
      )}{" "}
      <Tables transactions={currentUser?.current_transactions} button={true} />
      <br />
      <Link to="/history">
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg">
            History
          </Button>
        </div>
      </Link>
      <ScrollToTop smooth color="#000" />
    </div>
  );
  return <div className="container">{content}</div>;
};

export default Index;
