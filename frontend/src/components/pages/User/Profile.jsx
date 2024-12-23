import { useState, useEffect } from "react";

import api from "../../../utils/api";
const apiUrl = import.meta.env.VITE_API;

import useFlashMessage from "../../../hooks/useFlashMessage";

import React from "react";
import styles from "./Profile.module.css";
import formStyles from "../../form/Form.module.css";
import Input from "../../form/Input";
import RoundedImage from "../../layout/RoundedImage";

const Profile = () => {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  // Alteração da imagem do usuário
  function onFileChange(e) {
    setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  // Alteração dos outros campos do formulário
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "success";

    // Essa manobra de colocar os dados do formulario em um objeto é necessária para os dados de imagem possam ser enviados
    const formData = new FormData();
    const userFormData = await Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });
    console.log(user)

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

      setFlashMessage(data.message, msgType)
  }



  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  return (
    <div>
      <header className={styles.profile_header}>
        <h1>Perfil</h1>
        {(user.image || preview) && (
            <RoundedImage src={preview ? URL.createObjectURL(preview) : `${user.image}`} alt={user.name} />
        )}
      </header>
      <form className={formStyles.form_container} onSubmit={handleSubmit}>
        <Input
          text={"Imagem"}
          type={"file"}
          name={"image"}
          handleOnChange={onFileChange}
        />
        <Input
          text={"Email"}
          type={"email"}
          name={"email"}
          placeholder={"Digite o seu e-mail"}
          handleOnChange={handleChange}
          value={user.email || ""}
        />
        <Input
          text={"Nome"}
          type={"text"}
          name={"name"}
          placeholder={"Digite o seu nome"}
          handleOnChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text={"Telefone"}
          type={"text"}
          name={"phone"}
          placeholder={"Digite o seu telefone"}
          handleOnChange={handleChange}
          value={user.phone || ""}
        />
        <Input
          text={"Senha"}
          type={"password"}
          name={"password"}
          placeholder={"Digite a sua senha"}
          handleOnChange={handleChange}
          value={user.password || ""}
        />
        <Input
          text={"Confirmação de senha"}
          type={"password"}
          name={"confirmpassword"}
          placeholder={"Confirme a sua senha"}
          handleOnChange={handleChange}
        />
        <input type="submit" value="Salvar" />
      </form>
    </div>
  );
};

export default Profile;
