import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { Container, Flex, Heading, Button, NavLink } from "theme-ui";
import { IdentityContext } from "../../identity-context";
import Dash from "../components/dashboard";


let DashLoggedOut = props => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 4 }}>
        <Heading as="h1">
          TODO APP
        </Heading>
        <Button sx={{
          marginTop: 3,
          '&:hover': {
            backgroundColor: 'White',
            color: 'primary',
            cursor: 'pointer',
          }

        }
        }
          onClick={() => {
            netlifyIdentity.open();
          }}  >
          LOG IN
        </Button>
      </Flex>
    </Container>
  );
};

export default props => {
  const { user } = useContext(IdentityContext);

  if (!user) {
    return (
      <Router>
        <DashLoggedOut path="/app" />
      </Router>
    );
  }
  return (
    <Router>
      <Dash path="/app" />
    </Router>
  );
};