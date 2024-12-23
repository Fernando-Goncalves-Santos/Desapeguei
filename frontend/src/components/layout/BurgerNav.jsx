import React from "react";
import { Context } from "../../context/UserContext";
import { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { TbDoorExit, TbDoorEnter, TbShoppingCartDollar, TbShoppingCartHeart } from "react-icons/tb";
import { IoPersonCircle } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Logo from "../../assets/img/desapeguei (1).png";

const BurgerNav = () => {
  const { authenticated, logout } = useContext(Context);
  const [open, setOpen] = useState(false);

  const burguerClick = () => {
    setOpen(!open);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar}>
        <div className={styles.navbar_left} onClick={scrollToTop}>
          <NavLink to={"/"}>
            <div className={styles.navbar_Logo}>
              <img src={Logo} alt="Logo Desapeguei" />
              <h2>Desapeguei</h2>
            </div>
          </NavLink>
        </div>
        <div className={styles.burger_menu}>
          <button onClick={burguerClick} className={styles.burger_button}>
            {open ? <IoMdClose/> : <GiHamburgerMenu/>}
          </button>
        </div>
      </div>
      {open && (
        <div className={styles.burger_container}>
          {authenticated && (
            <ul className={styles.burger_list}>
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
          )}
          {authenticated ? (
            <ul className={styles.burger_list}>
              <li>
                <NavLink to={"/user/profile"}>
                  <span>Meu Perfil</span>
                  <IoPersonCircle />
                </NavLink>
              </li>
              <li>
                <button className={styles.burger_logout} onClick={logout}>
                  <span>Sair</span>
                  <TbDoorExit />
                </button>
              </li>
            </ul>
          ) : (
            <ul className={styles.burger_list}>
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
        </div>
      )}
    </div>
  );
};

export default BurgerNav;
