import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Button, Grid, GridItem } from "@chakra-ui/react";
import io from 'socket.io-client';

export default function UserPoll() {
    const [pollData, setPollData] = useState({
        topic: "",
        options: [],
    });
    const [selectedOption, setSelectedOption] = useState("");
    const socket = io.connect("http://localhost:3001");

    useEffect(() => {
        socket.on("joined-poll", (data) => {
            console.log(`Data: ${data}`);
            setPollData({
                topic: data.topic,
                options: Object.keys(data.options),
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleSubmitVote = () => {
        socket.emit('vote', selectedOption);
    };

    return (
        <VStack spacing={4} align="center">
            <Text fontSize="5xl" fontWeight="bold" mt={8} mb={8}>{pollData.topic}What is the best programming language?</Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {pollData.options.map((option, index) => (
                    <GridItem key={index}>
                        <Box
                            onClick={() => handleOptionClick(option)}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "10em",
                                width: "35em",
                                backgroundColor: getColorScheme(index),
                                borderRadius: "8px",
                            }}
                        >
                        <GridItem>
                            <Box>Python</Box>
                            <Box>C++</Box>
                        </GridItem>
                            <Text fontSize="lg" fontWeight="bold" color="white">
                                {option}
                            </Text>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
            <Button colorScheme="teal" mt={4} onClick={handleSubmitVote} size="lg">
                Submit Vote
            </Button>
        </VStack>
    );
}

// Function to get color scheme based on the option index
const getColorScheme = (index) => {
    const colorSchemes = ["red", "blue", "green", "yellow"];
    return colorSchemes[index] || "teal";
};
