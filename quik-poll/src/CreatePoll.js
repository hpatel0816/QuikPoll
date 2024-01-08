import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {Box, Text, VStack, FormControl, FormLabel, Input, Button, Flex} from "@chakra-ui/react";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

export default function CreatePoll() {

    const [options, setOptions] = React.useState(['', '']);
    const maxOptions = 8;

    const handleAddOption = () => {
        if (options.length < maxOptions) {
        setOptions([...options, '']);
        }
    };

    const handleRemoveOption = (index) => {
        if (options.length > 2) {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
        }
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const createPoll = () => {
        socket.emit("create-poll", { data: "First Poll."});
    }

    return (
        <Box>
            <Box textAlign="center" mt="8">
                <Text fontSize="xl" fontWeight="bold">Create a New Poll</Text>
            </Box>
            <VStack spacing={4} align="center" mt={8}>
            <Flex w="100%" align="center" justify="center" mb="6">
                <FormControl isRequired maxW="40%">
                    <Flex>
                    <FormLabel flex="0.5">Voting Topic:</FormLabel>
                    <Input flex="2" placeholder='Enter the topic or question'/>
                    </Flex>
                </FormControl>
            </Flex>
            {options.map((option, index) => (
             <Flex key={index} w="100%" align="center" justify="center">
                <FormControl maxW="60%">
                <Flex>
                    <FormLabel flex="1" pl="14%">Voting Option {index + 1}:</FormLabel>
                    <Input
                        flex="3.7"
                        type="text"
                        placeholder={`Enter description`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    <Button flex="0.3" ml="5" colorScheme="red" onClick={() => handleRemoveOption(index)}>
                    Delete
                    </Button>
                </Flex>
                </FormControl>
             </Flex>
            ))}
            <Flex w="50%" align="center" justify="space-between" mt="8" pl="12">
                <Flex>
                    <Button colorScheme="gray" mr={2}>Return</Button>
                    <Button colorScheme="teal" variant='outline' onClick={handleAddOption}>Add Option</Button>
                </Flex>
                <Link to="/live-poll">
                <Button mr="2%" colorScheme="teal" onClick={createPoll}>Create Poll</Button>
                </Link>
            </Flex>
            </VStack>
        </Box>
    );
};
