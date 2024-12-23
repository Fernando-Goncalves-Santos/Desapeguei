import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/desapeguei (1).png";
import styles from "./Navbar.module.css";
import { Context } from "../../context/UserContext";
import { useContext } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { TbDoorExit } from "react-icons/tb";
import { TbDoorEnter } from "react-icons/tb";
import { IoPersonCircle } from "react-icons/io5";
import { TbShoppingCartDollar } from "react-icons/tb";
import { TbShoppingCartHeart } from "react-icons/tb";
const apiUrl = import.meta.env.VITE_API;
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import StandardNav from "./StandardNav";
import BurgerNav from "./BurgerNav";

const Navbar = () => {
  const { authenticated, logout } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth)

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
    <div className={styles.navbar_container}>
      {width > 620 ? (<StandardNav/>) : (<BurgerNav/>)}
    </div>
  );
};

export default Navbar;