import React from 'react'
import styles from './AddProduct.module.css'
import api from '../../../utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'
import ProductForm from '../../form/ProductForm'

const AddProduct = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const {setFlashMessage} = useFlashMessage()
  const navigate = useNavigate()

  async function registerProduct(product) {
    let msgType = 'success'

    const formData = new FormData()

    await Object.keys(product).forEach((key) => {
      if(key === 'images') {
        for(let i = 0; i < product[key].length; i++) {
          formData.append('images', product[key][i])
        }

      } else {
        formData.append(key, product[key])
      }
    })
    console.log(`Form data: ${formData}`)

    const data = await api.post('/products/create', formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-type': 'multipart/form-data'
      }
    }).then((response) => {
      return response.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
    if(msgType !== 'error') {
      navigate('/products/myproducts')
    }
    
  }
  return (
    <div>
        <header className={styles.addproduct_header}>
        <h1>Cadastre um produto</h1>
        <p>Depois ele ficará disponível para a compra</p>
        <ProductForm btnText={"Cadastrar Produto"} handleSubmit={registerProduct}/>
        </header>
    </div>
  )
}

export default AddProduct