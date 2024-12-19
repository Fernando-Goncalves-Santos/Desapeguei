import React from 'react'
import styles from './RoundedImage.module.css'

const RoundedImage = ({src, alt, widht}) => {
  return (
    <div>
        <img 
        className={`${styles.rounded_image} ${styles[widht]}`}
        src={src}
        alt={alt}/>
    </div>
  )
}

export default RoundedImage