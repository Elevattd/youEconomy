import React from "react";
import Logout from "../Logout/Logout";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import useUser from "../../../utils/hooks/useUser";

const NavBar = () => {
  const { currentUser } = useUser();

  const content = (
    <div className="app_nav">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">youEconomy</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {currentUser && Object.keys(currentUser).length ? (
              <Navbar.Text>
                Signed in as:{" "}
                <a href="/profile">
                  {currentUser.name[0].toUpperCase() +
                    currentUser.name.slice(1)}
                </a>{" "}
              </Navbar.Text>
            ) : null}
          </Navbar.Collapse>
          <Logout />
        </Container>
      </Navbar>
    </div>
  );
  return content;
};
export default NavBar;
