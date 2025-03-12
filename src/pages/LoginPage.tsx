import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
      }  
    }, [user])

    const submitting = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        try {
            
            await login({email, password});
            navigate("/");
        } catch (error) {
            setError( String(error));
        }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form 
                onSubmit={submitting} 
                className="bg-white p-6 rounded-lg shadow-md w-96"
            >
                <h2 className="text-xl font-bold mb-4">Login</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded" required/>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded" required/>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
  )
}

export default LoginPage