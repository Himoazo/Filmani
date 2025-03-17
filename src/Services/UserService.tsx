import { User } from "@/Interfaces/Auth";
import axios from "axios";
import { handleError } from "@/Helpers/Error";
import { toast } from "react-toastify";

const url: string = "http://localhost:5034/";


export const getUsers = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw "Du saknar behörigheten för denna operation";
        }
        const { data } = await axios.get<User[]>(`${url}api/account/users/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!Array.isArray(data)) {
            throw Error
        }
        return data;
    } catch (error) {
        handleError(error, "Det gick inte att hämta användarkonton")
        return[]
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw "Du saknar behörigheten för denna operation";
        }

        await axios.delete(`${url}api/account/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        toast.warn("Användarkontot är nu borttaget")
        return true; 
    } catch (error) {
        handleError(error)
    }
}
//Change role between Admin and User
export const modifyUserRole = async (userId: string, newRole: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw "Du saknar behörigheten för denna operation";
        }

        await axios.put(`${url}api/account/users/${userId}/role`, { role: newRole }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        toast(`Användarrollen har ändrats till ${newRole}`);
        return true;
    } catch (error) {
        handleError(error)
    }
}
