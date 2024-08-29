import React, { useContext, useEffect } from 'react'
import styles from './ProtectedRoute.module.css'
import { UserContext } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
function ProtectedRoute(props) {

  const { token, setToken } = useContext(UserContext)
  if (token) {
    return props.children
  } else {
    return <Navigate to={'/login'}></Navigate>
  }

}

export default ProtectedRoute
