import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { useDispatch } from "react-redux";

import useUser from "../../../utils/hooks/useUser";
import { useCreateOperationMutation } from "../../../features/api/userApi";

const Transactions = (props) => {
  const { currentUser, refreshList } = useUser();
  const [input, setInput] = useState({ concept: "", type: "", value: null });
  const [createOperation] = useCreateOperationMutation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    props.onHide();
    // props.refreshList();
    try {
      dispatch(createOperation({ userId: currentUser.id, data: input }));
    } catch (error) {
      return error;
    }
    setInput({ concept: "", type: "", value: null });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const content = (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Transaction.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-2 ">
          <select
            aria-label="Default select example"
            name="type"
            onChange={handleInputChange}
          >
            <option selected disabled value="default">
              Select the transaction
            </option>
            <option value="egress">Egress</option>
            <option value="entry">Entry</option>
          </select>
          <span className="input-group-text" id="basic-addon1">
            $
          </span>

          <input
            aria-label="Text input with dropdown button"
            type="number"
            name="value"
            onChange={handleInputChange}
          />
          <span className="input-group-text">.00</span>
        </InputGroup>
        <div className="input-group">
          <span className="input-group-text">Description.</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            name="concept"
            onChange={handleInputChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check" />
        </Form.Group>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="primary "
          size="md"
          type="submit"
        >
          Confirm
        </Button>
        {/* {errorsEmail.email && (
					<p className="text-danger">{errorsEmail.email}</p>
				)}
				{errorsName.name && <p className="text-danger">{errorsName.name}</p>}
				{errorsPassword.password && (
					<p className="text-danger">{errorsPassword.password}</p>
				)} */}
      </Modal.Footer>
    </Modal>
  );

  return content;
};

export default Transactions;
