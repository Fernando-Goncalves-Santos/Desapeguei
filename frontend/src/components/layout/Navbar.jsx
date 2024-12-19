import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/desapeguei (1).png";
import styles from "./Navbar.module.css";
import { Context } from "../../context/UserContext";
import { useContext } from "react";
import { TbLogin2 } from "react-icons/tb";
import { IoPersonAdd } from "react-icons/io5";
import { TbDoorExit } from "react-icons/tb";
import { TbDoorEnter } from "react-icons/tb";
import { IoPersonCircle } from "react-icons/io5";
import { TbShoppingCartDollar } from "react-icons/tb";
import { TbShoppingCartHeart } from "react-icons/tb";
import RoundedImage from "./RoundedImage";
const apiUrl = import.meta.env.VITE_API;

const Navbar = () => {
  const { authenticated, logout } = useContext(Context);
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) { // Verifica se o token existe antes de prosseguir
      try {
         // Faz o parse apenas se o token for válido
        api.get('/users/checkuser', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.error("Erro ao verificar usuário:", err);
        });
      } catch (error) {
        console.error("Erro ao fazer parse do token:", error);
      }
    }
  }, [authenticated, token]);



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.navbar_container}>
      <nav className={styles.navbar} onClick={scrollToTop}>
        <NavLink to={"/"}>
          <div className={styles.navbar_Logo}>
            <img src={Logo} alt="Logo Desapeguei" />
            <h2>Desapeguei</h2>
          </div>
        </NavLink>

        {/* Renderização condicional para o menu autenticado */}
        {authenticated ? (
          <ul className={styles.navbar_auth}>
            <div className={styles.middle_icons}>
              <li>
                <NavLink to={"/products/myorders"}>
                  <span>Pedidos</span>
                  <TbShoppingCartHeart />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/products/myproducts"}>
                  <span>Produtos</span>
                  <TbShoppingCartDollar />
                </NavLink>
              </li>
            </div>
            <div className={styles.right_icons}>
              <li className={styles.profile_link}>
                <NavLink to={"/user/profile"}>
                  <span>Meu Perfil</span>
                  <IoPersonCircle/>
                </NavLink>
              </li>
              <li>
                <button className={styles.logout_button} onClick={logout}>
                  <span>Sair</span>
                  <TbDoorExit />
                </button>
              </li>
            </div>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to={"/login"}>
                <span>Entrar</span>
                <TbDoorEnter />
              </NavLink>
            </li>
            <li>
              <NavLink to={"/register"}>
                <span>Registrar</span>
                <IoPersonAdd />
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
