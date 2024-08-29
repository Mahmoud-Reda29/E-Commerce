import React, { useContext, useEffect } from 'react'
import styles from './ProtectedAuth.module.css'
import { UserContext } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
function ProtectedAuth(props) {

  const { token } = useContext(UserContext)
  if (token === null) {
    return props.children
  } else {
    return <Navigate to={'/'}></Navigate>
  }

}

export default ProtectedAuth
