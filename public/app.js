import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import WorkOrders from './components/WorkOrders';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/workorders" component={WorkOrders} />
          {/* Add other routes here */}
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
