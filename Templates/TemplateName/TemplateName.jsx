import React, { useEffect } from 'react'
import styles from './TemplateName.module.css'
function TemplateName() {
     useEffect(()=>{
          console.log('TemplateName Mounting');
          
     })
  return (
    <div>TemplateName</div>
  )
}

export default TemplateName