import React, { useState } from 'react'
import { loginUser } from '../api/user.api.js';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user));
            navigate({ to: '/dashboard' });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Login failed, Please check your credentials.');
        };
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="bg-[#0A0A0A] border border-[#222323] rounded-lg px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl text-[#ffffff] font-mono text-center mb-6">Login</h2>

                {error && (
                    <div className="mb-4 p-3 bg-[#171717] border border-[#222323] text-[#E95C4A] rounded-xl font-mono">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-[#ffffff] text-sm font-mono mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#FFFFFF] bg-[#171717] border-[#222323] placeholder:text-[#a1a1a1] placeholder:font-mono"
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
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
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className={`bg-[#E5E5E5] text-[#171717] font-mono py-2 px-4 rounded-xl w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="cursor-pointer text-sm font-mono text-[#a1a1a1]">
                        Don't have an account? <span onClick={() => state(false)} className="text-[#a1a1a1] underline hover:text-[#ffffff]">Register</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm