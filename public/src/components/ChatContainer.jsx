import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMessageRoute, sendMessageRoute } from "../utils/http";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

export default function ChatContainer({ currentChat, currentUser }) {
  const [msgs, setMsgs] = useState([])

  useEffect(() => {
    if (currentChat && currentUser) {
      (async () => {
        const {data} = await getMessageRoute({
          from: currentUser._id,
          to: currentChat._id
        })
  
        setMsgs(data)
      })()
    }
  } , [currentChat])
  
  const handleSendMsg = async (msg) => {
    sendMessageRoute({
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    })
  }

  return (
    currentChat && (
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={
                  currentChat.avatarImage ||
                  `https://api.multiavatar.com/moren.png`
                }
                alt="avatar"
              />
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-message">
          {
            msgs.map((msg, index) => (
              <div key={index}>
                <div className={`message ${msg.fromSelf ? 'sended' : 'recieved'}`}>
                  <div className="content">
                    <p>
                      {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    )
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and(min-width: 720px) and(min-width: 1080px) {
      grid-auto-rows: 15% 75% 15%;
    }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        color: #fff;
      }
    }
  }
  .chat-message {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        min-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
