import { createContext, useState, useContext, ReactNode, useEffect} from "react";
import { User, Login, AuthContext } from "../Interfaces/Auth";
import axios from "axios";
import { Register } from "react-router-dom";

const AuthenticateContext = createContext<AuthContext | null>(null);

interface AuthProps { children: ReactNode }

export const AuthProvider: React.FC<AuthProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login =async (loginData: Login) => {
        
        try {
            const response = await fetch("http://localhost:5034/api/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Felaktigt användarnamn/lösenord");
                } else {
                   throw new Error("Det gick inte att logga in, försök igen senare"); 
                }
                
            }

            const data = await response.json() as User;

            localStorage.setItem("token", data.token);
            setUser({id: data.id, username: data.username, email: data.email, token: data.token});
           
        } catch (error) {
            throw error;
        }
    }

    const signUp = async (registerData: Register) => {
        try {
            const {data} = await axios.post<User>("http://localhost:5034/api/account/register", registerData);

            if (data) {
                localStorage.setItem("token", data.token);
                setUser({id: data.id, username: data.username, email: data.email, token: data.token});
            } else {
                throw new Error("Det gick inte att skapa kono, kontrollera registreringsuppgifterna och försök igen");
            }
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        localStorage.removeItem("token");

        setUser(null);
    }

    const validateToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5034/api/account/me", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (response.ok) {
                const data = await response.json() as User;
                setUser({id: data.id, username: data.username, email: data.email, token: data.token});
                
            }
        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        validateToken();
    }, []);


    return (
        <AuthenticateContext.Provider value={{login, logout, signUp, user, loading}}>
            {children}
        </AuthenticateContext.Provider>
    )
}

export const useAuth = () :AuthContext => {
    const context = useContext(AuthenticateContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}