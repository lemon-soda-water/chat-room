import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import { SetAvatarRoute } from "../utils/http";
import "react-toastify/dist/ReactToastify.css";

export default function SetAvatar() {
  const navigate = useNavigate();

  const avatars = ["Dogecoin", "Emma", "abcdefg", "helloreact"];
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, [])

  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("请选择一个头像", toastOption);
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await SetAvatarRoute(user._id, {
        image: `https://api.multiavatar.com/${avatars[selectedAvatar]}.png`,
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error('请在设置一次头像', toastOption)
      }
    }
  };

  let num = 0;
  let length = avatars.length;

  const imageLoad = () => {
    num++;
    if (num === length) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      )}

      <Container>
        <div className="title-container">
          <h1>选择头像</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
            >
              <img
                src={`https://api.multiavatar.com/${avatar}.png`}
                alt="avatar"
                onClick={() => setSelectedAvatar(index)}
                onLoad={imageLoad}
                onError={imageLoad}
              />
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={setProfilePicture}>
          确认
        </button>
      </Container>

      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: #fff;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s, ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;
