import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Sidebar from './components/Sidebar';
import Dashboard from './components/dashboard/Dashboard';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import Agent from './components/agent/Home';
import User from './components/users/Home';
import Business from './components/business/Home';
import Auth from './components/Auth';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    window.addEventListener('storage', () => {
      //if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  
  return (
    <Provider store={store}>
      <Router>
        {localStorage.token && <Navbar />}
        {localStorage.token && <Sidebar />}
      
        <Alert />
        <div className="content-wrapper">
          
            <Routes>
              
              
              
              <Route path="user" element={<PrivateRoute component={User} />}  />
              <Route path="agent" element={<PrivateRoute component={Agent} />} />
              <Route path="business" element={<PrivateRoute component={Business} />}  />
              <Route path="/" element={<PrivateRoute component={Dashboard} />} />

              <Route path="login" element={<Auth />} />
            </Routes>
          
        </div>
        </Router>
    </Provider>
  );
};

export default App;
