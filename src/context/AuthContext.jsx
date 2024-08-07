import { createContext, useState, useContext, useEffect } from "react"
import { loginRequest } from "../api/public.api";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Intenta cargar el usuario desde localStorage al iniciar la aplicación
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      const userObject = JSON.parse(storedUser);
      return userObject;
    }
    return null; // Si no hay datos en localStorage, establece el usuario en null
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);


  // Load user data on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser === null) {
      // No hay datos en localStorage
      setUser(null);
      setIsAuthenticated(false);
    } else {
      const userObject = JSON.parse(storedUser);

      if (userObject && typeof userObject === 'object') {
        // Verifica que userObject sea un objeto
        if (Object.keys(userObject).length === 0) {
          // El objeto almacenado en localStorage está vacío
          setUser(userObject);
          setIsAuthenticated(false); // Establece isAuthenticated en false
        } else {
          // El objeto almacenado en localStorage contiene datos
          setUser(userObject);
          setIsAuthenticated(true); // Establece isAuthenticated en true
        }
      } else {
        // userObject no es un objeto
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  // Save user data on change
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser({ ...res.data.user, token: res.data.token });
      setIsAuthenticated(true);
      console.log(user);
      return res
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{
      signin,
      logout,
      loading,
      user,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  )
}