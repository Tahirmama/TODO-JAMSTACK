import React, { useContext } from "react";
import { Container, Heading, Button, Flex, NavLink } from "theme-ui";
import { Link } from "gatsby";
import { IdentityContext } from "../../identity-context";
import { useMutation } from '@apollo/client'; 


const DELETE_TODOS = gql`
    mutation deleteTodo($id: ID!){
      deleteTodo(id: $id){
            id
        }
    }`
export default props => {
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
    < Container >
      <Flex as="nav" >
        <NavLink as={Link} to="/" p={2} >
          HOME
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          DASHBOARD
        </NavLink>
        {user && (
          <NavLink href="#!" p={2}>
            {user.user_metadata.full_name.toUpperCase()}
          </NavLink>
        )}
      </Flex>
      <hr/>
      
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
        }}
          onClick={() => {
            netlifyIdentity.open();
          }}  >
          LOG IN
        </Button>
      </Flex>
      
    </Container >
  );
};