import React, { createContext, useReducer } from 'react'
import {parcelReducer} from '../reducers/parcelReducer'
import {submitAction, loginAction} from '../actions/authActions'

const initialState = {
    parcels: [],
    loading: false,
    errorMsg: "",
  };

export const ProfileContext = createContext(initialState);

const ProfileContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(parcelReducer, initialState)

    return (
       <ProfileContext.Provider value={{state}}>
           {children}
       </ProfileContext.Provider>
    )
}

export default ProfileContextProvider
