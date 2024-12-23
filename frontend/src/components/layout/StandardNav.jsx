import React from "react";
import { Context } from "../../context/UserContext";
import { useContext } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { TbDoorExit } from "react-icons/tb";
import { TbDoorEnter } from "react-icons/tb";
import { IoPersonCircle } from "react-icons/io5";
import { TbShoppingCartDollar } from "react-icons/tb";
import { TbShoppingCartHeart } from "react-icons/tb";
const apiUrl = import.meta.env.VITE_API;
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Logo from "../../assets/img/desapeguei (1).png";

const StandardNav = () => {
  const { authenticated, logout } = useContext(Context);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <>
      <div className={styles.navbar}>
      <div className={styles.navbar_left} onClick={() => scrollToTop()}>
        <NavLink to={"/"}>
          <div className={styles.navbar_Logo}>
            <img src={Logo} alt="Logo Desapeguei" />
            <h2>Desapeguei</h2>
          </div>
        </NavLink>
      </div>
      {authenticated && (
        <div className={styles.navbar_middle}>
          <ul className={styles.navbar_auth}>
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
          </ul>
        </div>
      )}
      {authenticated ? (
        <div className={styles.navbar_right}>
          <ul>
            <li>
              <NavLink to={"/user/profile"}>
                <span>Meu Perfil</span>
                <IoPersonCircle />
              </NavLink>
            </li>
            <li>
              <button className={styles.logout_button} onClick={logout}>
                <span>Sair</span>
                <TbDoorExit />
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className={styles.navbar_right}>
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
        </div>
      )}
      </div>
    </>
  );
};

export default StandardNav;
