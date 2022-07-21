import React, { useEffect, useRef, useState } from "react";
import { Toast } from "../../../utils/alerts";
import image from "../../../assets/landing-image-sm.png";
import { setCredentials } from "../../../features/slices/authSlice";
import { useLoginMutation } from "../../../features/api/authApi";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "./hooks/useValidate";
import { useDispatch } from "react-redux";

import Registrer from "../Registrer/Registrer";

//styles
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errorsEmail, setErrorsEmail] = useState({});
  const [errorsPassword, setErrorsPassword] = useState({});
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async (credentials) => {
    try {
      const userData = await login(credentials).unwrap();

      dispatch(
        setCredentials({
          user: userData.user,
          accessToken: userData.accessToken,
        })
      );
      Toast.fire({
        icon: "success",
        title: `Welcome ${userData.user.name}!`,
      });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: `${error.data.error}`,
      });
    }
  };

  useEffect(() => {
    const input = emailRef.current;
    input?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin({ email, password });
    } catch (err) {
      if (!err.data) {
        setErrMsg("The server does not respond");
      } else if (err.originalStatus === 400) {
        setErrMsg("Wrong username or password.");
        // eslint-disable-next-line no-constant-condition
      } else if (err.originalStatus === 401 || 403) {
        setErrMsg("Wrong username or password.");
      } else {
        setErrMsg("Failed to enter");
      }

      const error = errRef.current;
      error?.focus();
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setErrorsEmail(
      validateEmail({ ...email, [e.target.name]: e.target.value })
    );
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    setErrorsPassword(
      validatePassword({ ...password, [e.target.name]: e.target.value })
    );
  };

  const content = isLoading ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    <React.Fragment>
      <Container>
        <Row>
          <Col lg={6} md={8} sm={12} className="image-container ">
            <img className="w-100" src={image} alt="login" />
          </Col>
          <Col lg={5} md={8} sm={12} className=" d-flex  align-items-center">
            <Row>
              <Col>
                <h1>Sing In</h1>
              </Col>
              <Container className="m-1 ">
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    id="email"
                    className="mb-5"
                    controlId="formBasicEmail"
                  >
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      placeholder="Email"
                      name="email"
                      autoComplete="off"
                      required={true}
                      size="md"
                      onChange={handleEmailInput}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      {errorsEmail.email && <p>{errorsEmail.email}</p>}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      autoComplete="off"
                      required={true}
                      size="md"
                      onChange={handlePasswordInput}
                    />
                    <Form.Text className="text-muted">
                      {errorsPassword.password && (
                        <p>{errorsPassword.password}</p>
                      )}
                    </Form.Text>
                  </Form.Group>
                  <br />
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary "
                      size="sm"
                      type="submit"
                      disabled={isLoading}
                    >
                      Log in
                    </Button>
                  </div>
                  <br />
                </Form>
                <div className="d-grid gap-2">
                  <Button
                    variant="secondary "
                    size="sm"
                    onClick={() => setModalShow(true)}
                    disabled={isLoading}
                  >
                    Registrer
                  </Button>
                </div>
              </Container>
              <h6>Forgot your password?</h6>
            </Row>
          </Col>
        </Row>
      </Container>
      <Registrer show={modalShow} onHide={() => setModalShow(false)} />
    </React.Fragment>
  );

  return content;
};

export default Login;
