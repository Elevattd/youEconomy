import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Tables from "../../components/visual/Tables/Tables";
import useUser from "../../utils/hooks/useUser";
import ScrollToTop from "react-scroll-to-top";

const History = () => {
  const { currentUser, refreshList } = useUser();
  const [type, setType] = useState("all");
  useEffect(() => {}, [currentUser?.all_transactions]);

  const handleSelectChange = (e) => {
    setType(e.target.value.toString());
    refreshList(e.target.value.toString());
  };

  const content = (
    <div className="container">
      <br />
      <h2 className="text-center">History </h2>

      <select
        name="type"
        value={type}
        onChange={handleSelectChange}
        className="col-sm-2"
      >
        <option value="entry" name="type">
          Entry
        </option>
        <option value="egress" name="type">
          Egress
        </option>
        <option value="all" name="type">
          All
        </option>
      </select>
      <br />
      <br />
      <Tables transactions={currentUser?.all_transactions} />
      <br />
      <Link to="/">
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg">
            Balance
          </Button>
        </div>
      </Link>
      <ScrollToTop smooth color="#000" />
      <br />
    </div>
  );
  return <div className="container">{content}</div>;
};

export default History;
