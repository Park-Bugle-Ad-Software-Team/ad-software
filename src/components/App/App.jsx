import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import UsersPage from '../UsersPage/UsersPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import PricingPage from '../PricingPage/PricingPage';
import HomePage from '../HomePage/HomePage';
import About from '../About/About';

import './App.css';
import InviteUserForm from '../UsersPage/InviteUserForm';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>

      {/* components:
      
        home-page
        advertiser-home-page
          employee-home-page
          admin-home-page
        ad-card
          print view
          web view
        list-view of ad cards

      */}

      <div>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />

          <Route
            exact
            path="/about"
          >
              <About />
          </Route>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              <Redirect to="/home" />
              :
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              <Redirect to="/home" />
              :
              <RegisterPage />
            }
          </Route>
          
          <ProtectedRoute
            exact
            path="/users"
          >
            {user.authLevel !== 'admin' &&
              <Redirect to="/home" />
            }
            <UsersPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/users/:id"
          >
            {user.authLevel !== 'admin' &&
              <Redirect to="/home" />
            }
            <InviteUserForm />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/pricing"
          >
            {user.authLevel !== 'admin' &&
              <Redirect to="/home" />
            }
            <PricingPage />
          </ProtectedRoute>

          

          <ProtectedRoute
            exact
            path="/home"
          >
              <HomePage />
          </ProtectedRoute>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
