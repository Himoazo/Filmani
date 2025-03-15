import { User } from "@/Interfaces/Auth";
import axios from "axios";

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

        return data;
    } catch (error) {
        console.log(error);
        return [];
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

        return true; // Indicate success
    } catch (error) {
        console.error(error);
        return false; // Indicate failure
    }
}

export const modifyUserRole = async (userId: string, newRole: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw "Du saknar behörigheten för denna operation";
        }

        await axios.put(`${url}api/account/users/${userId}/role`, { role: newRole }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
