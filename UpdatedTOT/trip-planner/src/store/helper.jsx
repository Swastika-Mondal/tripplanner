import { createContext, useContext, useEffect, useState } from "react";

export const HelperContext = createContext()

export const HelperProvider = ({children}) => {


    const BACKEND_HOSTING_URL = "http://127.0.0.1:8000"

    

    return <HelperContext.Provider value={{}}>
            {children}
        </HelperContext.Provider>
}

export const useHelper = () => {
    const helperContextValue = useContext(HelperContext)
    if(!helperContextValue){
        throw new Error('useHelper used outside of the Provider')
    }
    return helperContextValue
}
