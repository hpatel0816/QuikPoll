import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import CreatePoll from './CreatePoll';
import JoinPoll from './JoinPoll';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <ChakraProvider>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/create" component={CreatePoll} />
          <Route path="/join" component={JoinPoll} />
        </Switch>
      </div>
    </ChakraProvider>
    </Router>
);

