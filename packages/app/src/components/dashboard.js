import React, { useContext, useRef, useReducer } from "react";
import {
  Container,
  Flex,
  Heading,
  Button,
  Input,
  Label,
  NavLink,
  Checkbox
} from "theme-ui";
import { Router, Link } from "@reach/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { IdentityContext } from "../../identity-context";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state];
    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value
      };
      return newState;
  }
};

export default () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  const [todos, dispatch] = useReducer(todosReducer, []);
  const inputRef = useRef();
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          HOME
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          DASHBOARD
        </NavLink>
        {user && (
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            LOG OUT ( "{user.user_metadata.full_name.toUpperCase()}")
          </NavLink>
        )}
      </Flex>
      <hr />
      <br />

      <Flex
        as="form"
        onSubmit={async e => {
          e.preventDefault();
          await addTodo({ variables: { text: inputRef.current.value } });
          inputRef.current.value = "";
          await refetch();
        }}
      >
        <Label sx={{ display: "flex" }}>
          <span style={{ fontSize: "30px" }}>ADD&nbsp;TODO</span>
          <Input ref={inputRef} sx={{ marginLeft: 2 }} />
        </Label>
        <Button sx={{
          marginLeft: 2,
          '&:hover': {
            backgroundColor: 'White',
            color: 'primary',
            cursor: 'pointer'
          }
        }}>
          SUBMIT
        </Button>
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <div>loading...</div> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <ul sx={{ listStyleType: "none" }}>
            {data.todos.map(todo => (
              <Flex
                key={todo.id}
                as="li"
                onClick={async () => {
                  console.log("updateTodoDone");
                  await updateTodoDone({ variables: { id: todo.id } });
                  console.log("refetching");
                  await refetch();
                }}
              >
                <Checkbox checked={todo.done} readOnly />
                <span>{todo.text}</span>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
    </Container>
  );
};
