import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = () => {};

  return (
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
          name="confirm password"
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
        border: 0.1rem solid #997af0
      }
    }
    button {
      background-color: #997af0;
      color: #fff;
      padding: 1rem 2rem;
      border: none;
      font-weight:  700;
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
