import React from "react";
import Logo from "./static/images/quikpoll-logo.jpeg";
import { Link } from "react-router-dom";
import { Button, Box, Image, Text,HStack} from '@chakra-ui/react';
import "./styles/App.css";


export default function App() {
  return (
    <Box className="App" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box className="header">
          <Image src={Logo} alt="QuikPoll Logo" />
        </Box>
        <Box className="body" mt={4}>
          <Text fontSize="xl" fontWeight="bold">Welcome to the QuikPoll app!</Text>
          <HStack justify="center" mt={4}>
            <Link to="/create">
              <Button colorScheme='blue' variant='solid'>Create a poll.</Button>
            </Link>
            <Link to="/join">
              <Button colorScheme="blue" variant='outline'>Join a poll.</Button>
            </Link>
          </HStack>
        </Box>
      </Box>
  );
}
