import { createContext, useState, useContext, ReactNode, useEffect} from "react";
import { User, Login, AuthContext } from "../Interfaces/Auth";
import { Register } from "react-router-dom";
import { handleError } from "@/Helpers/Error";
import { LOCAL_API } from "@/Services/UrlService";

const AuthenticateContext = createContext<AuthContext | null>(null);

interface AuthProps { children: ReactNode }

export const AuthProvider: React.FC<AuthProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
  

    //User role
    const decodeRole = (token: string) => {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.role;
    }

    const login =async (loginData: Login) => {
        
        try {
            const response = await fetch("https://filmapi-production-3b72.up.railway.app/api/account/login", {
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

            const role = decodeRole(data.token);
            
            localStorage.setItem("token", data.token);
            setUser({id: data.id, username: data.username, email: data.email, token: data.token, role: role});
           
        } catch (error) {
            handleError(error)
            throw error;
        }
    }

    const signUp = async (registerData: Register) => {
        try {
            const {data} = await LOCAL_API.post<User>("/api/account/register", registerData);

            if (data) {
                const role = decodeRole(data.token);
                localStorage.setItem("token", data.token);
                setUser({id: data.id, username: data.username, email: data.email, token: data.token, role: role});
            } else {
                throw new Error("Det gick inte att skapa kono, kontrollera registreringsuppgifterna och försök igen");
            }
        } catch (error) {
            handleError(error)
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
            return;
        }

        try {
            const response = await fetch("https://filmapi-production-3b72.up.railway.app/api/account/me", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (response.ok) {
                const data = await response.json() as User;
                const role = decodeRole(data.token);
                setUser({id: data.id, username: data.username, email: data.email, token: data.token, role: role});
                
            }
        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
            handleError(error)
        }
    }

    useEffect(() => {
        validateToken();
    }, []);


    return (
        <AuthenticateContext.Provider value={{login, logout, signUp, user}}>
            {children}
        </AuthenticateContext.Provider>
    )
}
// Export useAuth
export const useAuth = () :AuthContext => {
    const context = useContext(AuthenticateContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}