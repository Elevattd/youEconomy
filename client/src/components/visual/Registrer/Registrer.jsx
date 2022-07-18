import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Toast } from "../../../utils/alerts/index";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../Login/hooks/useValidate";
import { useRegisterMutation } from "../../../features/api/authApi";

const Registrer = (props) => {
  const emailRef = useRef();
  const [input, setInput] = useState({ email: "", name: "", password: "" });
  const [errorsEmail, setErrorsEmail] = useState({});
  const [errorsPassword, setErrorsPassword] = useState({});
  const [errorsName, setErrorsName] = useState({});

  const [register] = useRegisterMutation();

  const handleRegistrer = async (e) => {
    e.preventDefault();

    await register({ ...input }).then((res) => {
      if (res.error) {
        Toast.fire({
          icon: "error",
          title: `${res.error.data}`,
        });
      }
      if (res.data) {
        Toast.fire({
          icon: "success",
          title: `Successful!`,
        });
        props.onHide();
      }
    });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrorsEmail(
      validateEmail({ ...input, [e.target.name]: e.target.value })
    );
    setErrorsPassword(
      validatePassword({ ...input, [e.target.name]: e.target.value })
    );
    setErrorsName(validateName({ ...input, [e.target.name]: e.target.value }));
  };

  const content = (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRegistrer}>
          <Form.Group id="email" className="mb-2" controlId="formBasicEmail">
            <Form.Control
              type="email"
              ref={emailRef}
              placeholder="Email"
              name="email"
              autoComplete="off"
              required={true}
              size="sm"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group id="name" className="mb-2" controlId="formBasicName">
            <Form.Control
              type="name"
              placeholder="Name"
              name="name"
              autoComplete="off"
              required={true}
              size="sm"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationCustom04">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              required={true}
              size="sm"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button
            onSubmit={handleRegistrer}
            variant="primary "
            size="md"
            type="submit"
          >
            Confirm
          </Button>
          <br />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {errorsEmail.email && (
          <p className="text-danger">{errorsEmail.email}</p>
        )}
        {errorsName.name && <p className="text-danger">{errorsName.name}</p>}
        {errorsPassword.password && (
          <p className="text-danger">{errorsPassword.password}</p>
        )}
      </Modal.Footer>
    </Modal>
  );

  return content;
};

export default Registrer;
