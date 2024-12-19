import React from 'react'
import styles from './Message.module.css'
import { useState, useEffect } from 'react'
import bus from '../../utils/bus'

const Message = () => {
    const [type, setType] = useState('')
    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState('false')

    useEffect(() => {

        bus.addListener('flash', ({message, type}) =>{
            setVisibility(true)
            setMessage(message)
            setType(type)

            setTimeout(() => {
                setVisibility(false)
            }, 2500)
        })

    }, [])
    
  return (
        <div className={`${styles.message} ${visibility ? styles.visible : styles.hidden} ${styles[type]}`}>
        {message}
    </div>
    )
    
}

export default Message