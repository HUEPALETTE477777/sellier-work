import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [toggleVisiblePassword, setToggleVisiblePassword] = useState(false);

    const toggleVisiblePasswordHandler = () => {
        setToggleVisiblePassword(!toggleVisiblePassword);
    }

    const signupHandler = async (evt: React.FormEvent) => {
        evt.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_FRONTEND_API_URL}/users/signup`, {
                email,
                username,
                password,
            });

            setMessage(res.data.message);
            setEmail('');
            setUsername('');
            setPassword('');

            localStorage.setItem('token', res.data.token);
        } catch (err: any) {
            setMessage(err?.response?.data?.error || 'FAILED SIGN UP');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 ">
            <div className="w-full max-w-md p-12 bg-white shadow">
                <h2 className="text-2xl  text-center mb-4">Sign Up</h2>
                <form onSubmit={signupHandler} className="space-y-4">
                    <input
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border focus:outline-none"
                    />
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-4 py-2 border focus:outline-none"
                    />
                    {/* SHOW DAT PASSWORD INITIALLY INSTEAD OF USING TYPE PASSWORD XD */}
                    <input
                        type={toggleVisiblePassword ? "text" : "password"}
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border focus:outline-none"
                    />

                    <button onClick={toggleVisiblePasswordHandler} type="button" className="cursor-pointer">
                        {toggleVisiblePassword ? "UNTOGGLE" : "TOGGLE"}
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 hover:bg-green-700 transition cursor-pointer"
                    >
                        Sign Up!
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-gray-600">
                    {message || "I WANNA TAKE YOU AWAY LET'S ESCAPE INTO THE MUSIC, DJ, LET IT PLAY"}
                </p>
            </div>
        </div>
    );
};

export default Signup;
