import React, { createContext, useReducer } from 'react'
import {reducer} from '../reducers/reducer';
import { toast } from "react-toastify";
import {url} from '../utils/utils'

toast.configure();

const initialState = {
  };

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

  const registerAction = async userDetails =>  {
        console.log(userDetails)
        const { firstName, lastName, email, phoneNo, password } = userDetails;
        try {
          const response = await fetch(`${url}/users`, {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone_no: phoneNo,
              password: password,
            }),
          });
          const res = await response.json();
          if (res.token) {
            localStorage.setItem("token", res.token);
            toast.success(res.msg);
            window.location = "/user";
          } else if (res.msg) {
            toast.error(res.msg);
          } else {
            res.errors.forEach(err => {
              toast.error(err.msg);
            });
          }
        } catch (err) {
          console.log(err);
        }
      };
      
       const loginAction = async loginData =>  {
        try {
          const { email, password } = loginData;
          const response = await fetch(`${url}/users/login`, {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          const res = await response.json();
          if (res.token) {
            const userRes = await fetch(`${url}/me`, {
              headers: {
                "Content-type": "application/json",
                Authorization: res.token,
              },
            });
            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.userId);
            toast.success(res.msg);
            window.location = "/user";
            console.log("success")
      
          } else if (res.msg) {
            toast.error(res.msg);
            console.log("errrrrr")
          }
        } catch (err) {
          console.log(err);
          console.log("errrrrr")
        }
      };
      
    
    return (
       <AuthContext.Provider value={{state, registerAction, loginAction }}>
           {children}
       </AuthContext.Provider>
    )
}

export default AuthContextProvider
