import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useParams } from "react-router";

export default function SetPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const params = useParams();

    const updateUserPassword = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            console.log('success');
            dispatch({
              type: 'UPDATE_PASSWORD',
              payload: {
                password: password,
                inviteToken: params.inviteToken
              }
            });
        } else {
            alert('Passwords must match')
        }
      }; // end updateUserPassword

    //   useEffect(() => {
    //     // get the user's name
    //     dispatch({
    //         type: 'GET_USER_NAME'
    //       });

    // }, [])

    return (
        <form className="formPanel" onSubmit={updateUserPassword}>
        <h1>Welcome, {}</h1>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br/>
        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <input className="btn" type="submit" name="submit" value="Submit" />
        </form>
    )
}