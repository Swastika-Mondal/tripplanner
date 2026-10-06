import React, { useEffect } from 'react'
import { useFirebase } from '../store/firebasedb'
import { Navigate } from 'react-router-dom'

export default function Logout() {
    const {Logout} = useFirebase()

    useEffect(() => {
        Logout()
    }, [Logout])

  return <Navigate to='/login'/>;
}