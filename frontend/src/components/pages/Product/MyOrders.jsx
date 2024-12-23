import React from "react";
import styles from "./Dashboard.module.css";
import api from "../../../utils/api";
import { useState, useEffect } from "react";
import RoundedImage from "../../layout/RoundedImage";
const apiUrl = import.meta.env.VITE_API;
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [products, setProducts] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    api
      .get("/products/myorders", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setProducts(response.data.products);
      });
  }, [token]);

      useEffect(() => {
        let timeoutId;
      
        const handleSize = () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setWidth(window.innerWidth);
          }, 50); // Ajuste o tempo do debounce conforme necessário
        };
      
        handleSize();
      
        window.addEventListener("resize", handleSize);
      
        return () => {
          clearTimeout(timeoutId);
          window.removeEventListener("resize", handleSize);
        };
      }, []);

  return (
    <div>
      <header className={styles.productlist_header}>
        <h1>Meus Pedidos</h1>
      </header>
      <div className={styles.produclist_container}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className={styles.products_row}>
              <div className={styles.left_container}>
                <RoundedImage
                  src={`${apiUrl}images/products/${product.images[0]}`}
                  alt={product.name}
                  widht={width > 500 ? "px75" : "px45"}
                />
                <span className="bold">{product.name}</span>
              </div>
              <div className={styles.contacts}>
                <p>
                  Entre em contato com: {" "}
                  <span className="bold">{product.user.name}</span>
                </p>
                <p>
                  Telefone:{" "}
                  <span className="bold">{product.user.phone}</span>
                </p>
              </div>
              <div className={styles.actions}>
                {product.available ? (
                  <p>Negociação em andamento</p>
                ) : (
                  <p>Negociação finalizada</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Você ainda não tem pedidos</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
