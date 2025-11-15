import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [toggleVisiblePassword, setToggleVisiblePassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const toggleVisiblePasswordHandler = () => {
        setToggleVisiblePassword(!toggleVisiblePassword);
    }


    const loginHandler = async (evt: React.FormEvent) => {
        evt.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            await login(username, password);
            setUsername('');
            setPassword('');
            navigate('/');
        } catch (err: any) {
            setMessage(err?.response?.data?.message || 'FAILED LOGIN');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-12 bg-white shadow">
                <h2 className="text-2xl text-center mb-4">Login</h2>
                <form onSubmit={loginHandler} className="space-y-4">
                    <input
                        type="text"
                        value={username}
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                        className="w-full px-4 py-2 border focus:outline-none"
                    />
                    {/* SHOW DAT PASSWORD INITIALLY INSTEAD OF USING TYPE PASSWORD XD */}
                    <input
                        type={toggleVisiblePassword ? "text" : "password"}
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className="w-full px-4 py-2 border focus:outline-none"
                    />

                    <button onClick={toggleVisiblePasswordHandler} type="button" className="cursor-pointer">
                        {toggleVisiblePassword ? "UNTOGGLE" : "TOGGLE"}
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2   hover:bg-blue-700 transition cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-gray-600">
                    {message || "I WANNA TAKE YOU AWAY LET'S ESCAPE INTO THE MUSIC, DJ, LET IT PLAY"}
                </p>
            </div>
        </div>
    );
};

export default Login;
