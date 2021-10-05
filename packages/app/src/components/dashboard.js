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
import { IdentityContext } from "../../identity-context";

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
      <Flex
        as="form"
        onSubmit={e => {
          e.preventDefault();
          dispatch({ type: "addTodo", payload: inputRef.current.value });
          inputRef.current.value = ""; //submit ka baad input box epmpty hojaega iski wajah sa 
        }}
      >
        <Label sx={{ display: "flex" }}>
          <span>ADD&nbsp;TODO</span>
          <Input ref={inputRef} sx={{ marginLeft: 2 }} />
        </Label>
        <Button sx={{ marginLeft: 2,
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
        <ul sx={{ listStyleType: "none" }}>
          {todos.map((todo, i) => (
            <Flex
              as="li"
              onClick={() => {
                dispatch({
                  type: "toggleTodoDone",
                  payload: i
                });
              }}
            >
              <Checkbox checked={todo.done} />
              <span>{todo.value}</span>
            </Flex>
          ))}
        </ul>
      </Flex>
    </Container>
  );
};