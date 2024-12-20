import React from 'react'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import api from '../../utils/api'
import { IoCart } from "react-icons/io5";
const apiUrl = import.meta.env.VITE_API;

const Home = () => {
  const [products, setProducts] = useState({})

  useEffect(() => {
    
    api.get('/products').then((response) =>{
      setProducts(response.data.products)
    })

  }, [])
  return (
    <div>
      <header className={styles.product_home_header}>
        <h1>Produtos</h1>
        <p>veja os detalhes de cada um e fale diretamente com o vendedor!</p>
      </header>
      <div className={styles.product_container}>
        {products.length > 0 ? (
          products.map((product) => (
            <div className={styles.product_card} key={product._id}>
              <div style={{backgroundImage: `url(${apiUrl}images/products/${product.images[0]})`}} className={styles.product_card_image}></div>
              <h3>{product.name}</h3>
              <p>
                <span className='bold blue'>R$ {product.price}</span>
              </p>
              {product.available ? (
                <>
                <Link to={`product/${product._id}`}>
                <div className={styles.button}>
                  <IoCart/>
                  <span>Comprar</span>
                </div></Link>
                </>
              ): (
                <p>Vendido!</p>
              )}
            </div>
          ))
        ) : (
          <p>Não tem produtos</p>
        )}
      </div>
    </div>
  )
}

export default Home