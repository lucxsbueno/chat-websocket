import React from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [user, setUser] = React.useState({
    id: "",
    name: "",
    token: ""
  });

  React.useEffect(() => {
    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      const user = JSON.parse(userStorage);

      setUser(user);
    } else {
      setUser({ id: "", name: "", token: "" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);