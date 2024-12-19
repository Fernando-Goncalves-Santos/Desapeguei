import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Context = createContext();

function UserProvider({ children }) {

  const { register, authenticated, logout, login } = useAuth();

  return <Context.Provider value={{ register, authenticated, logout, login }}>{children}</Context.Provider>;
}

export{ Context, UserProvider}