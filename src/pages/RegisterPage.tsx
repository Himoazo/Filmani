import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Register } from '@/Interfaces/Auth';


const LoginPage = () => {
    const [registerInfo, setRegisterInfo] = useState<Register>({username: "", email: "", password: ""});
    const [error, setError] = useState("");

    const { signUp, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
      }  
    }, [user])

    const submitting = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const { username, email, password } = registerInfo;

        if (!username || !email || !password) {
            setError("Alla fält måste fyllas i.");
            return;
        }

        if (password.length < 10) {
            setError("Lösenordet måste vara minst 10 tecken långt.");
            return;
        }

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            setError("Lösenordet måste innehålla både stora och små bokstäver.");
            return;
        }

        try {
            
            await signUp(registerInfo);
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
                <h2 className="text-xl font-bold mb-4">Skapa konto</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              
                <div className="mb-4">
                    <label htmlFor='username' className="block text-sm font-medium">Användarnamn</label>
                    <input id='username' type="text" value={registerInfo.username} onChange={(e) => setRegisterInfo(prev => ({...prev, username: e.target.value}))}
                        className="w-full p-2 border rounded" required/>
                </div>

                <div className="mb-4">
                    <label htmlFor='email' className="block text-sm font-medium">Email</label>
                    <input id='email' type="email" value={registerInfo.email} onChange={(e) => setRegisterInfo(prev => ({...prev, email: e.target.value}))}
                        className="w-full p-2 border rounded" required/>
                </div>

                <div className="mb-4">
                    <label htmlFor='password' className="block text-sm font-medium">Lösenord</label>
                    <input id='password' type="password" value={registerInfo.password} onChange={(e) => setRegisterInfo(prev => ({...prev, password: e.target.value}))}
                        className="w-full p-2 border rounded" required/>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Registrera
                </button>
            </form>
        </div>
  )
}

export default LoginPage