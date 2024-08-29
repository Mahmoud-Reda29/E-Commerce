import React, { useEffect } from 'react'
import styles from './NotFound.module.css'
function NotFound() {
     useEffect(()=>{
          console.log('NotFound Mounting');
          
     })
  return (
    <div>NotFound</div>
  )
}

export default NotFound