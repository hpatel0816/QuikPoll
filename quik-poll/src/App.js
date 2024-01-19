import React, { useState } from 'react';
import io from 'socket.io-client';
import Logo from "./static/images/quikpoll-logo.jpeg";
import { Link } from "react-router-dom";
import { Button, Box, Image, Text,VStack, FormControl, Input, Flex, Divider, AbsoluteCenter } from '@chakra-ui/react';
import "./styles/App.css";


export default function App() {
  const [joinCode, setJoinCode] = useState('');

  const handleJoinCodeChange = (event) => {
    setJoinCode(event.target.value);
  };

  const createPoll = () => {
    const socket = io.connect("http://localhost:3001");
    socket.emit("join-poll", joinCode);
  }

  return (
    <Box className="App" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box className="header">
          <Image src={Logo} alt="QuikPoll Logo" mt={2}/>
        </Box>
        <Box className="body" mt={4}>
          <Text fontSize="xl" fontWeight="bold">Welcome to the QuikPoll app!</Text>
          <VStack justify="center" mt={4} mb={2}>
            <Link to="/create">
              <Button colorScheme='blue' variant='solid' mb={0}>Create a poll.</Button>
            </Link>
              <Divider orientation="horizontal" mt={3} mb={3}/>
            <Flex w="100%" align="center" justify="center" mt={0}>
              <FormControl isRequired maxW="100%">
                <Input width="10em" placeholder='Enter join code' onChange={handleJoinCodeChange}/>
              </FormControl>
            </Flex>
            <Link to="/live-poll">
            <Button colorScheme="blue" variant='outline' onClick={createPoll}>
              Join
            </Button>
            </Link>
          </VStack>
        </Box>
      </Box>
  );
}
