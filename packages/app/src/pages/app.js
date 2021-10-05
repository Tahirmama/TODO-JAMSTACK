import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { Container, Flex, Heading, Button, NavLink } from "theme-ui";
import { IdentityContext } from "../../identity-context";

let Dash = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home  
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            LOG OUT {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <span>UserName: {user && user.user_metadata.full_name}</span>
    </Container>
  );
};

let DashLoggedOut = props => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Flex sx={{ flexDirection: "column", padding: 4 }}>
    <Heading as="h1">
      TODO APP
    </Heading>
    <Button sx={{
      marginTop: 3,
      '&:hover': {
        backgroundColor: 'White',
        color: 'primary',
        cursor: 'pointer'
      }

    }
    }
      onClick={() => {
        netlifyIdentity.open();
      }}  >
      LOG IN
    </Button>
    </Flex>
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