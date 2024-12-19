import React from "react";
import { useState } from "react";
import formStyles from "./Form.module.css";
import Input from "./Input";

const apiUrl = import.meta.env.VITE_API;

const ProductForm = ({ productData, btnText, handleSubmit }) => {
  const [product, setProduct] = useState(productData || {});
  const [preview, setPreview] = useState([]);

  function onFileChange(e) {
    // e.target.files retorna um Object Filelist, o que interage bem com o sistema, precisamos transformar ele em um array simples e adiciona-lo ao produto
    const files = Array.from(e.target.files)
    setPreview(files)
    setProduct({ ...product, images: files });
  }

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(product)
  }

  return (
    <div>
      <form className={formStyles.form_container} onSubmit={submit}>
        <Input
          text={"Nome"}
          type={"text"}
          name={"name"}
          placeholder={"Digite o nome do Produto"}
          handleOnChange={handleChange}
          value={product.name || ""}
        />
        <Input
          text={"Preço"}
          type={"text"}
          name={"price"}
          placeholder={"Digite o preço do Produto"}
          handleOnChange={handleChange}
          value={product.price || ""}
        />
        <Input
          text={"Descrição"}
          type={"text"}
          name={"description"}
          placeholder={"Descreva o Produto"}
          handleOnChange={handleChange}
          value={product.description || ""}
        />
        <Input
          text={"Imagens do Produto"}
          type={"file"}
          name={"images"}
          handleOnChange={onFileChange}
          multiple={true}
        />
        <div className={formStyles.preview_products_images}>
          {preview.length > 0
            ? preview.map((image, index) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt={product.name}
                  key={`${product.name}+${index}`}
                />
              ))
            : product.images &&
              product.images.map((image, index) => (
                <img
                  src={ `${apiUrl}/images/products/${image}`}
                  alt={product.name}
                  key={`${product.name}+${index}`}
                />
              ))}
        </div>
        <input type="submit" value={btnText} />
      </form>
    </div>
  );
};

export default ProductForm;
