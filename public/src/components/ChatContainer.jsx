import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getMessageRoute, sendMessageRoute } from "../utils/http";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import {v4 as uuidv4} from 'uuid';

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [msgs, setMsgs] = useState([])
  const [arrivalMsg, setArrivalMsg] = useState(null)
  const scrollRef = useRef()

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
    socket.current.emit('send-msg', {
      from:  currentUser._id,
      to: currentChat._id,
      message: msg
    })

    setMsgs([...msgs, {fromSelf: true, message: msg}])
  }

  useEffect(() => {
    if(socket?.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMsg({
          fromSelf: false,
          message: msg
        })
      })
    }
  }, [])

  useEffect(() => {
    arrivalMsg && setMsgs((prev) => [...prev, arrivalMsg])
  }, [arrivalMsg])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})
  }, [msgs])

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
            msgs.map((msg) => (
              <div key={uuidv4} ref={scrollRef}>
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
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #fffddd39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
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
