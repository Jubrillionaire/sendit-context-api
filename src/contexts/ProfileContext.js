import React, { createContext, useReducer } from 'react'

const ProfileContext = createContext();

const ProfileContextProvider = () => {

    const initialState = {
        parcels: [],
        loading: false,
        errorMsg: "",
      };

    const [parcles, dispatch] = useReducer(parcelReducer, initialState)

    return (
       <ProfileContext.Provider>
           {props.children}
       </ProfileContext.Provider>
    )
}

export default ProfileContextProvider
