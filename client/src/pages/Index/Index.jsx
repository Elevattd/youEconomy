import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Tables from "../../components/visual/Tables/Tables";
import ScrollToTop from "react-scroll-to-top";

const Index = ({ currentUser }) => {
  useEffect(() => {}, [currentUser?.all_transactions]);
  const content = (
    <div className="container">
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
