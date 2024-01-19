import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Box, Text, Button, Grid, GridItem } from "@chakra-ui/react";
import { Bar, Doughnut } from 'react-chartjs-2';
import io from 'socket.io-client';

export default function MainView() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Votes',
        data: [],
        backgroundColor: [
          "#ff6961",
          "#ffb480",
          "#f8f38d",
          "#42d6a4",
          "#08cad1",
          "#59adf6",
          "#9d94ff",
          "#c780e8"
        ],
        borderColor: [
          "#ff6961",
          "#ffb480",
          "#f8f38d",
          "#42d6a4",
          "#08cad1",
          "#59adf6",
          "#9d94ff",
          "#c780e8"
        ]
      },
    ],
  });

  const [pollInfo, setPollInfo] = useState({
    topic: "",
    joinCode: "",
  });

  const socket = io.connect("http://localhost:3001");

  useEffect(() => {
    socket.on("started", (response) => {
        const { pollId, data } = response;

        setChartData({
            labels: Object.keys(data.options),
            datasets: [
                {
                    label: 'Votes',
                    data: Object.values(data.options),
                    backgroundColor: chartData.datasets[0].backgroundColor,
                    borderColor: chartData.datasets[0].borderColor,
                },
            ],
        });

        setPollInfo({
            topic: data.topic,
            joinCode: pollId.split('-')[0],
        });
    });

    socket.on("poll-update", (data) => {
        setChartData({
            labels: Object.keys(data.options),
            datasets: [
                {
                    label: 'Votes',
                    data: Object.values(data.options),
                    backgroundColor: chartData.datasets[0].backgroundColor,
                    borderColor: chartData.datasets[0].borderColor,
                },
            ],
        });
    });

    return () => {
        socket.disconnect();
    };
}, [chartData.datasets]);


  const handleEndPoll = () => {
    socket.emit('end-poll');
    socket.disconnect();
  };

  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateRows={'1fr'}
      gridTemplateColumns={'25% 1fr'}
      h='100vh'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='#dafffe' area={'nav'}>
        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" h="90vh">
          <Text fontSize="2xl"> Join Code:</Text>
          <Text fontSize="6xl" mt={0}>{pollInfo.joinCode}</Text>
          <Box mt={8}>
            <Button colorScheme="red" onClick={handleEndPoll}>
              End Poll
            </Button>
          </Box>
        </Box>
      </GridItem>
      <GridItem pl='2' area={'main'}>
        <Box mt={8} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
          <Text fontSize="3xl" fontWeight="bold">{pollInfo.topic}</Text>
          <Box w="40em" h="85vh" mt={8}>
            <Doughnut data={chartData} />
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
}
