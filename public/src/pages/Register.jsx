import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import {createUser} from '../utils/http';
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const toastOption = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()) {
      createUser(values)
    }
  };

  const handleValidation = () => {
    const { username, password, email, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("密码不正确", toastOption);
      return false
    } else if(username.length < 3) {
      toast.error("用户名应该大于3个字符", toastOption);
      return false
    }else if(password.length < 8) {
      toast.error("用户名应该大于8个字符", toastOption);
      return false
    }else if(email.length === 0) {
      toast.error("邮箱是必须填写的", toastOption);
      return false
    }
    return true
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="用户名"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="输入邮箱"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="输入密码"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="确认密码"
            onChange={handleChange}
          />
          <button type="submit">创建用户</button>
          <span>
            已有账号
            <Link to="/login">登录</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #fff;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;
      &:focus {
        outline: none;
        border: 0.1rem solid #997af0;
      }
    }
    button {
      background-color: #997af0;
      color: #fff;
      padding: 1rem 2rem;
      border: none;
      font-weight: 700;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: #fff;
      text-transform: uppercase;
      text-align: center;
      a {
        color: #ec5b5b;
        text-decoration: none;
        font-weight: 700;
      }
    }
  }
`;
