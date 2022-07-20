import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useDeleteTransactionMutation } from "../../../features/api/userApi";
import useUser from "../../../utils/hooks/useUser";
import PostTransaction from "../PostTransaction/PostTransaction";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Tables = ({ transactions }) => {
  const { currentUser, refreshList } = useUser();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [modalShow, setModalShow] = useState(false);

  const handleUpdate = async (id) => {};

  const handleDelete = async (id) => {
    await deleteTransaction({ userId: currentUser.id, id: id });
    refreshList();
  };

  return (
    <div className="container">
      <Table striped variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Concept</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{`${item?.concept[0].toUpperCase()}${item.concept.slice(
                  1
                )} `}</td>
                {/* <td>$ {item.value},00</td> */}
                {item.type === "entry" ? (
                  <td> {`$  ${item.value},00`}</td>
                ) : (
                  <td>$-{item.value},00</td>
                )}
                <td>{item.date}</td>
                <td>
                  {item.type === "entry" ? (
                    <h4 className="text-success">Entry</h4>
                  ) : (
                    <h4 className="text-danger">Egress</h4>
                  )}
                </td>

                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>

                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br />
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={() => setModalShow(true)}>
          New Transaction.
        </Button>
      </div>
      <PostTransaction show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default Tables;
