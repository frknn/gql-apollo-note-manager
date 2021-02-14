import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { Container } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import BgIcons from './components/BgIcons'
import Home from './components/Home';
import PersonPage from './components/PersonPage';
import AddPerson from './components/AddPerson';
import AddNote from './components/AddNote';

const App = () => {

  return (
    <>
      <ColorModeSwitcher position="absolute" top={4} right={4} />
      <BgIcons />
      <Container maxW="3xl" h="100vh" textAlign="center" centerContent py={12} px={0}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/people/:id">
              <PersonPage />
            </Route>
            <Route exact path="/add-person">
              <AddPerson />
            </Route>
            <Route exact path="/add-note">
              <AddNote />
            </Route>
          </Switch>
        </Router>
      </Container>
    </>
  );
}

export default App;
