// import "./login.css";

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center login-container">
//       <div className="w-full max-w-sm p-6 bg-white shadow rounded">
//         <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-3 p-2 border rounded"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 p-2 border rounded"
//         />

//         <button className="w-full bg-blue-600 text-white py-2 rounded">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
import LoginHeaderImage from '@/public/images/login-header.webp';
import { User, UserPlus, Eye, EyeOff } from 'lucide-react';
import '@/app/login/login.css';

const LoginPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);

    const [registerStep, setRegisterStep] = useState<number>(1);
    const [registerEmail, setRegisterEmail] = useState<string>('');
    const [registerUsername, setRegisterUsername] = useState<string>('');
    const [registerPassword, setRegisterPassword] = useState<string>('');
    const [showRegisterPassword, setShowRegisterPassword] = useState<boolean>(false);

    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Login submitted', { loginEmail, loginPassword });
        alert('Login successful!');
    };

    const handleRegisterStep1 = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerEmail) setRegisterStep(2);
    };

    const handleRegisterStep2 = (e: any) => {
        e.preventDefault();
        if (registerUsername) setRegisterStep(3);
    };

    const handleRegisterStep3 = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerPassword) {
            console.log('Registration complete:', { registerEmail, registerUsername, registerPassword });
            alert('Registration successful!');
            setActiveTab('login');
            setRegisterStep(1);
            setRegisterEmail('');
            setRegisterUsername('');
            setRegisterPassword('');
        }
    };

    return (
        <div className='login-page-container'>
            <div className="min-h-screen w-full flex items-center justify-center  p-4 opacity-100">
                <div className="bg-white rounded-2xl shadow-2xl z-10 w-full max-w-md sm:max-w-lg md:max-w-xl border overflow-hidden">

                    {/* Logo Section */}
                    <div className="p-6 flex flex-col items-center">
                        <Image
                            src={LoginHeaderImage}
                            alt="Login Numbers"
                            className="w-40 sm:w-48 md:w-60 h-auto"
                            priority
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-col sm:flex-row">
                        <button
                            onClick={() => setActiveTab('login')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 font-bold uppercase transition-colors border-b-2
                        ${activeTab === 'login' ? 'border-[#2D1B5E] bg-white text-[#2D1B5E]' : 'border-transparent bg-orange-500 text-white'}`}>
                            {activeTab === 'login' ? <User size={18} /> : <User fill="currentColor" strokeWidth={0} className="w-6 h-6" />} LOGIN
                        </button>

                        <button
                            onClick={() => setActiveTab('register')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 font-bold uppercase transition-colors border-b-2
                        ${activeTab === 'register' ? 'border-black bg-white text-black' : 'border-transparent bg-orange-500 text-white'}`}>
                            <UserPlus size={18} /> REGISTER
                        </button>
                    </div>

                    {/* Forms */}
                    <div className="p-6 space-y-6">
                        {activeTab === 'login' && (
                            <form onSubmit={handleLoginSubmit} className="space-y-4">
                                <div className="relative pt-4">
                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="w-full border-b-2 border-red-500 py-2 outline-none focus:border-red-500 transition-all peer placeholder-transparent"
                                        placeholder="Email"
                                        id="email"
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 top-6 text-gray-400 text-base transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-red-500 peer-focus:top-0 peer-focus:text-red-500 peer-focus:text-xs peer-focus:animate-shake-3d peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-red-500 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                                    >
                                        Email
                                    </label>
                                    <span className="text-red-500 text-xs mt-1 block">Required</span>
                                </div>

                                <div className="relative pt-4">
                                    <input
                                        type={showLoginPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full border-b-2 border-red-500 py-2 outline-none focus:border-red-500 transition-all peer placeholder-transparent"
                                    />
                                    <label
                                        htmlFor="Password"
                                        className="absolute left-0 top-6 text-gray-400 text-base transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-red-500 peer-focus:top-0 peer-focus:text-red-500 peer-focus:text-xs peer-focus:animate-shake-3d peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-red-500 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                                    >
                                        Password
                                    </label>
                                    <span className="text-red-500 text-xs mt-1 block">Required</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300" />
                                    <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4">
                                    <button type="button" className="text-red-500 text-xs font-bold uppercase hover:underline">
                                        Forgot Password?
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#2D1B5E] hover:bg-[#1a1240] text-white font-bold py-2.5 px-8 rounded transition-all w-full sm:w-auto"
                                    >
                                        LOGIN
                                    </button>
                                </div>
                            </form>
                        )}
                
                        {activeTab === 'register' && (
                            <form onSubmit={handleRegisterStep1} className="space-y-4">
                                {registerStep === 1 && (
                                    <div className="space-y-1">
                                        <label className="text-gray-700 text-sm font-semibold">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            value={registerEmail}
                                            onChange={(e) => setRegisterEmail(e.target.value)}
                                            className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#F58220] transition-all"
                                        />
                                    </div>
                                )}
                                {registerStep === 2 && (
                                    <div className="space-y-1">
                                        <label className="text-gray-700 text-sm font-semibold">Username</label>
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            value={registerUsername}
                                            onChange={(e) => setRegisterUsername(e.target.value)}
                                            className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#F58220] transition-all"
                                        />
                                    </div>
                                )}
                                {registerStep === 3 && (
                                    <div className="space-y-1 relative">
                                        <label className="text-gray-700 text-sm font-semibold">Password</label>
                                        <input
                                            type={showRegisterPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={registerPassword}
                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                            className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#F58220] transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                            className="absolute right-0 bottom-2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                )}

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="bg-[#F58220] hover:bg-[#c66d1b] text-white font-bold py-2.5 px-8 rounded transition-all"
                                    >
                                        {registerStep === 3 ? 'REGISTER' : 'NEXT'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginPage;