import React from "react";
import { Container, Heading, Button, Flex  } from "@theme-ui/components";
export default props => (
  <Container>
    <Flex sx={{flexDirection: "column", padding:4}}>
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
  onClick={()=> {
    alert("clicked")
  }}  >
      LOG IN
    </Button>
    </Flex>
  </Container>
);