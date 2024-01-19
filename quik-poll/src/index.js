import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import CreatePoll from './CreatePoll';
import MainView from './MainView';
import UserPoll from './UserPoll';
import Results from './Results';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <ChakraProvider>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/create" component={CreatePoll} />
          <Route path="/live-view" component={MainView} />
          <Route path="/live-poll" component={UserPoll} />
          <Route path="/results" component={Results} />
        </Switch>
      </div>
    </ChakraProvider>
    </Router>
);

