'use client';

import React, { useEffect, useState } from 'react';
import { User, UserPlus, Eye, EyeOff } from 'lucide-react';
import '../../assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import logoUrl from '../../../public/images/w_n_logo.webp';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { API_URL } from '@/src/core/services/api-url.services';
import { services } from '@/src/core/services/route';
import { CONST } from '@/src/core/helper/const';
import { useUser } from "@/src/context/UserContext";

// Use public path for logo image as per Next.js convention
type UserDetails = {
  OS: string;
  Browser: string;
  Mobile: boolean;
  Cookies: boolean;
  ScreenSize: string;
  FullUserAgent: string;
};



const Login: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPass, setShowPass] = useState(false);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    username: "",
    pwd: "",
    repwd: "",
    firstname: "",
    middlename: "",
    lastname: "",
    currentfirstname: "",
    currentlastname: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    accept: false,
  });
  const [success, setSuccess] = useState(false);

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const router = useRouter();
  const { setUserResponse } = useUser();

  useEffect(() => {
    function getUserDetailsString() {
      const ua = navigator.userAgent;

      const os = navigator.platform || "Unknown";
      const browserMatch = ua.match(/Chrome\/([\d.]+)/);
      const browser = browserMatch
        ? `Chrome ${browserMatch[1]}`
        : "Unknown";

      const mobile = /Mobi|Android/i.test(ua);
      const cookies = navigator.cookieEnabled;
      const screenSize = `${screen.width} x ${screen.height}`;

      return `OS=${os},Browser=${browser},Mobile=${mobile},Cookies=${cookies},ScreenSize=${screenSize},FullUserAgent=${ua}`;
    }

    const userdetails: any = getUserDetailsString();
    console.log("userdetails::", userdetails);
    setUserDetails(userdetails);
  }, []);

  console.log(userDetails);

  const getTodayDateTime = (): string => {
    const now = new Date();

    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
      `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  };


  const onLogin = async () => {
    if (!userDetails) return;
    const todaydate = getTodayDateTime();
    const values = {
      todaydate,
      userdetails: userDetails,
      responce_data: "userlogin",
      username: form.email,
      pass: form.pwd
    };
    try {
      const response = await services.create(API_URL, values);
      if (response?.result === 'loggedin') {
        // Save user data in context and localStorage
        if (response?.result === 'loggedin') {
          setUserResponse(response); // Save the whole response object
          router.push(CONST.ROUTES.DAILYFORCAST);
        }
        localStorage.setItem('userName', form.email);
        router.push(CONST.ROUTES.DAILYFORCAST);
      } else {
        // utils.showErrMsg(response?.message || response);
      }
    } catch (error) {
      console.log("err::", error);
    } finally {
      // setLoading(false)
    }
  }


  const onSubmit = async () => {
    if (!userDetails) return;
    const todaydate = getTodayDateTime();

    const values = {
      todaydate,
      userdetails: userDetails,
      responce_data: "userregistration",
      username: form.email,
      pass: form.pwd
    };
    try {
      const response = await services.create(API_URL, values);
      if (response?.status) {
        // utils.showSuccMsg("Login successfully");
        // router.push(CONST.ROUTES.DASHBOARD)
        // setAuth(response?.token)
      } else {
        // utils.showErrMsg(response?.message || response);
      }
    } catch (error) {
      console.log("err::", error);
    } finally {
      // setLoading(false)
    }
  }


  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const onRegister = () => {
    setSuccess(true);
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 py-5">
      {/* Dynamic Numerology Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none grid grid-cols-12 grid-rows-12 gap-10 p-10 select-none login-bg">
        {Array.from({ length: 144 }).map((_, i) => (
          <span key={i} className={`text-6xl font-black rotate-${(i * 15) % 360} text-[#F58220]`}>{(i % 9) + 1}</span>
        ))}
      </div>

      <div className="login-page">
        {/* Logo Section */}
        <div className="logo-img d-flex align-items-center justify-content-center mb-5">
          <Image src={logoUrl} alt="logo" className="w-75" />
        </div>

        {/* Tabs */}
        <div className="d-flex tabs mb-3">
          <button
            onClick={() => setTab('login')}
            className={`w-50 d-flex align-items-center justify-content-center ${tab === 'login' ? 'btn active' : 'btn'}`}>
            <User size={18} /> LOGIN
          </button>

          <button
            onClick={() => setTab('register')}
            className={`w-50 d-flex align-items-center justify-content-center ${tab === 'register' ? 'btn active' : 'btn'}`}>
            <UserPlus size={18} /> REGISTER
          </button>
        </div>

        {/* Form */}
        {tab === 'login' && (
          <div className="d-flex flex-column gap-3 tabs-panel">
            <div className="blk">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email address"
                onChange={(e) => { setForm({ ...form, email: e.target.value }) }}
                required
              />
            </div>

            <div className="blk">
              <label>Password</label>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => { setForm({ ...form, pwd: e.target.value }) }}
              />
              <button
                onClick={() => setShowPass(!showPass)} className="eye-btn">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="d-flex align-items-center justify-content-between gap-2">
              <div className="lft d-flex align-items-center gap-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="rem-text">Remember me</label>
              </div>
              <div className="rft">
                <button className="fgt-text">Forgot Password?</button>
              </div>
            </div>

            <div className="d-flex justify-content-end align-items-center mt-3">
              <button
                onClick={onLogin}
                className="btns btns-primary">
                LOGIN
              </button>
            </div>
          </div>
        )}
        {tab === 'register' && (
          <div className="d-flex flex-column gap-3 tabs-panel">
            {step === 1 && !success && (
              <div className="blk">
                <div className="_blk mb-3">
                  <label>Email</label>
                  <input
                    type="email" value={form.email}
                    onChange={(e: { target: { value: any; }; }) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email address"
                  />
                </div>
                <div className="_blk mb-3">
                  <label>Password</label>
                  <input
                    type="password" value={form.pwd}
                    onChange={(e: { target: { value: any; }; }) => setForm({ ...form, pwd: e.target.value })}
                    placeholder="Password"
                  />
                </div>
                <div className="_blk">
                  <label>Re-enter Password</label>
                  <input
                    type="password" value={form.repwd}
                    onChange={(e: { target: { value: any; }; }) => setForm({ ...form, repwd: e.target.value })}
                    placeholder="Re-enter Password"
                  />
                </div>
                <div className="d-flex align-items-center justify-content-end mt-3">
                  <button
                    className="btns btns-primary"
                    onClick={onRegister}
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
            {success && (
              <div className="text-center py-5 su-sec">
                <div className="success-check mb-4">
                  ✓
                </div>

                <h4 className="mb-2">
                  Registration Successful
                </h4>

                <p className="mb-4">
                  Your account has been created successfully
                </p>

                <button className="btns btns-primary" onClick={() => setTab('login')}>
                  Go to Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;