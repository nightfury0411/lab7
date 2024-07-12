import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useOath = () => {
  const context = useContext(UserContext);
  return context;
};

function OathProvider({ children }) {
  const navigate = useNavigate();
  const [login, setLogin] = useState(
    () => JSON.parse(localStorage.getItem("login")) || false
  );

  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(login));
  }, [login]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({});
    setLogin(false);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        login,
        setLogin,
        user,
        setUser,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default OathProvider;
