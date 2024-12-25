import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import api from "../../utils/api";
import { IoCart } from "react-icons/io5";
const apiUrl = import.meta.env.VITE_API;

const Home = () => {
  const [products, setProducts] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    api.get("/products").then((response) => {
      setProducts(response.data.products);
    });
  }, []);

  const handleClick = (id) => {

    navigate(`product/${id}`)

  }


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
              <div
                style={{
                  backgroundImage: `url(https://res.cloudinary.com/dvt78xazb/image/upload/v1734975202/${product.images[0]})`,
                }}
                className={styles.product_card_image}
                onClick={() => handleClick(product._id)}
              ></div>
              <h3>{product.name}</h3>
              <p>
                <span className="bold blue">R$ {product.price}</span>
              </p>
              {product.available ? (
                <>
                  <Link to={`product/${product._id}`}>
                    <div className={styles.button}>
                      <IoCart />
                      <span>Comprar</span>
                    </div>
                  </Link>
                </>
              ) : (
                <p>Vendido!</p>
              )}
            </div>
          ))
        ) : (
          <div className={styles.loading}>
            <p>Carregando Produtos...</p>
            <p>
              <span className="bold">Obs:</span> Esse projeto é hospedado de
              forma gratuita no Render, para economia de recursos, os serviços inativos podem
              ser temporariamente suspensos. Mas não se preocupe, em 30 segundos os servidores serão reiniciados e o <span className="bold">Desapeguei</span> funcionará normalmente{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
