import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";

import api from "../../../utils/api";
const apiUrl = import.meta.env.VITE_API;

import RoundedImage from "../../layout/RoundedImage";
import styles from "../Product/Dashboard.module.css";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false)
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/products/myproducts", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setProducts(response.data.products);
        setUpdate(false)
        return
      })
      .catch((err) => {
        console.log(`Erro: ${err}`);
      });
  }, [token, update]);

  async function removeProduct(id) {
    let msgType = "success";
    const data = await api
      .delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedProducts = products.filter((product) => product._id != id);
        setProducts(updatedProducts);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  async function concludeSale(id) {
    let msgType = "success";
    const data = await api
      .patch(`/products/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUpdate(true)
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <div>
      <header className={styles.productlist_header}>
        <h1>Meus Produtos</h1>
        <Link to="/products/add">Cadastrar Produtos</Link>
      </header>
      <div className={styles.productlist_container}>
        {products.length > 0 ? (
          products.map((product) => (
            <div className={styles.productlist_row} key={product._id}>
              <RoundedImage
                src={`${apiUrl}images/products/${product.images[0]}`}
                alt={product.name}
                widht={"px75"}
              />
              <span className="bold">{product.name}</span>
              <div className={styles.actions}>
                {product.available ? (
                  <>
                    {product.customer && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => concludeSale(product._id)}
                      >
                        Concluir venda
                      </button>
                    )}
                    <Link
                      to={`/products/edit/${product._id}`}
                      className={styles.edit_btn}
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => {
                        removeProduct(product._id);
                      }}
                      className={styles.remove_btn}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Vendido</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>não há produtos cadastrados</p>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
