import React from "react";
import { useState, useEffect } from "react";
import api from "../../../utils/api";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import useFlashMessage from "../../../hooks/useFlashMessage";
const apiUrl = import.meta.env.CLOUDINARY_API;
import { Link, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then((response) => {
      setProduct(response.data.product);
    });
  }, [id]);

  async function schedule() {
    let msgType = "success";
    const data = await api
      .patch(`/products/schedule/${product._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
    navigate(`/`);
  }

  return (
    <div>
      {product.name && (
        <section className={styles.product_details_container}>
          <div className={styles.product_details_header}>
            <h1>{product.name}</h1>
            <p>
              Se tiver interesse, entre em contato com o vendedor para negociar!
            </p>
          </div>
          <div className={styles.product_banner}>
            <div className={styles.product_images}>
              {product.images.map((image, index) => (
                <img
                  src={`${apiUrl}${image}`}
                  alt={product.name}
                  key={index}
                />
              ))}
            </div>

            <div className={styles.product_actions}>
              <p className={styles.product_price}>
                <span className="bold">R$ {product.price}</span>
              </p>
              {token ? (
            <button onClick={() => schedule()}>
              Entrar em contato com o vendedor
            </button>
          ) : (
            <p>
              Você precisa <Link to={"/login"}>estar logado</Link> para entrar
              em contato com o vendedor
            </p>
          )}
            </div>
          </div>
          <div className={styles.product_description}>
          <h3>
            <span className="bold">Descrição do produto</span>
          </h3>
          <div className={styles.description_details}>
          <p><span className="bold">{product.name}</span></p>
          <p>{product.description}</p>
          </div>
          </div>
         
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
