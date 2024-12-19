import React from 'react'
import styles from './AddProduct.module.css'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'

import useFlashMessage from '../../../hooks/useFlashMessage'
import ProductForm from '../../form/ProductForm'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const EditProduct = () => {

    const [product, setProduct] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {

        api.get(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setProduct(response.data.product)
        }).catch()

    },[token, id])

    async function updateProduct(product) {
        
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(product).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < product[key].length; i++) {
                    console.log(`Adicionando: ${product[key][i]}`)
                    formData.append('images', product[key][i])
                }
            } else {
                console.log(`Agora Adicionando: ${product[key]}`)
                formData.append(key, product[key])
            }
        })

        

        const data = await api.patch(`products/${product._id}`, formData, {
            headers : {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        if(msgType === 'success'){
            navigate('/products/myproducts')
        }


    }

  return (
    <div>
    <header className={styles.addproduct_header}>
    <h1>Editando o produto: {product.name}</h1>
    <p>Os dados serão salvos no sistema após clicar em "Salvar"</p>
    </header>
    {product.name && (
        <>
        <ProductForm btnText={"Salvar"} handleSubmit={updateProduct} productData={product}/>
        </>
    )}
</div>
  )
}

export default EditProduct