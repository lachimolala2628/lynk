import React, { useState } from 'react'
import { registerUser } from '../api/user.api.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { login } from '../store/slice/authSlice.js';

const RegisterForm = ({ state }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            const data = await registerUser(name, password, email);
            setLoading(false);
            dispatch(login(data.user))
            navigate({ to: "/dashboard" })
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="bg-[#0A0A0A] border border-[#222323] rounded-lg px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-mono text-[#ffffff] text-center mb-6">Create an Account</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-[#ffffff] text-sm font-mono mb-2" htmlFor="name">
                        Full Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#FFFFFF] bg-[#171717] border-[#222323] placeholder:text-[#a1a1a1] placeholder:font-mono"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-[#ffffff] text-sm font-mono mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#FFFFFF] bg-[#171717] border-[#222323] placeholder:text-[#a1a1a1] placeholder:font-mono"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-[#ffffff] text-sm font-mono mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#FFFFFF] bg-[#171717] border-[#222323] placeholder:text-[#a1a1a1] placeholder:font-mono"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className={`bg-[#E5E5E5] text-[#171717] font-mono py-2 px-4 rounded-xl w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="cursor-pointer text-sm text-gray-600">
                        Already have an account? <span onClick={() => state(true)} className="text-blue-500 hover:text-blue-700">Sign In</span>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default RegisterForm