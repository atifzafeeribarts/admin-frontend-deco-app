// src/routes/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginPng from "./../assets/login.webp";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { loginUser, setUser } from '../Redux/Slices/authSlice';
import ButtonLoadingSpinner from './../Components/ButtonLoadingSpinner';
import { onErrorToast, onSuccessToast } from "../Services/helper";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loginloaded, setloginloaded] = useState(false);
  const [togglePassword, settogglePassword] = useState(true);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    setloginloaded(true);
    try {
      const response_loggedin = await dispatch(loginUser({ email, password }));
      if (response_loggedin.payload.originalResponse == 'Login successful') {
        dispatch(setUser(true));
        setloginloaded(false);
        onSuccessToast("Login Successfull");
        navigate('/dashboard');
      }
    } catch (error) {
      onErrorToast('Login Failed: Invalid credentials.');
    }
    setloginloaded(false);
  };
  return (
    <section className="flex flex-col p-5 justify-center items-center h-[100dvh] bg-[var(--light-cream-background)]">
      <div className="flex max-md:flex-col w-full max-w-[900px] shadow-xl bg-[var(--white-color)] rounded-lg max-md:max-w-full md:h-[550px]">
        <div className="w-[50%] rounded-l-lg overflow-hidden max-md:rounded-t-lg max-md:rounded-l-none max-md:w-full max-md:hidden">
          <img className="size-full object-cover" src={loginPng} alt="" />
        </div>
        <div className="w-[50%] flex flex-col gap-5 justify-center max-md:w-full p-12 max-lg:p-6 max-md:p-3">
          <div className="text-3xl text-[var(--dark-light-brown)] font-[700] uppercase max-md:text-xl max-md:text-center">
            <img src="/ReturnRanger.png" className="h-12 max-md:m-auto max-md:h-9" />
          </div>
          <div className="font-semibold text-2xl  max-md:text-xl max-md:text-center w-full">
            Login
          </div>
          <div className="flex flex-col">
            <form className="max-w-sm max-md:max-w-full" onSubmit={handleLogin}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-[var(--dark-light-brown)]"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-[var(--light-cream-background)] border-[var(--border-color)] border-2 text-[var(--data-gray-color)] text-sm rounded-lg  block w-full p-2.5 focus:border-[var(--dark-light-brown)] focus:outline-none "
                  placeholder="name@flowbite.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-semibold text-[var(--dark-light-brown)]"
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={togglePassword ? "password" : "text"}
                    id="password"
                    placeholder="********"
                    className="bg-[var(--light-cream-background)] border-[var(--border-color)] border-2 text-[var(--data-gray-color)] text-sm rounded-lg block w-full p-2.5 focus:border-[var(--dark-light-brown)] focus:outline-none"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={(e) => { settogglePassword(!togglePassword); }}
                  >
                    {togglePassword ? <IoMdEye size={22} color="var(--dark-light-brown)" /> : <IoMdEyeOff size={22} color="var(--dark-light-brown)" />}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="text-[var(--white-color)] bg-[var(--dark-light-brown)] py-[15px] w-full gap-[10px] rounded-lg shadow-xl mt-8"
                disabled={loginloaded}
              >
                {loginloaded ? (
                  <ButtonLoadingSpinner sizeClass={"size-6"}/>
                ) : "Login"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Login;
