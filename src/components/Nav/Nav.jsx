import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Park Bugle Ad Portal</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <>
            <Link className="navLink" to="/login">
              Login
            </Link>

            <Link className="navLink" to="/about">
              About
            </Link>
          </>
        }
        
        {/* If an admin is logged in, show these links */}
        {(user.id && user.authLevel === "admin") &&
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/users">
              Users
            </Link>

            <Link className="navLink" to="/pricing">
              Pricing
            </Link>

            <LogOutButton className="navLink" />
          </>
        }

        {/* If anyone other than an admin is logged in, show these links */}
        {(user.id && user.authLevel !== "admin") &&
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

            <LogOutButton className="navLink" />
          </>
        }

      </div>
    </div>
  );
}

export default Nav;
