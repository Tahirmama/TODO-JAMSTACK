import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { Container, Flex, Heading, Button, NavLink } from "theme-ui";
import { IdentityContext } from "../../identity-context";
import Dash from "../components/dashboard";
import { useMutation } from '@apollo/client'; 


let DashLoggedOut = props => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
 ////// Delete todo

 const [deleteTodo] = useMutation(DELETE_TODOS);
 const handleDelete = (id) => {
   deleteTodo({
     variables: {
       id
     },
     refetchQueries: [{ query: GET_TODO }]
   })
 }
  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 4 }}>
        <Heading as="h1">
          TODO APP
        </Heading>
        <Button onClick={() => {handleDelete(post.id)}}> X  </Button>
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