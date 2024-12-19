import { useState, useContext } from "react";
import Input from "../../form/Input";
import styles from "../../form/Form.module.css";
import { Context } from "../../../context/UserContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({})
  const {login} = useContext(Context)

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault()

    login(user)
  }
  return (
    <div className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          name="email"
          type={"email"}
          placeholder={"Digite o seu e-mail"}
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          name="password"
          type={"password"}
          placeholder={"Digite a sua senha"}
          handleOnChange={handleChange}
        />
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Ainda não tem uma conta? <Link to={"/register"}>Cadastrar</Link>
      </p>
    </div>
  );
};

export default Login;
