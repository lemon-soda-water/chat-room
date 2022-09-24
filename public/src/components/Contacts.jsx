import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, currentUser, chatChage }) {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserImage, setCurrentUseImage] = useState(null);
  const [currentSelect, setCurrentSelect] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUseImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (contact, index) => {
    setCurrentSelect(index);
    chatChage(contact)
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="brand">
            <img style={{ height: "2rem" }} src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelect ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(contact, index)}
                >
                  <div className="avatar">
                    <img
                      style={{ height: "3rem" }}
                      src={
                        contact.avatarImage
                          ? contact.avatarImage
                          : "https://api.multiavatar.com/moren.png"
                      }
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={currentUserImage} alt="avatar" />
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10%, 75%, 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img: {
      height: 2rem;
    }
    h3 {
      color: #fff;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      background-color: #ffffff39;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          width: 3rem;
        }
      }
      .username {
        h3 {
          color: #fff;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      color: #fff;
    }
    @media screen and(min-width: 720px) and(min-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
